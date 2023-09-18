import { Button, Group, Modal, Stack, Title } from "@mantine/core";
import { IconClearAll } from "@tabler/icons-react";
import { useState } from "react";
import { fun_component_access_clear_all } from "../fun/fun_component_access_clear_all";
import { fun_component_access_get_all } from "../fun/fun_get_all";
import { val_component_access_lsist } from "../val/val_list_data";
import { useAtom } from "jotai";

export function ViewComponentAccessModalCrearAll() {
  const [open, setOpen] = useState(false);
  const [listData, setListComponentAccess] = useAtom(
    val_component_access_lsist
  );

  const onClear = async () => {
    await fun_component_access_clear_all();
    fun_component_access_get_all({ setListComponentAccess });
    setOpen(false);
  };
  return (
    <>
      <Button
        compact
        onClick={() => {
          setOpen(true);
        }}
        color="teal"
        leftIcon={<IconClearAll />}
      >
        Clear
      </Button>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <Stack spacing={"md"}>
          <Title>Clear All</Title>
          <Group position="apart">
            <Button onClick={() => setOpen(false)} color="teal">
              No
            </Button>
            <Button onClick={onClear} color="red">
              Yes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
