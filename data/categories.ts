import { Category } from '../types/question';

export const categories: Category[] = [
  {
    id: 'js-core',
    name: 'JavaScript 核心',
    description: '包含 JavaScript 基础概念、原型链、闭包等核心知识点',
    count: 2
  },
  {
    id: 'async',
    name: '异步编程',
    description: 'Promise、async/await、事件循环等异步编程相关题目',
    count: 1
  },
  {
    id: 'data-structures',
    name: '数据结构',
    description: '常见数据结构的 JavaScript 实现',
    count: 0
  },
  {
    id: 'design-patterns',
    name: '设计模式',
    description: 'JavaScript 中的设计模式实现',
    count: 0
  }
];