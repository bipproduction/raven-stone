import CandidateControll from "@/layouts/candidate/candidate_controll";
import ButtonLogout from "@/layouts/dev/button_logout";
import Dev from "@/layouts/dev/dev";
import DevAuthProvider from "@/layouts/dev/dev_auth_provider";
import { DevStepAndSwotAnalisys } from "@/layouts/dev/dev_step_and_swot_analisys";
import { Vie_emotion_view_province_couple_v2 } from "@/layouts/dev/emotion_view_province_couple_v2/_vie_emotion_view_province_couple_v2";

import { DevNationWideRatingv2 } from "@/layouts/dev/predictive_ai/com_nation_wide_rating_v2";
import { MapControllCityValueEditor } from "@/layouts/map_controll/map_controll_city_value_editor";
import { MapControllEmotionEditor } from "@/layouts/map_controll/map_controll_emotion_editor";
import { jSelectedAdminDashboard } from "@/s_state/j_selected_admin_dashboard";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import {
  ActionIcon,
  AppShell,
  Box,
  Center,
  Group,
  Image,
  NavLink,
  Navbar,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import _ from "lodash";
import moment from "moment";
import { PropsWithChildren } from "react";
import { MdArrowBackIos, MdArrowForwardIos, MdCircle } from "react-icons/md";

const listMenu = [
  {
    id: "1",
    name: "Map Controll",
    isOpen: true,
    // view: LayoutMapControll,
    children: [
      {
        id: "1",
        name: "emotion editor",
        view: MapControllEmotionEditor,
      },
      {
        id: "2",
        name: "city value editor",
        view: MapControllCityValueEditor,
      },
    ],
  },
  {
    id: "2",
    name: "Candidate Controll",
    isOpen: false,
    // view: CandidateControll,
    children: [
      {
        id: "1",
        name: "Candidate Controll",
        view: CandidateControll,
      },
    ],
  },
  {
    id: "3",
    name: "Dev",
    isOpen: false,
    // view: Dev,
    children: [
      {
        id: "1",
        name: "Dev",
        view: Dev,
      },
    ],
  },
  // {
  //   id: "4",
  //   name: "Test Iframe",
  //   isOpen: false,
  //   // view: DevTestIframe,
  //   children: [
  //     {
  //       id: "1",
  //       name: "Test Iframe",
  //       view: DevTestIframe,
  //     },
  //   ],
  // },
  // {
  //   id: "5",
  //   name: "Test Iframe Boma",
  //   isOpen: false,
  //   // view: DevTestIframeBoma,
  //   children: [
  //     {
  //       id: "1",
  //       name: "Test Iframe Boma",
  //       view: DevTestIframeBoma,
  //     },
  //   ],
  // },
  // {
  //   id: "6",
  //   name: "Time Machine",
  //   isOpen: false,
  //   // view: DevTimeMachine,
  //   children: [
  //     {
  //       id: "1",
  //       name: "Time Machine",
  //       view: DevTimeMachine,
  //     },
  //   ],
  // },
  {
    id: "7",
    name: "Step And Swot Analysis",
    isOpen: false,
    // view: DevStepAndSwotAnalisys,
    children: [
      {
        id: "1",
        name: "Step And Swot Analisys",
        view: DevStepAndSwotAnalisys,
      },
    ],
  },
  {
    id: "8",
    name: "Predictive Ai",
    isOpen: false,
    // view: DevStepAndSwotAnalisys,
    children: [
      {
        id: "1",
        name: "Nation Wide Rating v2",
        view: DevNationWideRatingv2,
      },
      {
        id: "2",
        name: "Emotion View Via Province Couple V2",
        view: Vie_emotion_view_province_couple_v2,
      },
    ],
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

const _is_small = atomWithStorage("admin_dashboard_is_small", false);
export default function LauyoutAdminDashboard({ children }: PropsWithChildren) {
  const update = useForceUpdate();
  const [selectedDashboard, setSelectedDashboard] = useAtom(
    jSelectedAdminDashboard
  );
  const [isSmall, setIsSmall] = useAtom(_is_small);

  useShallowEffect(() => {
    sSelectedDate.value = moment(new Date()).format("YYYY-MM-DD");
    // const isSml = localStorage.getItem("is_small");
    // if (isSml) {
    //   s_is_small.value = true;
    // } else {
    //   s_is_small.value = false;
    // }
  }, []);
  return (
    <>
      <DevAuthProvider>
        <AppShell
          padding={0}
          // padding="md"
          // bg={"gray.2"}
          navbar={
            isSmall ? (
              <></>
            ) : (
              <Navbar
                width={{ base: 300 }}
                // bg={"gray.1"}
              >
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
                      defaultOpened={item.isOpen}
                      // icon={<MdPlayCircle />}
                      // bg={item.id == sAdminDashboardView.get() ? "blue.1" : ""}
                      // onClick={() => sAdminDashboardView.set(item.id)}
                      key={item.id}
                      fw={"bold"}
                      label={
                        <Title
                          // c={"gray.8"}
                          order={5}
                        >
                          {_.upperCase(item.name)}
                        </Title>
                      }
                    >
                      {item.children.map((v) => (
                        <NavLink
                          c={
                            `${item.id}_${v.id}` == selectedDashboard
                              ? "blue"
                              : ""
                          }
                          key={v.id}
                          onClick={() => {
                            setSelectedDashboard(`${item.id}_${v.id}`);
                          }}
                          label={_.upperCase(v.name)}
                          icon={<MdCircle color="orange" />}
                        />
                      ))}
                    </NavLink>
                  ))}
                </Navbar.Section>
                <Navbar.Section
                // bg={"dark"}
                >
                  <Group position="apart" p={"xs"}>
                    <ButtonLogout />
                    <ActionIcon
                      variant="white"
                      radius={100}
                      // bg={"blue"}
                      onClick={() => {
                        // localStorage.setItem("is_small", "true");
                        // s_is_small.value = true;
                        setIsSmall(true);
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
          {/* {listMenu.map((v) =>
            v.children.map(
              (v2) =>
                `${v.id}_${v2.id}` == selectedDashboard && (
                  <Box key={`${v.id}_${v2.id}`}>{<v2.view />}</Box>
                )
            )
          )} */}
          {children}
          {isSmall && (
            <ActionIcon
              variant="white"
              radius={100}
              // bg={"blue"}
              size={32}
              pos={"fixed"}
              bottom={20}
              left={20}
              sx={{ zIndex: 102 }}
              onClick={() => {
                // localStorage.setItem("is_small", "false");
                // s_is_small.value = false;
                setIsSmall(false);
                update();
              }}
            >
              <Center>
                <MdArrowForwardIos
                  size={26}
                  // color="white"
                />
              </Center>
            </ActionIcon>
          )}
        </AppShell>
      </DevAuthProvider>
    </>
  );
}
