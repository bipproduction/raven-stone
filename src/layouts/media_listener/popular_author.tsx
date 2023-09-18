import PopularAuthorData from "@/Luxxn/PopularAuthor";
import { Stack, Text } from "@mantine/core";
import MediaListenerTitle from "./media_listener_title";

const PopularAuthor = () => {
  return (
    <>
      <Stack spacing={0}>
      <MediaListenerTitle title="Popular Author" />
        <PopularAuthorData />
      </Stack>
    </>
  );
};

export default PopularAuthor;
