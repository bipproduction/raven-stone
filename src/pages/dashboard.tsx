import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
import { gUser } from "@/g_state/auth/g_user";
import { gSelectedView } from "@/g_state/g_selected_view";
import MentionbyCategory from "@/layouts/media_listener/mention_by_category";
import ContextualContent from "@/layouts/prodictive_ai/contextual_content";
import EmotionalViewViaProvince from "@/layouts/prodictive_ai/emotional_view_via_province";
import EmotionalViewViaProvinceCouple from "@/layouts/prodictive_ai/emotional_view_via_province_couple";
import EmotionalViewViaRegion from "@/layouts/prodictive_ai/emotional_view_via_region";
import NationWideRating from "@/layouts/prodictive_ai/nation_wide_rating";
import Top10DistrictbyConversation from "@/layouts/summary/top_10_district_by_conversation";
import Top10ProvinceByConversation from "@/layouts/summary/top_10_province_by_conversation";
import { api } from "@/lib/api";
import { fDb } from "@/lib/fbs";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { styleGradientLinierBlue } from "@/styles/styles_gradient_linear_blue";
import { stylesGradientMixYellowRed } from "@/styles/styles_gradient_mix_yellow_red";
import { stylesGradientRed } from "@/styles/styles_gradient_red";
import { sIsLocal } from "@/s_state/is_local";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Chip,
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
  useMantineTheme,
} from "@mantine/core";
import { useId, useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { Button } from "antd";
import { onChildChanged, onValue, ref } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  MdAccountCircle,
  MdBarChart,
  MdCircle,
  MdGridView,
  MdInfo,
  MdMessage,
  MdNotifications,
  MdNotificationsActive,
  MdSettings,
  MdTimer,
  MdWatch,
} from "react-icons/md";
import toast from "react-simple-toasts";
import useSound from "use-sound";
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
      {
        id: 2,
        name: "Top 10 Province By Emotions",
        view: Top10ProvinceByConversation,
      },
      {
        id: 3,
        name: "Top 10 District by Emotions",
        view: Top10DistrictbyConversation,
      },
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
        view: MentionbyCategory,
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
    name: "Predictive Ai",
    icon: MdBarChart,
    child: [
      {
        id: 1,
        name: "Nation Wide Rating",
        view: NationWideRating,
      },
      // {
      //   id: 2,
      //   name: "Emotional View Via Region",
      //   view: EmotionalViewViaRegion,
      // },
      {
        id: 3,
        name: "Emotional View Via Province",
        view: EmotionalViewViaProvince,
      },
      {
        id: 3,
        name: "Emotional View Via Province Couple",
        view: EmotionalViewViaProvinceCouple,
      },
      {
        id: 4,
        name: "Contextual Content",
        view: ContextualContent,
      },
    ],
  },
];

const Dashboard = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const selectedView = useHookstate(gSelectedView);
  const [userName, setUserName] = useState<{ [key: string]: any }>({});

  useShallowEffect(() => {
    funcLoadNationWideRating();
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetch(api.apiAuthGetUserById + `?id=${userId}`)
        .then((v) => v.json())
        .then(setUserName);
    }
  }, []);

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
          bg={"blue.0"}
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section mb={"lg"}>
            <Paper shadow={"sm"} bg={"blue.2"} h={105}>
              <Box w={{ sm: 200, lg: 300 }} p={"sm"}>
                <Image width={150} src={"/logo-2.png"} alt={"logo"} />
              </Box>
              <Group position="right">
                <ActionIcon onClick={() => toast("Project already running ...")}>
                  <MdInfo color="white" />
                </ActionIcon>
              </Group>
            </Paper>
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea}>
            {listView.map((v) => (
              <NavLink
                bg={"blue.2"}
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
                c={"dark"}
                // defaultOpened
              >
                {v.child.map((vv, i) => (
                  <Paper key={`${v.id}${i}`} mb={"xs"} bg={"blue.1"}>
                    <NavLink
                      c={selectedView.value == vv.name ? "blue.8" : "blue.4"}
                      icon={<MdCircle color="orange" />}
                      variant={"filled"}
                      fw={selectedView.value == vv.name ? "bold" : "light"}
                      // bg={selectedView.value == vv.name ? "blue.1" : ""}
                      label={_.lowerCase(vv.name)}
                      key={`${v.id}${i}`}
                      onClick={() => {
                        selectedView.set(vv.name);
                        setOpened(false);
                      }}
                    />
                  </Paper>
                ))}
              </NavLink>
            ))}
          </Navbar.Section>
          <Navbar.Section>
            <NavLink
              bg={"gray"}
              c={"dark"}
              icon={<MdSettings />}
              label={"setting"}
            />
            <Stack spacing={0} p={"xs"} bg={"dark"}>
              {/* <Text fz={9} c={"gray"}>
                Bip Production @2023
              </Text> */}
              <Text fz={9} c={"gray"}>
                Version: 2.0.1
              </Text>
              <Text fz={9} c={"gray"}>
                build: 10453
              </Text>
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          height={{ base: 50, md: 50 }}
          p="md"
          bg={"blue.4"}
          sx={{
            boxShadow: "-1px 2px 8px -4px rgba(0,0,0,0.75)",
          }}
        >
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
                    {/* <Menu.Target>
                      <NavLink
                        p={0}
                        m={0}
                        icon={<Image src={'/logo-3.png'} w={24} alt={"logo"} />}
                        label={userName?.name}
                      />

                    </Menu.Target> */}

                    <Menu.Target>
                      <ActionIcon radius={100} size={42} bg={"blue.1"} variant={"filled"}>
                        <MdAccountCircle size={42} color={"babyblue"} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown bg={"blue"}>
                      <Menu.Item
                        bg={"red"}
                        c={"white"}
                        onClick={() => {
                          localStorage.removeItem("user_id");
                          gUser.set({});
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
      {listView.map((v) =>
        v.child.map((vv) => (
          <Box hidden={vv.name != selectedView.value} key={vv.name}>
            {<vv.view />}
          </Box>
        ))
      )}
      <LoadFirstData />
    </AppShell>
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
                    <Text size={12} c={"blue"}>
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
