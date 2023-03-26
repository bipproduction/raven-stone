import {
  Box,
  Button,
  Group,
  MediaQuery,
  Navbar,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";

const listmenuya = [
  {
    id: "1",
    name: "contexttual content",
    content: () => EditorContextualContent,
  },
  {
    id: "2",
    name: "ini dua",
    content: Text,
  },
];

const ContentControll = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("1");
  return (
    <>
      <Stack>
        <Group sx={{ zIndex: 100 }} top={0} pos={"sticky"}>
          <Button.Group p={"xs"}>
            {listmenuya.map((v) => (
              <Button
                variant={selectedMenu == v.id ? "filled" : "default"}
                w={120}
                compact
                key={v.id}
                onClick={() => {
                  setSelectedMenu(v.id);
                }}
              >
                {v.name}
              </Button>
            ))}
          </Button.Group>
        </Group>
        <Stack></Stack>
      </Stack>
    </>
  );
};

export const EditorContextualContent = () => {
  return <></>;
};

export default ContentControll;
