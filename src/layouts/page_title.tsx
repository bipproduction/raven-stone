import { gSelectedView } from "@/g_state/g_dasboard";
import { Flex, Space, Stack, Title } from "@mantine/core";
import _ from "lodash";
import { MdApps, MdBuildCircle, MdChangeCircle, MdCheckCircle, MdCircle, MdPersonPinCircle, MdTitle } from "react-icons/md";

const PageTitle = () => {
  return (
    <>
      <Flex>
        <MdCircle color="orange" size={42} />
        <Title c={"cyan.8"}>{_.upperCase(gSelectedView.value)}</Title>
      </Flex>
      <Space h={70} />
    </>
  );
};

export default PageTitle;
