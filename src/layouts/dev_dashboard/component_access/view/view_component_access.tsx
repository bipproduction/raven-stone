import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Menu,
  Overlay,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { MdAdd, MdCheck, MdClose, MdMoreVert } from "react-icons/md";
import { ViewModalComponentAccessCreate } from "./view_modal_create";
import { useAtom } from "jotai";
import { val_component_access_lsist } from "../val/val_list_data";
import { useShallowEffect } from "@mantine/hooks";
import { fun_component_access_get_all } from "../fun/fun_get_all";
import _ from "lodash";
import { val_component_access_open_edit } from "../val/val_open_edit";
import { val_component_acces_data_edit } from "../val/val_data_edit";
import { ViewModalComponentAccessEdit } from "./view_modal_edit";
import { val_component_access_list_user_role } from "../val/val_user_role";
import { fun_component_access_user_role_get } from "../fun/fun_user_role_get";
import { ViewComponentAccessModalDelete } from "./view_modal_delete";
import { val_componen_access_open_delete } from "../val/val_open_delete";
import { sUser } from "@/s_state/s_user";
import { val_global_component_access_user_role } from "@/global/val/val_list_user_role";
import { val_hook_list_componet_role } from "@/global/val/val_hook_list_component_role";
import { func_global_handle_component_role } from "@/global/fun/fun_handle_component_role";
import { val_global_list_component_name } from "@/global/val/val_list_component_name";
import { ViewComponentAccessModalInject } from "./view_modal_inject";
import { ViewComponentAccessModalCrearAll } from "./view_modal_clear_all";

export function ViewComponentAccess() {
  const [listData, setListComponentAccess] = useAtom(
    val_component_access_lsist
  );

  const [openEdit, setOpenEdit] = useAtom(val_component_access_open_edit);
  const [dataEdit, setDataEdit] = useAtom(val_component_acces_data_edit);
  const [listuserRole, setListUserRole] = useAtom(
    val_component_access_list_user_role
  );
  const [openDelete, setOpenDelete] = useAtom(val_componen_access_open_delete);
  // const [listComponentName, setlssistComponentName] = useAtom(
  //   val_global_list_component_name
  // );

  useShallowEffect(() => {
    fun_component_access_get_all({ setListComponentAccess });
    fun_component_access_user_role_get({ setListUserRole });
  }, []);

  return (
    <>
      <Stack pos={"relative"}>
        {/* {JSON.stringify(listuserRole)} */}

        <Group position="apart">
          <Title>Component Access</Title>
          {/* {JSON.stringify(sUser.value)} */}
          {/* <Text>---</Text> */}
          {/* {JSON.stringify(listComponent)} */}
          {/* <ViewModalComponentAccessCreate /> */}
          {/* {JSON.stringify(val_hook_list_componet_role.get())}
          {JSON.stringify(listComponentName)} */}
        </Group>
        <Group pos={"sticky"} top={60}>
          <ViewComponentAccessModalInject />
          <ViewComponentAccessModalCrearAll />
        </Group>
        <Table>
          <thead>
            <tr>
              <th>{""}</th>
              <th>No</th>
              {_.keys(_.omit(listData[0], ["id"])).map((v, i) => (
                <th key={i}>
                  {v === "listUserRole"
                    ? "Role"
                    : v === "isActive"
                    ? "Status"
                    : v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listData.map((v, i) => (
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
                          setDataEdit(v);
                          setOpenEdit(true);
                        }}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          setDataEdit(v);
                          setOpenDelete(true);
                        }}
                      >
                        Delete
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
                    ) : v2 === "listUserRole" ? (
                      !v[v2] ? (
                        <Text>Empty</Text>
                      ) : (
                        v[v2].map((v3: any, i3: any) => (
                          <Badge key={i3}>
                            {listuserRole.find((u) => u.id == v3)?.name}
                          </Badge>
                        ))
                      )
                    ) : (
                      <Text>{v2 === "name" ? _.startCase(v[v2]) : v[v2]}</Text>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal Edit Data */}
        <ViewModalComponentAccessEdit />
        {/* modal delete data */}
        <ViewComponentAccessModalDelete />
      </Stack>
    </>
  );
}
