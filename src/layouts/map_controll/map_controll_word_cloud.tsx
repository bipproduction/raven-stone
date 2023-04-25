import { api } from "@/lib/api";
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
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useDisclosure,
  useForceUpdate,
  useShallowEffect,
} from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import toast from "react-simple-toasts";

const listData: any[] = [];

const MapControllWorCloud = ({ dataKab }: { dataKab: any }) => {
  const [open, setOpen] = useDisclosure(false);
  const update = useForceUpdate();
  const [isAda, setisAda] = useState(false);

  const formData = useForm({
    initialValues: {
      data: listData,
    },
  });

  useShallowEffect(() => {
    fetch(
      api.apiMapControllContextualDirectionWordCloudGet +
        `?cityId=${dataKab.City.id}`
    )
      .then((v) => v.json())
      .then((v) => {
        if (!_.isEmpty(v) && v.data.content) {
          formData.setValues({ data: v.data.content });
          setisAda(!_.isEmpty(v));
        }
      });
  }, []);

  const onAddWord = async () => {
    const data = {
      title: "new word",
      value: 0,
    };
    formData.insertListItem("data", data);
  };

  const onSave = async () => {
    if (_.isEmpty(formData.values.data))
      return toast("tidak bisa menyimpan kehampaan , buatlah terlebih dahulu");
    const body = {
      cityId: dataKab.City.id,
      data: formData.values.data,
    };

    fetch(api.apiMapControllContextualDirectionWordCloudPost, {
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
    formData.removeListItem("data", item);
  };
  return (
    <>
      <Paper
        p={"md"}
        radius={8}
        shadow="md"
        m={"md"}
        bg={"orange.1"}
        sx={stylesNeon("teal")}
      >
        <Title>REGIONS HOT ISSUE</Title>
        <Stack>
          {/* {JSON.stringify(dataKab)} */}
          <Title>{dataKab.name}</Title>
          <Group position="right" pos={"sticky"} top={0} sx={{ zIndex: 99 }}>
            <Button w={150} compact onClick={onAddWord}>
              Add
            </Button>
            <Button
              w={150}
              compact
              bg={isAda ? "orange" : "blue"}
              onClick={onSave}
            >
              {isAda ? "UPDATE" : "SAVE"}
            </Button>
          </Group>
          <SimpleGrid cols={3}>
            {formData.values.data.map((v, i) => (
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
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>
    </>
  );
};

export default MapControllWorCloud;
