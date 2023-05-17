// import { gUser } from "@/g_state/auth/g_user";
import { sUser } from "@/s_state/s_user";
import { Stack, Text } from "@mantine/core";
import { PropsWithChildren } from "react";

const DevAuthProvider = ({ children }: PropsWithChildren) => {
  // const user = useHookstate(gUser);

  if (sUser.value === undefined) return <></>;
  if (sUser.value && sUser.value.userRoleId != 2)
    return (
      <>
        <Text>Oh No ... you are not dev , please call your dev</Text>
      </>
    );

  return (
    <>
      <Stack spacing={0}>
        {/* <DevAppBar /> */}
        {children}
      </Stack>
    </>
  );
};



export default DevAuthProvider;
