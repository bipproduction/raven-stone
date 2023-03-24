import { funLoadMapData } from "@/fun_load/func_load_map_data";
import { gSelectedCandidate, gSelectedDate } from "@/g_state/g_map_state";
import { gProvince } from "@/g_state/g_province";
import { api } from "@/lib/api";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdWeb } from "react-icons/md";
import toast from "react-simple-toasts";

const listEmotion = [
  { name: "Trust", value: 0, isChecked: false },
  { name: "Joy", value: 0, isChecked: false },
  { name: "Surprise", value: 0, isChecked: false },
  { name: "Anticipation", value: 0, isChecked: false },
  { name: "Sadness", value: 0, isChecked: false },
  { name: "Fear", value: 0, isChecked: false },
  { name: "Anger", value: 0, isChecked: false },
  { name: "Disgust", value: 0, isChecked: false },
];

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

const ButtonAjustByProvince = () => {
  const [open, setOpren] = useDisclosure(false);
  const [lisData, setListData] = useState<any[]>([]);

  const [lsEmotion, setlsEmotion] = useState(listEmotion);
  const [selectedProvince, setSelectedProvince] = useState<number>();

  return (
    <>
      <Stack>
        {/* {gSelectedDate.value.toString()} */}
        <Button leftIcon={<MdWeb />} compact onClick={setOpren.open}>
          Ajust By Province
        </Button>
      </Stack>
      <Modal
        opened={open}
        onClose={setOpren.close}
        size={"lg"}
        title={"ajust by province"}
      >
        <Stack>
          <Select
            searchable
            label={"select province"}
            placeholder={
              selectedProvince &&
              gProvince.value.find((v) => v.id == selectedProvince).name
            }
            onChange={(val) => setSelectedProvince(Number(val))}
            dropdownPosition="bottom"
            data={gProvince.value.map((v) => ({
              label: v.name,
              value: v.id,
            }))}
          />
          <SimpleGrid cols={2}>
            {lsEmotion.map((v) => (
              <Box
                key={v.name}
                p={"xs"}
                bg={listEmotionColor.find((c) => c.name == v.name)?.color}
              >
                <Group>
                  <Checkbox
                    checked={v.isChecked}
                    onChange={(val) => {
                      lsEmotion.forEach((v2) => {
                        if (v.name === v2.name) {
                          v2.isChecked = !v2.isChecked;
                        } else {
                          v2.isChecked = false;
                        }
                      });

                      setlsEmotion([...lsEmotion]);
                    }}
                  />
                  <Text fw={"bold"} c={"white"}>
                    {v.name}
                  </Text>
                </Group>
              </Box>
            ))}
          </SimpleGrid>
          <Group position="right">
            <Button
              onClick={() => {
                const dataSelect = lsEmotion.filter((v) => v.isChecked);
                const dataNotSelect = _.shuffle(
                  lsEmotion.filter((v) => !v.isChecked)
                );

                if (!selectedProvince || !gSelectedDate.value)
                  return toast("select date and province");
                const candidate = gSelectedCandidate.value;
                fetch(
                  api.apiUtilGetDataByProvinceidCandidateidDate +
                    `?provinceid=${selectedProvince}&candidateid=${gSelectedCandidate.value}&date=${gSelectedDate.value}&`
                )
                  .then((v) => v.json())
                  .then((v) => {
                    for (let itm of v) {
                      const hasilData = funHitung(
                        dataSelect,
                        dataNotSelect
                      ) as any[];
                      const kv = Object.keys(itm);
                      kv.forEach((v2) => {
                        const getData = hasilData.find(
                          (v3) => _.lowerCase(v3.name) === _.lowerCase(v2)
                        );

                        if (getData) {
                          itm[v2] = getData.value;
                        }
                      });
                    }

                    fetch(api.apiUtilUpdateDataByProvince, {
                      method: "POST",
                      body: JSON.stringify(v),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }).then((res) => {
                      if (res.status == 201) {
                        toast("success");
                        funLoadMapData();
                      }
                    });
                  });
              }}
            >
              Proccess
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

const funHitung = (dataSelect: any, dataNotSelect: any) => {
  if (dataSelect.length > 1) return toast("only one can be increase");
  dataSelect[0].value = _.random(80, 50);
  let total = 100 - dataSelect[0].value;

  for (let i = 0; i < dataNotSelect.length; i++) {
    if (i < dataNotSelect.length - 1) {
      dataNotSelect[i].value = _.random(Math.floor(total / 2)) + 1;
      total = total - dataNotSelect[i].value;
    } else {
      dataNotSelect[i].value = total;
    }
  }

  const hasil = [...dataNotSelect, ...dataSelect];

  return hasil;
};

export default ButtonAjustByProvince;
