import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  MediaQuery,
  Navbar,
  NumberInput,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import dataContent from "./../assets/contextual_content.json";

export const EditorContextualContent = () => {
 
  return (
    <Stack bg={"gray.1"}>
      <Title>Contextual Controll</Title>
      
    </Stack>
  );
};

const listmenuya = [
  {
    id: "1",
    name: "contexttual content",
    content: EditorContextualContent,
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
        <Stack>
          {listmenuya.map(
            (v) => v.id == selectedMenu && <v.content key={v.id} />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ContentControll;
