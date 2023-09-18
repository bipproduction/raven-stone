import { sUser } from "@/s_state/s_user";
import {
  Button,
  Checkbox,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _, { set } from "lodash";
import { useState } from "react";
import { userLogFun } from "..";
import { hookstate, useHookstate } from "@hookstate/core";
import { localstored } from "@hookstate/localstored";
import moment from "moment";
import { MdClearAll } from "react-icons/md";

const val_storage = hookstate<string | any>("");

export const ViewUserLog = () => {
  const [listUserLog, setListUserLog] = useState<any[]>([]);

  async function onCreate() {
    await userLogFun.funUserLogWrite({
      title: "contoh",
      detail: "ini adalah contohnya",
    });

    getData();
  }

  async function getData() {
    fetch("/api/user_log_get_all")
      .then((res) => res.json())
      .then((val) => {
        setListUserLog(val);
        console.log(val);
      });
  }

  useShallowEffect(() => {
    userLogFun.funGetAll().then(setListUserLog);
  }, []);

  const onClearAll = () => {

  }

  return (
    <>
      <Stack>
        <Group>
          <Button leftIcon={<MdClearAll />}>Clear All</Button>
        </Group>
        <Table>
          <thead>
            <tr>
              {_.map(
                _.keys(_.omit(listUserLog[0], ["id", "userId"])),
                (val, i) => (
                  <th key={i}>{val}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {_.map(listUserLog, (val, i) => (
              <tr key={i}>
                {_.map(_.keys(_.omit(val, ["id", "userId"])), (val2, i2) => (
                  <td key={i2}>
                    {val2 == "date" ? (
                      <Text>{moment(val[val2]).format("DD-MM-YYYY")}</Text>
                    ) : (
                      val[val2]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </>
  );
};
