import { sCandidate } from "@/s_state/s_candidate";
import { slistCandidate } from "@/s_state/s_list_candidate";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { stylesRadial } from "@/styles/styles_radial";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Modal,
  NavLink,
  Radio,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { useAtom } from "jotai/react";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import toast from "react-simple-toasts";
import { mc_list_candidate, mc_selected_tool } from "../map_controll_state";
import { atom } from "jotai";
import { MapControllSelectCandidate } from "../map_controll_select_candidate";
import { api } from "@/lib/api";
import { fun_check_copy_data_count } from "../fun/fun_check_copy_data_count";
import { funUserLogWrite } from "@/layouts/dev_dashboard/user_log/fun/fun_write";

// const sSelectedCopyCandidate = signal("");
const l_isLoading = signal(false);
const _selectectedCandidate = atom<string>("1");

export function MapControllCopyData() {
  // const [openCopyData, setCopyData] = useDisclosure(false);
  // const [selectedDateCopyData, setSelectedDateCopyData] = useState<string>("");
  const [selectedTool, setSelectedTool] = useAtom(mc_selected_tool);
  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate);
  const [selectedCandidate, setSelectedCandidate] = useState("1");
  const [selectedCandidateOther, setSellectedCandidateOther] = useState("1");
  const [dateFrom, setDateFrom] = useState(moment().format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState<string | undefined>();
  const [listData, setListData] = useState<any[] | undefined>(undefined);
  const [typeAction, setTyleAction] = useState("all");

  async function onLoadData() {
    const resNamaKabupaten = await fetch(
      `/api/get-data-by-candidate?candidateId=${selectedCandidate}&date=${dateFrom}`
    );

    if (resNamaKabupaten.status != 200)
      return console.log("error get nama kabupaten");
    const datanya = await resNamaKabupaten.json();

    if (datanya && !_.isEmpty(datanya)) {
      return setListData(datanya);
    }

    setListData(undefined);
    setDateTo(undefined);
    toast("data tidak ditemukan");
    // setlistHasilRandom(undefined);
    // setListEmotion(undefined);
  }

  function onProccess() {
    const data = {
      typeAction: typeAction,
      selectedCandidate: selectedCandidate,
      selectedCandidateOther: selectedCandidateOther,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };

    fetch(api.apiCopyData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 201) {
        return toast("data berhasil di copy");
      }

      return toast("data gagal di copy");
    });

    funUserLogWrite({
      title: "copy data",
      detail: "copy data",
    });
  }

  function onResetAll() {
    setListData(undefined);
    setDateTo(undefined);
    setDateFrom("");
  }

  return (
    <>
      {/* <Stack>
        <NavLink label={"Copy Data"} onClick={setCopyData.open} w={150} />
      </Stack> */}

      <Modal
        opened={selectedTool == "copy_data" ? true : false}
        // title="Copy Data"
        onClose={() => {
          setSelectedTool("");
          onResetAll();
        }}
        size={"xl"}
        closeOnClickOutside={false}
      >
        <Stack p={"md"}>
          <Flex justify={"space-between"}>
            <Title
              order={3}
              // color="gray"
            >
              Copy Data
            </Title>
            {/* <ActionIcon
              variant="outline"
              size={24}
              onClick={setCopyData.close}
              radius={100}
              bg={"red"}
            >
              <MdClose size={24} />
            </ActionIcon> */}
          </Flex>
          {/* <Text
            fz={12}
            p={"xs"}
            // bg={"yellow.1"}
            //  c={"gray"}
            fs={"oblique"}
          >
            - pastikan select tanggal (from) yang terdapat datanya terlebih
            dahulu <br />
            - tanggal secara defaultnya adalah tanggal 2023-03-16 <br />
            - select candidate yang diinginkan untuk mengcopy <br />- biarkan
            kosong atau select all untuk mengcopy semua candidate <br />
          </Text> */}
          <Text
            fz={12}
            fs={"initial"}
            p={"xs"}
            // bg={"red.1"}
          >
            * PERINGATAN ! proses ini bisa menimpa data target
          </Text>
          <Box
            p={"xs"}
            // bg={"gray.1"}
          >
            <MapControllSelectCandidate
              onChange={(val) => {
                setSelectedCandidate(val);
                setListData(undefined);
                setTyleAction("all");
                setDateTo(undefined);
              }}
            />
          </Box>
          {/* <Select
            onChange={(val) => {
              if (val) {
                setSelectedCandidate(val);
              }
            }}
            placeholder={
              sCandidate.value.find(
                (v) => Number(v.id) == Number(sSelectedDate)
              )?.name
            }
            data={[
              ...[
                {
                  label: "All Candidate",
                  value: "",
                },
              ],
              ...listCandidate.map((v) => ({
                label: v.name,
                value: v.id,
              })),
            ]}
          /> */}
          <Flex
            direction={"row"}
            justify={"space-between"}
            p={"xs"}
            // bg={"gray.1"}
          >
            <Stack spacing={0}>
              <Title order={3}>From</Title>
              <DatePicker
                minDate={new Date("2023-03-16")}
                // maxDate={new Date(moment().format("YYYY-MM-DD"))}
                value={new Date(dateFrom)}
                onChange={(val) => {
                  if (val) {
                    setDateFrom(moment(val).format("YYYY-MM-DD"));
                  }
                }}
              />
              {/* <Title p={"xs"} color="gray">
                {sSelectedDate.value}
              </Title> */}
              <Button onClick={onLoadData}>Check</Button>
            </Stack>
            <Stack spacing={0}>
              <Title c={"gray"} order={3}>
                To
              </Title>
              {listData && (
                <DatePicker
                  // value={new Date(dateTo ?? new Date())}
                  minDate={
                    new Date(
                      moment(dateFrom).add(1, "days").format("YYYY-MM-DD")
                    )
                  }
                  // maxDate={new Date(moment().format("YYYY-MM-DD"))}
                  onChange={async (val) => {
                    if (val) {
                      // setSelectedDateCopyData(moment(val).format("YYYY-MM-DD"));
                      // const check = await fetch(
                      //   api.apiMapControllCopyDataCheckCount +
                      //     "?date=" +
                      //     moment(val).format("YYYY-MM-DD")
                      // );
                      const data = await fun_check_copy_data_count({ val });
                      if (data) {
                        // setListData(undefined);
                        setDateTo(undefined);
                        return toast("tanggal berikut sudah terdapat data");
                      }

                      toast("ok lanjutkan");
                      setDateTo(moment(val).format("YYYY-MM-DD"));
                    }
                  }}
                />
              )}
            </Stack>
            {/* <Stack spacing={"lg"} p={"md"}>
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
                        `/api/copy-data?from=${sSelectedDate.value}&to=${selectedDateCopyData}&candidateId=${selectedCandidate}`,
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
            </Stack> */}
          </Flex>

          {/* <Group position="right">
            <Button compact onClick={setCopyData.close} bg={"orange"}>
              {" "}
              cansel
            </Button>
          </Group> */}
          {dateTo && (
            <Stack>
              <Text
                p={"xs"}
                // bg={"green.1"}
                // c={"gray"}
                fs={"italic"}
              >
                - all candidate , mengambil semua data kandidate ditanggal
                tersebut, jika ada kandidate kosong maka yang di transfer akan
                kosong juga ditanggal yang berbeda <br />
                - selected candidate, copy dari target kandidat ke kandidat yang
                sama tanggal berbeda <br />
                - other, copy dari satu kandidat ke kandidat lainnya , di
                tanggal yang berbeda <br />- one for all, copy dari satu
                kandidat ke semua kandidat ditanggal yang berbeda
              </Text>
              <Group
                position="apart"
                p={"xs"}
                // bg={"gray.1"}
              >
                <Stack>
                  <Radio.Group
                    onChange={setTyleAction}
                    value={typeAction}
                    description={
                      typeAction == "all"
                        ? ""
                        : listCandidate?.find(
                            (v) => Number(v.id) == Number(selectedCandidate)
                          ).name
                    }
                  >
                    <Group>
                      <Radio label={"all candidate"} value={"all"} />
                      <Radio label={"selected candidate"} value={"selected"} />
                      <Radio label={"other"} value={"other"} />
                      <Radio label={"one for all"} value={"one_for_all"} />
                    </Group>
                  </Radio.Group>
                  {typeAction == "other" && (
                    <Select
                      label={"select other candidate"}
                      placeholder={
                        listCandidate?.find(
                          (v) => Number(v.id) == Number(selectedCandidateOther)
                        ).name
                      }
                      onChange={(val) => {
                        if (val) {
                          setSellectedCandidateOther(val);
                        }
                      }}
                      data={
                        listCandidate?.map((v) => ({
                          label: v.name,
                          value: v.id,
                        })) as any
                      }
                    />
                  )}
                </Stack>
                <Button onClick={onProccess}>PROCCESS</Button>
              </Group>
            </Stack>
          )}
        </Stack>
      </Modal>
      {/* <Menu opened={openCopyData} radius={"xs"} shadow="10">
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
              placeholder={sCandidate.value.find((v) => Number(v.id) == Number(sSelectedCopyCandidate.value))?.name}
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
                minDate={new Date(moment(sSelectedDate.value).add(1, "days").format("YYYY-MM-DD"))}
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
      </Menu> */}
    </>
  );
}
