import { Center, Flex, Image, Stack, Text } from "@mantine/core";
import PageTitle from "../page_title";

export default function SwotAnalisys() {
  return (
    <>
      <Stack spacing={"lg"}>
        <PageTitle
          text="STRENGTH WEAKNESS OPPORTUNITY THREAT"
          title="SWOT ANALISYS"
        />
        <Stack  w={"100%"} align="center" justify="center">
          <Text fz={24} fw={"bold"}>
            Data-Cleaning & Data-Stacking On Progress...
          </Text>
          <Flex gap={"md"}>
            <Text>Feature Deployment On </Text>
            <Text c={"red"} fw={"bold"}>
              May 5, 2023
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </>
  );
}
