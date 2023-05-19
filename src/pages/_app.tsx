import { funcLoadCity } from "@/fun_load/func_load_city";
import { funcLoadCandidate } from "@/fun_load/func_load_candidate";
import funcLoadEmotion from "@/fun_load/func_load_emotion";
import { funcLoadEmotionalViwViaProvinceByDate } from "@/fun_load/func_load_emotion_view_via_province";
import { funcLoadIndonesiaMap } from "@/fun_load/func_load_indonesia_map";
import { funLoadMapData } from "@/fun_load/func_load_map_data";
import { funcLoadNationWideChart } from "@/fun_load/func_load_nation_wide_chart";
import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
import { funcLoadProvince } from "@/fun_load/func_load_province";
import { funcLoadSourceOfmention } from "@/fun_load/func_load_source_of_mention";
import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { funcLoadTop10Province } from "@/fun_load/func_load_top_10_province";
import { funcLoadWordCloud } from "@/fun_load/func_load_word_cloud";
// import { gUser } from "@/g_state/auth/g_user";
import MyMain from "@/layouts/my_main";
import { api } from "@/lib/api";
import { fDb } from "@/lib/fbs";
import { useHookstate } from "@hookstate/core";
import { MantineProvider, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { onChildChanged, onValue, ref } from "firebase/database";
import _ from "lodash";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import "rsuite/dist/rsuite.min.css";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import { funcLoadCityContextDirection } from "@/fun_load/func_load_city_context_direction";
import { funcLoadNotification } from "@/fun_load/func_load_notification";
import { sIsLocal } from "@/s_state/is_local";
import { funcloadContextualContent } from "@/fun_load/func_load_contextual_conetent";
import { sUser } from "@/s_state/s_user";
import "animate.css";
import { funcLoadCandidateValue } from "@/fun_load/func_load_candidate_value";
import { httpCityValueTotal } from "@/http/http_city_value_total_get";
import { useAtom } from "jotai";
import { _is_dark_mode } from "@/g_state/atom_util_state";
import { sCandidate } from "@/s_state/s_candidate";
import { mc_list_candidate } from "@/layouts/map_controll/map_controll_state";
import LoadCandidate from "@/load_data/load_candidate";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [isDarkMode, setIsDarkMode] = useAtom(_is_dark_mode);
  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate)

  useShallowEffect(() => {
    const local = localStorage.getItem("is_local");
    if (local) {
      sIsLocal.value = local === "true";
    }
  }, []);

  useShallowEffect(() => {
    LoadCandidate()
  }, [])

  const funcLoadCandidate = () => fetch(api.apiUtilGetCandidate)
    .then((v) => v.json())
    .then(v => {
        sCandidate.value = v
        setListCandidate(v)
        
    });

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
    funcLoadEmotion();
    funcLoadCity();
    funcLoadCityContextDirection();
    funcLoadNotification();
    funcloadContextualContent();
    funcLoadCandidateValue();
    httpCityValueTotal.load();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Geneva",
          fontFamilyMonospace: "Monaco, Courier, monospace",
          headings: { fontFamily: "Impact" },
          colorScheme: `${isDarkMode ? "dark" : "light"}`,
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
  // const user = useHookstate(gUser);
  useShallowEffect(() => {
    const userId = localStorage.getItem("user_id");

    fetch(api.apiAuthGetUserById + `?id=${userId}`)
      .then((v) => v.json())
      .then((v) => (sUser.value = v));
  }, []);

  if (sUser.value == undefined) return <>{JSON.stringify(sUser.value)} </>;
  if (_.isEmpty(sUser.value))
    return (
      <>
        <MyMain />
      </>
    );

  return <>{children}</>;
};

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const [openUpadte, setOpenUpdate] = useDisclosure(false);
  // const user = useHookstate(gUser);
  const router = useRouter();

  useShallowEffect(() => {
    return onValue(ref(fDb, "eagle_2/update"), (val) => {
      if (!sIsLocal.value) {
        if (val.val()) {
          setOpenUpdate.open();
        } else {
          setOpenUpdate.close();
        }
      }
    });
  }, []);

  useShallowEffect(() => {
    return onChildChanged(ref(fDb, "eagle_2/reload"), (snap) => {
      if (snap.val()) {
        Swal.fire("update finish, please reload").then((v) => {
          if (v.value) {
            router.reload();
          }
        });
      }
    });
  }, []);

  useShallowEffect(() => {
    return onChildChanged(ref(fDb, "eagle_2/force_reload"), (snap) => {
      if (snap.val()) {
        router.reload();
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
        // withCloseButton={user.value && user.value.userRoleId == 2}
        withCloseButton={false}
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
