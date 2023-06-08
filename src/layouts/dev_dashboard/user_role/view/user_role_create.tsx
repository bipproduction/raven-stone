import { Button, Modal, Stack, TextInput, Title } from "@mantine/core";
import _ from "lodash";
import { useState } from "react";
import toast from "react-simple-toasts";
import { user_role_create } from "../fun/user_role_ccreate";
import { useAtom } from "jotai";
import { val_user_role_list } from "../val/user_role_list";
import { user_role_get } from "../../user/fun/user_role_get";

export function UserRoleCreate() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({
    name: "",
  });
  const [listUserRole, setListuserRole] = useAtom(val_user_role_list);

  async function onCreate() {
    if (_.values(data).includes("")) return toast("Nama tidak boleh kosong");

    await user_role_create({ body: data }).then(() => {
      setOpen(false);
      user_role_get().then(setListuserRole);
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} color="teal">
        Create
      </Button>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <Stack spacing={"lg"}>
          <Title>Create User Role</Title>
          <TextInput
            onChange={(val) =>
              setData({ ...data, name: val.currentTarget.value })
            }
            label={"create user role"}
            placeholder={"create user role"}
          />
          <Button onClick={onCreate} color="teal">Create</Button>
        </Stack>
      </Modal>
    </>
  );
}
