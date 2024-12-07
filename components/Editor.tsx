import { useRef, useCallback } from "react";
import MonacoEditor from "@monaco-editor/react";

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ code, onChange, className }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = useCallback((editor: any) => {
    editorRef.current = editor;
  }, []);

  return (
    <div
      className={`h-[600px] border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      <MonacoEditor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          wrappingStrategy: "advanced",
        }}
      />
    </div>
  );
};

export default Editor;
