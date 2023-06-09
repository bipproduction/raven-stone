import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
// import { gUser } from "@/g_state/auth/g_user";
// import { gSelectedView } from "@/g_state/g_selected_view";
import MentionbyCategory from "@/layouts/media_listener/mention_by_category";
import ContextualContent from "@/layouts/prodictive_ai/contextual_content";
import EmotionalViewViaProvince from "@/layouts/prodictive_ai/emotional_view_via_province";
import { api } from "@/lib/api";
import { fDb } from "@/lib/fbs";
import { sIsLocal } from "@/s_state/is_local";
import { sSelectedView } from "@/s_state/s_selected_view";
import { sUser } from "@/s_state/s_user";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Drawer,
  Flex,
  Group,
  Header,
  Image,
  Indicator,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";

import { _is_dark_mode } from "@/g_state/atom_util_state";
import EmotionViewProvinceCoupleV2 from "@/layouts/prodictive_ai/emotion_couple/front/emotion_view_province_couple_v2";
import { NationWideRating } from "@/layouts/prodictive_ai/nation_wide_rating/nation_wide_rating";
import StepAnalisys from "@/layouts/step_and_swot/step_analisys";
import SwotAnalisys from "@/layouts/step_and_swot/swot_analisys";
import MainSummary from "@/layouts/summary/main_summary";
import { sNavbarIsSmall } from "@/s_state/s_navbar_is_small";
import { sNavbarOpen } from "@/s_state/s_navbar_open";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import AnimateCssReact from "animate-css-reactjs";
import { onChildChanged, ref } from "firebase/database";
import { useAtom } from "jotai";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  MdAccountCircle,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdAssignment,
  MdBarChart,
  MdDarkMode,
  MdFace,
  MdFreeCancellation,
  MdGrading,
  MdGridView,
  MdInfo,
  MdJoinLeft,
  MdLightMode,
  MdMessage,
  MdNotifications,
  MdNotificationsActive,
  MdOutlineStarBorderPurple500,
  MdOutlineStars,
  MdSettings,
  MdStackedBarChart,
  MdStorage,
  MdTimer,
} from "react-icons/md";
import toast from "react-simple-toasts";
import { MainEmotionViewProvince } from "@/layouts/prodictive_ai/emotion_view_province/main_emotion_view_province";
import { ViewGlobalAccessBlock } from "@/global/view/access_block";
import { IconUser, IconUserCircle } from "@tabler/icons-react";
// import notifMp3 from "https://cdn.freesound.org/previews/680/680825_177850-lq.mp3";

const listView = [
  {
    id: 1,
    name: "Summary",
    icon: MdGridView,
    child: [
      //   {
      //     id: 1,
      //     name: "Nation Wide Chart",
      //     view: NationWideChart,
      //   },
      // todo: 2023-05-19
      {
        id: 2,
        name: "Top 10 Rating By Emotions",
        view: () => <MainSummary />,
        icon: MdStorage,
      },
      // {
      //   id: 3,
      //   name: "Top 10 District by Emotions",
      //   view: Top10DistrictbyConversation,
      // },
      //   {
      //     id: 4,
      //     name: "Source of Mention",
      //     view: SourceOfmention,
      //   },
      //   {
      //     id: 5,
      //     name: "Word Cloud",
      //     view: WordCloud,
      //   },
    ],
  },
  {
    id: 2,
    name: "Media listener",
    icon: MdMessage,
    child: [
      //   {
      //     id: 1,
      //     name: "Statistic",
      //     view: Statistict,
      //   },
      {
        id: 2,
        name: "Media Summary",
        view: () => <MentionbyCategory />,
        icon: MdAssignment,
      },
      // {
      //   id: 3,
      //   name: "Media Hastag",
      //   view: MediaHastag,
      // },
      // {
      //   id: 4,
      //   name: "Important Author",
      //   view: ImportantAuthor,
      // },
      // {
      //   id: 5,
      //   name: "Active Author",
      //   view: ActiveAuthor,
      // },
      // {
      //   id: 6,
      //   name: "Active url",
      //   view: ActiveUrl,
      // },
      // {
      //   id: 7,
      //   name: "Important Url",
      //   view: ImportantUrl,
      // },
      // {
      //   id: 8,
      //   name: "Media Link",
      //   view: MediaLink,
      // },
      // {
      //   id: 8,
      //   name: "Sosial Media",
      //   view: SosialMedia,
      // },
      // {
      //   id: 10,
      //   name: "Popular Author",
      //   view: PopularAuthor,
      // },
    ],
  },
  {
    id: 3,
    name: "STEP & SWOT",
    icon: MdFace,
    child: [
      {
        id: 1,
        name: "Step Analysis",
        view: () => <StepAnalisys />,
        icon: MdFreeCancellation,
      },
      {
        id: 2,
        name: "SWOT Analysis",
        view: () => <SwotAnalisys />,
        icon: MdGrading,
      },
    ],
  },
  {
    id: 4,
    name: "Predictive Ai",
    icon: MdBarChart,
    child: [
      {
        id: 1,
        name: "Nation Wide Rating",
        view: () => <NationWideRating />,
        icon: MdOutlineStarBorderPurple500,
      },
      // {
      //   id: 2,
      //   name: "Emotional View Via Region",
      //   view: EmotionalViewViaRegion,
      // },
      // todo: 2023-05-19
      {
        id: 3,
        name: "Emotional View Via Province",
        view: () => <MainEmotionViewProvince />,
        icon: MdOutlineStars,
      },
      {
        id: 4,
        name: "Emotional View Via Province Couple",
        view: () => <EmotionViewProvinceCoupleV2 />,
        icon: MdJoinLeft,
      },
      {
        id: 5,
        name: "Contextual Content",
        view: () => <ContextualContent />,
        icon: MdStackedBarChart,
      },
    ],
  },
];

const Dashboard = (props: any) => {
  const theme = useMantineTheme();
  // const [opened, setOpened] = useState(false);
  // const selectedView = useHookstate(gSelectedView);
  const [userName, setUserName] = useState<{ [key: string]: any }>({});

  useShallowEffect(() => {
    sSelectedDate.value = moment(new Date()).format("YYYY-MM-DD");
    funcLoadNationWideRating();
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetch(api.apiAuthGetUserById + `?id=${userId}`)
        .then((v) => v.json())
        .then(setUserName);
    }
  }, []);

  const v = listView
    .flatMap((v) => v.child)
    .find((v) => v.name === sSelectedView.value)?.view;

  useShallowEffect(() => {
    const page = localStorage.getItem("dashboard_selected_page");
    if (page) {
      sSelectedView.value = page;
    }
  }, []);

  return (
    <>
      <LoadFirstData />
      <AppShell
        // bg={"gray.2"}
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
        navbar={<MyNavbar />}
        header={
          <Header
            height={{ base: 50, md: 50 }}
            p="md"
            // bg={"blue.4"}
            sx={{
              boxShadow: "-1px 2px 8px -4px rgba(0,0,0,0.75)",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={sNavbarOpen.value}
                  onClick={() => {
                    sNavbarOpen.value = !sNavbarOpen.value;
                  }}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Flex
                direction={"row"}
                justify={"space-between"}
                w={"100%"}
                align={"center"}
              >
                <Group align={"center"}>
                  <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                    <Group>
                      {/* <Box w={{ sm: 200, lg: 300 }}>
                      <Image width={150} src={"/logo-2.png"} alt={"logo"} />
                    </Box> */}
                      {/* <Text>{gSelectedView.value}</Text> */}
                      {/* {(gSelectedView.value == "Top 10 Province By Emotions" ||
                      gSelectedView.value == "Top 10 District by Emotions") && (
                      <Stack p={"xs"} spacing={0}>
                        <Title c={"cyan.4"}>Hi Mr. Chusni</Title>
                        <Text c={"gray"}>
                          Welcome to Prabowo Subianto for President 2024 -
                          Digital Intelligence Winning Program.
                        </Text>
                      </Stack>
                    )} */}
                      {/* <Title order={3} color={"blue.8"}>Eagle Eye Project</Title> */}
                    </Group>
                  </MediaQuery>
                  {/* <Text c={"blue.8"} size={24} fw={"bold"}>EAGLE EYE PROJECT</Text> */}
                </Group>

                <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                  <Group>
                    <MyNotivication />
                    <Menu>
                    

                      <Menu.Target>
                        <ActionIcon
                          radius={100}
                          size={42}
                          variant={"filled"}
                        >
                          <MdAccountCircle size={42} color={"babyblue"} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown
                      >
                        <Stack p={"md"}>
                          <Flex gap={"md"} align={"center"}>
                            <IconUserCircle color="teal" />
                            <Title color="teal" order={3}>{sUser.value?.name}</Title>
                          </Flex>
                        </Stack>
                        <Menu.Item
                          onClick={() => {
                            localStorage.removeItem("user_id");
                            sUser.value = {};
                          }}
                        >
                          Logout
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </MediaQuery>
              </Flex>
            </div>
          </Header>
        }
      >
        {/* //todo: 2023-05-19 */}
        {listView.map((v, i) =>
          v.child.map((vv, ii) => (
            <Box key={ii}>

              {vv.name == sSelectedView.value && (
                <ViewGlobalAccessBlock>{vv.view()}</ViewGlobalAccessBlock>
              )}
            </Box>
            // <Box hidden={vv.name != sSelectedView.value} key={vv.name}>
            //   {vv.view()}
            // </Box>
          ))
        )}

        {/* {listView.map((v, i) =>
          <Box key={i}>
            {v.child.find((vv) => vv.name === sSelectedView.value).view()}
          </Box>
        )} */}
      </AppShell>
    </>
  );
};

const ada = signal(false);
const bukaDrawer = signal(false);
const mute = signal(true);

const MyNotivication = () => {
  const refNya = useRef<HTMLAudioElement>(null);
  useShallowEffect(() => {
    return onChildChanged(ref(fDb, "eagle_2/notif/"), (snap) => {
      const apa_local = snap.val().toString().includes("true");

      if (apa_local == sIsLocal.value) {
        ada.value = true;
        mute.value = false;
        refNya.current?.play();
      }
    });
  }, []);

  useShallowEffect(() => {
    document.body.onclick = () => {
      mute.value = true;
      refNya.current?.play();
    };
  }, []);

  const onBukaDrawer = () => {
    ada.value = false;
    bukaDrawer.value = true;
  };
  return (
    <>
      <audio
        ref={refNya}
        src="/notif.mp3"
        autoPlay={true}
        muted={mute.value}
      ></audio>
      {ada.value ? (
        <Indicator inline processing size={12}>
          <ActionIcon onClick={onBukaDrawer} size={32}>
            <MdNotifications size={32} color={"orange"} />
          </ActionIcon>
        </Indicator>
      ) : (
        <ActionIcon onClick={onBukaDrawer} size={32}>
          <MdNotifications size={32} color={"lightgray"} />
        </ActionIcon>
      )}
      <Drawer
        position="right"
        opened={bukaDrawer.value}
        onClose={() => (bukaDrawer.value = false)}
      >
        <NotificationDisplay />
      </Drawer>
    </>
  );
};

const listNotification = signal<any[]>([]);
const NotificationDisplay = () => {
  // ambil data notification
  useShallowEffect(() => {
    fetch(api.apiUtilNotifficationGet)
      .then((v) => v.json())
      .then((v) => (listNotification.value = v));
  }, []);

  // simpan data notification
  useShallowEffect(() => {
    listNotification.subscribe((val) => {
      localStorage.setItem("list_notif", JSON.stringify(val));
    });
  }, []);
  return (
    <>
      <Stack>
        <Flex>
          <MdNotifications size={32} color={"orange"} />
          <Title color={"gray"} order={3}>
            Notification
          </Title>
        </Flex>
        {listNotification.value.map((v) => (
          <Box key={v.id} p={"xs"}>
            <Paper>
              <Flex gap={"md"}>
                <Avatar>
                  <MdNotificationsActive />
                </Avatar>
                <Stack spacing={0} w={"100%"}>
                  <Text fw={"bold"}>{v.title}</Text>
                  <Text size={12} color={"gray"}>
                    {v.des}
                  </Text>
                  <Group position="right">
                    <MdTimer color="gray" />
                    <Text
                      size={12}
                      // c={"blue"}
                    >
                      {moment(v.createdAt).fromNow()}
                    </Text>
                  </Group>
                </Stack>
              </Flex>
            </Paper>
          </Box>
        ))}
      </Stack>
    </>
  );
};

const MyNavbar = () => {
  const router = useRouter();
  const [isDarkMode, setisDarkMode] = useAtom(_is_dark_mode);

  function onSelectedPage(page: string) {
    localStorage.setItem("dashboard_selected_page", page);
    sSelectedView.value = page;
  }

  const ketikaCklik = (v: any, vv: any) => {
    if (v.id == 2 && vv.id == 2) {
      router.push("/page/media-listener");

      return;
    }

    // sSelectedView.value = vv.name;
    onSelectedPage(vv.name);
    sNavbarOpen.value = false;
  };

  if (sNavbarIsSmall.value)
    return (
      <>
        <AnimateCssReact animation="fadeIn">
          <Navbar
            // bg={"blue.2"}
            hiddenBreakpoint="sm"
            hidden={!sNavbarOpen.value}
            width={{ sm: 64, lg: 64 }}
          >
            <Navbar.Section grow>
              <Stack align="center" p={"xs"}>
                {listView.map((v) =>
                  v.child.map((vv, i) => (
                    <Box key={i}>
                      <Tooltip label={vv.name}>
                        <ActionIcon
                          bg={vv.name === sSelectedView.value ? "dark" : ""}
                          radius={100}
                          size={32}
                          variant="light"
                          onClick={() => ketikaCklik(v, vv)}
                        >
                          <vv.icon size={32} color="#BE2533" />
                        </ActionIcon>
                      </Tooltip>
                    </Box>
                  ))
                )}
              </Stack>
            </Navbar.Section>
            <Navbar.Section
            // bg={"dark"}
            >
              <ActionIcon
                onClick={() => (sNavbarIsSmall.value = false)}
                m={"md"}
                radius={100}
                size={34}
              >
                <MdArrowForwardIos size={34} />
              </ActionIcon>
            </Navbar.Section>
          </Navbar>
        </AnimateCssReact>
      </>
    );
  return (
    <>
      <Navbar
        // bg={"blue.0"}
        hiddenBreakpoint="sm"
        hidden={!sNavbarOpen.value}
        width={{ sm: 200, lg: 300 }}
      >
        <Navbar.Section mb={"lg"}>
          <AnimateCssReact animation="fadeIn">
            <Box h={105}>
              <Box w={{ sm: 200, lg: 300 }} p={"sm"}>
                <Image width={150} src={"/logo-2.png"} alt={"logo"} />
              </Box>
              <Group position="right">
                <ActionIcon
                  onClick={() => toast("Project already running ...")}
                >
                  <MdInfo color="white" />
                </ActionIcon>
              </Group>
            </Box>
          </AnimateCssReact>
        </Navbar.Section>
        <Navbar.Section grow component={ScrollArea}>
          {listView.map((v) => (
            <NavLink
              defaultOpened={true}
              // bg={"blue.2"}
              // sx={{
              //   boxShadow: "-1px 2px 8px -4px rgba(0,0,0,0.75)"
              // }}
              label={v.name}
              icon={
                <Avatar radius={100}>
                  <v.icon size={24} color={"#BE2533"} />
                </Avatar>
              }
              key={v.id.toString()}
              // c={"dark"}
              // defaultOpened
            >
              {v.child.map((vv, i) => (
                <Paper
                  key={`${v.id}${i}`}
                  mb={"xs"}
                  // bg={"blue.1"}
                >
                  <NavLink
                    c={sSelectedView.value == vv.name ? "blue.8" : ""}
                    icon={<vv.icon color="orange" />}
                    variant={"filled"}
                    // fw={sSelectedView.value == vv.name ? "bold" : "light"}
                    // bg={selectedView.value == vv.name ? "blue.1" : ""}
                    label={
                      sSelectedView.value == vv.name ? (
                        <Title order={5}>{_.lowerCase(vv.name)}</Title>
                      ) : (
                        <Text>{_.lowerCase(vv.name)}</Text>
                      )
                    }
                    key={`${v.id}${i}`}
                    onClick={() => ketikaCklik(v, vv)}
                  />
                </Paper>
              ))}
            </NavLink>
          ))}
        </Navbar.Section>
        <Navbar.Section>
          <NavLink
            // bg={"gray"}
            // c={"dark"}
            icon={<MdSettings />}
            label={"setting"}
          >
            <NavLink
              icon={isDarkMode ? <MdLightMode /> : <MdDarkMode />}
              label={isDarkMode ? "Light" : "Dark"}
              onClick={() => setisDarkMode(!isDarkMode)}
            />
          </NavLink>
          {/* <Menu>
            <Menu.Target>
              <NavLink
                bg={"gray"}
                c={"dark"}
                icon={<MdSettings />}
                label={"setting"}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setisDarkMode(!isDarkMode)}>
                <Flex gap={"md"}>
                  <MdDarkMode size={24} />
                  <Text>{isDarkMode? "Light" : "Dark"}</Text>
                </Flex>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu> */}
          <Flex
          // bg={"dark"}
          >
            <Stack spacing={0} p={"xs"} w={"100%"}>
              {/* <Text fz={9} c={"gray"}>
                Bip Production @2023
              </Text> */}
              <Text
                fz={9}
                // c={"gray"}
              >
                Version: 3.0.1
              </Text>
              <Text
                fz={9}
                // c={"gray"}
              >
                build: 20993
              </Text>
            </Stack>
            <ActionIcon
              onClick={() => (sNavbarIsSmall.value = true)}
              m={"md"}
              radius={100}
              size={34}
            >
              <MdArrowBackIos size={34} />
            </ActionIcon>
          </Flex>
        </Navbar.Section>
      </Navbar>
    </>
  );
};

const LoadFirstData = () => {
  return (
    <>
      {/* <LoadTop10District /> */}
      {/* <LoadNationWideChart /> */}
      {/* <LoadSourceOfmention /> */}
      {/* <LoadWordCloud /> */}
      {/* <LoadTop10Province /> */}
      {/* <LoadNationWideRating /> */}
      {/* <LoadCandidate /> */}
      {/* <LoadProvince /> */}
    </>
  );
};

export default Dashboard;
