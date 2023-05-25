import { api } from "@/lib/api";
import { sMapControllEditorVal } from "@/s_state/s_map_controll_editor_val";
import { stylesNeon } from "@/styles/styles_neon";
import { stylesRadial } from "@/styles/styles_radial";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useDisclosure,
  useForceUpdate,
  useShallowEffect,
} from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import _ from "lodash";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import toast from "react-simple-toasts";

const listTemplate = [
  { title: "Pekerja Keras", value: 0 },
  { title: "Cerdas", value: 0 },
  { title: "Jujur", value: 0 },
  { title: "Merakyat", value: 0 },
  { title: "Tegas", value: 0 },
  { title: "Berpengalaman Memimpin", value: 0 },
  { title: "Berprestasi", value: 0 },
  { title: "Latar Belakang Militer", value: 0 },
  { title: "Agamis", value: 0 },
];
const listData = signal<any[]>([]);

const MapControllLeaderPersonaPrediction = () => {
  const [open, setOpen] = useDisclosure(false);
  // const update = useForceUpdate();
  const [isAda, setisAda] = useState(false);
  // const [listData, setListData] = useState<any[]>([]);

  // const formData = useForm({
  //   initialValues: {
  //     data: [
  //       { title: "Gagah", value: 0 },
  //       { title: "Tegas", value: 0 },
  //       { title: "Merakyat", value: 0 },
  //       { title: "Jujur", value: 0 },
  //       { title: "Cerdas", value: 0 },
  //       { title: "Pekerja Keras", value: 0 },
  //     ],
  //   },
  // });

  useShallowEffect(() => {
    sMapControllEditorVal.subscribe(() => {
      loadData();
    });
  }, []);

  function loadData() {
    fetch(
      api.apiMapControllContextualDirectionLeaderPesonaPredictionGet +
        `?cityId=${sMapControllEditorVal.value.City.id}`
    )
      .then((v) => v.json())
      .then((v) => {
        // console.log(sMapControllEditorVal.value.City.id);
        console.log(JSON.stringify(v));
        if (!_.isEmpty(v) || v != null) {
          // formData.setValues({ data: v.data.content });

          listData.value = v.data.content;
          setisAda(!_.isEmpty(v));
        } else {
          listData.value = listTemplate;
          setisAda(false);
        }
      });
  }

  const onAddWord = async () => {
    const data = {
      title: "new word",
      value: 0,
    };
    // formData.insertListItem("data", data);
    listData.value.push(data);
    listData.value = [...listData.value];
  };

  const onSave = async () => {
    if (_.isEmpty(listData.value))
      return toast("tidak bisa menyimpan kehampaan , buatlah terlebih dahulu");

    const body = {
      cityId: sMapControllEditorVal.value.City.id,
      data: listData.value,
    };

    fetch(api.apiMapControllContextualDirectionLeaderPesonaPredictionPost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (v) => {
      if (v.status === 201) {
        toast("success");
      }
    });
  };

  const onDeleteItem = (item: number) => {
    // formData.removeListItem("data", item);
    listData.value.splice(item, 1);
    listData.value = [...listData.value];
  };
  return <ContentView />;

  function ContentView() {
    return (
      <>
        {/* {JSON.stringify(formData.values)} */}
        <Paper m={"md"} p={"md"} bg={"green.1"} shadow="lg"  >
          <Stack>
            <Title>LEADER PERSONA PREDICTION</Title>
            {/* <Text>{sMapControllEditorVal.value.City.name}</Text> */}
            <Group position="right" pos={"sticky"} top={0} sx={{ zIndex: 99 }}>
              <Button compact w={150} onClick={onAddWord}>
                Add
              </Button>
              <Button
                compact
                w={150}
                bg={isAda ? "orange" : "blue"}
                onClick={onSave}
              >
                {isAda ? "UPDATE" : "SAVE"}
              </Button>
            </Group>

            <SimpleGrid cols={3}>
              {listData.value.map((v, i) => (
                <Box key={i}>
                  <Paper p={"xs"}>
                    <Flex gap={"md"}>
                      <Stack>
                        <TextInput
                          // value={v.title}
                          label={"word"}
                          onChange={(val) => {
                            listData.value[i].title = val.target.value;
                            listData.value = [...listData.value];
                          }}
                          placeholder={v.title}
                        />
                        <TextInput
                          // value={v.value}
                          label={"value"}
                          onChange={(val) => {
                            listData.value[i].value = val.target.value;
                            listData.value = [...listData.value];
                          }}
                          placeholder={v.value}
                        />
                      </Stack>
                      <ActionIcon
                        onClick={() => onDeleteItem(i)}
                        size={24}
                        radius={100}
                      >
                        <MdClose size={24} color={"pink"} />
                      </ActionIcon>
                    </Flex>
                  </Paper>
                </Box>
              ))}
              {/* {formData.values.data.map((v, i) => (
                <Box key={i}>
                  <Paper p={"xs"}>
                    <Flex gap={"md"}>
                      <Stack>
                        <TextInput
                          {...formData.getInputProps(`data.${i}.title`)}
                          placeholder="word"
                        />
                        <NumberInput
                          {...formData.getInputProps(`data.${i}.value`)}
                          placeholder="value"
                          min={0}
                        />
                      </Stack>
                      <ActionIcon
                        onClick={() => onDeleteItem(i)}
                        size={24}
                        radius={100}
                      >
                        <Avatar radius={100}>
                          <MdClose size={24} color={"pink"} />
                        </Avatar>
                      </ActionIcon>
                    </Flex>
                  </Paper>
                </Box>
              ))} */}
            </SimpleGrid>
          </Stack>
        </Paper>
      </>
    );
  }
};

export default MapControllLeaderPersonaPrediction;
