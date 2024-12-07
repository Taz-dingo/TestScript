import React from 'react';
import { categories } from '../data/categories';
import { Category } from '../types/question';

interface CategoryListProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">题目分类</h2>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === null
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-gray-100'
          }`}
        >
          全部题目
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{category.name}</span>
              <span className="text-sm text-gray-500">{category.count}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;