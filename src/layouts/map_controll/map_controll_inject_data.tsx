import {
  Button,
  Flex,
  Group,
  Modal,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { MdUploadFile } from "react-icons/md";
import PAPA from "papaparse";
import { useState } from "react";
import _ from "lodash";
import { api } from "@/lib/api";
import { DateInput } from "@mantine/dates";

const openModal = atomWithStorage("map_controll_inject_data_modal", false);
const _list_data = atomWithStorage<any[] | undefined>(
  "map_controll_inject_list_data",
  undefined
);
const _type = atomWithStorage<string | undefined>(
  "map_controll_inject_type",
  undefined
);

export default function MapControllInjectData({ bg }: { bg: string }) {
  const [open, setOpen] = useAtom(openModal);
  const [listData, setListData] = useAtom(_list_data);
  const [type, setType] = useAtom(_type);
  //   const [listData, setListData] = useState<any[]>();
  //   const [type, setType] = useState<string>();

  function onSend() {
    const data = listData?.map((v) => ({
      ..._.omit(v, ["city_name"]),
    }));
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} compact bg={bg}>
        Inject Data
      </Button>
      <Modal
        size={"xl"}
        opened={open}
        onClose={() => {
          setListData(undefined);
          setType(undefined);
          setOpen(false);
        }}
        closeOnClickOutside={false}
      >
        <Stack>
          <DropView />
          <Group>
            <Title>{type}</Title>
            <Flex>
              {type && type == "insert" && (
                <Stack spacing={0}>
                  <DateInput />
                </Stack>
              )}

              <Button>{type}</Button>
            </Flex>
          </Group>
          {listData && <TableView />}
        </Stack>
      </Modal>
    </>
  );
}

function DropView() {
  const [listData, setListData] = useAtom(_list_data);
  const [type, setType] = useAtom(_type);
  return (
    <>
      <Dropzone
        accept={["text/csv"]}
        onDrop={(file) => {
          const name = file[0].name;
          if (name) {
            setType(
              name.includes("update")
                ? "update"
                : name.includes("insert")
                ? "insert"
                : undefined
            );

            const reader = new FileReader();
            reader.readAsText(file[0]);

            reader.onload = function (event: any) {
              const csv = event.target.result;
              // const data = PAPA.parse(csv);
              // console.log(data.data);
              PAPA.parse(csv, {
                header: true,
                skipEmptyLines: true,
                complete: function (results, file) {
                  setListData(results.data);
                },
              });
            };
          }
        }}
        maxSize={3 * 1024 ** 2}
      >
        <Group position="center">
          <Dropzone.Accept>
            <MdUploadFile size={42} />
          </Dropzone.Accept>
          <div>
            <Text size="xl" inline>
              Drag CSV here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  );
}

function TableView() {
  const [listData, setListData] = useAtom(_list_data);
  return (
    <>
      <Stack>
        {listData && (
          <Stack>
            <ScrollArea h={300}>
              {/* {JSON.stringify(listData)} */}
              <Table>
                <thead>
                  <tr>
                    {_.keys(listData[0]).map((v, i) => (
                      <th key={i}>{v}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listData.map((v, i) => (
                    <tr key={i}>
                      {_.values(v).map((vv, ii) => (
                        <td key={ii}>{vv}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          </Stack>
        )}
      </Stack>
    </>
  );
}
