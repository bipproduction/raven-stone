import { api } from "@/lib/api";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  List,
  Menu,
  Modal,
  Paper,
  Radio,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-simple-toasts";
import { DevStepEditor } from "./dev_step_analisys_editor";
import AIWriter from "react-aiwriter";
import parse from "html-react-parser";
import { _funStepAnalisysLoadListname } from "./dev_step_analisys_fun";
import { _valStepNamelist } from "./dev_step_analisys_val";
import { MdDelete, MdEdit } from "react-icons/md";
import { sCandidate } from "@/s_state/s_candidate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { stylesRadial } from "@/styles/styles_radial";
import _ from "lodash";

const listmenu = [
  {
    id: "1",
    title: "Create data",
    view: CreateData,
  },
  {
    id: "2",
    title: "inject data",
    view: InjectStepAnalisys,
  },
];

export function DevStepAnalisys() {
  const [selectedMenu, setSelectedMenu] = useState("1");
  const KEY_SELECTED = "devStepAnalisys_selectedMenu";

  useShallowEffect(() => {
    const selected = localStorage.getItem(KEY_SELECTED);
    if (selected) {
      setSelectedMenu(selected);
    }
  }, []);
  function onSelectedMenu(id: string) {
    setSelectedMenu(id);
    localStorage.setItem(KEY_SELECTED, id);
  }

  return (
    <Stack spacing={"lg"}>
      <Title>Dev Step</Title>
      <Flex p={"xs"} 
      // bg={"gray.2"}
      >
        <Button.Group>
          {listmenu.map((v) => (
            <Button
              bg={v.id == selectedMenu ? "blue" : "gray.6"}
              w={150}
              onClick={() => onSelectedMenu(v.id)}
              compact
              key={v.id}
            >
              {v.title}
            </Button>
          ))}
        </Button.Group>
      </Flex>
      {listmenu.map((v, i) => (
        <Box key={i} hidden={v.id != selectedMenu}>
          <v.view key={v.id} />
        </Box>
      ))}
    </Stack>
  );
}

const listStepName = ["sosial", "technology", "suggestions based ai"];
function InjectStepAnalisys() {
  const [isLoading, setisLoading] = useState(false);
  async function inject() {
    setisLoading(true);
    fetch(api.apiDevStepAnalisysInjectName, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listStepName),
    }).then(async (v) => {
      if (v.status == 201) {
        setisLoading(false);
        toast("Success");
      } else {
        setisLoading(false);
        toast("Failed");
      }
    });
  }
  return (
    <Stack>
      <Paper p={"md"}>
        <Stack>
          <Flex justify={"space-between"} 
          // bg={"gray.1"} 
          p={"xs"}>
            <Stack spacing={0}>
              <Text>Available List </Text>
              <Text fz={12} color="gray">
                data static , hanya gunakan jika data belum ada
              </Text>
            </Stack>
            <Button loading={isLoading} onClick={inject} compact w={150}>
              Inject
            </Button>
          </Flex>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {listStepName.map((v, i) => (
                <tr key={i}>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      </Paper>
    </Stack>
  );
}

function CreateNewName() {
  const [name, setname] = useState<string | undefined>();

  async function create() {
    if (!name) return toast("Name is required");
    fetch(api.apiDevStepAnalisysCreateName, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then((v) => {
      if (v.status == 201) {
        setname(undefined);
        _funStepAnalisysLoadListname();
        return toast("Success");
      }
      return toast("Failed");
    });
  }

  //   const [listData, setlistData] = useState<any[] | undefined>(undefined);

  useShallowEffect(() => {
    // loadData();
    _funStepAnalisysLoadListname();
  }, []);

  //   async function loadData() {
  //     fetch(api.apiDevStepAnalisysLoadListName)
  //       .then((v) => v.json())
  //       .then((v) => {
  //         setlistData(v);
  //       });
  //   }

  return (
    <Group>
      <Paper p={"md"} shadow="xs" m={"xs"} w={500}>
        <Text>Create New Name</Text>
        <Stack spacing={"lg"}>
          <TextInput
            onChange={(val) => setname(val.currentTarget.value)}
            size="xs"
            placeholder="Name"
          />
          {name && (
            <Button onClick={create} compact w={150}>
              Create
            </Button>
          )}
          <List>
            {_valStepNamelist.value &&
              _valStepNamelist.value.map((v, i) => (
                <Flex key={i} justify={"space-between"} gap={"lg"}>
                  <Flex gap={"lg"}>
                    <StepUpdateButton data={v} />
                    <Text>{i + 1}</Text>
                    <Text>{v.name}</Text>
                  </Flex>
                  <Text color="blue" fw={"bold"}>
                    {v._count.StepAnalisys}
                  </Text>
                </Flex>
              ))}
          </List>
        </Stack>
      </Paper>
    </Group>
  );
}

function StepUpdateButton({ data }: { data: any }) {
  const [open, setOpen] = useDisclosure(false);
  const [listData, setListData] = useState<any[]>();
  const [dataUpdate, setDataUpdate] = useState<any>();

  async function loadData() {
    fetch(
      api.apiStepStepAnalisysGetByNameCandidate +
        `?nameId=${data.id}&candidateId=${sSelectedCandidate.value}`
    )
      .then((v) => v.json())
      .then(setListData);
  }

  function onUpdateName() {
    fetch(api.apiDevStepAnalisysNameUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    }).then((v) => {
      if (v.status == 201) {
        _funStepAnalisysLoadListname();
        return toast("Success");
      }
      return toast("Failed");
    });
  }

  function ondeleteData(val: any) {
    fetch(api.apiDevStepAnalisysDataDelete, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: val.id }),
    }).then((v) => {
      if (v.status == 201) {
        loadData();
        return toast("Success");
      }

      return toast("Failed");
    });
  }
  return (
    <>
      <ActionIcon onClick={setOpen.open}>
        <MdEdit />
      </ActionIcon>
      <Modal
        scrollAreaComponent={ScrollArea.Autosize}
        title={data.name}
        opened={open}
        onClose={setOpen.close}
        size={"lg"}
      >
        <Stack spacing={"lg"} h={700}>
          <Stack>
            <Group position="apart">
              <Flex gap={"lg"} align={"end"}>
                <TextInput
                  onChange={(val) => {
                    setDataUpdate({
                      id: data.id,
                      name: val.currentTarget.value,
                    });
                  }}
                  size="xs"
                  placeholder={data.name}
                />
                <Button onClick={onUpdateName} bg={"orange"} compact>
                  edit
                </Button>
              </Flex>
              <ActionIcon onClick={() => {}} variant="outline" size={24}>
                <MdDelete size={24} color="red" />
              </ActionIcon>
            </Group>
          </Stack>
          <Divider h={4} bg={"blue"} />
          <Stack>
            <Flex gap={"md"}>
              <Select
                size="xs"
                onChange={(val) => {
                  if (val) sSelectedCandidate.value = val;
                }}
                placeholder={sCandidate.value[0].name}
                data={
                  sCandidate.value.map((v) => ({
                    label: v.name,
                    value: v.id,
                  })) as any
                }
              />
              <Button onClick={loadData} compact>
                load
              </Button>
            </Flex>
          </Stack>
          {/* {JSON.stringify(listData)} */}
          {listData && listData[0] && (
            <Table>
              <tbody>
                {listData.map((v, i) => (
                  <tr key={i}>
                    <td>{v.id}</td>
                    <td>{v.data}</td>
                    <td>{v.sentiment}</td>
                    <td>
                      <ActionIcon size={24} onClick={() => ondeleteData(v)}>
                        <MdDelete size={24} color="red" />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Stack>
      </Modal>
    </>
  );
}

function CreateData() {
  return (
    <>
      <Group align="start">
        <CreateNewName />
        <CreateNewStep />
      </Group>
    </>
  );
}

function CreateNewStep() {
  //   const [listname, setListname] = useState<any[]>();
  const [selectedSentimen, setSelectedSentimen] = useState("positive");
  const [nameId, setnameId] = useState<number>();
  const [candidateId, setCandidateId] = useState<number>();

  useShallowEffect(() => {
    _funStepAnalisysLoadListname();
  }, []);

  //   function loadData() {
  //     fetch(api.apiDevStepAnalisysLoadListName)
  //       .then((v) => v.json())
  //       .then(setListname);
  //   }

  //   const [data, setData] = useState<Element>();
  const prop = {
    delay: 200,
  };

  const listSentimen = [
    {
      id: "positive",
      name: "positive",
      value: "positive",
      selected: true,
    },
    {
      id: "negative",
      name: "negative",
      value: "negative",
      selected: false,
    },
  ];
  return (
    <>
      <Group position="right">
        <Paper m={"xs"} p={"md"} w={500}>
          <Text>Create New Step</Text>
          <Stack spacing={"lg"}>
            <Select
              size="xs"
              label={"candidate"}
              placeholder="pilih candidate"
              onChange={(val) => {
                setCandidateId(Number(val));
              }}
              data={sCandidate.value.map(
                (v) =>
                  ({
                    label: v.name,
                    value: v.id,
                  } as any)
              )}
            />
            {_valStepNamelist.value && (
              <Select
                label={"select name"}
                size="xs"
                placeholder="select name"
                data={_valStepNamelist.value!.map((v) => ({
                  label: v.name,
                  value: v.id,
                }))}
                onChange={(val) => {
                  if (val) {
                    setnameId(Number(val));
                  }
                }}
              />
            )}
            <Radio.Group
              label={"select sentiment"}
              description={"tentukan sentiment"}
              value={selectedSentimen}
              onChange={setSelectedSentimen}
            >
              <Group>
                {listSentimen.map((v) => (
                  <Radio checked key={v.id} value={v.value} label={v.name} />
                ))}
              </Group>
            </Radio.Group>
            <DevStepEditor
              content=""
              onsave={(val) => {
                if (val) {
                  //   setContent(parse(val.getHTML()) as any);
                  const dataContent = {
                    nameId: nameId,
                    sentimen: selectedSentimen,
                    content: val.getHTML(),
                    candidateId: candidateId,
                  };

                  fetch(api.apiDevStepAnalisysDataCreate, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataContent),
                  }).then((v) => {
                    if (v.status == 201) {
                      //   loadData();
                      _funStepAnalisysLoadListname();
                      return toast("Success");
                    }

                    return toast("Failed");
                  });
                }
              }}
            />
            {/* <AIWriter {...prop}>{data}</AIWriter> */}
          </Stack>
        </Paper>
      </Group>
    </>
  );
}
