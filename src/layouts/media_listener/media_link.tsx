import MediaLinkData from "@/Luxxn/MediaLink";
import { Stack, Text } from "@mantine/core";
import MediaListenerTitle from "./media_listener_title";

const MediaLink = () => {
  return (
    <>
      <Stack spacing={0}>
      <MediaListenerTitle title="Media Link" />
        <MediaLinkData />
      </Stack>
    </>
  );
};

export default MediaLink;
