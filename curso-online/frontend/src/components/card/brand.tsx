"use client";

import React, { useRef } from "react";

import { DeleteItemModal } from "../modal/delete-item";

import Link from "next/link";

import { MdEdit, MdDelete } from "react-icons/md";

interface BrandCardProps {
  brand: {
    brand_id: string;
    title: string;
    description: string;
  };
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
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
            <h2 className="line-clamp-1 card-title">{brand.title}</h2>
            <p className="line-clamp-2 mt-1">{brand.description}</p>
          </div>
          <div className="card-actions h-full items-end space-x-0.5">
            <Link
              className="btn btn-active btn-square w-12 h-12"
              href={`/dashboard/brand/edit/${brand.brand_id}`}
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
        key="brand-collection"
        route="/brand"
        field="brand_id"
        value={brand.brand_id}
        modalRef={deleteItemModalRef}
      />
    </>
  );
};

export { BrandCard };