import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Group,
  NativeSelect,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { V3CopyData } from "./com/v3_com_copy_data";
import { useAtom } from "jotai";
import { v3_selected_date } from "./val/v3_val_selected_date";
import moment from "moment";
import { V3SelectCandidate } from "./com/v3_com_select_candidate";
import { v3_fun_check_data_candidate } from "./fun/v3_fun_check_data_candidate";
import { v3_val_list_data_candidate } from "./val/v3_val_list_data_candidate";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { v3_val_nation_wide_rating_list_candidate } from "../val/v3_nation_wide_rating_list_candidate";
import { MdDownload, MdEdit, MdUpload } from "react-icons/md";
import { V3ModalEdit } from "./com/v3_com_modal_edit";
import { v3_val_data_edit } from "./val/v3_val_data_edit";
import { v3_val_open_modal_edit } from "./val/v3_val_open_modal_edit";
import Link from "next/link";
import { api } from "@/lib/api";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import toast from "react-simple-toasts";
import Papa from "papaparse";
import { V3ComUploadCsv } from "./com/v3_com_upload_csv";
import { v3_fun_nation_wide_rating_load_list_candidate } from "../fun/v3_fun_nation_wide_rating_load_list_candidate";
import { V3ComReplaceCsv } from "./com/v3_com_replace_csv";
import { useState } from "react";

export function V3BackNationWideRating() {
  const [selectedDate, setSelectedDate] = useAtom(v3_selected_date);
  const [listData, setData] = useAtom(v3_val_list_data_candidate);
  const [listCandidate, setListCandidate] = useAtom(
    v3_val_nation_wide_rating_list_candidate
  );
  const [openModal, setOpenModal] = useAtom(v3_val_open_modal_edit);
  const [dataEdit, setDataEdit] = useAtom(v3_val_data_edit);

  useShallowEffect(() => {
    v3_fun_check_data_candidate({
      date: selectedDate,
      setData,
    });

    v3_fun_nation_wide_rating_load_list_candidate({
      setListCandidate,
    });
  }, []);

  return (
    <>
      <Stack spacing={"xl"}>
        <Title>Back Nation Wide Rating</Title>
        {/* {JSON.stringify(listData)} */}
        <V3CopyData />
        {/* <V3SelectCandidate /> */}
        <Paper p={"xs"}>
          <Stack>
            
            <Grid>
              <Grid.Col span={"content"}>
                <Card>
                  <DatePicker
                    value={selectedDate as any}
                    onChange={(val) => {
                      setSelectedDate(moment(val).format("YYYY-MM-DD"));
                      v3_fun_check_data_candidate({
                        date: moment(val).format("YYYY-MM-DD"),
                        setData,
                      });
                    }}
                  />
                </Card>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Stack>
                  <Group>
                    {!_.isEmpty(listData) && (
                      <Group spacing="xl">
                        <Card w={150} h={120}>
                          <Box
                            sx={{
                              border: "1px dashed gray",
                            }}
                          >
                            <Link
                              href={
                                api.apiV3NationWideRatingDataDownload +
                                `?date=${selectedDate}`
                              }
                            >
                              <Stack align="center" justify="center">
                                <Title order={3}>DOWNLOAD</Title>
                                <Text>download csv</Text>
                              </Stack>
                            </Link>
                          </Box>
                        </Card>
                      </Group>
                    )}
                    <Group>
                      <V3ComUploadCsv />
                      <V3ComReplaceCsv />
                    </Group>
                  </Group>
                  <Card>
                    <Stack spacing={0}>
                      <Text size={"xs"}>
                        * UPDATE, hanya merubah data sesuai dengan file csv, tidak menghapus data yang telah ada , hanya mengupdate data
                      </Text>
                      <Text size={"xs"}>
                        * REPLACE, akan menghapus data yang sudah ada di tanggal yag dipilih, lalu ditimpa dengan data pada file csv
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
        <Paper p={"md"}>
          {listData && (
            <Box h={700} sx={{ overflow: "scroll" }}>
              <Table>
                <thead>
                  <tr
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "white",
                      zIndex: 100,
                    }}
                  >
                    <th>Action</th>
                    <th>
                      <Title order={5}>candidate 1 name</Title>
                    </th>
                    <th>
                      <Title order={5}>candidate 2 name</Title>
                    </th>
                    {_.keys(
                      _.omit(listData[0], [
                        // "id",
                        "candidate1Id",
                        "candidate2Id",
                        "candidate1Name",
                        "candidate2Name",
                      ])
                    ).map((v, i) => (
                      <th key={i}>
                        <Title order={5}>{v}</Title>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listData
                    .map((v: any) => ({
                      candidate1Name: v.candidate1Name,
                      candidate2Name: v.candidate2Name,
                      ..._.omit(v, [
                        // "id",
                        "candidate1Id",
                        "candidate2Id",
                        "candidate1Name",
                        "candidate2Name",
                      ]),
                    }))
                    .map((v: any, i) => (
                      <tr key={i}>
                        <td>
                          <Flex>
                            <ActionIcon
                              onClick={() => {
                                setOpenModal(true);
                                setDataEdit(v);
                              }}
                            >
                              <MdEdit />
                            </ActionIcon>

                            <Avatar.Group spacing={"sm"}>
                              <Avatar
                                radius={"xl"}
                                src={
                                  listCandidate?.find(
                                    (x) => x.name == v.candidate1Name
                                  )?.img
                                }
                              />
                              <Avatar
                                radius={"xl"}
                                src={
                                  listCandidate?.find(
                                    (x) => x.name == v.candidate2Name
                                  )?.img
                                }
                              />
                            </Avatar.Group>
                          </Flex>
                        </td>
                        {_.keys(v).map((v2: any, i) => (
                          <td key={i}>
                            <Text lineClamp={2}>{v[v2]}</Text>
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Box>
          )}
        </Paper>
        <V3ModalEdit />
      </Stack>
    </>
  );
}
