import {
  MdAllInbox,
  MdBarChart,
  MdChat,
  MdGridView,
  MdMessage,
  MdSecurityUpdate,
  MdSecurityUpdateGood,
  MdShelves,
  MdSystemSecurityUpdate,
  MdVerifiedUser,
  MdWifiProtectedSetup,
} from "react-icons/md";
import {} from "react-icons/fa";
import toast from "react-simple-toasts";
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Paper,
  PasswordInput,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import Summary from "./summary/summary_derecated";
import Medialistener from "./media_listener/media_listener";
import PredictiveAi from "./prodictive_ai/prodictive_ai";
import { gradient } from "@/styles/gradient";
import Link from "next/link";
import { useInputState } from "@mantine/hooks";
import { api } from "@/lib/api";
import { gIsUser } from "@/g_state/g_user_id";
import { useHookstate } from "@hookstate/core";
import { sUser } from "@/s_state/s_user";
// import { gUser } from "@/g_state/auth/g_user";

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
  // const user = useHookstate(gUser);
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
                    <Title>LOGIN</Title>
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
                      <Text color={"green"}>Secure Access</Text>
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
                      LOGIN
                    </Button>
                  </Stack>
                </Paper>
              </Stack>
            </Center>
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
