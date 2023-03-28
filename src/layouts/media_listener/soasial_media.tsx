import SocialMediaData from "@/Luxxn/SocialMedia";
import { Stack, Text } from "@mantine/core";
import MediaListenerTitle from "./media_listener_title";

const SosialMedia = () => {
  return (
    <>
      <Stack spacing={0}>
        <MediaListenerTitle title="Sosial Media" />
        <SocialMediaData />
      </Stack>
    </>
  );
};

export default SosialMedia;
