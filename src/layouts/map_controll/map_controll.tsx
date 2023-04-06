import { funLoadMapData } from "@/fun_load/func_load_map_data";
import {} from "@/g_state/g_map_state";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Menu,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { EChartsOption, registerMap } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { FaCopy, FaLock, FaLockOpen, FaSearch } from "react-icons/fa";
import { MdClose, MdDownload, MdMap, MdTableView } from "react-icons/md";
import toast from "react-simple-toasts";
import Spreadsheet from "react-spreadsheet";
import ButtonAjustByProvince from "./dialog_ajust_by_province";
import InjectData from "./inject_data";
// import { sCityContextDirection } from "@/s_state/s_state_city_context_direction";
// import { gCityContextDirection } from "@/g_state/g_city_context_direction";
import { sIstable } from "@/s_state/g_is_table";
import { slistCandidate } from "@/s_state/s_list_candidate";
import { sListKabupaten } from "@/s_state/s_list_kabupaten";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import MapControllContextDirection from "./map_controll_context_direction";
import MapControllWorCloud from "./map_controll_word_cloud";
import MapControllLeaderPersonaPrediction from "./map_controll_leader_persona_prediction";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
// import { ButtonLogout } from "@/layouts/dev/dev_auth_provider";

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

const openContextDirection = signal(false);

const LayoutMapControll = () => {
  const [isMap, setIsmap] = useState(false);
  //   const [listNamaKabupaten, setlistNamaKabupaten] = useState<any[]>([]);
  const [bukaModal, setbukamodal] = useDisclosure(false);
  const [selectedData, setSelectedData] = useState<{ [key: string]: any }>({});
  const [listSelectedEmotion, setListSelectedEmotion] = useState<any[]>([]);
  // const listCandidate = useHookstate(glistCandidate);
  // const selectedCandidate = useHookstate(gSelectedCandidate);
  // const selectedDate = useHookstate(gSelectedDate);
  const [search, setSearch] = useState<string>("");
  // const listKabupaten = useHookstate(gListKabupaten);
  const [openCopyData, setCopyData] = useDisclosure(false);
  const [selectedDateCopyData, setSelectedDateCopyData] = useState<string>("");
  // const adalahTable = useHookstate(gIstable);
  const [selectedCity, setSelectedCity] = useState<any | undefined>(undefined);

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
    slistCandidate.value = dataCandidate;

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
        data: sListKabupaten.value
          .filter((v) => _.lowerCase(v.City.name).includes(_.lowerCase(search)))
          .map((v, i) => {
            const dt = _.omit<{}>(v, ["id", "City"]);

            const ky = Object.keys(dt);
            const vl = Object.values(dt);

            const emotion = ky[vl.indexOf(_.max(vl))];

            const adaNol = _.max(vl) == 0;
            return {
              name: v.City.name,
              data: v,
              itemStyle: {
                color: adaNol
                  ? "white"
                  : listEmotionColor.find((v) => _.lowerCase(v.name) == emotion)
                      ?.color,
              },
            };
          }),
      },
    ],
  };

  const onEvent: Record<string, Function> = {
    click: (a: any, b: any, c: any) => {
      if (!a.data) return toast("empty data");
      // console.log(a.data);
      setSelectedData(a.data);

      // console.log(a.data);
      const dataFilter = _.omit(a.data, ["name", "data.id", "data.City"]).data;
      // eidt disini
      // console.log(dataFilter);
      const hasil = [];
      for (let i of [
        "trust",
        "joy",
        "surprise",
        "anticipation",
        "sadness",
        "fear",
        "anger",
        "disgust",
      ]) {
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
    // setListSelectedEmotion(listHasilnya);
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
    const nama = slistCandidate.value.find(
      (v) => v.id === Number(sSelectedCandidate.value)
    );
    return `${_.snakeCase(nama ? nama.name : "error")}_data_kabupaten`;
  };

  const onClear = async () => {
    let hasilData: { [key: string]: any } = {};
    for (let itm of listSelectedEmotion) {
      hasilData[itm.name] = 0;
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
    // setListSelectedEmotion(listHasilnya);
    await funLoadMapData();
    setbukamodal.close();
  };

  const onForce = () => {
    // console.log(JSON.stringify(selectedCity, null, 2))
    const dt = {
      name: selectedCity.City.name,
      data: selectedCity,
    };

    setSelectedData(dt);
    const dataFilter = _.omit(selectedCity, ["id", "City"]);

    const hasil = [];
    for (let i of [
      "trust",
      "joy",
      "surprise",
      "anticipation",
      "sadness",
      "fear",
      "anger",
      "disgust",
    ]) {
      const data = {
        name: i,
        value: dataFilter[i],
        isChecked: true,
      };
      hasil.push(data);
    }
    setListSelectedEmotion(hasil);
    setbukamodal.open();
  };

  return (
    <>
      <Stack>
        <Paper p={"md"}>
          <Flex
            // w={"100%"}
            wrap={"wrap"}
            // p={"xs"}
            // bg={"gray.1"}
            direction={"row"}
            gap={"lg"}
            justify={"space-between"}
            align={"center"}
            // pos={"sticky"}
            // top={0}
            // sx={{
            //   zIndex: 100,
            // }}
          >
            <Group>
              <DatePickerInput
                value={new Date(sSelectedDate.value)}
                label={"select date"}
                onChange={(val) => {
                  if (val) {
                    // sSelectedDate.set(moment(val).format("YYYY-MM-DD"));
                    sSelectedDate.value = moment(val).format("YYYY-MM-DD");
                    funLoadMapData();
                  }
                }}
                w={150}
              />
              {!_.isEmpty(slistCandidate.value) && (
                <Select
                  searchable
                  key={"1"}
                  label={"select candidate"}
                  value={sSelectedCandidate.value}
                  placeholder={
                    slistCandidate.value.find(
                      (v) => v.id == sSelectedCandidate.value
                    ).name
                  }
                  data={slistCandidate.value.map((v) => ({
                    label: v.name,
                    value: v.id,
                  }))}
                  onChange={(val) => {
                    if (val) {
                      // sSelectedCandidate.set(val!);
                      sSelectedCandidate.value = val;
                      funLoadMapData();
                    }
                  }}
                />
              )}
              <Flex align={"end"} gap={"md"}>
                <Autocomplete
                  data={sListKabupaten.value.map((v) => ({
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
                  onItemSubmit={(val) => {
                    const dataCity = sListKabupaten.value.find(
                      (v) => v.City.name == val.value
                    );
                    if (dataCity) {
                      setSelectedCity(dataCity);
                    }
                  }}
                />
                {selectedCity && (
                  <Button onClick={onForce} compact>
                    Force Select
                  </Button>
                )}
              </Flex>
            </Group>
            {/* <Text>{JSON.stringify(listCandidate.value)}</Text> */}
            <Flex align={"end"} gap={"lg"}>
              <Menu>
                <Menu.Target>
                  <Button compact leftIcon={<FaCopy />}>
                    copy data
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={setCopyData.open}>Copy Data</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Button
                leftIcon={sIstable.value ? <MdMap /> : <MdTableView />}
                compact
                onClick={() => (sIstable.value = !sIstable.value)}
              >
                {sIstable.value ? (
                  <Text>Map View</Text>
                ) : (
                  <Text>Table View</Text>
                )}
              </Button>

              <ButtonAjustByProvince />
              {sListKabupaten.value && sListKabupaten.value[0] && (
                <CSVLink
                  title="download"
                  style={{
                    height: 25,
                  }}
                  filename={fileName()}
                  data={
                    sListKabupaten.value.map((v: any) => ({
                      ..._.omit(v, ["City"]),
                      kabupaten: v.City.name,
                    })) as any
                  }
                >
                  <MdDownload size={24} color={"teal"} />
                </CSVLink>
              )}
              <InjectData />
            </Flex>
          </Flex>
        </Paper>

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
              <Text>{sSelectedDate.value}</Text>
              <Text>To</Text>
              <Text>
                {!_.isEmpty(selectedDateCopyData) && selectedDateCopyData}
              </Text>

              {!_.isEmpty(selectedDateCopyData) &&
                moment(selectedDateCopyData).diff(
                  moment(sSelectedDate.value),
                  "days"
                ) > 0 && (
                  <Button
                    onClick={async () => {
                      const res = await fetch(
                        `/api/copy-data?from=${sSelectedDate.value}&to=${selectedDateCopyData}`
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

        {/* modal data configuration emotion */}
        <Modal opened={bukaModal} onClose={setbukamodal.close} size={"70%"}>
          <Stack>
            <Group position="right">
              <MapControllContextDirection dataKab={selectedData} />
              <MapControllWorCloud dataKab={selectedData} />
              <MapControllLeaderPersonaPrediction dataKab={selectedData} />
            </Group>
            <Flex justify={"space-between"}>
              <Text size={24} fw={"bold"}>
                {_.upperCase(selectedData.name)}
              </Text>
            </Flex>

            <Divider />

            {/* akan muncul jika kondisi true untuk context  */}
            {/* {openContextDirection.value && (
              <MapControllContextDirection dataKab={selectedData} />
            )} */}
            <SimpleGrid cols={2}>
              {listSelectedEmotion.map((v) => (
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
            <Group position="right">
              <Button.Group>
                <Button w={100} compact onClick={onProccess}>
                  Procccess
                </Button>
                <Button w={100} compact bg={"pink"} onClick={onClear}>
                  Clear
                </Button>
                {/* <Button
                    w={100}
                    compact
                    onClick={() =>
                      (openContextDirection.value = !openContextDirection.value)
                    }
                  >
                    Context Direction
                  </Button> */}
              </Button.Group>
            </Group>
          </Stack>
        </Modal>
        <Paper p={"md"} pos={"static"} bg={stylesGradient1}>
          <Box top={100} pos={"static"}>
            {isMap && (
              <Box>
                <Stack>
                  <Box hidden={sIstable.value}>
                    <EChartsReact
                      onEvents={onEvent}
                      style={{
                        height: 700,
                      }}
                      option={option}
                    />
                  </Box>
                  <Box hidden={!sIstable.value}>
                    <TableView
                      key={sListKabupaten.value.length}
                      dataKabupaten={sListKabupaten.value}
                    />
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </Paper>
      </Stack>
    </>
  );
};

const TableView = ({ dataKabupaten }: any) => {
  const keyKab = useHookstate(sListKabupaten);
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
