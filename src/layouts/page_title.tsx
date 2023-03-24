import { gSelectedView } from "@/g_state/g_dasboard";
import { Flex, Space, Stack, Text, Title } from "@mantine/core";
import _ from "lodash";
import {
  MdApps,
  MdBuildCircle,
  MdChangeCircle,
  MdCheckCircle,
  MdCircle,
  MdPersonPinCircle,
  MdTitle,
} from "react-icons/md";

const PageTitle = ({ text }: { text?: string }) => {
  return (
    <>
      <Flex>
        <MdCircle color="orange" size={42} />
        <Stack spacing={0}>
          <Title c={"blue.8"}>{_.upperCase(gSelectedView.value)}</Title>
          <Text c={"gray"}>{text}</Text>
        </Stack>
      </Flex>
      <Space h={16} />
    </>
  );
};

export default PageTitle;
