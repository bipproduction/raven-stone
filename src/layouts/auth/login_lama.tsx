import { api } from "@/lib/api";
import { sUser } from "@/s_state/s_user";
import { BackgroundImage, Button, Center, Group, Paper, PasswordInput, ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import _ from "lodash";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import toast from "react-simple-toasts";

const LoginLama = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>("1");
    const [email, setEmail] = useInputState("");
    const [password, setPassword] = useInputState("");
    const { t, lang } = useTranslation();
    return (
        <Stack>
            <BackgroundImage src="https://str.wibudev.com/api/file/get/cllki3cuf00059uhkmaugrypc.png">
                <ScrollArea>
                    <Center h={"100vh"}>
                        <Stack justify={"center"}>
                            {/* <Title c={"indigo"}>RAVEN STONE</Title> */}
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
    )
}

export default LoginLama