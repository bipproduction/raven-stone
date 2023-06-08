import {
  Box,
  Button,
  Loader,
  Menu,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { dev_dashboard_modal_edit } from "../val/modal_edit";
import { dev_dashboard_data_edit } from "../val/data_edit";
import _ from "lodash";
import { Editor } from "@tiptap/react";
import { useShallowEffect } from "@mantine/hooks";
import { user_role_get } from "../fun/user_role_get";
import { user_update } from "../fun/user_update";
import { user_get_all } from "../fun/user_get_all";
import { dev_dashboard_lsist_user } from "../val/list_user";

/**
 *
 * @param data data dari user untuk diedit
 * @returns
 */
export function ModalEdit() {
  const [open, setOpen] = useAtom(dev_dashboard_modal_edit);
  const [dataEdit, setDataEdit] = useAtom(dev_dashboard_data_edit);
  const [userRole, setUserRole] = useState<any[]>([]);
  const [listUser, setListUser] = useAtom(dev_dashboard_lsist_user);

  useShallowEffect(() => {
    // ambil data user role
    user_role_get().then(setUserRole);
  }, []);

  // update data
  async function onUpdate() {
    user_update({ body: dataEdit }).then(() => {
      // reload all user
      user_get_all().then(setListUser);
      // tutup modal
      setOpen(false);
    });
  }

  return (
    <>
      <Modal
        size={"lg"}
        opened={open}
        onClose={() => setOpen(false)}
        title={"edit user"}
      >
        <Stack>
          {!dataEdit ? (
            <Loader />
          ) : (
            <Stack>
              <Title>{dataEdit.name}</Title>
              {_.keys(_.omit(dataEdit, ["id", "userRoleId"])).map((v, i) => (
                <Box key={i}>
                  <TextInput
                    label={v}
                    value={dataEdit[v] ?? ""}
                    onChange={(val) =>
                      setDataEdit({ ...dataEdit, [v]: val.currentTarget.value })
                    }
                  />
                </Box>
              ))}
              <Select
                placeholder={
                  userRole.find((v) => v.id === dataEdit.userRoleId)?.name
                }
                onChange={(va) => setDataEdit({ ...dataEdit, userRoleId: va })}
                data={userRole.map((v, i) => ({
                  label: v.name,
                  value: v.id,
                }))}
              />
              <Button onClick={onUpdate} bg={"teal"}>
                Update
              </Button>
            </Stack>
          )}
        </Stack>
      </Modal>
    </>
  );
}
