import { api } from "@/lib/api";
import { sCandidate } from "@/s_state/s_candidate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Radio,
  Select,
  SimpleGrid,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-simple-toasts";
import { DevStepEditor } from "./dev_step_analisys_editor";
import { signal } from "@preact/signals-react";
import psr from "html-react-parser";
import assert from "assert";
import { Editor } from "@tiptap/react";

const _listSwotContent = signal<any[]>([]);

function _funLoadContent(candateId: string) {
  fetch(api.apiDevSwotAnalisysContentGet + `?candidateId=${candateId}`)
    .then((v) => v.json())
    .then((v) => {
      _listSwotContent.value = v;
    });
}

export function DevSwotAnalisys() {
  return (
    <Stack>
      <Title>DevSwot</Title>
      <SimpleGrid cols={2}>
        <SwotAnalisysCreateTitle />
        <CreateSwot />
      </SimpleGrid>
      <SwotListView />
    </Stack>
  );
}

const _listTitle = signal<any[]>([]);
function _funLoadSwotTitle() {
  fetch(api.apiDevSwotAnalisysTitleGet)
    .then((v) => v.json())
    .then((v) => {
      console.table(v);
      _listTitle.value = v;
    });
}

function SwotAnalisysCreateTitle() {
  const [title, setTitle] = useState<string>();
  // const [titleList, setTitlelist] = useState<any[]>();
  const [category, setCategory] = useState("double");
  const [sentiment, setSentiment] = useState("positive");

  function onCreate() {
    if (_.isEmpty(title)) return toast("title tidak boleh kosong");

    const body = {
      name: title,
      category: category,
      sentiment: sentiment,
    };

    fetch(api.apiDevSwotAnalisysTitleCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (v) => {
      if (v.status != 201) return toast("failed");
      // loadData();
      _funLoadSwotTitle();
      return toast("title berhasil dibuat");
    });
  }

  // function loadData() {
  //   fetch(api.apiDevSwotAnalisysTitleGet)
  //     .then((v) => v.json())
  //     .then(setTitlelist);
  // }

  function onDeleteTitle(v: any) {
    if (!v.id) return toast("id tidak boleh kosong");

    fetch(api.apiDevSwotAnalisysTitleDelete, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: v.id }),
    }).then((v) => {
      if (v.status == 201) {
        // loadData();
        _funLoadSwotTitle();
        return toast("title berhasil dihapus");
      }
      return toast("title gagal dihapus");
    });
  }

  useShallowEffect(() => {
    // loadData();
    _funLoadSwotTitle();
  }, []);

  function onSentimentUpdate(v: any) {
    fetch(api.apiDevSwotAnalisysTitleSentimentUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: v.id, sentiment: v.sentiment }),
    }).then((v) => {
      if (v.status == 201) {
        // loadData();
        _funLoadSwotTitle();
        return toast("sentiment berhasil diupdate");
      } else {
        return toast("sentiment gagal diupdate");
      }
    });
  }

  return (
    <>
      <Paper 
      // bg={"cyan.1"}
      >
        <Stack p={"md"}>
          <Group position="right">
            <Stack>
              <Title order={3}>Create Title</Title>
              <TextInput
                label={"title"}
                value={title ?? ""}
                onChange={(val) => setTitle(val.currentTarget.value)}
                size="xs"
                placeholder="input title"
              />
              <Radio.Group
                label={"sentiment"}
                description={"sentiment positive , negative | green , red"}
                value={sentiment}
                onChange={(val) => setSentiment(val)}
              >
                <Group>
                  <Radio value="positive" label={"positive"} />
                  <Radio value="negative" label={"negative"} />
                </Group>
              </Radio.Group>
              <Radio.Group
                description={"pilih single jika ingin single colum"}
                label={"category"}
                value={category}
                onChange={setCategory}
              >
                <Group spacing={"md"}>
                  <Radio value="single" label={"single"} />
                  <Radio value="double" label={"double"} />
                </Group>
              </Radio.Group>
              <Button compact onClick={onCreate}>
                create title
              </Button>
            </Stack>
          </Group>
          <Stack p={"md"} 
          // bg={"white"}
          >
            {_listTitle.value &&
              _listTitle.value.map((v, i) => (
                <Stack key={i}>
                  <Flex justify={"space-between"}>
                    <Flex gap={"md"}>
                      <EditName v={v} />
                      <Text>{i + 1}</Text>
                      <Stack>
                        <Text>{v.name}</Text>
                        <Radio.Group
                          value={v.sentiment}
                          onChange={(val) =>
                            onSentimentUpdate({ id: v.id, sentiment: val })
                          }
                        >
                          <Group>
                            <Radio value={"positive"} label={"positive"} />
                            <Radio value={"negative"} label={"negative"} />
                          </Group>
                        </Radio.Group>
                      </Stack>
                      <Badge>{v.category}</Badge>
                    </Flex>
                    <ActionIcon onClick={() => onDeleteTitle(v)}>
                      <MdDelete />
                    </ActionIcon>
                  </Flex>
                  <Divider />
                </Stack>
              ))}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

// todo : edit name disini
function EditName({ v }: { v: any }) {
  const [open, setOpen] = useDisclosure(false);
  const [name, setName] = useState<string>();
  function onUpdateName() {
    fetch(api.apiDevSwotAnalisysTitleNameUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: v.id, name: name }),
    }).then((v) => {
      if (v.status != 201) return toast("failed");
      _funLoadSwotTitle();
      setOpen.close();
      return toast("name berhasil diupdate");
    });
  }

  useShallowEffect(() => {
    _funLoadSwotTitle();
  }, []);
  return (
    <>
      <ActionIcon onClick={setOpen.open}>
        <MdEdit />
      </ActionIcon>
      <Modal opened={open} onClose={setOpen.close}>
        <Flex align={"end"} justify={"space-between"}>
          <TextInput
            size="xs"
            placeholder={v.name}
            onChange={(val) => setName(val.currentTarget.value)}
          />
          <Button onClick={onUpdateName} compact>
            update
          </Button>
        </Flex>
      </Modal>
    </>
  );
}

function CreateSwot() {
  // const [listTitle, setlistTitle] = useState<any[]>();
  const [selectedEmotion, setSelectedEmotion] = useState("positive");
  const [selectedCandidate, setSelectedCandidate] = useState<number>();
  const [selectedTitle, setSelectedTitle] = useState<number>();
  // const [isDouble, setisDouble] = useState(true);

  // function loadData() {
  //   fetch(api.apiDevSwotAnalisysTitleGet)
  //     .then((v) => v.json())
  //     .then(setlistTitle);
  // }

  useShallowEffect(() => {
    // loadData();
    _funLoadSwotTitle();
  }, []);

  function onCreate(content: string) {
    if (!selectedEmotion || !selectedCandidate || !selectedTitle || !content)
      return toast("lengkapi semua data");

    const body = {
      swotAnalisysNameId: selectedTitle,
      content: content,
      sentiment: selectedEmotion,
      candidateId: selectedCandidate,
    };

    fetch(api.apiDevSwotAnalisysContentCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (v) => {
      if (v.status == 201) {
        _funLoadContent("1");
        return toast("content berhasil dibuat");
      }
      return toast("content gagal dibuat");
    });
  }

  return (
    <>
      <Paper p={"md"} 
      // bg={selectedEmotion == "positive" ? "green.1" : "red.1"}
      >
        <Stack spacing={"lg"}>
          <Group position="right">
            <Stack>
              <Title order={3}>Create Swot</Title>
              <Select
                description={"pilih satu candidate"}
                onChange={(val) => {
                  if (val) setSelectedCandidate(Number(val));
                }}
                label={"select candidate"}
                size="xs"
                placeholder={
                  sCandidate.value.find(
                    (v) => Number(v.id) == Number(sSelectedCandidate.value)
                  )?.name
                }
                data={sCandidate.value.map(
                  (v) =>
                    ({
                      label: v.name,
                      value: v.id,
                    } as any)
                )}
              />
              {_listTitle.value && (
                <Select
                  description={"pilih title atau header"}
                  onChange={(val) => {
                    if (val) setSelectedTitle(Number(val));
                  }}
                  label={"select title"}
                  placeholder="select title"
                  size="xs"
                  data={
                    _listTitle.value?.map((v) => ({
                      label: v.name,
                      value: v.id,
                    })) as any
                  }
                />
              )}
            </Stack>
          </Group>
          <DevStepEditor
            content=""
            onsave={(val) => {
              if (_.isEmpty(val)) return toast("isi contentnya");
              onCreate(val.getHTML());
            }}
          />
        </Stack>
      </Paper>
    </>
  );
}

const _candidateId = signal("1")
function SwotListView() {
  //   const [listContent, setListContent] = useState<any[]>();
  // const [candateId, setCandidateId] = useState("1");
  //   const [sentiment, setSentiment] = useState("positive");
  //   const [category, setCategory] = useState("double");

  //   function loadData() {
  //     fetch(
  //       api.apiDevSwotAnalisysContentGet +
  //         `?candidateId=${candateId}`
  //     )
  //       .then((v) => v.json())
  //       .then(setListContent);
  //   }

  useShallowEffect(() => {
    _funLoadContent(_candidateId.value);
  }, []);

  function onDelete(id: string) {
    fetch(api.apiDevSwotAnalisysContentDelete, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then(async (v) => {
      if (v.status == 201) {
        _funLoadContent(_candidateId.value);
        return toast("content berhasil dihapus");
      }
      return toast("content gagal dihapus");
    });
  }

  return (
    <Stack p={"md"} 
    // bg={"teal.1"} 
    spacing={"lg"}>
      <Group>
        <Stack>
          <Stack spacing={0}>
            <Title order={3}>View</Title>
            {/* <Text c={"gray"}>green positive red negative</Text> */}
          </Stack>
          <Select
            label="select candidate"
            placeholder={
              sCandidate.value.find((v) => Number(v.id) == Number(_candidateId.value))
                ?.name
            }
            size="xs"
            value={_candidateId.value}
            data={
              sCandidate.value.map((v) => ({
                label: v.name,
                value: v.id,
              })) as any
            }
            onChange={(val) => {
              if (val) _funLoadContent(val);
            }}
          />
        </Stack>
      </Group>

      <Table 
      // bg={"white"}
      >
        <thead>
          <tr>
            <th>
              <Title order={3}>Title</Title>
            </th>
            <th>
              <Title order={3}>Content</Title>
            </th>
          </tr>
        </thead>
        <tbody>
          {_listSwotContent.value?.map((v, i) => (
            <tr key={i}>
              <td
                style={{
                  verticalAlign: "top",
                }}
              >
                <Stack align="start" w={200}>
                  <Title order={5}>{v.name}</Title>
                </Stack>
              </td>
              <td>
                {!_.isEmpty(v.SwotAnalisys) &&
                  v.SwotAnalisys.map((v2: any, i2: any) => (
                    <Stack key={i2} spacing={"lg"}>
                      <Flex align={"start"} gap={"lg"}>
                        <Flex align={"start"} gap={"lg"}>
                          <UpdateContentButton
                            id={+v2.id}
                            content={v2.content}
                          />
                          <ActionIcon size={24} onClick={() => onDelete(v2.id)}>
                            <MdDelete size={24} color="red" />
                          </ActionIcon>
                          <Avatar radius={100}>{i2 + 1}</Avatar>
                        </Flex>
                        <Spoiler
                          maxHeight={50}
                          hideLabel={"hide"}
                          showLabel={"more"}
                        >
                          <Text>{psr(v2.content)}</Text>
                        </Spoiler>
                      </Flex>
                      <Divider />
                    </Stack>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
}

function UpdateContentButton({ id, content }: { id: number; content: string }) {
  const [open, setOpen] = useDisclosure(false);

  return (
    <>
      <ActionIcon size={24} onClick={setOpen.open}>
        <MdEdit size={24} color="orange" />
      </ActionIcon>
      <Modal opened={open} onClose={setOpen.close}>
        <DevStepEditor
          content={content}
          onsave={async (val) => {
            // console.log(val.getHTML())
            if (val) {
              const data = {
                id: id,
                content: val.getHTML(),
              };

              fetch(api.apiDevSwotAnalisysContentUpdate, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((v) => {
                if (v.status == 201) {
                  setOpen.close();
                  _funLoadContent(_candidateId.value);
                  return toast("content berhasil diupdate");
                }
                return toast("content gagal diupdate");
              });
            }
          }}
        />
      </Modal>
    </>
  );
}
