import { gUser } from "@/g_state/auth/g_user";
import DevAppBar from "@/layouts/dev/dev_app_bar";
import { useHookstate } from "@hookstate/core";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import { MdAccountCircle } from "react-icons/md";

const DevAuthProvider = ({ children }: PropsWithChildren) => {
  const user = useHookstate(gUser);

  if (user.value === undefined) return <></>;
  if (user.value && user.value.userRoleId != 2)
    return (
      <>
        <Text>Oh No ... you are not dev , please call your dev</Text>
      </>
    );

  return (
    <>
      <Stack>
        <DevAppBar />
        {children}
      </Stack>
    </>
  );
};



export default DevAuthProvider;
