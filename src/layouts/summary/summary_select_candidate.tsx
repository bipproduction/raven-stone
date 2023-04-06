import { funcLoadTop10Province } from "@/fun_load/func_load_to_10_province";
import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { sCandidate } from "@/s_state/s_candidate";
import { sListEmotion } from "@/s_state/s_list_emotion";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { sSelectedEmotion } from "@/s_state/s_selected_emotion";
import { stylesGradientBlueWhite } from "@/styles/styles_gradient_blue_white";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Flex,
  Group,
  HoverCard,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import AnimateCssReact from "animate-css-reactjs";
import SummaryHoverInfo from "./summary_hover_info";

const SummarySelectCandidate = () => {
  const update = useForceUpdate();
  return (
    <>
      <Group position="apart" py={"lg"}>
        <Paper p={"md"} bg={stylesGradientBlueWhite} shadow={"md"} w={300}>
          <Stack>
            <Flex>
              {[
                sCandidate.value.find((v) => v.id == 1),
                sCandidate.value.find((v) => v.id == 2),
                sCandidate.value.find((v) => v.id == 3),
              ].map((v, i) => (
                <Box key={i} p={"sm"}>
                  <ActionIcon
                    radius={100}
                    size={63}
                    onClick={async () => {
                      // gSelectedCandidate.set(v!.id.toString());
                      sSelectedCandidate.value = v!.id.toString();
                      await funcLoadTop10District();
                      await funcLoadTop10Province();
                      update();
                    }}
                  >
                    <Avatar
                      size={63}
                      src={v?.img}
                      style={{
                        border:
                          Number(sSelectedCandidate.value) == v?.id
                            ? "4px solid yellow"
                            : "",
                        filter:
                          Number(sSelectedCandidate.value) == v?.id
                            ? "none"
                            : "grayscale(100%)",
                      }}
                    />
                  </ActionIcon>
                </Box>
              ))}
            </Flex>
            <Flex justify="space-between" align={"end"}>
              <Title color={"blue.1"} order={3}>
                {
                  sCandidate.value.find(
                    (v) => v.id == Number(sSelectedCandidate.value)
                  )?.name
                }
              </Title>
              <SummaryHoverInfo text="klik untuk melihat data kandidat" />
            </Flex>
          </Stack>
          <Select
            placeholder={sSelectedEmotion.value}
            variant={"filled"}
            searchable
            label={"sort emotion"}
            data={sListEmotion.value.map((v) => ({
              label: v.name,
              value: v.name,
            }))}
            onChange={async (val) => {
              if (val) {
                // sSelectedEmotion.set(val);
                sSelectedEmotion.value = val;
                await funcLoadTop10District();
                await funcLoadTop10Province();
                update();
              }
            }}
          />
        </Paper>
        <Group position="right" align={"end"}>
          {/* <Select
            placeholder={sSelectedEmotion.value}
            variant={"filled"}
            searchable
            label={"sort emotion"}
            data={sListEmotion.value.map((v) => ({
              label: v.name,
              value: v.name,
            }))}
            onChange={async (val) => {
              if (val) {
                // sSelectedEmotion.set(val);
                sSelectedEmotion.value = val;
                await funcLoadTop10District();
                await funcLoadTop10Province();
                update();
              }
            }}
          /> */}
          {/* <HoverCard>
            <HoverCard.Target>
              <ActionIcon
                sx={{
                  border: "2px solid white",
                  borderRadius: "100px",
                }}
              >
                <Image src={"/icon_robot.svg"} alt={"icon"} width={24} />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Stack>
                <Center>
                  <AnimateCssReact animation="bounce">
                    <Image width={100} src={"/icon_robot.svg"} alt={"icon"} />
                  </AnimateCssReact>
                </Center>
                <Text>Pilih atau sort Emotion Sesuai kebutuhan</Text>
              </Stack>
            </HoverCard.Dropdown>
          </HoverCard> */}
        </Group>
      </Group>
    </>
  );
};

export default SummarySelectCandidate;
