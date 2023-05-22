import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function V3ComTextEditor({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    
  });
  return (
    <>
      <RichTextEditor editor={editor} h={500}>
        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
}
