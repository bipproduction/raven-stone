import { Button, Group, Modal, Paper, Stack } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useAtom } from "jotai";
import { useState } from "react";
import { v3_val_open_copy_data } from "../val/v3_val_open_copy_data";
import { v3_fun_data_chack_availble } from "../fun/v3_fun_data_check_availble";
import moment from "moment";
import _ from "lodash";
import toast from "react-simple-toasts";
import { api } from "@/lib/api";

export function V3CopyData() {
  const [open, setOpen] = useAtom(v3_val_open_copy_data);
  const [copyData, setCopyData] = useState({
    from: null,
    to: null,
  });
  return (
    <>
      <Paper p={"xs"}>
        <Group>
          <Button onClick={() => setOpen(true)}>Copy Data</Button>
        </Group>
      </Paper>
      <Modal size={"lg"} opened={open} onClose={() => setOpen(false)}>
        <Stack spacing={"xl"}>
          {/* {JSON.stringify(copyData)} */}
          <Group>
            <DatePicker
              value={copyData.from}
              onChange={(val) => {
                v3_fun_data_chack_availble({
                  date: moment(val).format("YYYY-MM-DD"),
                }).then((res) => {
                  if (_.isEmpty(res)) {
                    const data = {
                      from: null,
                      to: null,
                    };

                    setCopyData(data as any);
                    return toast("empty data");
                  }

                  const data = {
                    from: moment(val).format("YYYY-MM-DD"),
                    to: null,
                  };

                  setCopyData(data as any);
                });
              }}
            />
            {copyData.from && (
              <DatePicker
                value={copyData.to}
                onChange={(val) => {
                  v3_fun_data_chack_availble({
                    date: moment(val).format("YYYY-MM-DD"),
                  }).then((res) => {
                    if (!_.isEmpty(res)) {
                      const data = {
                        from: copyData.from,
                        to: null,
                      };

                      setCopyData(data as any);
                      return toast("target berisi data");
                    }

                    const data = {
                      from: copyData.from,
                      to: moment(val).format("YYYY-MM-DD"),
                    };

                    setCopyData(data as any);
                  });
                }}
              />
            )}
          </Group>
          <Group position="right">
            {copyData.to && (
              <Button
                onClick={() => {
                  fetch(`${api.apiV3NationWideRatingDataCopy}?from=${copyData.from}&to=${copyData.to}`).then((res) => {
                    if (res.status != 201) {
                      return toast("error");
                    }
                    toast("success");
                  });
                }}
              >
                Proccess
              </Button>
            )}
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
