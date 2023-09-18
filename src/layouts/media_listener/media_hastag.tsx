import MediaHastagData from "@/Luxxn/Mediahastag";
import { Stack, Text } from "@mantine/core";
import MediaListenerTitle from "./media_listener_title";

const MediaHastag = () => {
  return (
    <>
      <Stack spacing={0}>
        <MediaListenerTitle title="Media Hastag" />
        <MediaHastagData />
      </Stack>
    </>
  );
};

export default MediaHastag;
