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
  createStyles,
  Divider,
  Drawer,
  Flex,
  Grid,
  Group,
  Image,
  Indicator,
  Navbar,
  NavLink,
  Overlay,
  Paper,
  rem,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useInterval, usePageLeave, useShallowEffect, useTimeout } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { AiOutlineLine } from "react-icons/ai";
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
import _, { isPlainObject } from "lodash";
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
  MdHub,
  MdJoinLeft,
  MdLightMode,
  MdLogout,
  MdMessage,
  MdNotifications,
  MdNotificationsActive,
  MdOutlineHub,
  MdOutlineStarBorderPurple500,
  MdOutlineStars,
  MdSettings,
  MdStorage,
  MdTimer,
} from "react-icons/md";
// import notifMp3 from "https://cdn.freesound.org/previews/680/680825_177850-lq.mp3";
import translate from "google-translate-api-x";
import useTranslate from "next-translate/useTranslation";
import { COLOR } from "@/global/fun/color_global";
import Mlai from "@/layouts/step_and_swot/ml_ai";
import { _isMaxTimeOut } from "@/layouts/auth/val_login";

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
    icon: MdHub,
  },
];

const Dashboard = (props: any) => {
  const [valTimeOut, setValTimeOut] = useAtom(_isMaxTimeOut)
  const [timeNow, setTimeNow] = useState(0)
  const { t, lang } = useTranslate();
  const theme = useMantineTheme();
  // const [opened, setOpened] = useState(false);
  // const selectedView = useHookstate(gSelectedView);
  const [userName, setUserName] = useState<{ [key: string]: any }>({});
  const interval = useInterval(() => {
    const jam = localStorage.getItem("_jam")
    console.log(jam)
  }, 5000)

  // usePageLeave(() => {
  //   console.log("ditinggalkan")
  //   start();
  // })


  const { start, clear } = useTimeout(() => {
    console.log("habisa waktunya")
    const body = {
      id: localStorage.getItem("user_id"),
      isLogin: false,
    };
    fetch(api.apiUpdIsLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      if (res.status === 200) {
        localStorage.removeItem("user_id");
        localStorage.removeItem("_jam");
        sUser.value = {};
        // setValTimeOut(undefined)
      }
    });
  }, 600000)


  function nowTime() {
    // setTimeNow(new Date().getTime() + (1 * 60 * 60 * 1000))
    // console.log(timeNow)
    // let ini = new Date().getTime() + (1 * 60 * 60 * 1000);
    // setValTimeOut(ini)
    // console.log(valTimeOut)
  }

  useShallowEffect(() => {
    // start();
    // const gj = localStorage.getItem("_jam")
    // if (gj) {
    //   const _jam = moment(new Date(+gj!))
    //   const _skr = moment(new Date())
    //   const diff = _jam.diff(_skr, "seconds")
    //   // console.log(diff, "ini diffnya")
    //   if (diff <= 0) {
    //     console.log("habis")
    //     const body = {
    //       id: localStorage.getItem("user_id"),
    //       isLogin: false,
    //     };
    //     fetch(api.apiUpdIsLogin, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(body),
    //     }).then(async (res) => {
    //       if (res.status === 200) {
    //         localStorage.removeItem("user_id");
    //         localStorage.removeItem("_jam");
    //         sUser.value = {};
    //         // setValTimeOut(undefined)
    //       }
    //     });
    //   }


    // }
    // // interval.start();

    // window.addEventListener("mousemove", () => {
    //   clear();
    //   interval.stop()
    //   // nowTime();
    //   const now = new Date().getTime() + (1 * 60 * 60 * 1000);
    //   localStorage.setItem('_jam', now.toString())
    //   // setValTimeOut(now)
    // })

    // return () => {
    //   clear();
    //   // interval.stop();

    //   // const now = new Date().getTime() + (1 * 60 * 60 * 1000);
    //   // localStorage.setItem('_jam', now.toString())
    //   // setValTimeOut(now)
    // }
  }, [])

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
            background: COLOR.bgGradasi,
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={<MyNavbar />}
      >
        <BackgroundImage src="https://str.wibudev.com/api/file/get/cllkkd90p000h9uhkqir9ptq3.png">
          {/* //todo: 2023-05-19 */}
          {listView2.map(
            (v, i) => (
              <Box key={i}>
                {v.name == sSelectedView.value && <>{v.view()}</>}
              </Box>
            )

            // v.child.map((vv, ii) => (
            //   <Box key={ii}>
            //     {vv.name == sSelectedView.value && (
            //       <ViewGlobalAccessBlock name={vv.name}>
            //         {vv.view()}
            //       </ViewGlobalAccessBlock>
            //     )}
            //   </Box>
            // ))
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
  const [valTimeOut, setValTimeOut] = useAtom(_isMaxTimeOut)

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
            hiddenBreakpoint={30}
            hidden={!sNavbarOpen.value}
            width={{ sm: 100, lg: 100 }}
          >
            <Navbar.Section grow>
              <Stack align="center" p={"xs"}>
                {listView2.map((v, i) => (
                  <Box key={i}>
                    <Tooltip label={_.upperCase(t("common:" + v.label))}>
                      <ActionIcon
                        bg={v.name === sSelectedView.value ? "dark" : ""}
                        radius={100}
                        size={32}
                        variant="light"
                        onClick={() => ketikaCklik(v, v)}
                      >
                        <v.icon size={32} color={"white"} />
                      </ActionIcon>
                    </Tooltip>
                  </Box>
                ))}
              </Stack>
            </Navbar.Section>
            <Navbar.Section
              style={{
                position: "absolute",
                bottom: 40,
              }}
              pb={40}
            >
              <Box>
                <Center pl={15}>
                  <Image src={"../raven2.png"} width={70} alt="logo" />
                </Center>
              </Box>
            </Navbar.Section>

            <Navbar.Section
              // bg={"dark"}
              pl={15}
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
        <BackgroundImage src="../raven.png" h={"100%"} sx={{
          backgroundPosition: "30%",
          backgroundRepeat: "no-repeat",
        }}>
          <Box
            w={"100%"}
            h={"100vh"}
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(139, 212, 160, 0) 15%, #231F24 70%)",
            }}
            pos={"absolute"}
          >
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
                <Box key={`${vv.id}${i}`} mb={"xs"}>
                  <NavLink
                    c={sSelectedView.value == vv.name ? "white" : ""}
                    // icon={<vv.icon color="orange" />}
                    variant={"filled"}
                    // fw={sSelectedView.value == vv.name ? "bold" : "light"}
                    // bg={selectedView.value == vv.name ? "blue.1" : ""}
                    label={
                      sSelectedView.value == vv.name ? (
                        <Box ml={20}>
                          <Title order={5} color="white">
                            {_.upperCase(t("common:" + vv.label))}
                          </Title>
                          <Grid pt={5}>
                            <Grid.Col span={3}>
                              <Divider color="red.9" size="lg" />
                            </Grid.Col>
                          </Grid>
                        </Box>
                      ) : (
                        <Box>
                          <Text color="white" ml={20}>
                            {_.upperCase(t("common:" + vv.label))}
                          </Text>
                          <></>
                        </Box>
                      )
                    }
                    key={`${vv.id}${i}`}
                    onClick={() => ketikaCklik(vv, vv)}
                  />
                </Box>
              ))}
            </Navbar.Section>
            <Navbar.Section pr={40}>
              <NavLink
                // bg={"gray"}
                c={"white"}
                // icon={<MdSettings />}
                label={<Text ml={20}>{_.upperCase(t("common:setting"))}</Text>}
                style={{
                  position: "absolute",
                  bottom: 160,
                  left: 0,
                }}
              >
                {/* <NavLink
                icon={isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                label={isDarkMode ? "Light" : "Dark"}
                onClick={() => setisDarkMode(!isDarkMode)}
              /> */}
                <NavLink
                  icon={<MdLogout />}
                  c={"white"}
                  label={_.upperCase(t("common:logout"))}
                  onClick={() => {
                    const body = {
                      id: localStorage.getItem("user_id"),
                      isLogin: false,
                    };
                    fetch(api.apiUpdIsLogin, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(body),
                    }).then(async (res) => {
                      if (res.status === 200) {
                        localStorage.removeItem("user_id");
                        localStorage.removeItem("_jam");
                        sUser.value = {};
                        // setValTimeOut(undefined)
                      }
                    });
                  }}
                  style={{
                    position: "absolute",
                    bottom: 120,
                    left: 0,
                  }}
                  pl={50}
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
                <Stack spacing={0} p={"xs"} w={"100%"} align="center">
                  {/* <Text fz={9} c={"gray"}>
                Bip Production @2023
              </Text> */}
                  {/* <Image
                    p={"lg"}
                    src={
                      "https://str.wibudev.com/api/file/get/cllkk1rea000f9uhkcck9f1jh.png"
                    }
                    alt=""
                  /> */}
                </Stack>
              </Flex>
            </Navbar.Section>
          </Box>
        </BackgroundImage>
        <Box
          style={{
            position: "absolute",
            bottom: 40,
          }}
        >
          <Center pl={30} pr={20}>
            <Image src={"../raven1.png"} maw={200} mx="auto" alt="logo" />
          </Center>
        </Box>
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
