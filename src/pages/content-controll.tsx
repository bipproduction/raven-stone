import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { signal } from "@preact/signals-react";
import { menuSelected } from "@/g_state/s_menu_selected";
import list_contextual_content from "./../assets/contextual_content.json";
import { MdAdd, MdArrowForwardIos } from "react-icons/md";
import { sOpenEdit } from "@/g_state/s_open_edit";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import _ from "lodash";

export const EditorContextualContent = () => {
  const selectedItem = signal(list_contextual_content[0].title);
  return (
    <Stack bg={"gray.1"} p={"md"}>
      <Title>Contextual Controll</Title>
      <Stack>
        {list_contextual_content.map((v) => (
          <Box key={v.title}>
            <EditItem title={v.title} />
          </Box>
        ))}
      </Stack>
      <Group position="right"></Group>
    </Stack>
  );
};

const listmenuya = [
  {
    id: "1",
    name: "contexttual content",
    content: EditorContextualContent,
  },
  {
    id: "2",
    name: "ini dua",
    content: Text,
  },
];

const EditItem = ({ title }: { title: string }) => {
  const data = useForm({
    initialValues: list_contextual_content.find((v) => v.title == title),
  });
  const [buka, setbuka] = useDisclosure(false);

  const onSave = async () => {
    console.log(data.values);
  };
  return (
    <>
      <Flex>
        {/* {JSON.stringify(sOpenEdit.value)} */}
        <Button variant={"default"} onClick={setbuka.open}>
          {title}
        </Button>
      </Flex>
      <Modal size={"70%"} opened={buka} onClose={setbuka.close}>
        <Stack>
          <Group position="right">
            <Button compact onClick={onSave}>
              save
            </Button>
          </Group>
          <TextInput
            placeholder={data.values?.title}
            p={"xs"}
            {...data.getInputProps("title")}
          />
          <NumberInput
            placeholder={data.values?.audiences.toString()}
            p={"xs"}
            {...data.getInputProps("audiences")}
          />
          <Flex justify={"space-between"}>
            {data.values?.emotion.map((v, i) => (
              <Box key={v.name} p={"xs"}>
                <Stack p={"xs"} bg={"gray.1"} mt={"md"}>
                  <Text fw={"bold"} color={"dark"}>
                    {_.upperCase(v.name)}
                  </Text>
                  <TextInput
                    placeholder={v.value.toString()}
                    {...data.getInputProps(`emotion.${i}.value`)}
                  />
                </Stack>
                <Stack p={"xs"} bg={"gray.1"}>
                  {v.cluster.map((v2, i2) => (
                    <Box key={v2.name}>
                      <Text fw={"bold"}>{_.upperCase(v2.name)}</Text>
                      {v2.data.map((v3, i3) => (
                        <Box key={v3.name}>
                          <Text fz={12} c={"gray"}>
                            {v3.name}
                          </Text>
                          <TextInput
                            placeholder={v3.value.toString()}
                            {...data.getInputProps(
                              `emotion.${i}.cluster.${i2}.data.${i3}.value`
                            )}
                          />
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

const ContentControll = () => {
  // const [selectedMenu, setSelectedMenu] = useState<string>("1");

  return (
    <>
      <Stack>
        <Group sx={{ zIndex: 100 }} top={0} pos={"sticky"}>
          <Button.Group p={"xs"}>
            {listmenuya.map((v) => (
              <Button
                variant={menuSelected.value == v.id ? "filled" : "default"}
                w={120}
                compact
                key={v.id}
                onClick={() => {
                  menuSelected.value = v.id;
                }}
              >
                {v.name}
              </Button>
            ))}
          </Button.Group>
        </Group>
        <Stack>
          {listmenuya.map(
            (v) => v.id == menuSelected.value && <v.content key={v.id} />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ContentControll;
