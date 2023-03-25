import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
import { gUser } from "@/g_state/auth/g_user";
import { gSelectedView } from "@/g_state/g_dasboard";
import { gIsUser } from "@/g_state/g_user_id";
import ActiveAuthor from "@/layouts/media_listener/active_author";
import ActiveUrl from "@/layouts/media_listener/active_url";
import ImportantAuthor from "@/layouts/media_listener/important_author";
import ImportantUrl from "@/layouts/media_listener/important_url";
import MediaHastag from "@/layouts/media_listener/media_hastag";
import MediaLink from "@/layouts/media_listener/media_link";
import MentionbyCategory from "@/layouts/media_listener/mention_by_category";
import PopularAuthor from "@/layouts/media_listener/popular_author";
import SosialMedia from "@/layouts/media_listener/soasial_media";
import ContextualContent from "@/layouts/prodictive_ai/contextual_content";
import EmotionalViewViaProvince from "@/layouts/prodictive_ai/emotional_view_via_province";
import EmotionalViewViaProvinceCouple from "@/layouts/prodictive_ai/emotional_view_via_province_couple";
import EmotionalViewViaRegion from "@/layouts/prodictive_ai/emotional_view_via_region";
import NationWideRating from "@/layouts/prodictive_ai/nation_wide_rating";
import NationWideChart from "@/layouts/summary/nation_wide_chart";
import SourceOfmention from "@/layouts/summary/source_of_mention";
import Top10DistrictbyConversation from "@/layouts/summary/top_10_district_by_conversation";
import Top10ProvinceByConversation from "@/layouts/summary/top_10_province_by_conversation";
import { api } from "@/lib/api";
import { useHookstate } from "@hookstate/core";
import {
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  Header,
  Image,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import {
  MdAccountCircle,
  MdBarChart,
  MdCircle,
  MdGridView,
  MdMessage,
  MdPlayCircle,
  MdSettings,
} from "react-icons/md";

const listView = [
  {
    id: 1,
    name: "Summary",
    icon: MdGridView,
    child: [
      {
        id: 1,
        name: "Nation Wide Chart",
        view: NationWideChart,
      },
      {
        id: 2,
        name: "Top 10 Province By Conversation",
        view: Top10ProvinceByConversation,
      },
      {
        id: 3,
        name: "Top 10 District by Conversation",
        view: Top10DistrictbyConversation,
      },
      {
        id: 4,
        name: "Source of Mention",
        view: SourceOfmention,
      },
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
        name: "Mention By Category",
        view: MentionbyCategory,
      },
      {
        id: 3,
        name: "Media Hastag",
        view: MediaHastag,
      },
      {
        id: 4,
        name: "Important Author",
        view: ImportantAuthor,
      },
      {
        id: 5,
        name: "Active Author",
        view: ActiveAuthor,
      },
      {
        id: 6,
        name: "Active url",
        view: ActiveUrl,
      },
      {
        id: 7,
        name: "Important Url",
        view: ImportantUrl,
      },
      {
        id: 8,
        name: "Media Link",
        view: MediaLink,
      },
      {
        id: 8,
        name: "Sosial Media",
        view: SosialMedia,
      },
      {
        id: 10,
        name: "Popular Author",
        view: PopularAuthor,
      },
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
      {
        id: 2,
        name: "Emotional View Via Region",
        view: EmotionalViewViaRegion,
      },
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
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow component={ScrollArea}>
            {listView.map((v) => (
              <NavLink
                bg={"blue.8"}
                label={v.name}
                icon={<v.icon size={24} />}
                key={v.id.toString()}
                c={"gray.4"}
                defaultOpened
              >
                {v.child.map((vv, i) => (
                  <NavLink
                    c={selectedView.value == vv.name ? "blue.8" : "blue.4"}
                    icon={<MdCircle color="navi" />}
                    variant={"filled"}
                    fw={selectedView.value == vv.name ? "bold" : "light"}
                    // bg={selectedView.value == vv.name ? "blue.1" : ""}
                    label={_.upperCase(vv.name)}
                    key={`${v.id}${i}`}
                    onClick={() => {
                      selectedView.set(vv.name);
                      setOpened(false);
                    }}
                  />
                ))}
              </NavLink>
            ))}
            <NavLink
              bg={"gray"}
              c={"dark"}
              icon={<MdSettings />}
              label={"setting"}
            />
          </Navbar.Section>
          <Navbar.Section bg={"dark"}>
            <Stack spacing={0} p={"xs"}>
              <Text fz={9} c={"gray"}>
                Bip Production @2023
              </Text>
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
        <Header height={{ base: 50, md: 70 }} p="md" bg={"gray.4"}>
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
                  <Image width={100} src={"/logo-1.png"} alt={"logo"} />
                </MediaQuery>
                {/* <Text c={"blue.8"} size={24} fw={"bold"}>EAGLE EYE PROJECT</Text> */}
              </Group>
              <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                <Group>
                  <Menu>
                    <Menu.Target>
                      <NavLink
                        icon={<MdAccountCircle size={42} color={"#1870C2"} />}
                        label={userName?.name}
                      />
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
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
