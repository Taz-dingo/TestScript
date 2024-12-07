import React from 'react';
import { Question } from '../types/question';

interface QuestionListProps {
  questions: Question[];
  selectedQuestion: Question;
  onSelectQuestion: (questionId: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  selectedQuestion,
  onSelectQuestion,
}) => {
  return (
    <div className="border-t pt-4">
      <h2 className="text-xl font-semibold mb-4">题目列表</h2>
      <ul className="space-y-2">
        {questions.map((question) => (
          <li key={question.id}>
            <button
              onClick={() => onSelectQuestion(question.id)}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                selectedQuestion.id === question.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{question.title}</span>
                <span
                  className={`text-sm ${
                    question.difficulty === 'Easy'
                      ? 'text-green-500'
                      : question.difficulty === 'Medium'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              <div className="mt-1">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600 mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;