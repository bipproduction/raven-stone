import { glistCandidate, gSelectedCandidate } from "@/lib/g_map_state";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
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
import { FaLock, FaLockOpen, FaSearch } from "react-icons/fa";
import toast from "react-simple-toasts";

export interface ModelEmotion {
  anger?: number;
  disgust?: number;
  fear?: number;
  joy?: number;
  sadness?: number;
  surprise?: number;
  trust?: number;
  anticipation?: number;
}

const LayoutMapControll = () => {
  const [isMap, setIsmap] = useState(false);
  const [listNamaKabupaten, setlistNamaKabupaten] = useState<any[]>([]);
  const [bukaModal, setbukamodal] = useDisclosure(false);
  const [selectedData, setSelectedData] = useState<{ [key: string]: string }>(
    {}
  );
  const [listSelectedEmotion, setListSelectedEmotion] = useState<any[]>([]);
  const listCandidate = useHookstate(glistCandidate);
  const selectedCandidate = useHookstate(gSelectedCandidate);

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
    for (let apa of dataMap.features) {
      apa.properties.name = apa.properties.NAME_2;
      apa.properties.value = apa.properties.Shape_Leng;
      // ini.push(apa.properties.NAME_1)
    }
    registerMap("indonesia", dataMap);
    const resNamaKabupaten = await fetch(
      `/api/get-data-by-candidate?candidateId=${selectedCandidate.value}`
    );
    if (!resNamaKabupaten.ok) return console.log("error get nama kabupaten");
    const dataNamaKabupaten = await resNamaKabupaten.json();
    setlistNamaKabupaten(dataNamaKabupaten);
    setIsmap(true);
  };

  const option: EChartsOption = {
    toolbox: {
      show: true,
    },
    tooltip: {
      show: true,
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
        data: listNamaKabupaten.map((v, i) => {
          return {
            name: v.City.name,
            data: v,
            itemStyle: {
              color: "blue",
            },
          };
        }),
      },
    ],
  };

  const onEvent: Record<string, Function> = {
    click: (a: any, b: any, c: any) => {
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
  };

  const onProccess = () => {
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

    setListSelectedEmotion(listHasilnya);
  };

  const onSlide = (e: any, v: any) => {
    const total = _.sum(
      listSelectedEmotion.filter((v) => !v.isLock).map((v) => v.value)
    );
    if (e > v.value) {
      if (total + (e - v.value) > 100)
        return toast("error: bisa melebihi ambang batas");
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
      <Text>Map Controll</Text>
      <Group p={"lg"}>
        <Flex direction={"row"} gap={"lg"}>
          {!_.isEmpty(listCandidate.value) && (
            <Select
              key={"1"}
              label={"select candidate"}
              placeholder={
                listCandidate.value.find((v) => v.id == selectedCandidate.value)
                  .name
              }
              data={listCandidate.value.map((v) => ({
                label: v.name,
                value: v.id,
              }))}
              onChange={(val) => {
                console.log(val);
              }}
            />
          )}
          <TextInput icon={<FaSearch />} label={"search kabupaten"} />
        </Flex>
      </Group>
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
