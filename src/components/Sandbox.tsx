import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { TestCase, TestResult } from '../types/question';

interface SandboxProps {
  code: string;
  testCases: TestCase[];
  onResults: (results: TestResult[]) => void;
}

const SandboxComponent: React.FC<SandboxProps> = ({ code, testCases, onResults }) => {
  const [isRunning, setIsRunning] = useState(false);

  const runCode = useCallback(() => {
    setIsRunning(true);
    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const results = testCases.map(({ input, expected }) => {
        try {
          const sandboxWindow = iframe.contentWindow;
          if (!sandboxWindow) throw new Error('沙盒初始化失败');

          sandboxWindow.eval(code);
          const actual = sandboxWindow.eval(input);
          return {
            input,
            expected,
            actual: JSON.stringify(actual),
            passed: JSON.stringify(actual) === expected
          };
        } catch (error: any) {
          return {
            input,
            expected,
            actual: error.message,
            passed: false
          };
        }
      });

      document.body.removeChild(iframe);
      onResults(results);
    } finally {
      setIsRunning(false);
    }
  }, [code, testCases, onResults]);

  return (
    <button
      onClick={runCode}
      disabled={isRunning}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isRunning
          ? 'bg-blue-300 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
    >
      {isRunning ? '运行中...' : '运行测试'}
    </button>
  );
};

export default dynamic(() => Promise.resolve(SandboxComponent), { 
  ssr: false,
  loading: () => (
    <button disabled className="px-4 py-2 rounded-lg bg-blue-300 cursor-not-allowed text-white">
      加载中...
    </button>
  )
});