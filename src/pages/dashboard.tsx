import ActiveAuthor from "@/layouts/media_listener/active_author";
import ActiveUrl from "@/layouts/media_listener/active_url";
import ImportantAuthor from "@/layouts/media_listener/important_author";
import ImportantUrl from "@/layouts/media_listener/important_url";
import MediaHastag from "@/layouts/media_listener/media_hastag";
import MediaLink from "@/layouts/media_listener/media_link";
import MentionbyCategory from "@/layouts/media_listener/mention_by_category";
import PopularAuthor from "@/layouts/media_listener/popular_author";
import SosialMedia from "@/layouts/media_listener/soasial_media";
import Statistict from "@/layouts/media_listener/statistic";
import ContextualContent from "@/layouts/prodictive_ai/contextual_content";
import EmotionalViewViaProvince from "@/layouts/prodictive_ai/emotional_view_via_province";
import EmotionalViewViaRegion from "@/layouts/prodictive_ai/emotional_view_via_region";
import NationWideRating from "@/layouts/prodictive_ai/nation_wide_rating";
import NationWideChart from "@/layouts/summary/nation_wide_chart";
import SourceOfmention from "@/layouts/summary/source_of_mention";
import Top10DistrictbyConversation from "@/layouts/summary/top_10_district_by_conversation";
import Top10ProvinceByConversation from "@/layouts/summary/top_10_province_by_conversation";
import WordCloud from "@/layouts/summary/word_cloud";
import { api } from "@/lib/api";
import { gSelectedView } from "@/g_state/g_dasboard";
import { gListNationWideChahrt } from "@/g_state/g_nation_wide_chart";
import LoadTop10District from "@/load_data/load_top_10_district";
import { useHookstate } from "@hookstate/core";
import {
  AppShell,
  Aside,
  Box,
  Burger,
  Button,
  Flex,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import {
  MdAccountCircle,
  MdAddChart,
  MdAddCircle,
  MdArrowForwardIos,
  MdBarChart,
  MdGridView,
  MdMessage,
  MdPlayCircle,
} from "react-icons/md";
import LoadNationWideChart from "@/load_data/load_nationWide_chart";
import _ from "lodash";
import LoadSourceOfmention from "@/load_data/load_source_of_mention";
import LoadWordCloud from "@/load_data/load_word_cloud";
import LoadTop10Province from "@/load_data/load_top_10_province";
import LoadNationWideRating from "@/load_data/load_nation_wide_rating";
import LoadCandidate from "@/load_data/load_candidate";
import LoadProvince from "@/load_data/load_province";
import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
import EmotionalViewViaProvinceCouple from "@/layouts/prodictive_ai/emotional_view_via_province_couple";
import { gIsUser } from "@/g_state/g_user_id";

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
      {
        id: 5,
        name: "Word Cloud",
        view: WordCloud,
      },
    ],
  },
  {
    id: 2,
    name: "Media listener",
    icon: MdMessage,
    child: [
      {
        id: 1,
        name: "Statistic",
        view: Statistict,
      },
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

  useShallowEffect(() => {
    funcLoadNationWideRating();
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
                bg={"gray.2"}
                label={v.name}
                icon={<v.icon size={24} />}
                key={v.id.toString()}
                defaultOpened
              >
                {v.child.map((vv, i) => (
                  <NavLink
                    c={selectedView.value == vv.name ? "teal" : "dark"}
                    icon={<MdPlayCircle color="gray" />}
                    variant={"filled"}
                    fw={"bold"}
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
          </Navbar.Section>
        </Navbar>
      }
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
            <Flex direction={"row"} justify={"space-between"} w={"100%"}>
              <MdAccountCircle size={42} />
              <Button
                compact
                variant={"subtle"}
                onClick={() => {
                  localStorage.removeItem("user_id");
                  gIsUser.set(false);
                }}
              >
                Logout
              </Button>
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
