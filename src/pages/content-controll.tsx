import { funcLoadNotification } from "@/fun_load/func_load_notification";
import { funcSendnotification } from "@/fun_load/func_send_notification";
import { sListCity } from "@/g_state/s_list_city";
import { menuSelected } from "@/g_state/s_menu_selected";
import { fDb } from "@/lib/fbs";
import { stylesGradientMixYellowRed } from "@/styles/styles_gradient_mix_yellow_red";
import { sListNotification } from "@/s_state/s_list_notification";
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { ref, set } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import { MdSearch } from "react-icons/md";
import toast from "react-simple-toasts";
import list_contextual_content from "./../assets/contextual_content.json";

const selectedKabupaten = signal("");

export const EditorContextualContent = () => {
  return (
    <Stack bg={"gray.1"} p={"md"}>
      <Title>Contextual Controll</Title>
      {/* {JSON.stringify(sListCity.value)} */}
      <Flex justify={"space-between"} align={"end"} gap={20}>
        <Select
          icon={<MdSearch />}
          placeholder={"select kabupaten"}
          searchable
          label={"Select Kabupaten"}
          data={sListCity.value.map((v) => ({
            label: v.name,
            value: v.id,
          }))}
          onChange={(val) => (selectedKabupaten.value = val as string)}
        />
        <Button>Create New</Button>
      </Flex>

      <Table>
        <thead>
          <tr>
            <th>No </th>
            <th>Content </th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {list_contextual_content.map((v, i) => (
            <tr key={v.title}>
              <td>{i + 1}</td>
              <td>{v.title}</td>
              <td>
                <Button.Group>
                  <EditItemButton title={v.title} />
                  <Button compact bg={"gray.1"} c={"pink"}>
                    Delete
                  </Button>
                </Button.Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <Stack>
        {list_contextual_content.map((v) => (
          <Box key={v.title}>
            <EditItem title={v.title} />
          </Box>
        ))}
      </Stack> */}
      {/* <Group position="right"></Group> */}
    </Stack>
  );
};

const formData = signal<{ [key: string]: any }>({});
const EditorNotification = () => {
  const onKirim = async () => {
    if (!formData.value.date || !formData.value.title || !formData.value.des)
      return toast("jangan ada yang kosong");
    const kirim = await funcSendnotification(formData.value);
    if (kirim) {
      set(ref(fDb, "eagle_2/notif/ada"), Math.random()).then((v) => {
        toast("success");
        funcLoadNotification();
      });
    }
  };

  return (
    <>
      <Group p={"md"} position={"center"}>
        <Paper bg={stylesGradientMixYellowRed} p={"md"} shadow={"md"}>
          <SimpleGrid cols={2}>
            <Stack
              sx={{
                overflow: "auto",
              }}
            >
              {/* {JSON.stringify(sListNotification.value)} */}
              {sListNotification.value.map((v) => (
                <Stack key={v.id} spacing={0} p={4} pb={4} bg={"blue.1"}>
                  <Text fw={"bold"}>{v.title}</Text>
                  <Text fz={12}>{v.date.split("T")[0]}</Text>
                  <Text fz={12}>{v.des}</Text>
                </Stack>
              ))}
            </Stack>
            <Stack spacing={"lg"}>
              <DatePicker
                onChange={(val) => {
                  formData.value.date = moment(val).format("YYYY-MM-DD");
                }}
              />
              <TextInput
                label={"title"}
                onChange={(val) =>
                  (formData.value.title = val.currentTarget.value)
                }
              />
              <Textarea
                cols={8}
                label={"description"}
                onChange={(val) =>
                  (formData.value.des = val.currentTarget.value)
                }
              />
              <Button onClick={onKirim}> Kirim </Button>
            </Stack>
          </SimpleGrid>
        </Paper>
      </Group>
    </>
  );
};

const listmenuya = [
  {
    id: "1",
    name: "Contextual Content",
    content: EditorContextualContent,
  },
  {
    id: "2",
    name: "notification",
    content: EditorNotification,
  },
];

const EditItemButton = ({ title }: { title: string }) => {
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
        <Button compact c={"orange"} bg={"gray.1"} onClick={setbuka.open}>
          edit
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
