"use client";

import MDEditor, {
  EditorContext,
  MDEditorProps,
  RefMDEditor,
} from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { RefAttributes, useContext } from "react";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "@/components/ui/button";

import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

type MarkdownEditorProps = MDEditorProps & RefAttributes<RefMDEditor>;

function ChangeModeButton() {
  const { preview, dispatch } = useContext(EditorContext);
  function handleChangeMode() {
    dispatch?.({
      preview: preview === "edit" ? "preview" : "edit",
    });
  }

  if (preview === "edit") {
    return (
      <Button type="button" onClick={handleChangeMode}>
        Preview
      </Button>
    );
  }
  return (
    <Button type="button" onClick={handleChangeMode}>
      Continue editing
    </Button>
  );
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { theme } = useTheme();

  return (
    <MDEditor
      {...props}
      preview="edit"
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      data-color-mode={theme as "light" | "dark" | undefined}
      id="markdown-editor"
      extraCommands={[
        {
          name: "preview",
          keyCommand: "preview",
          value: "preview",
          icon: <ChangeModeButton />,
        },
      ]}
    />
  );
}
