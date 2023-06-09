import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Loader,
  Menu,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { user_get_all } from "../fun/user_get_all";
import { useAtom } from "jotai";
import { dev_dashboard_lsist_user } from "../val/list_user";
import _ from "lodash";
import { IconEdit } from "@tabler/icons-react";
import {
  MdAdd,
  MdDoneOutline,
  MdMenu,
  MdMoreVert,
  MdPlusOne,
} from "react-icons/md";
import { MenuItem } from "@mantine/core/lib/Menu/MenuItem/MenuItem";
import { ModalCreate } from "./modal_create";
import { ModalEdit } from "./modal_edit";
import { dev_dashboard_data_edit } from "../val/data_edit";
import { dev_dashboard_modal_edit } from "../val/modal_edit";
import { useState } from "react";
import { user_role_get } from "../fun/user_role_get";
import { dev_dashboard_modal_delete } from "../val/modal_delete";
import { ModalDelete } from "./model_delete";
import { ViewGlobalAccessBlock } from "@/global/view/access_block";

export function DevDashboardUser() {
  const [listUser, setlistUser] = useAtom(dev_dashboard_lsist_user);
  const [dataEdit, setDataEdit] = useAtom(dev_dashboard_data_edit);
  const [openEdit, setOpenEdit] = useAtom(dev_dashboard_modal_edit);
  const [openDelete, setOpenDelete] = useAtom(dev_dashboard_modal_delete);
  const [listUserRole, setListUserRole] = useState<any[]>([]);

  useShallowEffect(() => {
    user_role_get({ setUserRoleList: setListUserRole });
    user_get_all().then(setlistUser);
  }, []);

  return (
    <>
      <Stack spacing={"lg"} pos={"relative"}>
        <Group position="apart">
          <Title>User</Title>
          <ModalCreate />
        </Group>
        {!listUser || !listUserRole ? (
          <Loader />
        ) : (
          <Box
            sx={{
              overflow: "scroll",
            }}
          >
            <Box w={"100%"} sx={{ overflow: "scroll" }}>
              <Table>
                <thead>
                  <tr>
                    <th>{""}</th>
                    <th>No</th>
                    {_.keys(_.omit(listUser[0], ["id"])).map((v, i) => (
                      <th key={i}>{v === "userRoleId" ? "User Role" : v === "isActive"? "Status": v}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listUser
                    .map((v) => ({ ..._.omit(v, ["id"]) }))
                    .map((v, i) => (
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
                                  setDataEdit({ ...v, id: listUser[i].id });
                                  setOpenEdit(true);
                                }}
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  setDataEdit({ ...v, id: listUser[i].id });
                                  setOpenDelete(true);
                                }}
                              >
                                Delete
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </td>
                        <td>{i + 1}</td>
                        {_.keys(v).map((v2, i2) => (
                          <td key={i2}>
                            {v2 === "userRoleId" ? (
                              <Badge>
                                {listUserRole &&
                                  listUserRole.find(
                                    (v3) => Number(v3.id) === Number(v[v2])
                                  )?.name}
                              </Badge>
                            ) : v2 === "isActive" ? (
                              <Box>
                                {v[v2] ? (
                                  <Badge color="green">Active</Badge>
                                ) : (
                                  <Badge color={"orange"}>Inactive</Badge>
                                )}
                              </Box>
                            ) : v2 === "password" ? (
                              <Text>*******</Text>
                            ) : (
                              <Text>{v[v2]}</Text>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Box>
          </Box>
        )}

        {/* modal untuk edit  */}
        <ModalEdit />
        {/* modal delete */}
        <ModalDelete />
      </Stack>
    </>
  );
}
