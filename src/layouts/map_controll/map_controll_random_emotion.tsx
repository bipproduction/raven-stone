import { funLoadMapData } from "@/fun_load/func_load_map_data";
import { api } from "@/lib/api";
import { sCandidate } from "@/s_state/s_candidate";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Modal,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import _ from "lodash";
import toast from "react-simple-toasts";

const l_is_open_modal = signal(false);
const l_batas_atas = signal<number | null>(null);
const l_batas_bawah = signal<number | null>(null);
const l_hasil_data_kab = signal<any | null>(null);
const dataKab = signal<any | null>(null);

export function MapControllRandomEmotion({ listKab }: { listKab: any }) {
  const open = {
    set: (val: any) => {
      localStorage.setItem("randomEmotion_isOpenModal", JSON.stringify(val));
      l_is_open_modal.value = val;
    },
    get: () =>
      (l_is_open_modal.value = JSON.parse(
        localStorage.getItem("randomEmotion_isOpenModal") ?? "false"
      )),
  };
  useShallowEffect(() => {
    open.get();
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

  function onProccessData() {
    const maka: any[] = [];
    if (l_batas_atas.value && l_batas_bawah.value) {
      if (_.lt(l_batas_atas.value, l_batas_bawah.value)) {
        return toast("batas atas tidak boleh lebih kecil dari batas bawah");
      }
      dataKab.value.forEach((v: any) => {
        let dataVal = _.random(l_batas_bawah.value!, l_batas_atas.value!);
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

      l_hasil_data_kab.value = maka;
    } else {
      toast("isi batas atas dan batas bawah terlebih dahulu");
    }
  }

  return (
    <>
      <Button onClick={() => open.set(true)} w={150} compact>
        Random Emotion
      </Button>
      <Modal
        fullScreen
        opened={l_is_open_modal.value}
        onClose={() => open.set(false)}
      >
        <Stack>
          <Stack>
            <Title>
              {
                sCandidate.value.find(
                  (v) => Number(v.id) == Number(sSelectedCandidate.value)
                )?.name
              }
            </Title>
            <Title order={3}>{sSelectedDate.value}</Title>
          </Stack>

          <Group>
            <Stack
              spacing={"md"}
              p={"md"}
              sx={{ zIndex: 0, position: "relative" }}
            >
              <NumberInput
                value={l_batas_atas.value!}
                placeholder="batas atas"
                onChange={(val) => {
                  if (val) l_batas_atas.value = val;
                }}
              />
              <NumberInput
                value={l_batas_bawah.value!}
                placeholder="batas bawah"
                onChange={(val) => {
                  if (val) l_batas_bawah.value = val;
                }}
              />
              <Button onClick={onProccessData} w={150} compact>
                PROCCESS
              </Button>
            </Stack>
          </Group>
          {/* {JSON.stringify(l_hasil_data_kab.value)} */}
          {l_hasil_data_kab.value && <TableView />}
        </Stack>
      </Modal>
    </>
  );
}

function TableView() {
  function onSave() {
    fetch(api.apiDevDevDataValueRandomUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(l_hasil_data_kab.value),
    }).then(async (v) => {
      if (v.status == 201) {
        const data = await v.json();
        toast("success");
        funLoadMapData();
      }
    });
  }
  return (
    <>
      <Stack w={"100%"}>
        <Title order={3}>Table</Title>
        <Group position="right">
          <Button onClick={onSave} compact>
            {" "}
            save
          </Button>
        </Group>
        <Table>
          <thead>
            <tr>
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
            {l_hasil_data_kab.value &&
              l_hasil_data_kab.value.map((v: any, i: any) => (
                <tr key={i}>
                  <td>{v.City.name}</td>
                  <th>
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
                  </th>
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
      </Stack>
    </>
  );
}
