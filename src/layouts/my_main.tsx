import { sUser } from "@/s_state/s_user";
import {
  Center,
  Loader,
  Overlay,
  Paper,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useInputState, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { } from "react-icons/fa";
import {
  MdBarChart,
  MdGridView,
  MdMessage,
  MdVerifiedUser
} from "react-icons/md";
import toast from "react-simple-toasts";
import Medialistener from "./media_listener/media_listener";
import PredictiveAi from "./prodictive_ai/prodictive_ai";
import Summary from "./summary/summary_derecated";
// import { gUser } from "@/g_state/auth/g_user";
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from "next/router";
import _ from "lodash";
import LoginLama from "./auth/login_lama";
import LoginBaru from "./auth/login_baru";


const listmenu = [
  {
    label: "summary",
    id: "1",
    icon: MdGridView,
  },
  {
    label: "media listener",
    id: "2",
    icon: MdMessage,
  },
  {
    label: "predictive ai",
    id: "3",
    icon: MdBarChart,
  },
];

const listContent = [
  {
    id: "1",
    widget: Summary,
  },
  {
    id: "2",
    widget: Medialistener,
  },
  {
    id: "3",
    widget: PredictiveAi,
  },
];

const MyMain = () => {
  const { t, lang } = useTranslation();
  const [dataTrans, setDataTrans] = useState("")
  const [url, setUrl] = useState<string | null>(null)

  useShallowEffect(() => {
    fetch('/api/translate', {
      method: "POST",
      body: JSON.stringify({
        text: "ini adalah data yang harus di translate",
        from: "id",
        to: lang
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (res) => {
      if (res.status == 201) {
        const hasil = await res.json()
        setDataTrans(hasil.text)
        return
      }

      console.log("error translate my_main")
    })
  }, [])

  useShallowEffect(() => {
    if (window) {
      setUrl(window.location.href)
    }
  }, [])

  if (!url) return <Center><Loader /></Center>
  if (url.includes('eagle')) return <Center w={"100vw"} h={"100vh"}>
    <Overlay pos={"fixed"} h={"100%"} w={"100%"} blur={4} display={sUser.value!.name === "fami" ? "none" : "block"} >
      <Center h={"100vh"}>
        <Paper p={"md"} bg={"yellow.0"} >
          <Stack justify="center" align="center">

            <Title color="red" align="center">This project has been terminated and shutdown on July 19, 2023</Title>
            <Text color="black" w={"70%"} align="center">All features, functions, storage services, and embedded algorithms within the artificial intelligence automation have ceased to operate</Text>
          </Stack>
        </Paper>
      </Center>
    </Overlay>
  </Center>

  return (
    <>
      {/* LOGIN YANG BARU */}
      <LoginBaru />






      {/* LOGIN YANG LAMA */}
      {/* <LoginLama /> */}
    </>
  );
};

export default MyMain;
