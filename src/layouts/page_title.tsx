import { gSelectedView } from "@/g_state/g_selected_view";
import { stylesGradientBluegray } from "@/styles/styles_gradient_blue_gray";
import { Box, Flex, Paper, Space, Stack, Text, Title } from "@mantine/core";
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
          <Paper shadow={"md"} p={"xs"} bg={stylesGradientBluegray} radius={4}>
            <Text c={"white"}>{text}</Text>
          </Paper>
        </Stack>
      </Flex>
      <Space h={16} />
    </>
  );
};

export default PageTitle;
