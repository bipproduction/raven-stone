import { Box, Button, Paper, Stack } from "@mantine/core";
import { DevStepAnalisys } from "./dev_step_analisys";
import { DevSwotAnalisys } from "./dev_swot_analisys";
import { signal } from "@preact/signals-react";
import { useShallowEffect } from "@mantine/hooks";

const listMenu = [
  {
    id: "1",
    title: "Step Analisys",
    view: DevStepAnalisys,
    visible: true,
  },
  {
    id: "2",
    title: "Swot Analisys",
    view: DevSwotAnalisys,
    visible: true,
  },
];

const KEY_SELECTED = "devStepSwot_selectedMenu";

const selectedMenu = signal("1");

export function DevStepAndSwotAnalisys() {
  useShallowEffect(() => {
    const selected = localStorage.getItem(KEY_SELECTED);
    if (selected) {
      selectedMenu.value = selected;
    }
  }, []);

  function setSelectedMenu(id: string) {
    selectedMenu.value = id;
    localStorage.setItem(KEY_SELECTED, id);
  }
  return (
    <>
      <Stack spacing={"lg"}>
        <Box p={"xs"} bg={"dark"} pos={"sticky"} top={0} sx={{
            zIndex: 100
        }} >
          <Button.Group>
            {listMenu.map((v) => (
              <Button
                compact
                onClick={() => setSelectedMenu(v.id)}
                key={v.id}
                bg={v.id == selectedMenu.value ? "blue" : "gray.6"}
              >
                {v.title}
              </Button>

            ))}
          </Button.Group>
        </Box>
        {listMenu.map((v) => (
          <Box key={v.id} hidden={v.id != selectedMenu.value}>
            <v.view key={v.id} />
          </Box>
        ))}
      </Stack>
    </>
  );
}
