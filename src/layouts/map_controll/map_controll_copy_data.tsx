import { slistCandidate } from "@/s_state/s_list_candidate";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { stylesRadial } from "@/styles/styles_radial";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Menu,
  Modal,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import toast from "react-simple-toasts";

const sSelectedCopyCandidate = signal("");
const l_isLoading = signal(false);

export function MapControllCopyData() {
  const [openCopyData, setCopyData] = useDisclosure(false);
  const [selectedDateCopyData, setSelectedDateCopyData] = useState<string>("");

  return (
    <>
      <Menu opened={openCopyData} radius={"xs"} shadow="10">
        <Menu.Target>
          <Button w={150} onClick={setCopyData.open} compact>
            copy data
          </Button>
        </Menu.Target>
        <Menu.Dropdown
        bg={stylesRadial.out_blue}
          sx={{
            borderRadius: "10px",
            boxShadow: "5px 10px 20px gray ",
          }}
        >
          <Stack p={"md"}>
            {/* header title popup */}
            <Flex justify={"space-between"}>
              <Title order={3} color="gray">
                Copy Data
              </Title>
              <ActionIcon
                variant="outline"
                size={24}
                onClick={setCopyData.close}
                radius={100}
                bg={"red"}
              >
                <MdClose size={24} />
              </ActionIcon>
            </Flex>
            <Text fz={12} p={"xs"} bg={"yellow.1"} c={"gray"} fs={"oblique"}>
              - pastikan select tanggal (from) yang terdapat datanya terlebih
              dahulu <br />
              - tanggal secara defaultnya adalah tanggal 2023-03-16 <br />
              - select candidate yang diinginkan untuk mengcopy <br />- biarkan
              kosong atau select all untuk mengcopy semua candidate <br />
            </Text>
            <Select
              onChange={(val) => {
                if (val) {
                  sSelectedCopyCandidate.value = val;
                }
              }}
              placeholder="select candidate"
              data={[
                ...[
                  {
                    label: "All Candidate",
                    value: "",
                  },
                ],
                ...slistCandidate.value.map((v) => ({
                  label: v.name,
                  value: v.id,
                })),
              ]}
            />
            <Flex direction={"row"} justify={"space-between"}>
              <DatePicker
                p={"md"}
                minDate={new Date("2023-03-16")}
                onChange={(val) => {
                  if (val) {
                    setSelectedDateCopyData(moment(val).format("YYYY-MM-DD"));
                  }
                }}
              />
              <Stack spacing={"lg"} p={"md"}>
                <Text fz={12} fw={"bold"} c={"gray"}>
                  From
                </Text>
                <Title order={5} p={"xs"} bg={"gray.1"}>
                  {sSelectedDate.value}
                </Title>
                <Text fz={12} fw={"bold"} c={"gray"}>
                  To
                </Text>
                <Title order={5} p={"xs"} bg={"gray.1"}>
                  {!_.isEmpty(selectedDateCopyData) && selectedDateCopyData}
                </Title>

                {!_.isEmpty(selectedDateCopyData) &&
                  moment(selectedDateCopyData).diff(
                    moment(sSelectedDate.value),
                    "days"
                  ) > 0 && (
                    <Button
                      disabled={l_isLoading.value}
                      compact
                      onClick={async () => {
                        l_isLoading.value = true;
                        const res = await fetch(
                          `/api/copy-data?from=${sSelectedDate.value}&to=${selectedDateCopyData}&candidateId=${sSelectedCopyCandidate.value}`,
                          {
                            method: "POST",
                          }
                        );

                        if (res.status != 201) return toast("error");
                        l_isLoading.value = false;
                        toast("success");
                      }}
                    >
                      Proccess
                    </Button>
                  )}
              </Stack>
            </Flex>
            <Text fz={12} fs={"initial"} p={"xs"} bg={"red.1"}>
              * PERINGATAN ! proses ini bisa menimpa data target
            </Text>
            <Group position="right">
                      <Button compact onClick={setCopyData.close} bg={"orange"}> cansel</Button>
            </Group>
          </Stack>
        </Menu.Dropdown>
      </Menu>

      {/* <Modal opened={openCopyData} onClose={setCopyData.close}>
          
        </Modal> */}
    </>
  );
}
