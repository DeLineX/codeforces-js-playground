import { Editor, type EditorProps } from "@monaco-editor/react";
import type { FC } from "react";
import { useAppStore } from "../model/app-store";

export const CodeArea: FC = () => {
  const code = useAppStore((state) => state.code);
  const changeCode = useAppStore((state) => state.changeCode);

  const handleEditorChange: EditorProps["onChange"] = (value) => {
    if (value) {
      changeCode(value);
    }
  };

  return (
    <Editor
      height="100vh"
      language="javascript"
      value={code}
      onChange={handleEditorChange}
    />
  );
};
