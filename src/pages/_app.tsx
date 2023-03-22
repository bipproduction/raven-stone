import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "rsuite/dist/rsuite.min.css";
import { PropsWithChildren } from "react";
import LoadProvince from "@/load_data/load_province";
import { useShallowEffect } from "@mantine/hooks";
import { funcLoadProvince } from "@/fun_load/func_load_province";
import { funLoadMapData } from "@/fun_load/func_load_map_data";
import { funcLoadCandidate } from "@/fun_load/func_load_candidate";
import { funcLoadTop10Province } from "@/fun_load/func_load_to_10_province";
import { funcLoadWordCloud } from "@/fun_load/func_load_word_cloud";
import { funcLoadSourceOfmention } from "@/fun_load/func_load_source_of_mention";
import { funcLoadNationWideChart } from "@/fun_load/func_load_nation_wide_chart";
import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { funcLoadIndonesiaMap } from "@/fun_load/func_load_indonesia_map";
import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
import { funcLoadEmotionalViwViaProvinceByDate } from "@/fun_load/func_load_emotion_view_via_province";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  useShallowEffect(() => {
    funcLoadCandidate();
    funcLoadIndonesiaMap();
    funLoadMapData();
    funcLoadNationWideChart();
    funcLoadNationWideRating()
    funcLoadProvince();
    funcLoadSourceOfmention();
    funcLoadTop10Province();
    funcLoadTop10District();
    funcLoadWordCloud();
    funcLoadEmotionalViwViaProvinceByDate()
  }, []);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <LoadDataFirst>
          <Component {...pageProps} />
        </LoadDataFirst>
      </MantineProvider>
    </>
  );
}

const LoadDataFirst = ({ children }: PropsWithChildren) => {
  useShallowEffect(() => {}, []);
  return <>{children}</>;
};
