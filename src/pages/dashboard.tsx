import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
// import { gUser } from "@/g_state/auth/g_user";
// import { gSelectedView } from "@/g_state/g_selected_view";
import MentionbyCategory from "@/layouts/media_listener/mention_by_category";
import { api } from "@/lib/api";
import { fDb } from "@/lib/fbs";
import { sIsLocal } from "@/s_state/is_local";
import { sSelectedView } from "@/s_state/s_selected_view";
import { sUser } from "@/s_state/s_user";
import {
  ActionIcon,
  AppShell,
  Avatar,
  BackgroundImage,
  Box,
  Center,
  Drawer,
  Flex,
  Group,
  Image,
  Indicator,
  Navbar,
  NavLink,
  Overlay,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";

import { _is_dark_mode } from "@/g_state/atom_util_state";
import { ViewGlobalAccessBlock } from "@/global/view/access_block";
import EmotionViewProvinceCoupleV2 from "@/layouts/prodictive_ai/emotion_couple/front/emotion_view_province_couple_v2";
import { MainEmotionViewProvince } from "@/layouts/prodictive_ai/emotion_view_province/main_emotion_view_province";
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
  MdArrowForwardIos,
  MdAssignment,
  MdBarChart,
  MdClose,
  MdDarkMode,
  MdFace,
  MdFreeCancellation,
  MdGrading,
  MdGridView,
  MdJoinLeft,
  MdLightMode,
  MdLogout,
  MdMessage,
  MdNotifications,
  MdNotificationsActive,
  MdOutlineStarBorderPurple500,
  MdOutlineStars,
  MdSettings,
  MdStorage,
  MdTimer
} from "react-icons/md";
// import notifMp3 from "https://cdn.freesound.org/previews/680/680825_177850-lq.mp3";
import translate from 'google-translate-api-x'
import useTranslate from 'next-translate/useTranslation'
import { COLOR } from "@/global/fun/color_global";
import Mlai from "@/layouts/step_and_swot/ml_ai";

const listView = [
  {
    id: 1,
    name: "Summary",
    label: "summary",
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
        label: "top_10_rating_by_emotions",
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
  // {
  //   id: 2,
  //   name: "Media listener",
  //   label: "media_listener",
  //   icon: MdMessage,
  //   child: [
  //     //   {
  //     //     id: 1,
  //     //     name: "Statistic",
  //     //     view: Statistict,
  //     //   },
  //     {
  //       id: 2,
  //       name: "Media Summary",
  //       label: "media_summary",
  //       view: () => <MentionbyCategory />,
  //       icon: MdAssignment,
  //     },
  //     // {
  //     //   id: 3,
  //     //   name: "Media Hastag",
  //     //   view: MediaHastag,
  //     // },
  //     // {
  //     //   id: 4,
  //     //   name: "Important Author",
  //     //   view: ImportantAuthor,
  //     // },
  //     // {
  //     //   id: 5,
  //     //   name: "Active Author",
  //     //   view: ActiveAuthor,
  //     // },
  //     // {
  //     //   id: 6,
  //     //   name: "Active url",
  //     //   view: ActiveUrl,
  //     // },
  //     // {
  //     //   id: 7,
  //     //   name: "Important Url",
  //     //   view: ImportantUrl,
  //     // },
  //     // {
  //     //   id: 8,
  //     //   name: "Media Link",
  //     //   view: MediaLink,
  //     // },
  //     // {
  //     //   id: 8,
  //     //   name: "Sosial Media",
  //     //   view: SosialMedia,
  //     // },
  //     // {
  //     //   id: 10,
  //     //   name: "Popular Author",
  //     //   view: PopularAuthor,
  //     // },
  //   ],
  // },
  {
    id: 3,
    name: "STEP & SWOT",
    label: "step&swot",
    icon: MdFace,
    child: [
      {
        id: 1,
        name: "Step Analysis",
        label: "step_analysis",
        view: () => <StepAnalisys />,
        icon: MdFreeCancellation,
      },
      {
        id: 2,
        name: "SWOT Analysis",
        label: "swot_analysis",
        view: () => <SwotAnalisys />,
        icon: MdGrading,
      },
    ],
  },
  {
    id: 4,
    name: "Predictive AI",
    label: "predictive_ai",
    icon: MdBarChart,
    child: [
      {
        id: 1,
        name: "Nation Wide Rating",
        label: "nation_wide_rating",
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
        label: "emotional_view_via_province",
        view: () => <MainEmotionViewProvince />,
        icon: MdOutlineStars,
      },
      {
        id: 4,
        name: "Emotional View Via Province Couple",
        label: "emotional_view_via_province_couple",
        view: () => <EmotionViewProvinceCoupleV2 />,
        icon: MdJoinLeft,
      },
      // {
      //   id: 5,
      //   name: "Contextual Content",
      //   view: () => <ContextualContent />,
      //   icon: MdStackedBarChart,
      // },
    ],
  },
];

const listView2 = [
  {
    id: 1,
    name: "Top 10 Rating By Emotions",
    label: "summary",
    view: () => <MainSummary />,
    icon: MdStorage,
  },
  {
    id: 5,
    name: "Nation Wide Rating",
    label: "national_popularity_metrics",
    view: () => <NationWideRating />,
    icon: MdOutlineStarBorderPurple500,
  },
  {
    id: 6,
    name: "Emotional View Via Province",
    label: "regional_insights",
    view: () => <MainEmotionViewProvince />,
    icon: MdOutlineStars,
  },
  {
    id: 7,
    name: "Emotional View Via Province Couple",
    label: "regional_data_pairing",
    view: () => <EmotionViewProvinceCoupleV2 />,
    icon: MdJoinLeft,
  },
  {
    id: 4,
    name: "SWOT Analysis",
    label: "swot_evaluation",
    view: () => <SwotAnalisys />,
    icon: MdGrading,
  },
  {
    id: 3,
    name: "Step Analysis",
    label: "step_assessment",
    view: () => <StepAnalisys />,
    icon: MdFreeCancellation,
  },
  {
    id: 8,
    name: "ML-AI",
    label: "ml_ai",
    view: () => <Mlai />,
    icon: MdOutlineStarBorderPurple500,
  },
];

const Dashboard = (props: any) => {
  const { t, lang } = useTranslate();
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
            background: COLOR.bgGradasi

          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={<MyNavbar />}
      >
        <BackgroundImage src="https://str.wibudev.com/api/file/get/cllkkd90p000h9uhkqir9ptq3.png">
          {/* //todo: 2023-05-19 */}
          {listView.map((v, i) =>
            v.child.map((vv, ii) => (
              <Box key={ii}>
                {vv.name == sSelectedView.value && (
                  <ViewGlobalAccessBlock name={vv.name}>
                    {vv.view()}
                  </ViewGlobalAccessBlock>
                )}
              </Box>
            ))
          )}
        </BackgroundImage>
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
  const { t, lang } = useTranslate();

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
                {listView2.map((v, i) =>
                  <Box key={i}>
                    <Tooltip label={_.upperCase(t('common:' + v.label))}>
                      <ActionIcon
                        bg={v.name === sSelectedView.value ? "dark" : ""}
                        radius={100}
                        size={32}
                        variant="light"
                        onClick={() => ketikaCklik(v, v)}
                      >
                        <v.icon size={32} color="#BE2533" />
                      </ActionIcon>
                    </Tooltip>
                  </Box>
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
        hiddenBreakpoint="sm"
        hidden={!sNavbarOpen.value}
        width={{ sm: 200, lg: 300 }}
      >
        <BackgroundImage src="https://str.wibudev.com/api/file/get/cllkjs9rs000b9uhk6r9t4oo5.png">
          <Navbar.Section mb={"lg"}>
            <AnimateCssReact animation="fadeIn">
              <Box h={50}>
                {/* <Center w={{ sm: 200, lg: 300 }} p={"sm"}>
                <Image width={100} src={"https://str.wibudev.com/api/file/get/cllki3cuf00059uhkmaugrypc.png"} alt={"logo"} />
              </Center> */}
                <Group position="right">
                  {/* <ActionIcon
                    onClick={() => toast("Project already running ...")}
                  >
                    <MdInfo color="white" />
                  </ActionIcon> */}

                  <ActionIcon
                    onClick={() => (sNavbarIsSmall.value = true)}
                    m={"md"}
                    radius={100}
                    size={34}
                  >
                    <MdClose size={34} />
                  </ActionIcon>
                </Group>
              </Box>
            </AnimateCssReact>
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea}>
            {listView2.map((vv, i) => (
              <Box
                key={`${vv.id}${i}`}
                mb={"xs"}
              >
                <NavLink
                  c={sSelectedView.value == vv.name ? "blue.8" : ""}
                  icon={<vv.icon color="orange" />}
                  variant={"filled"}
                  // fw={sSelectedView.value == vv.name ? "bold" : "light"}
                  // bg={selectedView.value == vv.name ? "blue.1" : ""}
                  label={
                    sSelectedView.value == vv.name ? (
                      <Title order={5}>{_.upperCase(t('common:' + vv.label))}</Title>
                    ) : (
                      <Text>{_.upperCase(t('common:' + vv.label))}</Text>
                    )
                  }
                  key={`${vv.id}${i}`}
                  onClick={() => ketikaCklik(vv, vv)}
                />
              </Box>
            ))}
          </Navbar.Section>
          <Navbar.Section>
            <NavLink
              // bg={"gray"}
              // c={"dark"}
              icon={<MdSettings />}
              label={_.upperCase(t('common:setting'))}
            >
              {/* <NavLink
                icon={isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                label={isDarkMode ? "Light" : "Dark"}
                onClick={() => setisDarkMode(!isDarkMode)}
              /> */}
              <NavLink
                icon={<MdLogout />}
                label={_.upperCase(t('common:logout'))}
                onClick={() => {
                  localStorage.removeItem("user_id");
                  sUser.value = {};
                }} />
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
              <Stack spacing={0} p={"xs"} w={"100%"} align="center">
                {/* <Text fz={9} c={"gray"}>
                Bip Production @2023
              </Text> */}
                <Image p={"lg"} src={"https://str.wibudev.com/api/file/get/cllkk1rea000f9uhkcck9f1jh.png"} alt="" />
                <Flex>
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
                </Flex>
              </Stack>

            </Flex>
          </Navbar.Section>
        </BackgroundImage>
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