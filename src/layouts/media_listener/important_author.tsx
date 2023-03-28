import ImportantAuthorData from "@/Luxxn/ImportantAuthor";
import { Stack, Text } from "@mantine/core";
import MediaListenerTitle from "./media_listener_title";

const ImportantAuthor = () => {
  return (
    <>
      <Stack spacing={0}>
        <MediaListenerTitle title="Important Author" />
        <ImportantAuthorData />
      </Stack>
    </>
  );
};

export default ImportantAuthor;
