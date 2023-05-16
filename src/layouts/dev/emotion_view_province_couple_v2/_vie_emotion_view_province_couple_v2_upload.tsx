import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { MdUpload } from "react-icons/md";
import Papa from "papaparse";
import { useState } from "react";
import _ from "lodash";
import { api } from "@/lib/api";
import toast from "react-simple-toasts";

const _val_open_modal = atomWithStorage(`_val_open_modalz`, false);

export function Vie_emotion_view_province_couple_v2_upload() {
  const [open, setOpen] = useAtom(_val_open_modal);
  const [listUpload, setListUpload] = useState<any[]>();
  const [isLoading, setisloading] = useState(false);

  function onUpdate() {
    setisloading(true);
    const body = listUpload?.map((val) => ({
      ..._.omit(val, ["cityName", "candidate1Name", "candidate2Name"]),
    }));

    fetch(api.apiPredictiveAiEmotionViewProvinceCoupleV2Update, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      if (res.status == 201) {
        setisloading(false);
        return toast("success");
      }
      setisloading(false);
      return toast("failed");
    });
  }
  return (
    <>
      <Paper p={"xs"} shadow={"sm"} w={100} h={70}>
        <Stack spacing={0} align="center" justify="space-between">
          <ActionIcon onClick={() => setOpen(true)}>
            <MdUpload size={24} />
          </ActionIcon>
          <Text size={"xs"}>Upload</Text>
        </Stack>
      </Paper>
      <Modal
        size={"lg"}
        opened={open}
        onClose={() => {
          setListUpload(undefined);
          setOpen(false);
        }}
        closeOnClickOutside={false}
      >
        <Stack>
          <Dropzone
            onDrop={(val) => {
              if (!val[0].name.includes("emotion-view-province-couple-v2"))
                return toast("file salah");
              const reader = new FileReader();
              reader.onload = async () => {
                const data = Papa.parse(reader.result as any, {
                  header: true,
                });

                setListUpload(data.data);
              };
              reader.readAsText(val[0]);
            }}
          >
            <Dropzone.Accept>
              <Title>LEPASKAN!</Title>
            </Dropzone.Accept>
            <Stack spacing={0}>
              <Title order={3}>Drag file here or click to select files</Title>
              <Text>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </Stack>
          </Dropzone>
          <Group position="right">
            <Button disabled={!listUpload || isLoading} onClick={onUpdate}>
              UPDATE
            </Button>
          </Group>
          <Box
            sx={{
              overflow: "scroll",
            }}
          >
            {listUpload && (
              <Table highlightOnHover withColumnBorders withBorder>
                <thead>
                  <tr>
                    {_.keys(listUpload![0]).map((val, index) => (
                      <th key={index}>{val}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listUpload &&
                    listUpload.map((item, index) => (
                      <tr key={index}>
                        {_.values(item).map((val, index) => (
                          <td key={index}>{val}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Box>
        </Stack>
      </Modal>
    </>
  );
}
