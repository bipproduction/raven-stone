import { gSelectedView } from "@/g_state/g_selected_view";
import { Box, Flex, Space, Stack, Text, Title } from "@mantine/core";
import _ from "lodash";
import {
    MdCircle
} from "react-icons/md";

const PageTitle = ({ text }: { text?: string }) => {
  return (
    <>
      <Flex>
        <MdCircle color="orange" size={42} />
        <Stack spacing={0}>
          <Title c={"blue.8"}>{_.upperCase(gSelectedView.value)}</Title>
          <Box p={"xs"} bg={"#96A0B8"}>
            <Text c={"white"}>{text}</Text>
          </Box>
        </Stack>
      </Flex>
      <Space h={16} />
    </>
  );
};

export default PageTitle;
