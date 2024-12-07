import dynamic from "next/dynamic";
import { Question } from "../types/question";
import TestResults from "./TestResults";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] border border-gray-300 rounded-lg bg-gray-100 animate-pulse"></div>
  ),
});

const Sandbox = dynamic(() => import("./Sandbox"), {
  ssr: false,
  loading: () => (
    <button
      disabled
      className="px-4 py-2 rounded-lg bg-blue-300 cursor-not-allowed text-white"
    >
      加载中...
    </button>
  ),
});

interface QuestionDetailProps {
  question: Question;
  code: string;
  onCodeChange: (code: string) => void;
  results: any[] | null;
  onResults: (results: any[]) => void;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({
  question,
  code,
  onCodeChange,
  results,
  onResults,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{question.title}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              question.difficulty === "Easy"
                ? "bg-green-100 text-green-800"
                : question.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {question.difficulty}
          </span>
        </div>
        <div className="flex">
          <p className="text-gray-600 mb-4 whitespace-pre-line w-[30rem] mr-5">
            {question.description}
          </p>
          <Editor
            className="w-full mr-10"
            code={code}
            onChange={onCodeChange}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Sandbox
          code={code}
          testCases={question.testCases}
          onResults={onResults}
        />
      </div>

      <TestResults results={results} />
    </div>
  );
};

export default QuestionDetail;
