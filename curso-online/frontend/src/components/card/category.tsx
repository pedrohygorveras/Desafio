"use client";

import React, { useRef } from "react";

import { DeleteItemModal } from "../modal/delete-item";
import Link from "next/link";

interface CategoryCardProps {
  category: {
    category_id: string;
    title: string;
    description: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const deleteItemModalRef = useRef<HTMLDialogElement | null>(null);

  function handleDelete() {
    if (deleteItemModalRef.current) {
      deleteItemModalRef.current.showModal();
    }
  }

  return (
    <>
      <div className="rounded-md text-left flex flex-col outline-none bg-slate-800 p-5 overflow-hidden relative">
        <div className="h-[120px]">
          <h2 className="line-clamp-1 text-xl font-bold text-slate-200">
            {category.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-5 text-slate-400 mt-2">
            {category.description}
          </p>
        </div>
        <div className="flex items-end h-full">
          <Link
            className="btn btn-ghost mr-2"
            href={`/dashboard/category/edit/${category.category_id}`}
          >
            Editar
          </Link>
          <button
            type="button"
            className="btn btn-outline btn-error"
            onClick={handleDelete}
          >
            Excluir
          </button>
        </div>
      </div>

      <DeleteItemModal
        route="/category"
        field="category_id"
        value={category.category_id}
        modalRef={deleteItemModalRef}
      />
    </>
  );
};

export { CategoryCard };
