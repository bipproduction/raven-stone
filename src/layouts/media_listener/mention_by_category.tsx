// import { gSelectedView } from "@/g_state/g_selected_view";
import MentionByCategory from "@/Luxxn/MentionByCategory";
import { sSelectedView } from "@/s_state/s_selected_view";
import { Stack, Text } from "@mantine/core";
import ActiveAuthor from "./active_author";
import ActiveUrl from "./active_url";
import ImportantAuthor from "./important_author";
import ImportantUrl from "./important_url";
import MediaHastag from "./media_hastag";
import MediaLink from "./media_link";
import PopularAuthor from "./popular_author";
import SosialMedia from "./soasial_media";

const MentionbyCategory = () => {
  if (sSelectedView.value != "Media Summary") return <></>;
  return (
    <>
      <Stack spacing={70}>
        <MentionByCategory />
        <MediaHastag />
        <ImportantAuthor />
        <ActiveAuthor />
        <ActiveUrl />
        <ImportantUrl />
        <MediaLink />
        <SosialMedia />
        <PopularAuthor />
      </Stack>
    </>
  );
};

export default MentionbyCategory;
