import { api } from "@/lib/api";
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

const MapControllLeaderPersonaPrediction = ({ dataKab }: any) => {
  const [open, setOpen] = useDisclosure(false);
  const update = useForceUpdate();
  const [isAda, setisAda] = useState(false);
  const [listData, setListData] = useState<any[]>([]);

  const formData = useForm({
    initialValues: {
      data: [
        { title: "Gagah", value: 0 },
        { title: "Tegas", value: 0 },
        { title: "Merakyat", value: 0 },
        { title: "Jujur", value: 0 },
        { title: "Cerdas", value: 0 },
        { title: "Pekerja Keras", value: 0 },
      ],
    },
  });

  useShallowEffect(() => {
    fetch(
      api.apiMapControllContextualDirectionLeaderPesonaPredictionGet +
        `?cityId=${dataKab.data.City.id}`
    )
      .then((v) => v.json())
      .then((v) => {
        if (!_.isEmpty(v)) {
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
      cityId: dataKab.data.City.id,
      data: formData.values.data,
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
    formData.removeListItem("data", item);
  };
  return (
    <>
      <Button compact onClick={setOpen.open}>
        Persona Prediction
      </Button>
      <Drawer
        opened={open}
        onClose={setOpen.close}
        position={"bottom"}
        lockScroll
      >
        <Container>
          <Stack>
            <Title>{dataKab.name}</Title>
            <Group position="right" pos={"sticky"} top={0} sx={{ zIndex: 99 }}>
              <Button onClick={onAddWord}>Add</Button>
              <Button bg={isAda ? "orange" : "blue"} onClick={onSave}>
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
        </Container>
        {/* {JSON.stringify(dataKab)} */}
      </Drawer>
    </>
  );
};

export default MapControllLeaderPersonaPrediction;
