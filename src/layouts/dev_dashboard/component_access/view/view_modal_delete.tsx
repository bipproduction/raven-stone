import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { val_componen_access_open_delete } from "../val/val_open_delete";
import { val_component_acces_data_edit } from "../val/val_data_edit";
import _ from "lodash";
import { fun_component_access_delete } from "../fun/fun_delete";
import { val_component_access_lsist } from "../val/val_list_data";
import { fun_component_access_get_all } from "../fun/fun_get_all";

export function ViewComponentAccessModalDelete() {
  const [open, setOpen] = useAtom(val_componen_access_open_delete);
  const [dataEdit, setDataEdit] = useAtom(val_component_acces_data_edit);
  const [listData, setListData] = useAtom(val_component_access_lsist);

  async function onDelete() {
    fun_component_access_delete({ data: { id: dataEdit.id } }).then(() => {
      // reload list data
      fun_component_access_get_all().then(setListData);
      // tutup modal
      setOpen(false);
    });
  }
  return (
    <>
      <Modal title={"Delete"} opened={open} onClose={() => setOpen(false)}>
        <Stack spacing={"lg"}>
          {/* <Title>{_.startCase(dataEdit.name)}</Title> */}
          <Text>Apakah Anda Yakin Ingin Menghapus ?</Text>
          <Title c={"green"} order={3}>
            {_.startCase(dataEdit.name)}
          </Title>
          <Group position="apart">
            <Button bg={"green"}>Cansel</Button>
            <Button onClick={onDelete} bg={"red"}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
