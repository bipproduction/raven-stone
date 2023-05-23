import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Grid,
  Group,
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

export function V3BackNationWideRating() {
  const [selectedDate, setSelectedDate] = useAtom(v3_selected_date);
  const [listData, setData] = useAtom(v3_val_list_data_candidate);
  const [listCandidate, sertListCandidate] = useAtom(
    v3_val_nation_wide_rating_list_candidate
  );
  const [openModal, setOpenModal] = useAtom(v3_val_open_modal_edit);
  const [dataEdit, setDataEdit] = useAtom(v3_val_data_edit);

  useShallowEffect(() => {
    v3_fun_check_data_candidate({
      date: selectedDate,
      setData,
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
              </Grid.Col>
              <Grid.Col span={"auto"}>
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
                    <V3ComUploadCsv />
                  </Group>
                )}
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
        <Paper
          h={500}
          sx={{
            overflow: "scroll",
          }}
        >
          {listData && (
            <Table>
              <thead>
                <tr
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                  }}
                >
                  <th>Action</th>
                  {_.keys(listData[0]).map((v, i) => (
                    <th key={i}>
                      <Title order={5}>{v}</Title>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listData.map((v, i) => (
                  <tr key={i}>
                    <td>
                      <ActionIcon
                        onClick={() => {
                          setOpenModal(true);
                          setDataEdit(v);
                        }}
                      >
                        <MdEdit />
                      </ActionIcon>
                    </td>
                    {_.values(v).map((v2: any, i) => (
                      <td key={i}>
                        <Text lineClamp={2}>{v2}</Text>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Paper>
        <V3ModalEdit />
      </Stack>
    </>
  );
}
