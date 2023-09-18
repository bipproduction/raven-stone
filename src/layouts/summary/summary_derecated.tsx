import { gradient } from "@/styles/gradient";
import {
  ActionIcon,
  AppShell,
  Aside,
  Box,
  Burger,
  Flex,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  Paper,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { MdAccountCircle, MdBarChart } from "react-icons/md";

const Summary = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Text>Application navbar</Text>
          </Navbar>
        }
        // aside={
        //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 100, lg: 200 }}>
        //       <Text>Application sidebar</Text>
        //     </Aside>
        //   </MediaQuery>
        // }
        // footer={
        //   <Footer height={60} p="md">
        //     Application footer
        //   </Footer>
        // }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
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
         <Box bg={"blue"} h={2000} p={"xs"} ></Box>
        <Text>Resize app to see responsive navbar in action</Text>
      </AppShell>
    );
};

export default Summary;
