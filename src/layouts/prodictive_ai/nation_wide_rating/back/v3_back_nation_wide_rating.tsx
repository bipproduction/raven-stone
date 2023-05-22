import { Paper, Stack, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

export function V3BackNationWideRating() {
  return (
    <>
      <Title>Back Nation Wide Rating</Title>
      <Paper>
        <Stack>
          <DatePicker />
        </Stack>
      </Paper>
    </>
  );
}
