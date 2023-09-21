import { api } from "@/lib/api";
import { sUser } from "@/s_state/s_user";
import { BackgroundImage, Button, Center, Group, Paper, PasswordInput, PinInput, ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import toast from "react-simple-toasts";
import { _isCodeOtp, _isDataUser, _isMaxTimeOut, _isVerficationCode } from "./val_login";


export const VerificationCode = () => {
    const { t, lang } = useTranslation();
    const [otp, setOtp] = useState("");
    const [valCode, setCode] = useAtom(_isCodeOtp);
    const [user, setUser] = useAtom(_isDataUser);
    const [valTimeOut, setValTimeOut] = useAtom(_isMaxTimeOut)
    const [isVerif, setIsVerif] = useAtom(_isVerficationCode);
    const now = new Date();
    return (
        <Stack>
            <BackgroundImage src="https://str.wibudev.com/api/file/get/cllki3cuf00059uhkmaugrypc.png">
                <ScrollArea>
                    <Center h={"100vh"}>
                        <Stack justify={"center"}>
                            {/* <Title c={"indigo"}>RAVEN STONE</Title> */}
                            <Paper p={"md"}>
                                <Stack>
                                    <Title>{_.upperCase(t('common:verification_code'))}</Title>
                                    <Center>
                                        <PinInput onChange={setOtp} />
                                    </Center>
                                    <Group>
                                        <MdVerifiedUser color="green" />
                                        <Text color={"green"}>{t('common:akses_aman')}</Text>
                                        <Text color={"green"}>{t('common:akses_aman')}</Text>
                                    </Group>
                                    <Button
                                        bg={"indigo"}
                                        onClick={() => {
                                            if (otp != valCode.toString()) return toast("Incorrect verification code");
                                            const body = {
                                                id: user.userId,
                                                isLogin: true,
                                            };
                                            fetch(api.apiUpdIsLogin, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify(body),
                                            }).then(async (res) => {
                                                if (res.status === 200) {
                                                    localStorage.setItem("user_id", user.userId);
                                                    toast("success");
                                                    sUser.value = user
                                                    // 1 jam = 1 * 60 * 60 * 1000
                                                    // 1 menit = 1 * 60  * 1000
                                                    const expTime = now.getTime() + (1 * 60 * 60 * 1000);
                                                    setValTimeOut(expTime)
                                                    // console.log(now.getTime()+'----'+ new Date(expTime));
                                                    setIsVerif(false)
                                                }
                                            });
                                        }}
                                    >
                                        SUBMIT
                                    </Button>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Center>
                </ScrollArea>
            </BackgroundImage>
        </Stack>
    )
}

const LoginBaru = () => {
    const [email, setEmail] = useInputState("");
    const [password, setPassword] = useInputState("");
    const { t, lang } = useTranslation();
    const [isVerif, setIsVerif] = useAtom(_isVerficationCode);
    const [valCode, setCode] = useAtom(_isCodeOtp);
    const [user, setUser] = useAtom(_isDataUser);

    const code = Math.floor(Math.random() * 1000) + 1000;

    if (isVerif) return <VerificationCode />
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
                                                password
                                            };
                                            fetch(api.apiAuthLoginBaru, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify(body),
                                            }).then(async (res) => {
                                                if (res.status === 200) {
                                                    const data = await res.json();
                                                    setCode(code)
                                                    await fetch(`https://wa.wibudev.com/code?nom=${data.phone}&text=${code}`)
                                                        .then(
                                                            async (res) => {
                                                                if (res.status == 200) {
                                                                    setIsVerif(true)
                                                                    setUser(data)
                                                                    toast('Verification code has been sent')
                                                                } else {
                                                                    toast('Error')
                                                                }
                                                            }
                                                        );
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
                </ScrollArea>
            </BackgroundImage>
        </Stack>
    )
}

export default LoginBaru