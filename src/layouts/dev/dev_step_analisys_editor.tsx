import { Button, Group, Stack, Text } from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function DevStepEditor({
  content,
  onsave,
}: {
  content: string;
  onsave: (val: Editor) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content,
  });
  return (
    <Stack spacing={"lg"}>
      <Text>content</Text>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          {/* <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup> */}

          <RichTextEditor.ControlsGroup>
            {/* <RichTextEditor.Blockquote /> */}
            {/* <RichTextEditor.Hr /> */}
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            {/* <RichTextEditor.Subscript /> */}
            {/* <RichTextEditor.Superscript /> */}
          </RichTextEditor.ControlsGroup>

          {/* <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup> */}
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <Group position="right">
        <Button compact w={150} onClick={() => onsave(editor!)}>
          Save
        </Button>
      </Group>
    </Stack>
  );
}
