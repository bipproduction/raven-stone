import { funcloadContextualContent } from "@/fun_load/func_load_contextual_conetent";
// import { sListCity } from "@/g_state/s_list_city";
import { menuSelected } from "@/g_state/s_menu_selected";
import { api } from "@/lib/api";
import { sContextualContent } from "@/s_state/s_contextual_content";
import { sListCity } from "@/s_state/s_list_city";
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  NumberInput, Select, Stack,
  Table,
  Text, TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import _ from "lodash";
import { MdSearch } from "react-icons/md";
import toast from "react-simple-toasts";
import Swal from "sweetalert2";
// import list_contextual_content from "../../assets/contextual_content.json";
import EditorNotification from "./content-controll__editor_notification";

const selectedKabupaten = signal("");
export const EditorContextualContent = () => {
  const onDelete = async (id: number) => {
    Swal.fire({
      title: "delete",
      text: "sure ?",
      confirmButtonText: "yes",
      cancelButtonText: "No",
    }).then((v) => {
      if (v.isConfirmed) {
        fetch(api.apiPredictiveAiContextualContentDelete, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }).then((v) => {
          if (v.status === 201) {
            toast("success");
            funcloadContextualContent();
          }
        });
      }
    });
  };
  return (
    <Stack bg={"gray.1"} p={"md"}>
      {/* {JSON.stringify(sContextualContent.value)} */}
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
          {sContextualContent.value.map((v, i) => (
            <tr key={v.data.title}>
              <td>{i + 1}</td>
              <td>{v.data.title}</td>
              <td>
                <Button.Group>
                  <EditItemButton title={v.data.title} />
                  <Button
                    onClick={() => onDelete(v.id)}
                    compact
                    bg={"gray.1"}
                    c={"pink"}
                  >
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
    initialValues: sContextualContent.value.find((v) => v.data.title == title),
  });
  const [buka, setbuka] = useDisclosure(false);

  const onUpdate = async () => {
    fetch(api.apiPredictiveAiContextualContentUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.values),
    }).then(async (v) => {
      if (v.status === 201) {
        toast("sucess");
        funcloadContextualContent();
      }
    });
  };

  const onCreate = async () => {
    fetch(api.apiPredictiveAiContextualContentCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.values.data),
    }).then(async (v) => {
      if (v.status === 201) {
        toast("success");
        funcloadContextualContent();
        setbuka.close();
      }
    });
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
            <Button bg={"orange"} compact onClick={onUpdate}>
              update
            </Button>
            <Button compact onClick={onCreate}>
              create
            </Button>
          </Group>
          <TextInput
            placeholder={data.values.data?.title}
            p={"xs"}
            {...data.getInputProps("data.title")}
          />
          <NumberInput
            placeholder={data.values?.data.audiences.toString()}
            p={"xs"}
            {...data.getInputProps("data.audiences")}
          />
          <Flex justify={"space-between"}>
            {data.values.data?.emotion.map((v: any, i: any) => (
              <Box key={v.name} p={"xs"}>
                <Stack p={"xs"} bg={"gray.1"} mt={"md"}>
                  <Text fw={"bold"} color={"dark"}>
                    {_.upperCase(v.name)}
                  </Text>
                  <TextInput
                    placeholder={v.value.toString()}
                    {...data.getInputProps(`data.emotion.${i}.value`)}
                  />
                </Stack>
                <Stack p={"xs"} bg={"gray.1"}>
                  {v.cluster.map((v2: any, i2: any) => (
                    <Box key={v2.name}>
                      <Text fw={"bold"}>{_.upperCase(v2.name)}</Text>
                      {v2.data.map((v3: any, i3: any) => (
                        <Box key={v3.name}>
                          <Text fz={12} c={"gray"}>
                            {v3.name}
                          </Text>
                          <TextInput
                            placeholder={v3.value.toString()}
                            {...data.getInputProps(
                              `data.emotion.${i}.cluster.${i2}.data.${i3}.value`
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
            (v) =>
              v.id == menuSelected.value && <v.content key={v.id} />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ContentControll;
