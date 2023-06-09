import {
  ActionIcon,
  Badge,
  Checkbox,
  Group,
  Menu,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useState } from "react";
import { user_role_get } from "../../user/fun/user_role_get";
import _ from "lodash";
import { ModalUserRoleCreate } from "./modal_user_role_create";
import { MdCheck, MdCheckBox, MdClose, MdMoreVert } from "react-icons/md";
import { val_user_role_list } from "../val/user_role_list";
import { userRoleEdit } from "./modal_user_role_edit";
import { fun_user_role_get_all } from "../fun/fun_user_role_get_all";

export function ViewUserRole() {
  //   const [userRoleList, setUserRoleList] = useAtom(val_user_role_list);
  const [listUserRole, setListUserRole] = useAtom(val_user_role_list);
  const { openModalUserEdit, setOpenModalUserEdit } = userRoleEdit.use();
  userRoleEdit.gunakanDataEdit.panggil();

  useShallowEffect(() => {
    // user_role_get({ setUserRoleList: setUserRoleList });
    fun_user_role_get_all({ setListUserRole });
  }, []);
  return (
    <>
      <Stack>
        <Group position="apart">
          <Title>User Role</Title>
          <ModalUserRoleCreate />
        </Group>
        <Table>
          <thead>
            <tr>
              <th>{""}</th>
              <th>No</th>
              {_.keys(_.omit(listUserRole[0], ["id"])).map((v, i) => (
                <th key={i}>{v === "isActive" ? "Status" : v}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listUserRole.map((v, i) => (
              <tr key={i}>
                <td>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon>
                        <MdMoreVert />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => {
                          userRoleEdit.gunakanDataEdit.set(v);
                          setOpenModalUserEdit(true);
                        }}
                      >
                        Edit
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </td>
                <td>{i + 1}</td>
                {_.keys(_.omit(v, ["id"])).map((v2, i2) => (
                  <td key={i2}>
                    {v2 === "isActive" ? (
                      v[v2] ? (
                        <Badge color="green">
                          <Text>Active</Text>
                        </Badge>
                      ) : (
                        <Badge color="red">
                          <Text>Not Active</Text>
                        </Badge>
                      )
                    ) : (
                      <Text>{v[v2]}</Text>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        {<userRoleEdit.view />}
      </Stack>
    </>
  );
}
