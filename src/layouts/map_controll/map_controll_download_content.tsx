import { sCandidate } from "@/s_state/s_candidate";
import { useAtom } from "jotai";
import { mc_list_candidate } from "./map_controll_state";
import { Group, Paper, Stack, Title } from "@mantine/core";
import { MdDownload } from "react-icons/md";

export default function MapControllDownloadContent() {
  const [listCandidate, setListCandidat] = useAtom(mc_list_candidate);
  return (
    <>
      <Group>
        {listCandidate?.map((v) => (
          <Paper key={v.id}>
            <Stack spacing={0}>
              <MdDownload />
              <Title order={3} c={"gray"}>
                {v.name}
              </Title>
            </Stack>
          </Paper>
        ))}
      </Group>
    </>
  );
}
