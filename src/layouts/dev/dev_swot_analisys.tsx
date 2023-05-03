import { api } from "@/lib/api";
import { sCandidate } from "@/s_state/s_candidate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  Radio,
  Select,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-simple-toasts";
import { DevStepEditor } from "./dev_step_analisys_editor";
import { signal } from "@preact/signals-react";
import psr from "html-react-parser";

const _contentExten = signal<any[]>([]);

function loadContent(candateId: string) {
  fetch(api.apiDevSwotAnalisysContentGet + `?candidateId=${candateId}`)
    .then((v) => v.json())
    .then((v) => {
      _contentExten.value = v;
    });
}

export function DevSwotAnalisys() {
  return (
    <Stack>
      <Title>DevSwot</Title>
      <Group align="start">
        <Stack>
          <SwotAnalisysCreateTitle />
          <SwotListView />
        </Stack>
        <CreateSwot />
      </Group>
    </Stack>
  );
}

function SwotAnalisysCreateTitle() {
  const [title, setTitle] = useState<string>();
  const [titleList, setTitlelist] = useState<any[]>();
  const [category, setCategory] = useState("double");

  function onCreate() {
    if (_.isEmpty(title)) return toast("title tidak boleh kosong");

    const body = {
      name: title,
      category: category,
    };

    fetch(api.apiDevSwotAnalisysTitleCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (v) => {
      if (v.status != 201) return toast("failed");
      loadData();
      return toast("title berhasil dibuat");
    });
  }

  function loadData() {
    fetch(api.apiDevSwotAnalisysTitleGet)
      .then((v) => v.json())
      .then(setTitlelist);
  }

  function onDeleteTitle(v: any) {
    if (!v.title || _.isEmpty(v.title))
      return toast("title tidak boleh kosong");
    fetch(api.apiDevSwotAnalisysTitleDelete, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: v.title }),
    }).then((v) => {
      if (v.status == 201) {
        loadData();
        return toast("title berhasil dihapus");
      }
      return toast("title gagal dihapus");
    });
  }

  useShallowEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Paper bg={"cyan.1"}>
        <Stack p={"md"} w={500}>
          <Title order={3}>Create Title</Title>
          <TextInput
            label={"title"}
            value={title ?? ""}
            onChange={(val) => setTitle(val.currentTarget.value)}
            size="xs"
            placeholder="input title"
          />
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
          <Stack p={"md"} bg={"white"}>
            {/* {JSON.stringify(titleList)} */}
            {titleList &&
              titleList.map((v, i) => (
                <Stack key={i}>
                  <Flex justify={"space-between"}>
                    <Flex gap={"md"}>
                      <Text>{i + 1}</Text>
                      <Text>{v.name}</Text>
                      <Badge>{v.category}</Badge>
                    </Flex>
                    <ActionIcon onClick={() => onDeleteTitle(v)}>
                      <MdDelete />
                    </ActionIcon>
                  </Flex>
                </Stack>
              ))}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

function CreateSwot() {
  const [listTitle, setlistTitle] = useState<any[]>();
  const [selectedEmotion, setSelectedEmotion] = useState("positive");
  const [selectedCandidate, setSelectedCandidate] = useState<number>();
  const [selectedTitle, setSelectedTitle] = useState<number>();
  const [isDouble, setisDouble] = useState(true);

  function loadData() {
    fetch(api.apiDevSwotAnalisysTitleGet)
      .then((v) => v.json())
      .then(setlistTitle);
  }

  useShallowEffect(() => {
    loadData();
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
        loadContent("1");
        return toast("content berhasil dibuat");
      }
      return toast("content gagal dibuat");
    });
  }

  return (
    <>
      <Paper
        w={500}
        p={"md"}
        bg={selectedEmotion == "positive" ? "green.1" : "red.1"}
      >
        <Stack spacing={"lg"}>
          <Title order={3}>Crrate Swot</Title>
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
          {listTitle && (
            <Select
              description={"pilih title atau header"}
              onChange={(val) => {
                if (val) setSelectedTitle(Number(val));
              }}
              label={"select title"}
              placeholder="select title"
              size="xs"
              data={
                listTitle?.map((v) => ({
                  label: v.name,
                  value: v.id,
                })) as any
              }
            />
          )}
          <Radio.Group
            description={"pilih sentiment positive atau negative"}
            name="sentiment"
            label="sentiment"
            value={selectedEmotion}
            onChange={setSelectedEmotion}
          >
            <Group mt="xs">
              <Radio value="positive" label="positive" />
              <Radio value="negative" label="negative" />
            </Group>
          </Radio.Group>
          {/* <Checkbox
            checked={isDouble}
            label={"is double"}
            description={
              "uncheck jika ingin menampilhan hanya satu kolom tanpa negative atau positive"
            }
            onChange={(val) => {
              setisDouble(val.currentTarget.checked);
            }}
          /> */}
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

function SwotListView() {
  //   const [listContent, setListContent] = useState<any[]>();
  const [candateId, setCandidateId] = useState("1");
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
    loadContent(candateId);
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
        loadContent(candateId);
        return toast("content berhasil dihapus");
      }
      return toast("content gagal dihapus");
    });
  }

  return (
    <Stack p={"md"} bg={"teal.1"} spacing={"lg"}>
      <Stack spacing={0}>
        <Title order={3}>View</Title>
        <Text c={"gray"}>green positive red negative</Text>
      </Stack>
      <Select
        label="select candidate"
        placeholder={
          sCandidate.value.find((v) => Number(v.id) == Number(candateId))?.name
        }
        size="xs"
        value={candateId}
        data={
          sCandidate.value.map((v) => ({
            label: v.name,
            value: v.id,
          })) as any
        }
        onChange={(val) => {
          if (val) loadContent(val);
        }}
      />

      <Box w={500}>
        <Stack spacing={"lg"}>
          {_contentExten.value.map((v, i) => (
            <Box key={i}>
              <Flex>
                <Text fw={"bold"}>{_.upperCase(v.name)}</Text>
                <Badge>{v.category}</Badge>
              </Flex>
              {/* <JsonToTable json={v.SwotAnalisys} /> */}
              {v.SwotAnalisys.map((v2: any, i2: any) => (
                <Paper
                  p={"xs"}
                  key={i2}
                  mt={"xs"}
                  bg={v2.sentiment == "positive" ? "green" : "red"}
                >
                  <Flex key={i2} justify={"space-between"}>
                    <Text lineClamp={4} c={"white"}>
                      {psr(v2.content)}
                    </Text>
                    <ActionIcon size={24} bg={"white"}>
                      <MdDelete size={24} color="red.2" />
                    </ActionIcon>
                  </Flex>
                </Paper>
              ))}
            </Box>
          ))}
          {/* {JSON.stringify(_contentExten.value)} */}
        </Stack>
      </Box>
    </Stack>
  );
}
