import { Question } from '../types/question';

export const questions: Question[] = [
  {
    id: '1',
    title: '实现深拷贝',
    description: `实现一个深拷贝函数 deepClone，需要满足以下要求：
1. 支持对象和数组的深度克隆
2. 处理循环引用的情况
3. 支持基本数据类型、Date、RegExp 等特殊对象
4. 保持对象的原型链`,
    difficulty: 'Medium',
    category: 'js-core',
    starterCode: `function deepClone(obj) {
  // 在这里实现你的代码
}`,
    testCases: [
      {
        input: 'deepClone({ a: 1, b: { c: 2 } })',
        expected: '{"a":1,"b":{"c":2}}'
      },
      {
        input: 'deepClone([1, [2, 3]])',
        expected: '[1,[2,3]]'
      }
    ],
    tags: ['对象', '递归', '面试常考'],
    solution: `function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);
  
  let clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);
  
  Reflect.ownKeys(obj).forEach(key => {
    clone[key] = deepClone(obj[key], hash);
  });
  
  return clone;
}`
  },
  {
    id: '2',
    title: '实现 Promise.all',
    description: `实现一个与 Promise.all 功能相同的函数，要求：
1. 接收一个 Promise 数组作为参数
2. 返回一个新的 Promise
3. 当所有 Promise 都成功时，返回结果数组
4. 当任意一个 Promise 失败时，返回第一个失败的原因`,
    difficulty: 'Hard',
    category: 'async',
    starterCode: `function promiseAll(promises) {
  // 在这里实现你的代码
}`,
    testCases: [
      {
        input: 'promiseAll([Promise.resolve(1), Promise.resolve(2)])',
        expected: '[1,2]'
      }
    ],
    tags: ['Promise', '异步编程', '面试常考'],
    solution: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('promises must be an array'));
    }
    
    const results = [];
    let completed = 0;
    
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}`
  }
];