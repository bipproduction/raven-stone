import { gUser } from "@/g_state/auth/g_user";
import { gIsDev } from "@/g_state/g_is_dev";
import { api } from "@/lib/api";
import { useHookstate } from "@hookstate/core";
import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useInputState, useShallowEffect } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import toast from "react-simple-toasts";
import Dashboard from "./dashboard";

const DevAuthProvider = ({ children }: PropsWithChildren) => {
  //   const isDev = useHookstate(gIsDev);
  const user = useHookstate(gUser);
  //   useShallowEffect(() => {
  //     const dev_id = localStorage.getItem("user_id");
  //     if (dev_id) {
  //       isDev.set(true);
  //     } else {
  //       const userId = localStorage.getItem("user_id");
  //       fetch(api.apiAuthGetUserById + `?id=${userId}`)
  //         .then((v) => v.json())
  //         .then(gUser.set);
  //       isDev.set(false);
  //     }
  //   });

  //   const [email, setEmail] = useInputState("");
  //   const [password, setPassword] = useInputState("");

  //   const onLogin = async () => {
  //     const body = {
  //       email,
  //       password,
  //     };

  //     fetch(api.apiAuthLoginDev, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     }).then(async (res) => {
  //       if (res.status === 201) {
  //         const dev = await res.json();
  //         localStorage.setItem("user_id", dev.id);
  //         gIsDev.set(true);
  //       } else {
  //         toast("wrong email or password , call your dev please !");
  //       }
  //     });
  //   };

  if (user.value === undefined) return <></>;
  if (user.value && user.value.userRoleId != 2)
    return (
      <>
        <Text>Oh No ... you are not dev , please call your dev</Text>
        {/* <Center bg={"gray"} h={"100vh"}>
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
        </Center> */}
      </>
    );

  return <>{children}</>;
};

export default DevAuthProvider;
