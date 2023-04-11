import { ActionIcon, Flex, Stack, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { MdArrowBackIos } from "react-icons/md";

const Medialistener = () => {
  const router = useRouter();
  const { ref, height, width } = useElementSize();

  return (
    <>
      <Stack h={"100vh"} ref={ref}>
        <Flex p={"md"}>
          <ActionIcon onClick={() => router.push('/dashboard')}>
            <MdArrowBackIos size={24} />
          </ActionIcon>
        </Flex>
        <iframe
          height={height}
          frameBorder={0}
          width={"100%"}
          src="https://analytics.bomasatu.com"
        />
      </Stack>
    </>
  );
};

export default Medialistener;
