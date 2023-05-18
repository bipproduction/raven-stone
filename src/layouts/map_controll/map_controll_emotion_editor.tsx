import { funLoadMapData } from "@/fun_load/func_load_map_data";
import { api } from "@/lib/api";
import { slistCandidate } from "@/s_state/s_list_candidate";
import { sListKabupaten } from "@/s_state/s_list_kabupaten";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import {
  ActionIcon,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Indicator,
  Loader,
  Menu,
  NumberInput,
  Pagination,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker, DateValue } from "@mantine/dates";
import {
  useForceUpdate,
  useId,
  useScrollIntoView,
  useShallowEffect,
  useWindowScroll,
} from "@mantine/hooks";
import { Empty, TourProps } from "antd";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import {
  MdAccountCircle,
  MdClose,
  MdDownload,
  MdEdit,
  MdSave,
  MdSearch,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";
import { MapControllMapView } from "./map_controll_map_view";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { MapControllCopyData } from "./map_controll_copy_data";
import { signal } from "@preact/signals-react";
import MapControllContextDirection from "./map_controll_context_direction";
import { stylesRadial } from "@/styles/styles_radial";
import MapControllLeaderPersonaPrediction from "./map_controll_leader_persona_prediction";
import { sMapControllEditorVal } from "@/s_state/s_map_controll_editor_val";
import toast from "react-simple-toasts";
import { useRouter } from "next/router";
import MapControllWorCloud from "./map_controll_word_cloud";
import { stylesNeon } from "@/styles/styles_neon";
import { MapControllRandomEmotion } from "./map_controll_random_emotion";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai/react";
import {
  mc_list_candidate,
  mc_selected_candidate,
  mc_selected_tool,
} from "./map_controll_state";
import MapControllDownloadContent from "./map_controll_download_content";
import Link from "next/link";
import MapControllInjectData from "./map_controll_inject_data";
import { MapControllEmotionDownload } from "./map_controll_emotion_download";

const colors = {
  green: "#bbe4b3",
  gray: "#d9d9d9",
  pink: "#cc6c7c",
};

// const mapControllEditorVal = signal<any | undefined>(undefined);
const listTable = signal<any[]>([]);
const currentPage = signal<number>(1);
var perPage = 15;
var awal=0;

const SelectCandidate = () => {
  //   useShallowEffect(() => {
  //     const mapEditorVal = localStorage.getItem("map_editor_val");
  //     if (mapEditorVal) {
  //       sMapControllEditorVal.value = JSON.parse(mapEditorVal);
  //     }
  //   });
  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate);
  const [selectedCandidate, setSelectedCandidate] = useAtom(
    mc_selected_candidate
  );

  useShallowEffect(() => {
    fetch(api.apiGetCandidate)
      .then((v) => v.json())
      .then(setListCandidate);
  }, []);

  if (_.isEmpty(listCandidate)) return <Loader />;

  return (
    <>
      <Stack>
        <Box>
          <Select
            icon={<MdAccountCircle />}
            radius={100}
            searchable
            key={"1"}
            // label={"select candidate"}
            value={selectedCandidate}
            placeholder={
              listCandidate!.find((v) => v.id == selectedCandidate).name
            }
            data={listCandidate!.map((v) => ({
              label: v.name,
              value: v.id,
            }))}
            onChange={(val) => {
              sMapControllEditorVal.value = undefined;
              localStorage.removeItem("map_editor_val");
              if (val) {
                // sSelectedCandidate.set(val!);
                sSelectedCandidate.value = val;
                setSelectedCandidate(val);
                funLoadMapData();
              }
            }}
          />
        </Box>
      </Stack>
    </>
  );
};

function onPageChange(val: number) {
  const listKab = _.clone(sListKabupaten.value);
  listKab.forEach((v) => {
    if (!v.isSelected) {
      v.isSelected = false;
    }
  });
  // setCurrentPage(val);
  currentPage.value = val;
  const first = (val - 1) * perPage;
  const end = val * perPage;
  const listData = listKab.slice(first, end);
  awal=first;

  // setlistTable(listData);
  listTable.value = listData;
}

const listToolMenus = [
  {
    id: "copy_data",
    title: "copy data",
  },
  {
    id: "random_emotion",
    title: "random emotion",
  },
];

export function MapControllEmotionEditor() {
  const [selectedTool, setSelectedTool] = useAtom(mc_selected_tool);

  const step: TourProps["steps"] = [];

  useShallowEffect(() => {
    if (sListKabupaten.value) {
      // const first = (currentPage - 1) * perPage;
      // const end = currentPage * perPage;
      // const listData = sListKabupaten.value.slice(first, end);
      // setlistTable(listData);
      onPageChange(1);
    }
  }, [sListKabupaten.value]);

  const onSearch = (val: AutocompleteItem) => {
    if (!_.isEmpty(val.value)) {
      const lsData = sListKabupaten.value.filter((v) =>
        _.lowerCase(v.City.name).includes(_.lowerCase(val.value))
      );
      //   setlistTable(lsData);
      listTable.value = lsData;
    } else {
      onPageChange(1);
    }
  };

  // const onUpdateData = async (body: any) => {
  //   fetch(api.apiDevDevDataValueUpdate, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   }).then((res) => {
  //     if (res.status === 201) {
  //       funLoadMapData();
  //     }
  //   });
  // };

  const onDateChange = (val: DateValue) => {
    sMapControllEditorVal.value = undefined;
    localStorage.removeItem("map_editor_val");
    if (val) {
      // sSelectedDate.set(moment(val).format("YYYY-MM-DD"));
      sSelectedDate.value = moment(val).format("YYYY-MM-DD");
      // toast("success");
      funLoadMapData();
    }
  };

  return (
    <>
      <Stack>
        <Box
          p={"xs"}
          pos={"sticky"}
          top={0}
          // bg={"dark"}
          style={{
            zIndex: 200,
          }}
        >
          <Flex gap={"lg"}>
            <Text
              // c={"white"}
              fw={"bold"}
            >
              Map Controll
            </Text>
            <Menu>
              <Menu.Target>
                <Button
                  // bg={"dark"}
                  compact
                >
                  Tools
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {listToolMenus.map((v) => (
                  <Menu.Item onClick={() => setSelectedTool(v.id)} key={v.id}>
                    {v.title}
                  </Menu.Item>
                ))}
                {/* <Stack spacing={"xs"}>
                  <MapControllCopyData />
                  <MapControllRandomEmotion listKab={sListKabupaten.value} />
                </Stack> */}
              </Menu.Dropdown>
            </Menu>
            <MapControllInjectData bg="" />
          </Flex>
        </Box>
        <MapControllCopyData />
        <MapControllRandomEmotion listKab={sListKabupaten.value} />
        <Stack>
          <Paper
            p={"md"}
            // bg={stylesGradient1}
          >
            <Stack>
              <Flex>
                <Stack>
                  <Stack p={"xs"}>
                    <Paper
                      radius={8}
                      p={"xs"}
                      // bg={stylesRadial.out_cyan}
                      shadow="md"
                    >
                      <DatePicker
                        onChange={onDateChange}
                        value={new Date(sSelectedDate.value)}
                        renderDay={(date) => {
                          const day = new Date();
                          return (
                            <>
                              {day.getDate() == date.getDate() ? (
                                <Avatar radius={100}>
                                  <Title order={3}>{date.getDate()}</Title>
                                </Avatar>
                              ) : (
                                <Title order={3}>{date.getDate()}</Title>
                              )}
                            </>
                          );
                        }}
                      />
                    </Paper>
                    <Paper
                      shadow="md"
                      radius={8}
                      p={"xs"}
                      // bg={"cyan.2"}
                    >
                      <Stack>
                        <SelectCandidate />
                        <Autocomplete
                          radius={100}
                          placeholder="search"
                          onItemSubmit={onSearch}
                          icon={<MdSearch />}
                          rightSection={
                            <ActionIcon onClick={() => onPageChange(1)}>
                              <MdClose />
                            </ActionIcon>
                          }
                          data={sListKabupaten.value.map((v) => v.City.name)}
                        />
                      </Stack>
                    </Paper>
                  </Stack>
                </Stack>
                <MapControllEmotionDownload />
                <Stack w={"100%"}>
                  {/* <Title>Emotion Editor</Title> */}
                  <MapControllMapView />
                </Stack>
              </Flex>

              {/* <MapControllDownloadContent /> */}
              {/* <SimpleGrid cols={2}>
                <Paper p={"xs"} radius={8} shadow="md" bg={"cyan.2"}>
                  {!_.isEmpty(sListKabupaten.value) && (
                    <Stack align="start">
                      <Title color="gray" order={3}>
                        {moment(sSelectedDate.value).format("DD-MM-YYYY")}
                      </Title>
                      <MapControllCopyData />
                      <MapControllRandomEmotion
                        listKab={sListKabupaten.value}
                      />
                    </Stack>
                  )}
                </Paper>
                <Paper shadow="md" radius={8} p={"xs"} bg={"cyan.2"}>
                  <Stack>
                    <SelectCandidate />
                    <Autocomplete
                      radius={100}
                      placeholder="search"
                      onItemSubmit={onSearch}
                      icon={<MdSearch />}
                      rightSection={
                        <ActionIcon onClick={() => onPageChange(1)}>
                          <MdClose />
                        </ActionIcon>
                      }
                      data={sListKabupaten.value.map((v) => v.City.name)}
                    />
                  </Stack>
                </Paper>
              </SimpleGrid> */}
            </Stack>
          </Paper>
        </Stack>

        <TableView />
        {sMapControllEditorVal.value != undefined && <EditorActionView />}
      </Stack>
    </>
  );
}

function TableView() {
  const [scroll, scrollTo] = useWindowScroll();
  const router = useRouter();
  const id = useId("table-view");
  return (
    <>
      <Table w={"100%"} highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr
            style={{
              // backgroundColor: "white",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
          >
            <th>
              <Title order={5}></Title>
            </th>
            <th>
              <Title order={5}>No</Title>
            </th>
            <th>
              <Title order={5}>City</Title>
            </th>
            <th>
              <Title order={5}>Estimation</Title>
            </th>
            <th>
              <Title order={5}>Total</Title>
            </th>
            <th
              style={{
                backgroundColor: "green",
              }}
            >
              <Title c={"white"} order={5}>
                trust
              </Title>
            </th>
            <th
              style={{
                backgroundColor: "green",
              }}
            >
              <Title c={"white"} order={5}>
                joy
              </Title>
            </th>
            <th
              style={{
                backgroundColor: "green",
              }}
            >
              <Title c={"white"} order={5}>
                surprise
              </Title>
            </th>
            <th
              style={{
                backgroundColor: "gray",
              }}
            >
              <Title c={"white"} order={5}>
                anticipation
              </Title>
            </th>
            <th
              style={{
                backgroundColor: "red",
              }}
            >
              <Title c={"white"} order={5}>
                sadness
              </Title>
            </th>
            <th
              style={{
                backgroundColor: "red",
              }}
            >
              <Title c={"white"} order={5}>
                fear
              </Title>
            </th>
            <th
              style={{
                backgroundColor: "red",
              }}
            >
              <Title c={"white"} order={5}>
                anger
              </Title>
            </th>
            <th
              style={{
                backgroundColor: "red",
              }}
            >
              <Title c={"white"} order={5}>
                disgust
              </Title>
            </th>
          </tr>
        </thead>
        <tbody>
          {listTable.value.map((v, i) => (
            <tr
              key={i}
              // style={{
              //   backgroundColor:
              //     sMapControllEditorVal.value &&
              //     sMapControllEditorVal.value.id == v.id
              //       ? "lightblue"
              //       : "white",
              // }}
            >
              <td>
                <Flex>
                  <ActionIcon
                    size={24}
                    bg={v.isSelected ? "orange.1" : ""}
                    onClick={() => {
                      router.push("#" + id);
                      localStorage.setItem("map_editor_val", JSON.stringify(v));
                      sMapControllEditorVal.value = v;
                    }}
                  >
                    <MdEdit size={24} />
                  </ActionIcon>
                  {v.isSelected && (
                    <ActionIcon
                      size={24}
                      onClick={() => {
                        // onUpdateData(v);
                      }}
                    >
                      <MdSave size={24} />
                    </ActionIcon>
                  )}
                </Flex>
              </td>
              <td>{awal + i + 1}</td>
              {/* <td>{v.id}</td> */}
              <td width={200}>{v.City.name}</td>
              <td>
                {Intl.NumberFormat("id-ID").format(v.City.CityValue[0].value)}
              </td>
              <td>
                {Intl.NumberFormat("id-ID").format(
                  _.sum([
                    v.trust,
                    v.joy,
                    v.surprise,
                    v.anticipation,
                    v.sadness,
                    v.fear,
                    v.anger,
                    v.disgust,
                  ])
                )}
              </td>
              {/* <td
                    onClick={() => {
                      v.isSelected = true;
                      update();
                    }}
                  >
                    {v.isSelected ? <TextInput placeholder={v.trust} /> : v.trust}
                  </td> */}

              {/* // todo : edit table disini */}
              <td
                style={{
                  backgroundColor: "green",
                }}
              >
                <Text c={"white"}>
                  {Intl.NumberFormat("id-ID").format(v.trust)}
                </Text>
              </td>
              <td
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                <Text>{Intl.NumberFormat("id-ID").format(v.joy)}</Text>
              </td>
              <td
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                <Text>{Intl.NumberFormat("id-ID").format(v.surprise)}</Text>
              </td>
              <td
                style={{
                  backgroundColor: "gray",
                  color: "white",
                }}
              >
                <Text>{Intl.NumberFormat("id-ID").format(v.anticipation)}</Text>
              </td>
              <td
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                <Text>{Intl.NumberFormat("id-ID").format(v.sadness)}</Text>
              </td>
              <td
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                <Text>{Intl.NumberFormat("id-ID").format(v.fear)}</Text>
              </td>
              <td
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                <Text>{Intl.NumberFormat("id-ID").format(v.anger)}</Text>
              </td>
              <td
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                <Text>{Intl.NumberFormat("id-ID").format(v.disgust)}</Text>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paper p={"xs"} mt={"xs"}>
        <Group position="apart">
          <Pagination
            total={_.ceil(sListKabupaten.value.length / 15)}
            onChange={onPageChange}
          />
        </Group>
      </Paper>
      <Box id={id}></Box>
    </>
  );
}

const listEmotion = [
  { name: "trust" },
  { name: "joy" },
  { name: "surprise" },
  { name: "anticipation" },
  { name: "sadness" },
  { name: "fear" },
  { name: "anger" },
  { name: "disgust" },
];

function EditorActionView() {
  async function onSave() {
    const dataBody = _.omit(sMapControllEditorVal.value, [
      "City",
      "isSelected",
    ]);
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
  }
  return (
    <>
      {/* {JSON.stringify(sMapControllEditorVal.value)} */}
      <Flex gap={"md"} align={"center"} p={"md"}>
        {/* <ActionIcon
          variant="outline"
          size={32}
          color="red"
          radius={100}
          onClick={() => {
            localStorage.removeItem("map_editor_val");
            sMapControllEditorVal.value = undefined;
          }}
        >
          <MdClose size={32} />
        </ActionIcon> */}
        <Title>{sMapControllEditorVal.value.City.name}</Title>
      </Flex>
      <Paper
        p={"md"}
        m={"md"}
        // bg={"blue.1"}
        shadow="md"
      >
        <Stack>
          <Title>EMOTION EDITOR</Title>
          <Group spacing={"md"}>
            <NumberInput
              label={"trust"}
              //   value={sMapControllEditorVal.value.trust}
              onChange={(val) => {
                sMapControllEditorVal.value.trust = val;
                sMapControllEditorVal.value = _.clone(
                  sMapControllEditorVal.value
                );
              }}
              w={150}
              placeholder={sMapControllEditorVal.value.trust}
              min={0}
            />
            <NumberInput
              label={"joy"}
              //   value={sMapControllEditorVal.value.joy}
              onChange={(val) => {
                sMapControllEditorVal.value.joy = val;
                sMapControllEditorVal.value = _.clone(
                  sMapControllEditorVal.value
                );
              }}
              w={150}
              placeholder={sMapControllEditorVal.value.joy}
              min={0}
            />
            <NumberInput
              label={"surprise"}
              //   value={sMapControllEditorVal.value.surprise}
              onChange={(val) => {
                sMapControllEditorVal.value.surprise = val;
                sMapControllEditorVal.value = _.clone(
                  sMapControllEditorVal.value
                );
              }}
              w={150}
              placeholder={sMapControllEditorVal.value.surprise}
              min={0}
            />
            <NumberInput
              label={"anticipation"}
              //   value={sMapControllEditorVal.value.anticipation}
              onChange={(val) => {
                sMapControllEditorVal.value.anticipation = val;
                sMapControllEditorVal.value = _.clone(
                  sMapControllEditorVal.value
                );
              }}
              w={150}
              placeholder={sMapControllEditorVal.value.anticipation}
              min={0}
            />
            <NumberInput
              label={"sadness"}
              //   value={sMapControllEditorVal.value.sadness}
              onChange={(val) => {
                sMapControllEditorVal.value.sadness = val;
                sMapControllEditorVal.value = _.clone(
                  sMapControllEditorVal.value
                );
              }}
              w={150}
              placeholder={sMapControllEditorVal.value.sadness}
              min={0}
            />
            <NumberInput
              label={"fear"}
              //   value={sMapControllEditorVal.value.fear}
              onChange={(val) => {
                sMapControllEditorVal.value.fear = val;
                sMapControllEditorVal.value = _.clone(
                  sMapControllEditorVal.value
                );
              }}
              w={150}
              placeholder={sMapControllEditorVal.value.fear}
              min={0}
            />
            <NumberInput
              label={"anger"}
              //   value={sMapControllEditorVal.value.anger}
              onChange={(val) => {
                sMapControllEditorVal.value.anger = val;
                sMapControllEditorVal.value = _.clone(
                  sMapControllEditorVal.value
                );
              }}
              w={150}
              placeholder={sMapControllEditorVal.value.anger}
              min={0}
            />
            <NumberInput
              label={"disgust"}
              //   value={sMapControllEditorVal.value.disgust}
              onChange={(val) => {
                sMapControllEditorVal.value.disgust = val;
                sMapControllEditorVal.value = _.clone(
                  sMapControllEditorVal.value
                );
              }}
              w={150}
              placeholder={sMapControllEditorVal.value.disgust}
              min={0}
            />
          </Group>
          <Group position="right">
            <Button w={150} compact onClick={onSave}>
              Save
            </Button>
          </Group>
        </Stack>
      </Paper>
      <MapControllContextDirection dataKab={sMapControllEditorVal.value} />
      <MapControllLeaderPersonaPrediction />
      <MapControllWorCloud dataKab={sMapControllEditorVal.value} />
    </>
  );
}
