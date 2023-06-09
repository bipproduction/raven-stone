import { useAtom } from "jotai";
import { val_component_access_open_create } from "../val/val_open_create";
import {
  Badge,
  Button,
  Checkbox,
  Chip,
  Group,
  Loader,
  Modal,
  MultiSelect,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { val_component_access_open_edit } from "../val/val_open_edit";
import { val_component_acces_data_edit } from "../val/val_data_edit";
import { useShallowEffect } from "@mantine/hooks";
import { user_role_get } from "../../user/fun/user_role_get";
import { val_component_access_list_user_role } from "../val/val_user_role";
import _ from "lodash";
import { useState } from "react";
import { fun_component_access_update } from "../fun/fun_update";
import { fun_component_access_get_all } from "../fun/fun_get_all";
import { val_component_access_lsist } from "../val/val_list_data";
import { fun_componen_access_upsert } from "../fun/fun_upsert";
import { fun_global_component_access_role_get } from "@/global/fun/fun_component_access_role_get";
import { val_global_component_access_user_role } from "@/global/val/val_list_user_role";

export function ViewModalComponentAccessEdit() {
  const [open, setOpen] = useAtom(val_component_access_open_edit);
  const [dataEdit, setDataEdit] = useAtom(val_component_acces_data_edit);
  const [userRoleList, setuserRoleList] = useAtom(
    val_component_access_list_user_role
  );

  const [listData, setListComponentAccess] = useAtom(
    val_component_access_lsist
  );
  const [listComponentAccess, setLisComponentAccess] = useAtom(
    val_global_component_access_user_role
  );

  useShallowEffect(() => {
    user_role_get({ setUserRoleList: setuserRoleList });
    // fun_componen_access_upsert({
    //   data: {
    //     name: ViewModalComponentAccessEdit.name,
    //   },
    // });
  }, []);

  async function onUpdate() {
    fun_component_access_update({ data: dataEdit }).then(() => {
      fun_component_access_get_all({ setListComponentAccess });

      // perbarui global list component access
      fun_global_component_access_role_get({ setLisComponentAccess });

      // tutup modal
      setOpen(false);
    });
  }

  if (!dataEdit)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <Stack h={"80vh"} spacing={"lg"}>
          {/* {JSON.stringify(dataEdit)} */}
          <Title>{_.kebabCase(dataEdit.name).replace(/-/g, " ")}</Title>
          <Group spacing={"md"}>
            <Checkbox
              checked={dataEdit.isActive}
              onChange={(val) =>
                setDataEdit({
                  ...dataEdit,
                  isActive: val.currentTarget.checked,
                })
              }
            />
            <Text>Is Active</Text>
          </Group>
          <MultiSelect
            label={"role"}
            value={
              !dataEdit
                ? []
                : !dataEdit.listUserRole
                ? []
                : dataEdit.listUserRole.map((v: any) => v)
            }
            // valueComponent={(value) => <Chip onChange={(val) => setDataEdit({})}>{value.label}</Chip>}
            onChange={(value) =>
              setDataEdit({ ...dataEdit, listUserRole: value })
            }
            data={userRoleList.map((v) => ({
              label: v.name,
              value: v.id,
            }))}
          />
          <Button onClick={onUpdate} bg={"teal"}>
            Update
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
