import {
  gIstable,
  glistCandidate,
  gListKabupaten,
  gSelectedCandidate,
  gSelectedDate,
} from "@/g_state/g_map_state";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Group,
  Menu,
  Modal,
  Paper,
  Radio,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { EChartsOption, registerMap } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";
import {
  FaDotCircle,
  FaGripVertical,
  FaLock,
  FaLockOpen,
  FaSearch,
} from "react-icons/fa";
import {
  MdClose,
  MdDownload,
  MdLock,
  MdMap,
  MdRemoveRedEye,
  MdTableView,
  MdWeb,
  MdWebAsset,
} from "react-icons/md";
import toast from "react-simple-toasts";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import moment from "moment";
import Spreadsheet from "react-spreadsheet";
import { CSVLink, CSVDownload } from "react-csv";
import { gProvince } from "@/g_state/g_province";
import { useForm } from "@mantine/form";
import { api } from "@/lib/api";
import ButtonAjustByProvince from "./dialog_ajust_by_province";
import { funLoadMapData } from "@/fun_load/func_load_map_data";

interface ModelEmotion {
  anger?: number;
  disgust?: number;
  fear?: number;
  joy?: number;
  sadness?: number;
  surprise?: number;
  trust?: number;
  anticipation?: number;
}

const listEmotionColor = [
  {
    id: "1",
    name: "Trust",
    color: "#00A651",
  },
  {
    id: "2",
    name: "Joy",
    color: "#EC008C",
  },
  {
    id: "3",
    name: "Surprise",
    color: "#8B5E3C",
  },
  {
    id: "4",
    name: "Anticipation",
    color: "#F7941D",
  },
  {
    id: "5",
    name: "Sadness",
    color: "#00AEEF",
  },
  {
    id: "6",
    name: "Fear",
    color: "#FFDE17",
  },
  {
    id: "7",
    name: "Anger",
    color: "#ED1C24",
  },
  {
    id: "8",
    name: "Disgust",
    color: "#414042",
  },
];

const LayoutMapControll = () => {
  const [isMap, setIsmap] = useState(false);
  //   const [listNamaKabupaten, setlistNamaKabupaten] = useState<any[]>([]);
  const [bukaModal, setbukamodal] = useDisclosure(false);
  const [selectedData, setSelectedData] = useState<{ [key: string]: any }>({});
  const [listSelectedEmotion, setListSelectedEmotion] = useState<any[]>([]);
  const listCandidate = useHookstate(glistCandidate);
  const selectedCandidate = useHookstate(gSelectedCandidate);
  const selectedDate = useHookstate(gSelectedDate);
  const [search, setSearch] = useState<string>("");
  const listKabupaten = useHookstate(gListKabupaten);
  const [openCopyData, setCopyData] = useDisclosure(false);
  const [selectedDateCopyData, setSelectedDateCopyData] = useState<string>("");
  const adalahTable = useHookstate(gIstable);

  useShallowEffect(() => {
    loadData();

  }, []);

  const loadData = async () => {
    const res = await fetch("/api/indonesia-map");
    const resCandidate = await fetch("/api/get-candidate");
    if (!res.ok) return console.log("error get indonesia map");
    if (!resCandidate.ok) return console.log("error get candidate");
    const dataMap = await res.json();
    const dataCandidate = await resCandidate.json();
    listCandidate.set(dataCandidate);
    // for (let apa of dataMap.features) {
    //   apa.properties.name = apa.properties.NAME_2;
    //   apa.properties.value = apa.properties.Shape_Leng;
    //   // ini.push(apa.properties.NAME_1)
    // }
    registerMap("indonesia", dataMap);
    await funLoadMapData();
    setIsmap(true);
  };

  const option: EChartsOption = {
    toolbox: {
      show: true,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b) => {
        if (!a.data) return "kosong";
        const datanya = _.omit(a.data.data, "id", "City");
        const ky = Object.keys(datanya);
        return `
        <h3>${a.data.data.City.name}</h3>
        ${ky.map((v) => `${v}: ${datanya[v]}`).join("<br/>")}
        `;
      },
    },
    visualMap: {
      show: false,
      height: 0,
      width: 0,
    },
    series: [
      {
        name: "Indonesia",
        type: "map",
        map: "indonesia",
        roam: true,
        scaleLimit: {
          min: 1.2,
          max: 20,
        },
        // zoom: 20,
        label: {
          show: false,
          fontWeight: "bold",
          formatter: (v: any) => {
            return `${v.name}`;
          },
        },
        emphasis: {
          label: {
            show: true,
            color: "black",
            textBorderColor: "white",
            textBorderWidth: 4,
          },
        },
        data: listKabupaten.value
          .filter((v) => _.lowerCase(v.City.name).includes(_.lowerCase(search)))
          .map((v, i) => {
            const dt = _.omit<{}>(v, ["id", "City"]);

            const ky = Object.keys(dt);
            const vl = Object.values(dt);

            const emotion = ky[vl.indexOf(_.max(vl))];

            return {
              name: v.City.name,
              data: v,
              itemStyle: {
                color: listEmotionColor.find(
                  (v) => _.lowerCase(v.name) == emotion
                )?.color,
              },
            };
          }),
      },
    ],
  };

  const onEvent: Record<string, Function> = {
    click: (a: any, b: any, c: any) => {
      if (!a.data) return toast("empty data");
      setSelectedData(a.data);
      const dataFilter = _.omit(a.data, ["name", "data.id", "data.City"]).data;
      const hasil = [];
      for (let i of Object.keys(dataFilter)) {
        const data = {
          name: i,
          value: dataFilter[i],
          isChecked: true,
        };
        hasil.push(data);
      }
      setListSelectedEmotion(hasil);
      setbukamodal.open();
    },
    dataZoom: (a: any, b: any, c: any) => {
      console.log("a");
    },
  };

  const onProccess = async () => {
    let listHasilnya = [];
    const dataLock = listSelectedEmotion.filter((v) => v.isLock);
    const dataUnlock = listSelectedEmotion.filter((v) => !v.isLock);

    if (_.isEmpty(dataUnlock)) return toast("gak ada yang perlu di proses");

    let total = 100 - _.sum(dataUnlock.map((v) => v.value));
    if (total < 10) {
      return toast("selisih terlalu kecil untuk diproses");
    }

    const listData = dataLock.map((v) => v.value);

    for (let i = 0; i < listData.length; i++) {
      if (i < listData.length - 1) {
        const data = Math.floor(Math.random() * Math.floor(total / 2)) + 1;
        total -= data;
        dataLock[i].value = data;
      } else {
        dataLock[i].value = total;
      }
    }

    listHasilnya = [...dataLock, ...dataUnlock];

    let hasilData = {};
    for (let itm of listHasilnya) {
      const data = {
        [itm.name]: itm.value,
      };
      hasilData = { ...hasilData, ...data };
    }

    const dataBody = {
      id: selectedData.data.id,
      ...hasilData,
    };

    const dataUpdate = await fetch("/api/update-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    });

    if (dataUpdate.status != 201) return toast("error");
    toast("sussess");
    setListSelectedEmotion(listHasilnya);
    await funLoadMapData();
    setbukamodal.close();
  };

  const onSlide = (e: any, v: any) => {
    const total = _.sum(
      listSelectedEmotion.filter((v) => !v.isLock).map((v) => v.value)
    );
    if (e > v.value) {
      if (total + (e - v.value) > 100) return;
    }

    const newList = listSelectedEmotion.map((vv) => {
      if (vv.name === v.name) {
        vv.value = e;
        return vv;
      }
      return vv;
    });
    setListSelectedEmotion(newList);
  };

  const fileName = () => {
    const nama = listCandidate.value.find(
      (v) => v.id === Number(selectedCandidate.value)
    );
    return `${_.snakeCase(nama ? nama.name : "error")}_data_kabupaten`;
  };

  return (
    <>
      <Stack>
        <Flex
          w={"100%"}
          p={"md"}
          bg={"gray.1"}
          direction={"row"}
          gap={"lg"}
          justify={"space-between"}
          align={"center"}
          h={100}
          pos={"fixed"}
          sx={{
            zIndex: 100,
          }}
        >
          <Group>
            <DatePickerInput
              value={new Date(selectedDate.value)}
              label={"select date"}
              onChange={(val) => {
                if (val) {
                  selectedDate.set(moment(val).format("YYYY-MM-DD"));
                  funLoadMapData();
                }
              }}
              w={150}
            />
            {!_.isEmpty(listCandidate.value) && (
              <Select
                key={"1"}
                label={"select candidate"}
                value={selectedCandidate.value}
                placeholder={
                  listCandidate.value.find(
                    (v) => v.id == selectedCandidate.value
                  ).name
                }
                data={listCandidate.value.map((v) => ({
                  label: v.name,
                  value: v.id,
                }))}
                onChange={(val) => {
                  if (val) {
                    selectedCandidate.set(val!);
                    funLoadMapData();
                  }
                }}
              />
            )}
            <Autocomplete
              data={listKabupaten.value.map((v) => ({
                value: v.City.name,
              }))}
              icon={<FaSearch />}
              value={search}
              rightSection={
                <ActionIcon onClick={() => setSearch("")}>
                  <MdClose />
                </ActionIcon>
              }
              label={"search kabupaten"}
              onChange={(val) => {
                setSearch(val);
              }}
            />
          </Group>
          {/* <Text>{JSON.stringify(listCandidate.value)}</Text> */}
          <Flex align={"end"} gap={"lg"}>
            <Menu>
              <Menu.Target>
                <ActionIcon>
                  <FaGripVertical />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={setCopyData.open}>Copy Data</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <ActionIcon onClick={() => adalahTable.set(!adalahTable.value)}>
              {adalahTable.value ? (
                <MdMap size={42} />
              ) : (
                <MdTableView size={42} />
              )}
            </ActionIcon>
            {listKabupaten.value && listKabupaten.value[0] && (
              <CSVLink
                style={{
                  height: 25,
                }}
                filename={fileName()}
                data={
                  listKabupaten.value.map((v: any) => ({
                    ..._.omit(v, ["City"]),
                    kabupaten: v.City.name,
                  })) as any
                }
              >
                <MdDownload size={24} color={"gray"} />
              </CSVLink>
            )}

            <ButtonAjustByProvince />
          </Flex>
        </Flex>

        {/* modal copy data  */}
        <Modal opened={openCopyData} onClose={setCopyData.close}>
          <Flex direction={"row"} justify={"space-between"}>
            <DatePicker
              onChange={(val) => {
                if (val) {
                  setSelectedDateCopyData(moment(val).format("YYYY-MM-DD"));
                }
              }}
            />
            <Stack spacing={0}>
              <Text>From</Text>
              <Text>{selectedDate.value}</Text>
              <Text>To</Text>
              <Text>
                {!_.isEmpty(selectedDateCopyData) && selectedDateCopyData}
              </Text>

              {!_.isEmpty(selectedDateCopyData) &&
                moment(selectedDateCopyData).diff(
                  moment(selectedDate.value),
                  "days"
                ) > 0 && (
                  <Button
                    onClick={async () => {
                      const res = await fetch(
                        `/api/copy-data?from=${selectedDate.value}&to=${selectedDateCopyData}`
                      );

                      if (res.status != 201) return toast("error");
                      toast("success");
                    }}
                  >
                    Proccess
                  </Button>
                )}
            </Stack>
          </Flex>
        </Modal>

        {/* modal data configuration */}
        <Modal opened={bukaModal} onClose={setbukamodal.close} size={"70%"}>
          <Stack>
            <Flex justify={"space-between"}>
              <Text size={24} fw={"bold"}>
                {_.upperCase(selectedData.name)}
              </Text>
              <Button onClick={onProccess}>Procccess</Button>
            </Flex>
            <Divider />
            <SimpleGrid cols={2}>
              {_.sortBy(listSelectedEmotion, (c) => c.name).map((v) => (
                <Stack
                  p={"xs"}
                  key={v.name}
                  bg={
                    listEmotionColor.find(
                      (v2) => _.lowerCase(v2.name) == _.lowerCase(v.name)
                    )?.color
                  }
                >
                  <Flex justify={"space-between"}>
                    <Text color={"white"} fw={"bold"}>
                      {_.upperCase(v.name)}
                    </Text>
                    <Text
                      w={50}
                      px={"lg"}
                      bg={"white"}
                      sx={{
                        borderRadius: 4,
                      }}
                    >
                      {v.value}
                    </Text>
                  </Flex>
                  <Grid>
                    <Grid.Col span={8}>
                      <Slider
                        disabled={v.isLock}
                        value={v.value}
                        label={v.value}
                        key={v.name}
                        onChange={(e) => onSlide(e, v)}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Group position={"right"} align={"center"}>
                        <ActionIcon
                          onClick={() => {
                            if (v.isLock) {
                              const total = _.sum(
                                listSelectedEmotion
                                  .filter((v) => !v.isLock)
                                  .map((v) => v.value)
                              );
                              if (total + v.value > 100)
                                return toast("nilai melebihi batas");
                            }

                            const newList = listSelectedEmotion.map((vv) => {
                              if (vv.name === v.name) {
                                vv.isLock = !vv.isLock;
                              }
                              return vv;
                            });
                            setListSelectedEmotion(newList);
                          }}
                        >
                          {v.isLock ? (
                            <FaLock color="white" />
                          ) : (
                            <FaLockOpen color="white" />
                          )}
                        </ActionIcon>
                      </Group>
                    </Grid.Col>
                  </Grid>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Modal>
        <Box top={100} pos={"relative"}>
          {isMap && (
            <Box>
              <Stack>
                <Box hidden={adalahTable.value}>
                  <EChartsReact
                    onEvents={onEvent}
                    style={{
                      height: 700,
                    }}
                    option={option}
                  />
                </Box>
                <Box hidden={!adalahTable.value}>
                  <TableView
                    key={listKabupaten.value.length}
                    dataKabupaten={listKabupaten.value}
                  />
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
};

const TableView = ({ dataKabupaten }: any) => {
  const keyKab = useHookstate(gListKabupaten);
  const [lsTable, setLsTable] = useState<any[]>([]);

  useShallowEffect(() => {}, []);

  const olahData = () => {
    if (dataKabupaten && dataKabupaten[0]) {
      const lsSource = dataKabupaten.map((v: any) => ({
        ..._.omit(v, ["id", "City"]),
        kabupaten: v.City.name,
      }));

      const lsData = lsSource.map((v: any) =>
        Object.values(v).map((vv) => ({
          value: vv,
        }))
      );

      if (lsSource && lsSource[0]) {
        lsData.unshift(
          Object.keys(lsSource[0]).map((v) => ({
            value: v,
          }))
        );
      }

      return lsData;
    }

    return [];
  };

  return (
    <>
      <Stack>
        {/* {JSON.stringify(dataKabupaten)} */}
        <Spreadsheet data={olahData()} />
      </Stack>
    </>
  );
};

export default LayoutMapControll;
