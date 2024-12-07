export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  input: string;
  expected: string;
}

export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  starterCode: string;
  testCases: TestCase[];
  tags: string[];
  solution?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}