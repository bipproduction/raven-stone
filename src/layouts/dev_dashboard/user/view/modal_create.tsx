import {
  Box,
  Button,
  Modal,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { dev_dashboard_modal_create } from "../val/modal_create";
import { MdAdd } from "react-icons/md";
import { useShallowEffect } from "@mantine/hooks";
import { user_role_get } from "../fun/user_role_get";
import { useState } from "react";
import toast from "react-simple-toasts";
import _ from "lodash";
import { user_create } from "../fun/user_create";
import { user_get_all } from "../fun/user_get_all";
import { dev_dashboard_lsist_user } from "../val/list_user";

export function ModalCreate() {
  const [open, setOpen] = useAtom(dev_dashboard_modal_create);
  const [listUserRole, setlistUserRole] = useState<any[]>([]);
  const [lisUser, setLsistUser] = useAtom(dev_dashboard_lsist_user);

  const [dataCreate, setDataCreate] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userRoleId: 1,
  });

  useShallowEffect(() => {
    user_role_get({setUserRoleList: setlistUserRole});
  }, []);

  function onCreate() {
    if (_.values(dataCreate).includes(""))
      return toast("Data tidak boleh kosong");
    user_create(dataCreate).then(() => {
      user_get_all().then(setLsistUser);
      setOpen(false);
    });
  }
  return (
    <>
      <Button onClick={() => setOpen(true)} bg={"teal"} leftIcon={<MdAdd />}>
        New User
      </Button>

      <Modal
        title={"new user"}
        size={"lg"}
        opened={open}
        onClose={() => setOpen(false)}
      >
        <Stack spacing={"lg"}>
          <TextInput
            label="Nama"
            placeholder="Nama"
            onChange={(e) =>
              setDataCreate({ ...dataCreate, name: e.target.value })
            }
          />
          <TextInput
            label="Email"
            placeholder="Email"
            onChange={(e) =>
              setDataCreate({ ...dataCreate, email: e.target.value })
            }
          />
          <TextInput
            label="Password"
            placeholder="Password"
            onChange={(e) =>
              setDataCreate({ ...dataCreate, password: e.target.value })
            }
          />
          <TextInput
            label="Phone"
            placeholder="Phone"
            onChange={(e) =>
              setDataCreate({ ...dataCreate, phone: e.target.value })
            }
          />
          <Select
            defaultValue={"user"}
            description={"default is user"}
            data={listUserRole.map((v) => ({ label: v.name, value: v.id }))}
            label="Role"
            placeholder={
              listUserRole.find(
                (v) => Number(v.id) === Number(dataCreate.userRoleId)
              )?.name
            }
            onChange={(e) =>
              setDataCreate({ ...dataCreate, userRoleId: Number(e!) })
            }
          />
          <Button onClick={onCreate}>Create</Button>
        </Stack>
      </Modal>
    </>
  );
}
