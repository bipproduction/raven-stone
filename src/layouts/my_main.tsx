import { api } from "@/lib/api";
import { sUser } from "@/s_state/s_user";
import {
  BackgroundImage,
  Button,
  Center,
  Group,
  Loader,
  Overlay,
  Paper,
  PasswordInput,
  ScrollArea,
  Stack,
  Text,
  TextInput,
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
  const [selectedMenu, setSelectedMenu] = useState<string>("1");
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");
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
      <Stack>
        <BackgroundImage src="https://str.wibudev.com/api/file/get/cllki3cuf00059uhkmaugrypc.png">
          <ScrollArea>
            <Center h={"100vh"}>
              <Stack justify={"center"}>
                <Title c={"indigo"}>RAVEN STONE</Title>
                <Paper p={"md"}>
                  <Stack>
                    <Title>{_.upperCase(t('common:login'))}</Title>
                    <TextInput
                      placeholder="email"
                      value={email}
                      onChange={setEmail}
                    />
                    <PasswordInput
                      placeholder="password"
                      value={password}
                      onChange={setPassword}
                    />
                    <Group>
                      <MdVerifiedUser color="green" />
                      <Text color={"green"}>{t('common:akses_aman')}</Text>
                      <Text color={"green"}>{t('common:akses_aman')}</Text>
                    </Group>
                    <Button
                      bg={"indigo"}
                      onClick={() => {
                        const body = {
                          email,
                          password,
                        };

                        fetch(api.apiAuthLogin, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(body),
                        }).then(async (res) => {
                          if (res.status === 200) {
                            const data = await res.json();
                            localStorage.setItem("user_id", data.userId);
                            toast("success");
                            // gIsUser.set(true);
                            // user.set(data);
                            sUser.value = data
                          } else {
                            toast("wrong email or password");
                          }
                        });
                      }}
                    >
                      {_.upperCase(t('common:login'))}
                    </Button>
                  </Stack>
                </Paper>
              </Stack>
            </Center>
            {/* <Flex pos={"absolute"} bottom={0} left={0} gap={"md"} p={"md"}>
            {/* <Flex pos={"absolute"} bottom={0} left={0} gap={"md"} p={"md"}>
              <Text>Bip Production @2023</Text>
              <Text>Version: 2.0.1</Text>
              <Text>build: 10453</Text>
              <Link href={""}>Term Of Service</Link>
            </Flex> */}
          </ScrollArea>
        </BackgroundImage>
      </Stack>
    </>
  );
};

export default MyMain;
