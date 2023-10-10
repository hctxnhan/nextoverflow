import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

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
        data-color-mode={theme as "light" | "dark" | undefined}
        value={value}
        onChange={onChange}
        className="whitespace-pre-wrap"
      />
    </div>
  );
}
