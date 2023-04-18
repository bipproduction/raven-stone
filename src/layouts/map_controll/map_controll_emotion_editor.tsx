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
  Box,
  Flex,
  Group,
  Loader,
  NumberInput,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker, DateValue } from "@mantine/dates";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
import { Empty } from "antd";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { MdClose, MdEdit, MdSave, MdSearch } from "react-icons/md";
import { MapControllMapView } from "./map_controll_map_view";
import { stylesGradient1 } from "@/styles/styles_gradient_1";

const colors = {
  green: "#bbe4b3",
  gray: "#d9d9d9",
  pink: "#cc6c7c",
};

const SelectCandidate = () => {
  if (_.isEmpty(slistCandidate.value)) return <Loader />;
  return (
    <>
      <Box>
        <Select
          searchable
          key={"1"}
          // label={"select candidate"}
          value={sSelectedCandidate.value}
          placeholder={
            slistCandidate.value.find((v) => v.id == sSelectedCandidate.value)
              .name
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
      </Box>
    </>
  );
};

export function MapControllEmotionEditor() {
  const [listTable, setlistTable] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;
  const update = useForceUpdate();

  useShallowEffect(() => {
    if (sListKabupaten.value) {
      // const first = (currentPage - 1) * perPage;
      // const end = currentPage * perPage;
      // const listData = sListKabupaten.value.slice(first, end);
      // setlistTable(listData);
      onPageChange(1);
    }
  }, [sListKabupaten.value]);

  const onPageChange = (val: number) => {
    const listKab = _.clone(sListKabupaten.value);
    listKab.forEach((v) => {
      if (!v.isSelected) {
        v.isSelected = false;
      }
    });
    setCurrentPage(val);
    const first = (val - 1) * perPage;
    const end = val * perPage;
    const listData = listKab.slice(first, end);

    setlistTable(listData);
  };

  const onSearch = (val: AutocompleteItem) => {
    if (!_.isEmpty(val.value)) {
      const lsData = sListKabupaten.value.filter((v) =>
        _.lowerCase(v.City.name).includes(_.lowerCase(val.value))
      );
      setlistTable(lsData);
    } else {
      onPageChange(1);
    }
  };

  const onUpdateData = async (body: any) => {
    fetch(api.apiDevDevDataValueUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.status === 201) {
        funLoadMapData();
      }
    });
  };

  const onDateChange = (val: DateValue) => {
    if (val) {
      // sSelectedDate.set(moment(val).format("YYYY-MM-DD"));
      sSelectedDate.value = moment(val).format("YYYY-MM-DD");
      // toast("success");
      funLoadMapData();
    }
  };

  
  return (
    <>
      <Stack >
        <Stack>
          <Paper p={"md"} bg={stylesGradient1}>
            <Flex>
              <Stack>
                <Box p={"xs"}>
                  <DatePicker onChange={onDateChange} />
                </Box>
                <Stack>
                  <SelectCandidate />
                  <Autocomplete
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
              </Stack>
              <Stack w={"100%"}>
                {/* <Title>Emotion Editor</Title> */}
                <MapControllMapView />
              </Stack>
            </Flex>
          </Paper>
        </Stack>
        <Paper p={"xs"}>
          <Table w={"100%"}>
            <thead>
              <tr
                style={{
                  backgroundColor: "white",
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
                    backgroundColor: colors.green,
                  }}
                >
                  <Title order={5}>trust</Title>
                </th>
                <th
                  style={{
                    backgroundColor: colors.green,
                  }}
                >
                  <Title order={5}>joy</Title>
                </th>
                <th
                  style={{
                    backgroundColor: colors.green,
                  }}
                >
                  <Title order={5}>surprise</Title>
                </th>
                <th
                  style={{
                    backgroundColor: colors.gray,
                  }}
                >
                  <Title order={5}>anticipation</Title>
                </th>
                <th
                  style={{
                    backgroundColor: colors.pink,
                  }}
                >
                  <Title order={5}>sadness</Title>
                </th>
                <th
                  style={{
                    backgroundColor: colors.pink,
                  }}
                >
                  <Title order={5}>fear</Title>
                </th>
                <th
                  style={{
                    backgroundColor: colors.pink,
                  }}
                >
                  <Title order={5}>anger</Title>
                </th>
                <th
                  style={{
                    backgroundColor: colors.pink,
                  }}
                >
                  <Title order={5}>disgust</Title>
                </th>
              </tr>
            </thead>
            <tbody>
              {listTable.map((v, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: v.isSelected ? "lightblue" : "white",
                  }}
                >
                  <td>
                    <Flex>
                      <ActionIcon
                        size={24}
                        bg={v.isSelected ? "orange.1" : ""}
                        onClick={() => {
                          v.isSelected = !v.isSelected;
                          update();
                        }}
                      >
                        <MdEdit size={24} />
                      </ActionIcon>
                      {v.isSelected && (
                        <ActionIcon
                          size={24}
                          onClick={() => {
                            onUpdateData(v);
                          }}
                        >
                          <MdSave size={24} />
                        </ActionIcon>
                      )}
                    </Flex>
                  </td>
                  <td>{i + 1}</td>
                  {/* <td>{v.id}</td> */}
                  <td width={200}>{v.City.name}</td>
                  <td>
                    {Intl.NumberFormat("id-ID").format(
                      v.City.CityValue[0].value
                    )}
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

                  <td
                    style={{
                      backgroundColor: colors.green,
                    }}
                  >
                    {v.isSelected ? (
                      <NumberInput
                        value={v.trust}
                        onChange={(val) => {
                          v.trust = val;
                          update();
                        }}
                        w={150}
                        placeholder={v.trust}
                        min={0}
                      />
                    ) : (
                      <Text>{Intl.NumberFormat("id-ID").format(v.trust)}</Text>
                    )}
                  </td>
                  <td
                    style={{
                      backgroundColor: colors.green,
                    }}
                  >
                    {v.isSelected ? (
                      <NumberInput
                        value={v.joy}
                        onChange={(val) => {
                          v.joy = val;
                          update();
                        }}
                        w={150}
                        placeholder={v.joy}
                        min={0}
                      />
                    ) : (
                      <Text>{Intl.NumberFormat("id-ID").format(v.joy)}</Text>
                    )}
                  </td>
                  <td
                    style={{
                      backgroundColor: colors.green,
                    }}
                  >
                    {v.isSelected ? (
                      <NumberInput
                        value={v.surprise}
                        onChange={(val) => {
                          v.surprise = val;
                          update();
                        }}
                        w={150}
                        placeholder={v.surprise}
                        min={0}
                      />
                    ) : (
                      <Text>
                        {Intl.NumberFormat("id-ID").format(v.surprise)}
                      </Text>
                    )}
                  </td>
                  <td
                    style={{
                      backgroundColor: colors.gray,
                    }}
                  >
                    {v.isSelected ? (
                      <NumberInput
                        value={v.anticipation}
                        onChange={(val) => {
                          v.anticipation = val;
                          update();
                        }}
                        w={150}
                        placeholder={v.anticipation}
                        min={0}
                      />
                    ) : (
                      <Text>
                        {Intl.NumberFormat("id-ID").format(v.anticipation)}
                      </Text>
                    )}
                  </td>
                  <td
                    style={{
                      backgroundColor: colors.pink,
                    }}
                  >
                    {v.isSelected ? (
                      <NumberInput
                        value={v.sadness}
                        onChange={(val) => {
                          v.sadness = val;
                          update();
                        }}
                        w={150}
                        placeholder={v.sadness}
                        min={0}
                      />
                    ) : (
                      <Text>
                        {Intl.NumberFormat("id-ID").format(v.sadness)}
                      </Text>
                    )}
                  </td>
                  <td
                    style={{
                      backgroundColor: colors.pink,
                    }}
                  >
                    {v.isSelected ? (
                      <NumberInput
                        value={v.fear}
                        onChange={(val) => {
                          v.fear = val;
                          update();
                        }}
                        w={150}
                        placeholder={v.fear}
                        min={0}
                      />
                    ) : (
                      <Text>{Intl.NumberFormat("id-ID").format(v.fear)}</Text>
                    )}
                  </td>
                  <td
                    style={{
                      backgroundColor: colors.pink,
                    }}
                  >
                    {v.isSelected ? (
                      <NumberInput
                        value={v.anger}
                        onChange={(val) => {
                          v.anger = val;
                          update();
                        }}
                        w={150}
                        placeholder={v.anger}
                        min={0}
                      />
                    ) : (
                      <Text>{Intl.NumberFormat("id-ID").format(v.anger)}</Text>
                    )}
                  </td>
                  <td
                    style={{
                      backgroundColor: colors.pink,
                    }}
                  >
                    {v.isSelected ? (
                      <NumberInput
                        value={v.disgust}
                        onChange={(val) => {
                          v.disgust = val;
                          update();
                        }}
                        w={150}
                        placeholder={v.disgust}
                        min={0}
                      />
                    ) : (
                      <Text>
                        {Intl.NumberFormat("id-ID").format(v.disgust)}
                      </Text>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
        <Paper p={"xs"} mt={"xs"}>
          <Group position="apart">
            <Pagination
              total={_.ceil(sListKabupaten.value.length / 10)}
              onChange={onPageChange}
            />
          </Group>
        </Paper>
      </Stack>
    </>
  );
}
