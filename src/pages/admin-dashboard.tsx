import {
  ActionIcon,
  AppShell,
  Box,
  Card,
  Center,
  Group,
  Header,
  Image,
  NavLink,
  Navbar,
  Paper,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import MapControll from "./map-controll";
import { sAdminDashboardView } from "@/s_state/s_admin_dashboard_view";
import LayoutMapControll from "@/layouts/map_controll/map_controll";
import DevAuthProvider from "@/layouts/dev/dev_auth_provider";
import CandidateControll from "@/layouts/candidate/candidate_controll";
import ButtonLogout from "@/layouts/dev/button_logout";
import _ from "lodash";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdMenu,
  MdPlayCircle,
  MdRunCircle,
} from "react-icons/md";
import Dev from "@/layouts/dev/dev";
import DevTestIframe from "@/layouts/dev/dev_test_iframe";
import DevTestIframeBoma from "@/layouts/dev/dev_test_iframe_boma";
import DevTimeMachine from "@/layouts/dev/dev_time_machine";
import DevDataVolume from "@/layouts/dev/dev_data_volume";
import { DevCandidateValue } from "@/layouts/dev/dev_candidate_value";
import { useState } from "react";
import {
  useDisclosure,
  useForceUpdate,
  useShallowEffect,
} from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import AnimateCssReact from "animate-css-reactjs";

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
  // {
  //   id: "7",
  //   name: "Data Volume",
  //   view: DevDataVolume,
  // },
  // {
  //   id: "8",
  //   name: "Candidate Value",
  //   view: DevCandidateValue,
  // },
];

const s_is_small = signal(false);

const AdminDashboard = () => {
  // const [isSmall, setIsSmall] = useState(false);
  const update = useForceUpdate();

  useShallowEffect(() => {
    const isSml = localStorage.getItem("is_small");
    if (isSml) {
      s_is_small.value = true;
    } else {
      s_is_small.value = false;
    }
  }, []);

  return (
    <DevAuthProvider>
      <AppShell
        padding={0}
        // padding="md"
        bg={"gray.2"}
        navbar={
          s_is_small.value ? (
            <></>
          ) : (
            <Navbar width={{ base: 250 }}>
              <Navbar.Section h={200}>
                <Image
                  src={"/dev-icon.png"}
                  alt="gambar"
                  width={"100%"}
                  height={170}
                />
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
                <Group position="apart" p={"xs"}>
                  <ButtonLogout />
                  <ActionIcon
                    variant="white"
                    radius={100}
                    bg={"blue"}
                    onClick={() => {
                      localStorage.setItem("is_small", "true");
                      s_is_small.value = true;
                      update();
                    }}
                  >
                    <MdArrowBackIos />
                  </ActionIcon>
                </Group>
              </Navbar.Section>
            </Navbar>
          )
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
        {s_is_small.value && (
          <ActionIcon
            variant="white"
            radius={100}
            bg={"blue"}
            size={32}
            pos={"fixed"}
            bottom={20}
            left={20}
            sx={{ zIndex: 102 }}
            onClick={() => {
              localStorage.setItem("is_small", "false");
              s_is_small.value = false;
              update();
            }}
          >
            <Center>
              <MdArrowForwardIos size={26} color="white" />
            </Center>
          </ActionIcon>
        )}
      </AppShell>
    </DevAuthProvider>
  );
};

export default AdminDashboard;
