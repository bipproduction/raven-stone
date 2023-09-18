import { ViewComponentAccess } from "@/layouts/dev_dashboard/component_access/view/view_component_access";

import { dev_dashboard_selected_menu } from "@/layouts/dev_dashboard/user/val/selected_menu";
import { DevDashboardUser } from "@/layouts/dev_dashboard/user/view/user";
import { ViewUserLog } from "@/layouts/dev_dashboard/user_log/view/view_user_log";
import { ViewUserRole } from "@/layouts/dev_dashboard/user_role/view/user_role";
import { sUser } from "@/s_state/s_user";
import {
  AppShell,
  Burger,
  Flex,
  Header,
  MediaQuery,
  NavLink,
  Navbar,
  ScrollArea,
  Title
} from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";


const Apa2 = () => {
  return <>apa2</>;
};

const Apa3 = () => {
  return <>apa3</>;
};

const listMenu = [
  {
    id: "1",
    title: "User List",
    view: () => <DevDashboardUser />,
  },
  {
    id: "2",
    title: "User Role List",
    view: () => <ViewUserRole />,
  },
  {
    id: "3",
    title: "Component Access",
    view: () => <ViewComponentAccess />,
  },
  {
    id: "4",
    title: "Log User",
    view: () => <ViewUserLog />,
  },
];

export default function DevDashboard(props: any) {
  const [selectedMenu, setSelectedmenu] = useAtom(dev_dashboard_selected_menu);
  const p = listMenu.find((v) => v.id === selectedMenu)?.view;
  const [open, setOpen] = useState(false);

  //   useShallowEffect(() => {
  //     setSelectedmenu("1");
  //   }, []);
  return (
    <>
      <AppShell
        navbarOffsetBreakpoint="sm"
        header={
          <Header height={60} p="xs">
            <Flex justify={"space-between"} w={"100%"} gap={"md"}>
              <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                <Burger
                  color="teal"
                  onClick={() => setOpen((o) => !o)}
                  opened={open}
                />
              </MediaQuery>
              <Flex justify={"space-between"} w={"100%"}>
                <Title order={3} c={"teal"}>
                  {"We'R Reignite"}
                </Title>
                <Flex align={"center"} gap={"md"}>
                  <IconUserCircle color="teal" />
                  <Title color="teal" order={3}>
                    {sUser.value?.name}
                  </Title>
                </Flex>
              </Flex>
            </Flex>
          </Header>
        }
        navbar={
          <Navbar
            hiddenBreakpoint="sm"
            width={{ base: 300 }}
            p="xs"
            hidden={!open}
          >
            <Navbar.Section grow component={ScrollArea}>
              {listMenu.map((v) => (
                <NavLink
                  c={v.id === selectedMenu ? "teal" : "gray"}
                  key={v.id}
                  label={v.title}
                  onClick={() => {
                    setSelectedmenu(v.id);
                  }}
                />
              ))}
            </Navbar.Section>
          </Navbar>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {p && p()}
      </AppShell>
    </>
  );
}
