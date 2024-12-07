'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { questions } from '@/data/questions'
import CategoryList from '@/components/CategoryList'
import QuestionList from '@/components/QuestionList'
import ClientOnly from '@/components/ClientOnly'

const QuestionDetail = dynamic(() => import('@/components/QuestionDetail'), {
  ssr: false,
  loading: () => (
    <div className="bg-white p-6 rounded-lg shadow animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="h-[600px] bg-gray-200 rounded mb-4"></div>
    </div>
  ),
})

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0])
  const [code, setCode] = useState(selectedQuestion.starterCode)
  const [results, setResults] = useState<any[]>([])

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : questions

  const handleQuestionChange = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question) {
      setSelectedQuestion(question)
      setCode(question.starterCode)
      setResults([])
    }
  }

  return (
    <main className="max-w-[1920px] mx-auto">
      <div className="flex">
        {/* 左侧导航 */}
        <div className="w-[300px] min-w-[300px] border-r border-gray-200 h-[calc(100vh-50px)] bg-white">
          <div className="p-4">
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

        {/* 主要内容区 */}
        <div className="flex-1 h-[calc(100vh-50px)] overflow-y-auto">
          <ClientOnly
            fallback={
              <div className="p-6 animate-pulse">
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
  )
}
