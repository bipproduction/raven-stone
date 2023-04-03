
import { sSelectedView } from "@/s_state/s_selected_view";
import { Paper, Stack, Text, Title } from "@mantine/core";

const Sambutan = () => {
  return (
    <>
      {(sSelectedView.value == "Top 10 Province By Emotions" ||
        sSelectedView.value == "Top 10 District by Emotions") && (
        <Paper shadow={"md"}>
            <Stack p={"xs"} spacing={0}>
          <Title c={"cyan.4"}>Hi Mr. Chusni</Title>
          <Text c={"gray"}>
            Welcome to Prabowo Subianto for President 2024 - Digital
            Intelligence Winning Program.
          </Text>
        </Stack>
        </Paper>
      )}
    </>
  );
};

export default Sambutan;
