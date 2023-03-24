import { gIsDev } from "@/g_state/g_is_dev";
import { api } from "@/lib/api";
import { useHookstate } from "@hookstate/core";
import { Button, Center, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useInputState, useShallowEffect } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import toast from "react-simple-toasts";

const DevAuthProvider = ({ children }: PropsWithChildren) => {
    const isDev = useHookstate(gIsDev);
    useShallowEffect(() => {
      const dev_id = localStorage.getItem("dev_id");
      if (dev_id) {
        isDev.set(true);
      } else {
        isDev.set(false);
      }
    });
  
    const [email, setEmail] = useInputState("");
    const [password, setPassword] = useInputState("");
  
    const onLogin = async () => {
      const body = {
        email,
        password,
      };
  
      fetch(api.apiAuthLoginDev, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(async (res) => {
        if (res.status === 201) {
          const dev = await res.json();
          localStorage.setItem("dev_id", dev.id);
          gIsDev.set(true);
        } else {
          toast("wrong email or password , call your dev please !");
        }
      });
    };
  
    if (isDev.value === undefined) return <></>;
    if (!isDev.value)
      return (
        <>
          <Center bg={"gray"} h={"100vh"}>
            <Paper p={"md"}>
              <Stack>
                <Title>Dev Login</Title>
                <Text>if you are dev, login please</Text>
                <TextInput
                  value={email}
                  label={"email"}
                  placeholder={"email"}
                  icon={<MdEmail />}
                  onChange={setEmail}
                />
                <PasswordInput
                  value={password}
                  label={"password"}
                  icon={<MdPassword />}
                  onChange={setPassword}
                />
                <Button onClick={onLogin}>LOGIN</Button>
              </Stack>
            </Paper>
          </Center>
        </>
      );
  
    return <>{children}</>;
  };

  export default DevAuthProvider