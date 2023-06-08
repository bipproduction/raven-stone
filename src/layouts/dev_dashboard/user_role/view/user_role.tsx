import {
  ActionIcon,
  Badge,
  Checkbox,
  Group,
  Menu,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useState } from "react";
import { user_role_get } from "../../user/fun/user_role_get";
import _ from "lodash";
import { UserRoleCreate } from "./user_role_create";
import { MdCheck, MdCheckBox, MdClose, MdMoreVert } from "react-icons/md";
import { val_user_role_list } from "../val/user_role_list";

export function ViewUserRole() {
  const [userRoleList, setUserRoleList] = useAtom(val_user_role_list);
  useShallowEffect(() => {
    user_role_get().then(setUserRoleList);
  }, []);
  return (
    <>
      <Group position="apart">
        <Title>User Role</Title>
        <UserRoleCreate />
      </Group>
      <Table>
        <thead>
          <tr>
            <th>{""}</th>
            <th>No</th>
            {_.keys(_.omit(userRoleList[0], ["id"])).map((v, i) => (
              <th key={i}>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userRoleList.map((v, i) => (
            <tr key={i}>
              <td>
                <Menu>
                  <Menu.Target>
                    <ActionIcon>
                      <MdMoreVert />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>Edit</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </td>
              <td>{i + 1}</td>
              {_.keys(_.omit(v, ["id"])).map((v2, i2) => (
                <td key={i2}>
                  {v2 === "isActive" ? (
                    v[v2] ? (
                      <Badge>
                        <MdCheck />
                      </Badge>
                    ) : (
                      <Badge>
                        <MdClose />
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
    </>
  );
}
