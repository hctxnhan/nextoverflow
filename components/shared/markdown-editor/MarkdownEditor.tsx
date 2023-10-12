"use client";

import MDEditor, { MDEditorProps, RefMDEditor } from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { RefAttributes } from "react";
import rehypeSanitize from "rehype-sanitize";

import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

type MarkdownEditorProps = MDEditorProps & RefAttributes<RefMDEditor>;

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { theme } = useTheme();

  return (
    <MDEditor
      {...props}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      data-color-mode={theme as "light" | "dark" | undefined}
      id="markdown-editor"
    />
  );
}
