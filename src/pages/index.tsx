import { useState } from 'react';
import dynamic from 'next/dynamic';
import { questions } from '../data/questions';
import CategoryList from '../components/CategoryList';
import QuestionList from '../components/QuestionList';
import ClientOnly from '../components/ClientOnly';

const QuestionDetail = dynamic(() => import('../components/QuestionDetail'), {
  ssr: false,
  loading: () => (
    <div className="bg-white p-6 rounded-lg shadow animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="h-[600px] bg-gray-200 rounded mb-4"></div>
    </div>
  ),
});

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [code, setCode] = useState(selectedQuestion.starterCode);
  const [results, setResults] = useState(null);

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : questions;

  const handleQuestionChange = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      setSelectedQuestion(question);
      setCode(question.starterCode);
      setResults(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            JavaScript 面试刷题平台
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-lg shadow">
              <CategoryList
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <QuestionList
                questions={filteredQuestions}
                selectedQuestion={selectedQuestion}
                onSelectQuestion={handleQuestionChange}
              />
            </div>
          </div>

          <div className="col-span-3">
            <ClientOnly
              fallback={
                <div className="bg-white p-6 rounded-lg shadow animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-[600px] bg-gray-200 rounded mb-4"></div>
                </div>
              }
            >
              <QuestionDetail
                question={selectedQuestion}
                code={code}
                onCodeChange={setCode}
                results={results}
                onResults={setResults}
              />
            </ClientOnly>
          </div>
        </div>
      </main>
    </div>
  );
}