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

export function V3ModalEdit() {
  const [openModal, setOpenModal] = useAtom(v3_val_open_modal_edit);
  const [dataEdit, setDataEdit] = useAtom(v3_val_data_edit);
  return (
    <>
      <Modal size={"lg"} opened={openModal} onClose={() => setOpenModal(false)}>
        <Stack
          h={500}
          spacing={"xl"}
          sx={{
            overflow: "scroll",
          }}
        >
          <SimpleGrid cols={2}>
            {_.keys(
              _.omit(dataEdit, [
                "id",
                "candidate1Id",
                "candidate2Id",
                "date",
                "text",
              ])
            ).map((v, i) => (
              <Box key={i}>
                <TextInput
                  label={v}
                  value={dataEdit[v]}
                  onChange={(val) =>
                    setDataEdit({ ...dataEdit, [v]: val.currentTarget.value })
                  }
                />
              </Box>
            ))}
          </SimpleGrid>
          <V3ComTextEditor content="<html></html>" />
        </Stack>
      </Modal>
    </>
  );
}
