import {
  glistCandidate,
  gListKabupaten,
  gSelectedCandidate,
  gSelectedDate,
} from "@/lib/g_map_state";
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
  Select,
  Slider,
  Stack,
  Text,
  TextInput,
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
import { MdClose } from "react-icons/md";
import toast from "react-simple-toasts";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import moment from "moment";

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

  useShallowEffect(() => {
    loadData();
  }, []);

  const loadMapData = async () => {
    const resNamaKabupaten = await fetch(
      `/api/get-data-by-candidate?candidateId=${selectedCandidate.value}&date=${selectedDate.value}`
    );
    if (!resNamaKabupaten.ok) return console.log("error get nama kabupaten");
    const dataNamaKabupaten = await resNamaKabupaten.json();
    listKabupaten.set(dataNamaKabupaten);
  };

  const loadData = async () => {
    const res = await fetch("/api/indonesia-map");
    const resCandidate = await fetch("/api/get-candidate");
    if (!res.ok) return console.log("error get indonesia map");
    if (!resCandidate.ok) return console.log("error get candidate");
    const dataMap = await res.json();
    const dataCandidate = await resCandidate.json();
    listCandidate.set(dataCandidate);
    for (let apa of dataMap.features) {
      apa.properties.name = apa.properties.NAME_2;
      apa.properties.value = apa.properties.Shape_Leng;
      // ini.push(apa.properties.NAME_1)
    }
    registerMap("indonesia", dataMap);
    await loadMapData();
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
          isLock: true,
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
    await loadMapData();
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

  return (
    <>
      <Flex
        p={"md"}
        bg={"gray.1"}
        direction={"row"}
        gap={"lg"}
        justify={"space-between"}
        align={"center"}
      >
        <Group>
          <DatePickerInput
            value={new Date(selectedDate.value)}
            label={"select date"}
            onChange={(val) => {
              if (val) {
                selectedDate.set(moment(val).format("YYYY-MM-DD"));
                loadMapData();
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
                listCandidate.value.find((v) => v.id == selectedCandidate.value)
                  .name
              }
              data={listCandidate.value.map((v) => ({
                label: v.name,
                value: v.id,
              }))}
              onChange={(val) => {
                if (val) {
                  selectedCandidate.set(val!);
                  loadMapData();
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
      <Modal opened={bukaModal} onClose={setbukamodal.close}>
        <Stack spacing={30}>
          <Flex justify={"space-between"}>
            <Text>{selectedData.name}</Text>
            <Button onClick={onProccess}>Procccess</Button>
          </Flex>
          {_.sortBy(listSelectedEmotion, (c) => c.name).map((v) => (
            <Stack key={v.name}>
              <Flex justify={"space-between"}>
                <Text>{v.name}</Text>
                <Text w={50} px={"lg"} bg={"yellow"}>
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
                      {v.isLock ? <FaLock /> : <FaLockOpen />}
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>
            </Stack>
          ))}
        </Stack>
      </Modal>
      {isMap && (
        <EChartsReact
          onEvents={onEvent}
          style={{
            height: 700,
          }}
          option={option}
        />
      )}
    </>
  );
};

export default LayoutMapControll;
