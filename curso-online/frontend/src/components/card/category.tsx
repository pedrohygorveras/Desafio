import React from "react";

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    description: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="rounded-md text-left flex flex-col outline-none bg-slate-800 p-5 overflow-hidden relative">
      <div className="h-[120px]">
        <h2 className="line-clamp-1 text-xl font-bold text-slate-200">
          {category.title}
        </h2>
        <p className="line-clamp-3 text-sm leading-5 text-slate-400 mt-2">
          {category.description}
        </p>
      </div>
      <div className="flex items-end h-full"></div>
    </div>
  );
};

export { CategoryCard };