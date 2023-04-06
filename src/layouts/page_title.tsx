// import { gSelectedView } from "@/g_state/g_selected_view";
import { stylesGradientBluegray } from "@/styles/styles_gradient_blue_gray";
import { stylesGradientOrange } from "@/styles/styles_gradient_orange";
import { sSelectedView } from "@/s_state/s_selected_view";
import { Box, Flex, Paper, Space, Stack, Text, Title } from "@mantine/core";
import _ from "lodash";
import { MdCircle } from "react-icons/md";

const PageTitle = ({ title, text }: { title?: string; text?: string }) => {
  return (
    <>
      <Flex>
        <MdCircle color="orange" size={42} />
        <Stack spacing={0}>
          <Title c={"blue.8"}>
            {_.upperCase(title ?? sSelectedView.value)}
          </Title>
          <Box
            // p={"xs"}
            bg={stylesGradientBluegray}
            className={"bgGradientBlueGray"}
          >
            <Text c={"white"}>{text}</Text>
          </Box>
        </Stack>
      </Flex>
      <Space h={16} />
    </>
  );
};

export default PageTitle;
