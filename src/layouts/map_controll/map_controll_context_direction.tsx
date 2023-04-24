import { funcLoadCityContextDirection } from "@/fun_load/func_load_city_context_direction";
import { api } from "@/lib/api";
import { sCityContextDirection } from "@/s_state/s_city_ontext_irection";
import { stylesNeon } from "@/styles/styles_neon";
import { stylesRadial } from "@/styles/styles_radial";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import toast from "react-simple-toasts";

const MapControllContextDirection = ({ dataKab }: { dataKab: any }) => {
  const hasilEdit = signal<any[]>([]);
  const cityId = dataKab.City.id;
  const [open, setOpen] = useDisclosure(false);
  const listDataContextDirection: { [key: string]: any } =
    sCityContextDirection.value.find((v) => v.cityId == cityId) ?? {};

  const onSave = () => {
    const body = {
      id: listDataContextDirection.id,
      content: listDataContextDirection.content,
    };

    fetch(api.apiUtilCityContextDirectionUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((v) => {
      if (v.status == 201) {
        toast("success");
        funcLoadCityContextDirection();
      }
    });
  };
  return (
    <>
      <ContentView />
    </>
  );

  function ContentView() {
    return (
      <>
        <Paper p={"md"}  m={"md"} sx={stylesNeon("green")}>
          <Stack spacing={"lg"}>
            {/* <Text>{JSON.stringify(dataKab.data.City.id)}</Text> */}
            <Title>Context Direction</Title>
            {/* {JSON.stringify(listDataContextDirection)} */}
            {/* // todo perbaiki dilampung selatan kosong */}
            <SimpleGrid cols={3}>
              {listDataContextDirection &&
                listDataContextDirection.content &&
                listDataContextDirection.content.map((v: any, i: any) => (
                  <Box key={v.name}>
                    <NumberInput
                      // value={v.value}
                      min={0}
                      label={v.name}
                      placeholder={v.value.toString()}
                      onChange={(val) => {
                        if (val) {
                          // disini
                          listDataContextDirection.content[i].value = val;
                          hasilEdit.value = listDataContextDirection.content;
                        }
                      }}
                    />
                  </Box>
                ))}
            </SimpleGrid>
            <Group position="right">
              <Button w={150} onClick={onSave} compact>
                SAVE
              </Button>
            </Group>
          </Stack>
        </Paper>
      </>
    );
  }
};

export default MapControllContextDirection;
