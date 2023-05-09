import { funLoadMapData } from "@/fun_load/func_load_map_data";
import { api } from "@/lib/api";
import { sCandidate } from "@/s_state/s_candidate";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Modal,
  NavLink,
  NumberInput,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { useAtom } from "jotai/react";
import _ from "lodash";
import toast from "react-simple-toasts";
import {
  mc_batas_atas,
  mc_batas_bawah,
  mc_list_candidate,
  mc_list_hasil_random_data,
  mc_selected_candidate,
  mc_selected_candidate_random,
  mc_selected_date_random,
  mc_selected_tool,
} from "./map_controll_state";
import { useState } from "react";
import { DatePicker, DateTimePicker } from "@mantine/dates";
import moment from "moment";

const l_is_open_modal = signal(false);
const l_batas_atas = signal<number | null>(null);
const l_batas_bawah = signal<number | null>(null);
const l_hasil_data_kab = signal<any | null>(null);
const dataKab = signal<any | null>(null);

export function MapControllRandomEmotion({ listKab }: { listKab: any }) {
  const [selectedTool, setSelectedTool] = useAtom(mc_selected_tool);
  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate);
  const [selectedCandidate, setSelectedCandidate] = useAtom(
    mc_selected_candidate_random
  );
  const [listEmotion, setListEmotion] = useState<any[]>();
  const [batasAtas, setBatasAtas] = useAtom(mc_batas_atas);
  const [batasBawah, setBatasBawah] = useAtom(mc_batas_bawah);
  const [selectedDate, setSelectedDate] = useAtom(mc_selected_date_random);
  const [listHasilRandom, setlistHasilRandom] = useAtom(
    mc_list_hasil_random_data
  );

  // const open = {
  //   set: (val: any) => {
  //     localStorage.setItem("randomEmotion_isOpenModal", JSON.stringify(val));
  //     l_is_open_modal.value = val;
  //   },
  //   get: () =>
  //     (l_is_open_modal.value = JSON.parse(
  //       localStorage.getItem("randomEmotion_isOpenModal") ?? "false"
  //     )),
  // };
  useShallowEffect(() => {
    // open.get();
    dataKab.value = undefined;
    dataKab.value = listKab;
  }, []);

  // trust
  // joy
  // surprise
  // anticipation
  // sadness
  // fear
  // anger
  // disgust

  async function onProccessData() {
    // await onLoadData(selectedCandidate);
    const maka: any[] = [];
    if (_.lt(batasAtas, batasBawah)) {
      return toast("batas atas tidak boleh lebih kecil dari batas bawah");
    }

    listEmotion!.forEach((v: any) => {
      let dataVal = _.random(batasAtas, batasBawah);
      v.City.CityValue[0].value = dataVal;
      v.trust = _.random(0, dataVal);
      dataVal = dataVal - v.trust;
      v.joy = _.random(0, dataVal);
      dataVal = dataVal - v.joy;
      v.surprise = _.random(0, dataVal);
      dataVal = dataVal - v.surprise;
      v.anticipation = _.random(0, dataVal);
      dataVal = dataVal - v.anticipation;
      v.sadness = _.random(0, dataVal);
      dataVal = dataVal - v.sadness;
      v.fear = _.random(0, dataVal);
      dataVal = dataVal - v.fear;
      v.anger = _.random(0, dataVal);
      dataVal = dataVal - v.anger;
      v.disgust = dataVal;

      maka.push(v);
    });

    // l_hasil_data_kab.value = maka;
    setlistHasilRandom(maka);
  }

  async function onLoadData() {
    const resNamaKabupaten = await fetch(
      `/api/get-data-by-candidate?candidateId=${selectedCandidate}&date=${selectedDate}`
    );

    if (resNamaKabupaten.status != 200)
      return console.log("error get nama kabupaten");
    const datanya = await resNamaKabupaten.json();

    if (!_.isEmpty(datanya)) {
      setListEmotion(datanya);

      return;
    }

    toast("data tidak ditemukan");
    setlistHasilRandom(undefined);
    setListEmotion(undefined);
  }

  return (
    <Stack>
      {/* <Button onClick={() => open.set(true)} w={150} compact>
        Random Emotion
      </Button> */}
      {/* <NavLink
        label={"Random Emotion"}
        onClick={() => open.set(true)}
        w={150}
      /> */}
      <Modal
        size={"lg"}
        opened={selectedTool == "random_emotion"}
        onClose={() => setSelectedTool("")}
      >
        <Stack>
          {/* {JSON.stringify(listCandidate)} */}
          <Flex justify={"space-between"}>
            <Stack>
              {!_.isEmpty(listCandidate) && (
                <Select
                  placeholder={
                    listCandidate.find(
                      (v) => Number(v.id) == Number(selectedCandidate)
                    )?.name
                  }
                  onChange={(val) => {
                    if (val) {
                      setSelectedCandidate(val);
                      setListEmotion(undefined);
                      setlistHasilRandom(undefined);
                      // onLoadData();
                    }
                  }}
                  data={listCandidate.map((v) => ({
                    label: v.name,
                    value: v.id,
                  }))}
                />
              )}
              <DatePicker
                onChange={(val) => {
                  if (val) {
                    setSelectedDate(moment(val).format("YYYY-MM-DD"));
                    setListEmotion(undefined);
                    setlistHasilRandom(undefined);
                    // onLoadData();
                  }
                }}
              />
              <Button onClick={() => onLoadData()}>Get Data</Button>
            </Stack>

            {!listEmotion ? (
              <>
                <Stack p={"md"} bg={"yellow.0"}>
                  <Text c={"gray"} fs={"italic"}>
                    Pilih Candidate lalu oilih tanggal yang sudah berisi data ,
                    jika belum silahkan copy terlebih dahulu
                  </Text>
                </Stack>
              </>
            ) : (
              <Stack w={"100%"} p={"md"}>
                <Box bg={"yellow.0"} p={"xs"}>
                  <Text fs={"italic"} c={"gray"}>
                    Batas atas tidak kurang dari batas bawah
                  </Text>
                </Box>
                <NumberInput
                  // value={l_batas_atas.value!}
                  placeholder={batasAtas.toString()}
                  label={"batas atas"}
                  onChange={(val) => {
                    if (val) setBatasAtas(Number(val));
                  }}
                />
                <NumberInput
                  // value={l_batas_bawah.value!}
                  label={"batas bawah"}
                  placeholder={batasBawah.toString()}
                  onChange={(val) => {
                    if (val) setBatasBawah(Number(val));
                  }}
                />

                <Button onClick={onProccessData}>RANDOM</Button>
              </Stack>
            )}
          </Flex>

          {listHasilRandom && <TableView />}
        </Stack>
      </Modal>
    </Stack>
  );
}

function TableView() {
  const [loading, setLoading] = useState(false);
  const [listHasilRandom, setListHasilRandom] = useAtom(
    mc_list_hasil_random_data
  );
  function onSave() {
    setLoading(true);
    fetch(api.apiDevDevDataValueRandomUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listHasilRandom),
    }).then(async (v) => {
      if (v.status == 201) {
        const data = await v.json();
        toast("success");
        funLoadMapData();
      }

      setLoading(false);
    });
  }
  return (
    <>
      <Stack w={"100%"}>
        {/* {JSON.stringify(listHasilRandom)} */}
        <Divider h={100} />
        <Group position="apart">
          <Title order={3}>Result Random</Title>
          <Button loading={loading} disabled={loading} onClick={onSave}>
            SAVE
          </Button>
        </Group>
        <ScrollArea.Autosize mah={500}>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>city</th>
                <th>value</th>
                <th>trust</th>
                <th>joy</th>
                <th>surprise</th>
                <th>anticipation</th>
                <th>sadness</th>
                <th>fear</th>
                <th>anger</th>
                <th>disgust</th>
              </tr>
            </thead>
            <tbody>
              {listHasilRandom &&
                listHasilRandom.map((v: any, i: any) => (
                  <tr key={i}>
                    <td>{v.id}</td>
                    <td>{v.City.name}</td>
                    <td>
                      <Title order={5}>
                        {_.sum([
                          v.trust,
                          v.joy,
                          v.surprise,
                          v.anticipation,
                          v.sadness,
                          v.fear,
                          v.anger,
                          v.disgust,
                        ])}
                      </Title>
                    </td>
                    <td>{v.trust}</td>
                    <td>{v.joy}</td>
                    <td>{v.surprise}</td>
                    <td>{v.anticipation}</td>
                    <td>{v.sadness}</td>
                    <td>{v.fear}</td>
                    <td>{v.anger}</td>
                    <td>{v.disgust}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ScrollArea.Autosize>
      </Stack>
    </>
  );
}
