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
import moment from "moment";
import { mc_list_candidate } from "./map_controll_state";
import toast from "react-simple-toasts";

const openModal = atomWithStorage("map_controll_inject_data_modal", false);
const _list_data = atomWithStorage<any[] | undefined>(
  "map_controll_inject_list_data",
  undefined
);
const _type = atomWithStorage<string | undefined>(
  "map_controll_inject_type",
  undefined
);

const _fileName = atomWithStorage<string | undefined>(
  "map_controll_inject_file_name",
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
          {listData && <TableView />}
        </Stack>
      </Modal>
    </>
  );
}

function DropView() {
  const [listData, setListData] = useAtom(_list_data);
  const [type, setType] = useAtom(_type);
  const [fileName, setFilename] = useAtom(_fileName);

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

            setFilename(name);

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
  const [type, setType] = useAtom(_type);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedCandidate, setSelectedCandidate] = useState<number>();
  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate);
  const [loading, setLoading] = useState(false);
  const [fileName, setFilename] = useAtom(_fileName);

  function onUpdate() {
    setLoading(true);
    fetch(api.apiDevEmotionUpdateInsert, {
      method: "POST",
      body: JSON.stringify({
        type: type,
        data: listData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 201) {
        setLoading(false);
        return toast("success");
      }

      setLoading(false);
      return toast("error");
    });
  }

  function onInsert() {
    setLoading(true);
    fetch(api.apiDevEmotionUpdateInsert, {
      method: "POST",
      body: JSON.stringify({
        type: type,
        data: listData,
        date: selectedDate,
        candidateId: selectedCandidate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 201) {
        setLoading(false);
        return toast("success");
      }

      setLoading(false);
      return toast("error");
    });
  }
  return (
    <>
      <Stack>
        {listData && (
          <Stack>
            <Title>{type}</Title>
            <Group position="right">
              {type === "insert" && (
                <Flex gap={`xs`} align={"end"}>
                  <DateInput
                    onChange={(val) => {
                      if (val) {
                        setSelectedDate(moment(val).format("YYYY-MM-DD"));
                      }
                    }}
                    label="Date"
                    placeholder="select date"
                    size="xs"
                  />
                  <Select
                    placeholder="select candidate"
                    onChange={(val) => {
                      if (val) {
                        setSelectedCandidate(Number(val));
                      }
                    }}
                    data={
                      listCandidate?.map((v) => ({
                        label: v.name,
                        value: v.id,
                      })) as any
                    }
                    label="Candidate"
                    size="xs"
                  />
                  {selectedDate && selectedCandidate && (
                    <Button disabled={loading} onClick={onInsert} compact>
                      INSERT
                    </Button>
                  )}
                </Flex>
              )}
              {type === "update" && (
                <Group>
                  <Text>
                    {_.upperCase(
                      fileName?.split("__")[0].replace("update", "")
                    )}
                  </Text>
                  <Text>
                    {fileName?.split("__")[1].split("_")[1].split(".")[0]}
                  </Text>
                  <Button
                    disabled={loading}
                    onClick={onUpdate}
                    c={"white"}
                    variant="white"
                    bg={"orange"}
                    compact
                  >
                    UPDATE
                  </Button>
                </Group>
              )}
            </Group>
            <Text
              sx={{
                borderRadius: "5px",
              }}
              bg={"gray"}
              c={"white"}
              p="xs"
              size={"sm"}
              fs={"italic"}
            >
              system auto detect , update or insert by file name , make sure
              file name is correct
            </Text>
            <ScrollArea h={300}>
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
