import { val_global_list_component_name } from "@/global/val/val_list_component_name";
import {
  ActionIcon,
  Button,
  Group,
  List,
  Modal,
  Stack,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCircleDashed } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { MdAdd, MdRemove, MdRemoveCircle } from "react-icons/md";
import { fun_componen_access_upsert } from "../fun/fun_upsert";
import toast from "react-simple-toasts";
import { fun_component_access_get_all } from "../fun/fun_get_all";
import { val_global_component_access_user_role } from "@/global/val/val_list_user_role";
import { val_component_access_lsist } from "../val/val_list_data";

export function ViewComponentAccessModalInject() {
  const [open, setOpen] = useState(false);
  const [listComponentName, setlistComponentname] = useAtom(
    val_global_list_component_name
  );
  const [listData, setListComponentAccess] = useAtom(val_component_access_lsist);

  async function onInject() {
    for (let itm of listComponentName) {
      await fun_componen_access_upsert({
        data: {
          name: itm,
        },
      });
    }
    await fun_component_access_get_all({ setListComponentAccess });
    toast("success");
    setOpen(false);
  }
  return (
    <>
      <Button  onClick={() => setOpen(true)} color={"teal"} leftIcon={<MdAdd /> } compact>
        Inject Component
      </Button>
      <Modal
        size={"lg"}
        opened={open}
        title={"inject"}
        onClose={() => setOpen(false)}
      >
        <Stack>
          <Group position="apart">
            <Title>Inject Component</Title>
            <Button onClick={onInject} bg={"teal"}>
              Push
            </Button>
          </Group>
          {/* {JSON.stringify(listComponentName)} */}
          <List>
            {listComponentName.map((item) => (
              <List.Item
                icon={
                  // delete item
                  <ActionIcon
                    onClick={() =>
                      setlistComponentname(
                        listComponentName.filter((itm) => itm !== item)
                      )
                    }
                  >
                    <MdRemoveCircle color="teal" size="1rem" />
                  </ActionIcon>
                }
                key={item}
              >
                {item}
              </List.Item>
            ))}
          </List>
        </Stack>
      </Modal>
    </>
  );
}
