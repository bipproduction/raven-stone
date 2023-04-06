import { Button, Flex, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { MdArrowForwardIos } from "react-icons/md";
import ButtonLogout from "./button_logout";

const DevAppBar = () => {
  const listNav = [
    {
      id: "1",
      name: "dashboard",
      path: "/dashboard",
    },
    {
      id: "2",
      name: "dev",
      path: "/dev",
    },
    {
      id: "3",
      name: "map controll",
      path: "/map-controll",
    },
  ];

  const router = useRouter();
  return (
    <>
      <Flex
        // pos={"sticky"}
        w={"100%"}
        h={70}
        p={"md"}
        bg={"gray.2"}
        gap={"md"}
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        // sx={{ zIndex: 100 }}
        top={0}
      >
        {/* {router.pathname} */}
        <Group>
          <Button.Group>
            {listNav.map((v) => (
              <Button
                variant={"subtle"}
                disabled={v.path == router.pathname}
                key={v.id}
                rightIcon={<MdArrowForwardIos />}
                // bg={"gray"}
                w={150}
                compact
                onClick={() => router.push(v.path)}
              >
                {v.name}
              </Button>
            ))}
          </Button.Group>
        </Group>
        <ButtonLogout />
      </Flex>
    </>
  );
};

export default DevAppBar;
