import { Box, Flex, Grid, Group, Paper, Stack } from "@mantine/core";
import { ComSelectCandidate } from "./com/com_select_candidate";
import PageTitle from "@/layouts/page_title";
import { useShallowEffect } from "@mantine/hooks";
import { fun_load_emotion_province } from "./fun/fun_load_emotion_province";
import { useAtom } from "jotai";
import { val_selected_candidate } from "./val/val_seleced_candidate";
import { val_list_emotion } from "./val/val_list_emotion";
import { ComChartBar } from "./com/com_chart_bar";

export const FrontEmotionalViewViaProvince = () => {
  const [candidateId, setCandidateId] = useAtom(val_selected_candidate);
  const [listEmotion, setListEmotion] = useAtom(val_list_emotion);

  useShallowEffect(() => {
    fun_load_emotion_province({
      candidateId,
      setListEmotion,
    });
  }, []);
  return (
    <>
      <Stack spacing={"lg"}>
        <PageTitle title={"Emotion View Province"} />
        <ComSelectCandidate />
        {listEmotion.map((v, i) => (
          <Box key={i} p={"md"}>
            <Paper p={"md"} shadow="md">
              <Flex >
                <ComChartBar lsData={v.emotion} />
                <pre>
                {JSON.stringify(v, null, 2)}
                </pre>
              </Flex>
              {/* <Grid>
                <Grid.Col span={"content"}>
                  <ComChartBar lsData={v.emotion} />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                    {JSON.stringify(v)}
                </Grid.Col>
              </Grid> */}
            </Paper>
          </Box>
        ))}
      </Stack>
    </>
  );
};
