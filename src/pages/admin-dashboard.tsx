import {
  AppShell,
  Box,
  Group,
  Header,
  Image,
  NavLink,
  Navbar,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import MapControll from "./map-controll";
import { sAdminDashboardView } from "@/s_state/s_admin_dashboard_view";
import LayoutMapControll from "@/layouts/map_controll/map_controll";
import DevAuthProvider from "@/layouts/dev/dev_auth_provider";
import CandidateControll from "@/layouts/candidate/candidate_controll";
import ButtonLogout from "@/layouts/dev/button_logout";
import _ from "lodash";
import { MdPlayCircle, MdRunCircle } from "react-icons/md";
import Dev from "@/layouts/dev/dev";
import DevTestIframe from "@/layouts/dev/dev_test_iframe";
import DevTestIframeBoma from "@/layouts/dev/dev_test_iframe_boma";
import DevTimeMachine from "@/layouts/dev/dev_time_machine";

const listMenu = [
  {
    id: "1",
    name: "Map Controll",
    view: LayoutMapControll,
  },
  {
    id: "2",
    name: "Candidate Controll",
    view: CandidateControll,
  },
  {
    id: "3",
    name: "Dev",
    view: Dev,
  },
  {
    id: "4",
    name: "Test Iframe",
    view: DevTestIframe,
  },
  {
    id: "5",
    name: "Test Iframe Boma",
    view: DevTestIframeBoma,
  },
  {
    id: "6",
    name: "Time Machine",
    view: DevTimeMachine,
  },
];

const AdminDashboard = () => {
  return (
    <DevAuthProvider>
      <AppShell
        // padding="md"
        bg={"gray.2"}
        navbar={
          <Navbar width={{ base: 250 }}>
            <Navbar.Section h={200} >
              <Image src={"/dev-icon.png"} alt="gambar" width={"100%"} height={170} />
            </Navbar.Section>
            <Navbar.Section grow component={ScrollArea}>
              {listMenu.map((item) => (
                <NavLink
                  icon={<MdPlayCircle />}
                  bg={item.id == sAdminDashboardView.get() ? "blue.1" : ""}
                  onClick={() => sAdminDashboardView.set(item.id)}
                  key={item.id}
                  fw={"bold"}
                  label={_.upperCase(item.name)}
                />
              ))}
            </Navbar.Section>
            <Navbar.Section bg={"dark"}>
              <Group position="left" p={"xs"}>
                <ButtonLogout />
              </Group>
            </Navbar.Section>
          </Navbar>
        }
        // header={
        //   <Header height={60} p="xs">
        //     {/* Header content */}
        //   </Header>
        // }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {listMenu.map((v) => (
          <Box key={v.id} hidden={v.id != sAdminDashboardView.get()}>
            {<v.view />}
          </Box>
        ))}
      </AppShell>
    </DevAuthProvider>
  );
};

export default AdminDashboard;
