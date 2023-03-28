import ActiveAuthorData from "@/Luxxn/ActiveAuthor";
import { Stack, Text } from "@mantine/core";
import MediaListenerTitle from "./media_listener_title";

const ActiveAuthor = () => {
  return (
    <>
      <Stack spacing={0}>
        <MediaListenerTitle title="Active Author" />
        <ActiveAuthorData />
      </Stack>
    </>
  );
};

export default ActiveAuthor;
