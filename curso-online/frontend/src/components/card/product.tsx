"use client";

import React, { useRef } from "react";

import { DeleteItemModal } from "../modal/delete-item";

import Link from "next/link";

import { MdEdit, MdDelete } from "react-icons/md";

interface ProductCardProps {
  product: {
    product_id: string;
    title: string;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const deleteItemModalRef = useRef<HTMLDialogElement | null>(null);

  function handleDelete() {
    if (deleteItemModalRef.current) {
      deleteItemModalRef.current.showModal();
    }
  }

  return (
    <>
      <div className="card bg-base-300 border border-base-200 border-l-4 border-l-primary overflow-hidden shadow-md hover:shadow-none">
        <div className="card-body">
          <div>
            <h2 className="line-clamp-1 card-title">{product.title}</h2>
            <p className="line-clamp-2 mt-1">{product.description}</p>
          </div>
          <div className="card-actions h-full items-end space-x-0.5">
            <Link
              className="btn btn-active btn-square w-12 h-12"
              href={`/dashboard/product/edit/${product.product_id}`}
            >
              <MdEdit className="text-2xl" />
            </Link>

            <button
              className="btn btn-active btn-square w-12 h-12"
              onClick={handleDelete}
            >
              <MdDelete className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <DeleteItemModal
        key="product-collection"
        route="/product"
        field="product_id"
        value={product.product_id}
        modalRef={deleteItemModalRef}
      />
    </>
  );
};

export { ProductCard };
