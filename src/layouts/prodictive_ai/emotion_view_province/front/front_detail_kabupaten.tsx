import { Card, CloseButton, Flex, Stack, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { val_selected_menu_id } from "./val/val_selected_menu_id";

export function FrontDetailKabupaten() {
  const [selectedMenu, setSelectedMenu] = useAtom(val_selected_menu_id);
  return (
    <>
      <Stack>
        <Card p={"sm"}>
          <Flex justify="space-between">
            <Title>Detail Kabupaten</Title>
            <CloseButton size={"lg"} onClick={() => setSelectedMenu("1")} />
          </Flex>
        </Card>
      </Stack>
    </>
  );
}
