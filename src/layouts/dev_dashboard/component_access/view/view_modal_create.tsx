import { Button, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { MdAdd } from "react-icons/md";
import { val_component_access_open_create } from "../val/val_open_create";
import { useState } from "react";
import _ from "lodash";
import toast from "react-simple-toasts";
import { fun_component_access_create } from "../fun/fun_create";
import { val_component_access_lsist } from "../val/val_list_data";
import { fun_component_access_get_all } from "../fun/fun_get_all";
import { useShallowEffect } from "@mantine/hooks";
import { fun_componen_access_upsert } from "../fun/fun_upsert";

export function ViewModalComponentAccessCreate() {
  const [open, setOpen] = useAtom(val_component_access_open_create);
  const [data, setData] = useState({
    name: "",
  });
  const [listComponent, setListComponentAccess] = useAtom(val_component_access_lsist);

  async function onCreate() {
    if (_.values(data).includes("")) return toast("Nama tidak boleh kosong");
    fun_component_access_create({ body: data }).then(() => {
      fun_component_access_get_all({setListComponentAccess});
      setOpen(false);
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} leftIcon={<MdAdd />} bg={"teal"}>
        Create
      </Button>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <Stack spacing={"lg"}>
          <Title>Create Master Component Access</Title>
          <TextInput
            onChange={(val) =>
              setData({ ...data, name: val.currentTarget.value })
            }
            label={"create Master component role"}
            placeholder={"create Master component role"}
          />
          <Button bg={"teal"} onClick={onCreate}>
            Create
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
