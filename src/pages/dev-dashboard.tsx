import { ViewComponentAccess } from "@/layouts/dev_dashboard/component_access/view/view_component_access";
import { dev_dashboard_selected_menu } from "@/layouts/dev_dashboard/user/val/selected_menu";
import { DevDashboardUser } from "@/layouts/dev_dashboard/user/view/user";
import { ViewUserRole } from "@/layouts/dev_dashboard/user_role/view/user_role";
import {
  AppShell,
  Header,
  NavLink,
  Navbar,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { useHash, useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";

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
];

export default function DevDashboard(props: any) {
  const [selectedMenu, setSelectedmenu] = useAtom(dev_dashboard_selected_menu);
  const p = listMenu.find((v) => v.id === selectedMenu)?.view;

  //   useShallowEffect(() => {
  //     setSelectedmenu("1");
  //   }, []);
  return (
    <>
      <AppShell
        header={
          <Header height={60} p="xs">
            <Title order={3} c={"teal"}>
              {"We'R Reignite"}
            </Title>
          </Header>
        }
        navbar={
          <Navbar width={{ base: 300 }} p="xs">
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
