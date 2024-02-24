"use client";

import React, { useRef } from "react";

import { DeleteItemModal } from "../modal/delete-item";

import Link from "next/link";

import { MdEdit, MdDelete } from "react-icons/md";

interface ProductCategoryProps {
  product_category_id: string;
  product_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  category: {
    category_id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}

interface ProductCardProps {
  product: {
    product_id: string;
    title: string;
    description: string;
    brand?: {
      brand_id?: string;
      title?: string;
      description?: string;
    };
    product_category?: ProductCategoryProps[];
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
            <h2 className="line-clamp-1 card-title" title={product.title}>
              {product.title}
            </h2>
            <p className="line-clamp-2 mt-1" title={product.description}>
              {product.description}
            </p>

            <div className="my-5">
              <p className="font-medium text-sm">Marca:</p>
              <div
                className={`badge h-auto min-w-14 p-1 px-2 line-clamp-1 mt-2 ${
                  product.brand ? "badge-ghost" : "badge-error badge-outline"
                }`}
                title={
                  product.brand
                    ? product.brand.title
                    : "Nenhuma marca cadastrada"
                }
              >
                {product.brand ? product.brand.title : "Não cadastrado"}
              </div>

              <div className="h-px bg-base-200 my-5"></div>

              <p className="font-medium text-sm">Categorias:</p>

              <div className="mt-2 min-h-16">
                {product.product_category &&
                product.product_category.length > 0 ? (
                  <div className="">
                    {product.product_category.map((product_category) => {
                      return (
                        <div
                          key={product_category.product_category_id}
                          className="badge badge-ghost h-auto min-w-14 p-1 px-2 inline-flex items-center gap-2 m-0.5"
                          title={product_category.category.title}
                        >
                          <div>
                            <div className="flex items-center">
                              <span className="line-clamp-1 text-xs">
                                {product_category.category.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div
                      className={`badge line-clamp-1 badge-error badge-outline h-auto min-w-14 p-1 px-2`}
                      title={"Nenhuma categoria cadastrada"}
                    >
                      <span className="text-xs">
                        Nenhuma categoria cadastrada
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
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
        keyTag="product-collection"
        route="/product"
        field="product_id"
        value={product.product_id}
        modalRef={deleteItemModalRef}
      />
    </>
  );
};

export { ProductCard };
