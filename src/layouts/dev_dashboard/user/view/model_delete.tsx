import { useAtom } from "jotai";
import { dev_dashboard_modal_delete } from "../val/modal_delete";
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { dev_dashboard_data_edit } from "../val/data_edit";
import { user_delete } from "../fun/fun_user_delete";
import { dev_dashboard_lsist_user } from "../val/list_user";
import { user_get_all } from "../fun/fun_user_get_all";

export function ModalDelete() {
  const [openDelete, setOpenDelete] = useAtom(dev_dashboard_modal_delete);
  const [dataEdit, setDataEdit] = useAtom(dev_dashboard_data_edit);
  const [listUser, setlistuser] = useAtom(dev_dashboard_lsist_user);

  function onDelete() {
    user_delete({ body: dataEdit }).then(() => {
      user_get_all().then(setlistuser);
      setOpenDelete(false);
    });
  }
  return (
    <>
      <Modal
        title="Hapus User"
        opened={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <Stack>
          <Title>{dataEdit?.name}</Title>
          <p>Apakah anda yakin ingin menghapus user ini?</p>
          <Text size={12} fw={"bold"} c={"red"}>! hati hati , hanya gunakan jika diperlukan !</Text>
          <Group position="apart">
            <Button bg={"green"} onClick={() => setOpenDelete(false)}>
              Batal
            </Button>
            <Button bg={"red"} onClick={onDelete}>
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
