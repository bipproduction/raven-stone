import {
  Box,
  Flex,
  Grid,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Top10DistrictbyConversation from "./top_10_district_by_conversation";
import Top10ProvinceByConversation from "./top_10_province_by_conversation";
import SummarySelectCandidate from "./summary_select_candidate";
import Sambutan from "../sambutan";
import SummaryDataChart from "./summary_data_chart";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { SummaryTrenSentiment } from "./summary_tren_sentiment";
import { Top5WinningRate } from "./top_5_winning_rate";
import { ViewGlobalAccessBlock } from "@/global/view/access_block";
import { sUser } from "@/s_state/s_user";
import Trs from "@/fun_load/trs";
import useTranslate from "next-translate/useTranslation";
import PageSubTitle from "@/global/components/PageSubTitle";
import { sCandidate } from "@/s_state/s_candidate";

const MainSummary = () => {
  const { t, lang } = useTranslate();
  return (
    <>
      <Stack spacing={32}>
        {/* <Sambutan /> */}
        

        <PageSubTitle text1={t('common:p_emotional')} text2={t('common:p_spectrum_chart')} />

        {[sCandidate.value.find((v, i) => v.id == 1), sCandidate.value.find((v) => v.id == 2), sCandidate.value.find((v) => v.id == 3),].map((v, i) => (
          <div key={i}>
            <Grid align="center" w={"100%"} px={"xl"} key={v?.id}>
              <Grid.Col span={4} key={v?.id + '2'}>
                <Box p={"xs"} key={i}>
                  <ViewGlobalAccessBlock name="SummarySelectCandidate" key={v?.id + '4'}>
                    <SummarySelectCandidate id={v?.id} key={v?.id + '8'} />
                  </ViewGlobalAccessBlock>
                </Box>
              </Grid.Col>
              <Grid.Col span={7} key={v?.id} ml={80}>
                <ViewGlobalAccessBlock name="SummaryTrenSentiment" key={v?.id + '5'}>
                  <SummaryTrenSentiment id={v?.id} key={v?.id + '9'} />
                </ViewGlobalAccessBlock>
              </Grid.Col>
            </Grid>
            <ViewGlobalAccessBlock name={"Top10ProvinceByConversation"} key={v?.id + '6'}>
              <Top10ProvinceByConversation id={v?.id} key={v?.id + '10'} />
            </ViewGlobalAccessBlock>
            <ViewGlobalAccessBlock name="Top10DistrictbyConversation" key={v?.id + '7'}>
              <Top10DistrictbyConversation key={v?.id + '11'} />
            </ViewGlobalAccessBlock>
          </div>
        ))}

        <ViewGlobalAccessBlock name="Top5WinningRate">
          <Top5WinningRate />
        </ViewGlobalAccessBlock>
      </Stack>
    </>
  );
};

export default MainSummary;
