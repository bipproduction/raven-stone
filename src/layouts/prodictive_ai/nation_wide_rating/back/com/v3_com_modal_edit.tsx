import {
  ActionIcon,
  Box,
  Modal,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useAtom } from "jotai";
import { MdEdit } from "react-icons/md";
import { v3_val_open_modal_edit } from "../val/v3_val_open_modal_edit";
import { v3_val_data_edit } from "../val/v3_val_data_edit";
import _ from "lodash";
import { V3ComTextEditor } from "./v3_com_text_editor";
import { api } from "@/lib/api";
import toast from "react-simple-toasts";
import { v3_fun_check_data_candidate } from "../fun/v3_fun_check_data_candidate";
import { v3_val_list_data_candidate } from "../val/v3_val_list_data_candidate";
import { v3_selected_date } from "../val/v3_val_selected_date";

export function V3ModalEdit() {
  const [openModal, setOpenModal] = useAtom(v3_val_open_modal_edit);
  const [dataEdit, setDataEdit] = useAtom(v3_val_data_edit);

  const [listData, setData] = useAtom(v3_val_list_data_candidate);
  const [selectedDate, setSelectedDate] = useAtom(v3_selected_date);

  return (
    <>
      <Modal size={"lg"} opened={openModal} onClose={() => setOpenModal(false)}>
        <Stack spacing={"xl"}>

          <SimpleGrid cols={2}>
            {_.keys(
              _.omit(dataEdit, [
                "id",
                "candidate1Id",
                "candidate2Id",
                "candidate1Name",
                "candidate2Name",
                "date",
                "text",
              ])
            ).map((v, i) => (
              <Box key={i}>
                <TextInput
                  label={v}
                  value={dataEdit[v]}
                  onChange={(val) => {
                    const data = _.clone(dataEdit);
                    data[v] = val;
                    setDataEdit(data);
                  }}
                />
              </Box>
            ))}
          </SimpleGrid>
          <V3ComTextEditor
            content=""
            onClick={() => {
              fetch(api.apiV3NationWideRatingDataUpdate, {
                method: "POST",
                body: JSON.stringify(dataEdit),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((v) => {
                if (v.status == 201) {
                  v3_fun_check_data_candidate({
                    date: selectedDate,
                    setData,
                  });
                  return toast("success");
                }
                toast("error");
              });
            }}
          />
        </Stack>
      </Modal>
    </>
  );
}
