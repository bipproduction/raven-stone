import { funcLoadCityContextDirection } from "@/fun_load/func_load_city_context_direction";
import { api } from "@/lib/api";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { sCityContextDirection } from "@/s_state/s_city_ontext_irection";
import {
  Box,
  Button,
  Container,
  Drawer,
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import toast from "react-simple-toasts";

const MapControllContextDirection = ({ dataKab }: { dataKab: any }) => {
  const hasilEdit = signal<any[]>([]);
  const cityId = dataKab.data.City.id;
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
      <Button compact onClick={setOpen.open}>
        context direction
      </Button>
      <Drawer opened={open} onClose={setOpen.close} position={"bottom"} >
        <Container>
          {cityId}
          <Paper p={"xs"} bg={stylesGradient1}>
            {/* <Text>{JSON.stringify(dataKab.data.City.id)}</Text> */}
            <Title order={3}>Context Direction</Title>
            {/* {JSON.stringify(listDataContextDirection)} */}
            {/* // todo perbaiki dilampung selatan kosong */}
            <SimpleGrid cols={3}>
              { listDataContextDirection && listDataContextDirection.content && listDataContextDirection.content.map((v: any, i: any) => (
                <Box key={v.name}>
                  <NumberInput
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
            <Group position="right" p={"xs"}>
              <Button onClick={onSave} compact>
                SAVE
              </Button>
            </Group>
          </Paper>
        </Container>
      </Drawer>
    </>
  );
};

export default MapControllContextDirection;
