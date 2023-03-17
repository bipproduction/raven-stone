import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { MdAddChart, MdGridView, MdMessage } from "react-icons/md";

const Dashboard = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 100, lg: 200 }}
        >
          <Navbar.Section grow  component={ScrollArea}>
            <NavLink icon={<MdGridView />} label={"summary"}>
              <NavLink label={"Nation Wide Chart"} />
              <NavLink label={"Top 10 Province by Conversation"} />
              <NavLink label={"Top 10 District by Conversation"} />
              <NavLink label={"Source Of Mention"} />
              <NavLink label={"Nation Wide Chart"} />
            </NavLink>
            <NavLink icon={<MdMessage />} label={"media listener"}>
              <NavLink label={"Nation Wide Chart"} />
              <NavLink label={"Top 10 Province by Conversation"} />
              <NavLink label={"Top 10 District by Conversation"} />
              <NavLink label={"Source Of Mention"} />
              <NavLink label={"Nation Wide Chart"} />
            </NavLink>
            <NavLink icon={<MdAddChart />} label={"predictive ai"}>
              <NavLink label={"Nation Wide Chart"} />
              <NavLink label={"Top 10 Province by Conversation"} />
              <NavLink label={"Top 10 District by Conversation"} />
              <NavLink label={"Source Of Mention"} />
              <NavLink label={"Nation Wide Chart"} />
            </NavLink>
          </Navbar.Section>
        </Navbar>
      }
      //   aside={
      //     <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //         <Text>Application sidebar</Text>
      //       </Aside>
      //     </MediaQuery>
      //   }
      //   footer={
      //     <Footer height={60} p="md">
      //       Application footer
      //     </Footer>
      //   }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
};

export default Dashboard;
