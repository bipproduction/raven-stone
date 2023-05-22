import { Button, Card, Group, Stack } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useAtom } from "jotai";
import { v3_val_data_edit } from "../val/v3_val_data_edit";

export function V3ComTextEditor({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
  
}) {
  const [dataEdit, setDataEdit] = useAtom(v3_val_data_edit);
  const editor = useEditor({
    extensions: [StarterKit],
    content: dataEdit.text,
    onUpdate: ({ editor }) => {
      setDataEdit({ ...dataEdit, text: editor.getHTML() });
    },
  });

  return (
    <>
      <Card
        p={"xs"}
        sx={{
          overflow: "scroll",
        }}
      >
        <Stack spacing={"lg"}>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Content />
          </RichTextEditor>
          <Group position={"right"}>
            <Button onClick={() => onClick()}>Save</Button>
          </Group>
        </Stack>
      </Card>
    </>
  );
}
