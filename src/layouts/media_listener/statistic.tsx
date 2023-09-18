import Statistic from "@/Luxxn/Statistic";
import { Stack, Text } from "@mantine/core";
import MediaListenerTitle from "./media_listener_title";

const Statistict = () => {
  return (
    <>
      <Stack spacing={0}>
        <MediaListenerTitle title="Media Hastag" />
        <Statistic />
      </Stack>
    </>
  );
};

export default Statistict;
