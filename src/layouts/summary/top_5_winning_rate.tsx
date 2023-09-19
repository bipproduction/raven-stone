import {
  Card,
  Center,
  Divider,
  Flex,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import PageTitle from "../page_title";
import { useShallowEffect } from "@mantine/hooks";
import { api } from "@/lib/api";
import { atom, useAtom } from "jotai";
import { fun_componen_access_upsert } from "../dev_dashboard/component_access/fun/fun_upsert";
import useTranslate from "next-translate/useTranslation";
import Trs from "@/fun_load/trs";
import _ from "lodash";
import PageSubTitle from "@/global/components/PageSubTitle";

const _val_list_top_5_winning_rate = atom<any[] | undefined>(undefined);

export function Top5WinningRate() {
  const { t, lang } = useTranslate();
  const [listTop5, setTop5] = useAtom(_val_list_top_5_winning_rate);
  useShallowEffect(() => {
    fetch(api.apiSummaryTop5WinningRate)
      .then((v) => v.json())
      .then(setTop5);
  }, []);

  // useShallowEffect(() => {
  //   fun_componen_access_upsert({
  //     data: {
  //       name: Top5WinningRate.name,
  //     },
  //   });
  // }, []);

  if (!listTop5)
    return (
      <>
        <Center>
          <Loader />
        </Center>
      </>
    );

  return (
    <>
      {/* <pre>
   {JSON.stringify(listTop5, null,2)}
   </pre> */}
      <PageSubTitle text1="SUCCESS" text2="PROBABILITY PROJECTION (TOP 5)" />

      <Paper p={"md"} >
        <Stack px={"lg"}>
          {/* <Trs text="TOP 5 NATIONAL WINNING RATES PREDICTION" lang={lang}>
            {(val: any) => <PageTitle title={val} />}
          </Trs> */}
          {/* <PageTitle title={_.upperCase(t('common:top_5_national_winning_rates_prediction'))} /> */}
          <SimpleGrid cols={3}>
            {listTop5.map((v, i) => (
              <Card key={i} shadow="md">
                <Stack spacing={"lg"} align="center" justify="center">
                  <Stack key={i} align="center" justify="center">
                    <SimpleGrid cols={2}>
                      <Center>
                        <Stack align="center" justify="center" spacing={"lg"}>
                          <Image
                            radius={8}
                            width={100}
                            height={100}
                            src={v.candidate1.img}
                            alt={""}
                          />
                          <Title align="center" lineClamp={1} order={5}>
                            {v.candidate1.name}
                          </Title>
                        </Stack>
                      </Center>
                      <Center>
                        <Stack align="center" justify="center" spacing={"lg"}>
                          <Image
                            radius={8}
                            width={100}
                            height={100}
                            src={v.candidate2.img}
                            alt={""}
                          />
                          <Title align="center" lineClamp={1} order={5}>
                            {v.candidate2.name}
                          </Title>
                        </Stack>
                      </Center>
                    </SimpleGrid>
                  </Stack>
                  <Divider w={"100%"} />
                  <Title c={"green"} size={72} align="center">
                    {v.persen} %
                  </Title>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>
    </>
  );
}
