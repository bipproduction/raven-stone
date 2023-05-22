import {
  Card,
  Center,
  Grid,
  Loader,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { v3_fun_nation_wide_rating_load_list_data } from "../fun/v3_fun_nation_wide_rating_load_list_data";
import { useAtom } from "jotai";

import { v3_val_nation_wide_rating_selected_candidate } from "../val/v3_nation_wide_rating_selected_candidate";
import { v3_fun_nation_wide_rating_load_list_candidate } from "../fun/v3_fun_nation_wide_rating_load_list_candidate";
import { v3_val_nation_wide_rating_list_candidate } from "../val/v3_nation_wide_rating_list_candidate";
import PageTitle from "@/layouts/page_title";
import { V3ComNationWideRatingSelectCandidate } from "./com/v3_com_nation_wide_rating_select_candidate";
import { V3ComNationWideRatingLineChart } from "./com/v3_com_nation_wide_rating_line_chart";
import TextAnimation from "react-typing-dynamics";
import prs from "html-react-parser";
import { v3_val_nation_wide_rating_list_data } from "../val/v3_nation_wide_rating_list_data";
import EChartsReact from "echarts-for-react";

export function V3FrontNationWideRating() {
  const [listData, setListData] = useAtom(v3_val_nation_wide_rating_list_data);
  const [selectedCandidate, setSelectedCandidate] = useAtom(
    v3_val_nation_wide_rating_selected_candidate
  );

  useShallowEffect(() => {
    v3_fun_nation_wide_rating_load_list_data({
      setListData,
      candidate1Id: selectedCandidate.candidate1Id,
      candidate2Id: selectedCandidate.candidate2Id,
    });
  }, []);

  if (!listData)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <>
      {/* <Title>Front Nation Wide Rating</Title> */}
      <Stack spacing={"lg"}>
        <PageTitle
          title="NATION WIDE RATING"
          text="EMOTIONAL METERS BRAND MERGER SIMULATION"
        />
        <V3ComNationWideRatingSelectCandidate
          onProccess={() => {
            v3_fun_nation_wide_rating_load_list_data({
              candidate1Id: selectedCandidate.candidate1Id,
              candidate2Id: selectedCandidate.candidate2Id,
              setListData,
            });
          }}
        />
        <Grid>
          <Grid.Col span={8}>
            <V3ComNationWideRatingLineChart />
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p={"md"}>
              <Stack spacing={"lg"}>
                <SimpleGrid cols={2}>
                  <Title order={3}>WINNING RATES PREDICTION</Title>
                  <Card>
                    <Center h={80}>
                      {!listData ? (
                        <Loader />
                      ) : !listData[0] ? (
                        <>
                          <Title>0 %</Title>
                        </>
                      ) : (
                        <Title c={"green"}>{listData![0].rate} %</Title>
                      )}
                    </Center>
                  </Card>
                </SimpleGrid>
                <Card>
                  {!listData ? (
                    <Loader />
                  ) : !listData[0] ? (
                    <>
                      <Text>Empty Data ...</Text>
                    </>
                  ) : (
                    <ScrollArea h={450} c={"white"}>
                      {listData && listData![0] && (
                        <TextAnimation
                          key={listData![0].id}
                          phrases={[listData![0].text]}
                          typingSpeed={10}
                          backspaceDelay={500}
                          eraseDelay={0}
                          errorProbability={0.1}
                          eraseOnComplete={false}
                        />
                      )}
                    </ScrollArea>
                  )}
                </Card>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>

      {/* {JSON.stringify(listData)}
      {JSON.stringify(selectedCandidate)} */}
    </>
  );
}
