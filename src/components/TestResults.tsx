import React from 'react';
import { TestResult } from '../types/question';

interface TestResultsProps {
  results: TestResult[] | null;
}

const TestResults: React.FC<TestResultsProps> = ({ results }) => {
  if (!results) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">测试结果</h3>
      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              result.passed ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <div className="font-mono text-sm">
              <div>输入: {result.input}</div>
              <div>期望: {result.expected}</div>
              <div>实际: {result.actual}</div>
              <div className={result.passed ? 'text-green-600' : 'text-red-600'}>
                {result.passed ? '通过' : '失败'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;