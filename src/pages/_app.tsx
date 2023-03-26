import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, Modal, Stack, Title } from "@mantine/core";
import "rsuite/dist/rsuite.min.css";
import { PropsWithChildren, useState } from "react";
import LoadProvince from "@/load_data/load_province";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
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
import { gIsUser } from "@/g_state/g_user_id";
import MyMain from "@/layouts/my_main";
import { useHookstate } from "@hookstate/core";
import { fDb } from "@/lib/fbs";
import { getDatabase, onValue, ref } from "firebase/database";
import { api } from "@/lib/api";
import { gUser } from "@/g_state/auth/g_user";
import _ from "lodash";
import Lottie from "lottie-react";
import funcLoadEmotion from "@/fun_load/func_load_emotion";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  useShallowEffect(() => {
    funcLoadCandidate();
    funcLoadIndonesiaMap();
    funLoadMapData();
    funcLoadNationWideChart();
    funcLoadNationWideRating();
    funcLoadProvince();
    funcLoadSourceOfmention();
    funcLoadTop10Province();
    funcLoadTop10District();
    funcLoadWordCloud();
    funcLoadEmotionalViwViaProvinceByDate();
    funcLoadEmotion()
    
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
        <FirebaseProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </FirebaseProvider>
      </MantineProvider>
    </>
  );
}

const AuthProvider = ({ children }: PropsWithChildren) => {
  // const isUser = useHookstate(gIsUser);
  const user = useHookstate(gUser);
  useShallowEffect(() => {
    const userId = localStorage.getItem("user_id");

    fetch(api.apiAuthGetUserById + `?id=${userId}`)
      .then((v) => v.json())
      .then(user.set);
  }, []);

  if (user.value == undefined) return <>{JSON.stringify(user.value)} </>;
  if (_.isEmpty(user.value))
    return (
      <>
        <MyMain />
      </>
    );

  return <>{children}</>;
};

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const [openUpadte, setOpenUpdate] = useDisclosure(false);
  const user = useHookstate(gUser);
  useShallowEffect(() => {
    return onValue(ref(fDb, "eagle_2/update"), (val) => {
      if (val.val()) {
        setOpenUpdate.open();
      } else {
        setOpenUpdate.close();
      }
    });
  }, []);

  return (
    <>
      {children}
      <Modal
        opened={openUpadte}
        onClose={setOpenUpdate.close}
        closeOnClickOutside={false}
        withCloseButton={user.value && user.value.userRoleId == 2}
      >
        <Stack align={"center"} justify={"center"}>
          <video
            style={{
              width: 200,
            }}
            autoPlay
            muted
            loop
            src="/sync.mp4"
          />
          <Title>Update Please wait ...</Title>
        </Stack>
      </Modal>
    </>
  );
};
