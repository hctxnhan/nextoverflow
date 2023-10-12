import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface QuestionEditorProps {
  value?: string;
  onChange: (value?: string) => void;
}

export function QuestionEditor({ value, onChange }: QuestionEditorProps) {
  const { theme } = useTheme();
  return (
    <div>
      <MDEditor
        id="question-editor"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        data-color-mode={theme as "light" | "dark" | undefined}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
