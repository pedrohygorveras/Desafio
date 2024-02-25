"use client";

import React from "react";

interface HomeCardProps {
  product: {
    product_id: string;
    brand_id: string;
    title: string;
    description: string;
    created_at: Date;
    brand: {
      brand_id: string;
      title: string;
      description: string;
      created_at: Date;
    };
  };
  qtd: number;
  addItem: (data: any) => void;
}

const HomeCard: React.FC<HomeCardProps> = ({ product, addItem }) => {
  return (
    <>
      <div className="card border border-base-200 overflow-hidden shadow-md bg-card h-100">
        <div className="card-body">
          <div>
            <h2
              className="line-clamp-2 text-base card-title capitalize font-bold"
              title={product.title}
            >
              {product.title}
            </h2>

            {product.brand && (
              <div
                className={`badge badge-ghost text-xs h-auto min-w-14 line-clamp-1 mt-2 mb-5 cursor-pointer`}
                title={product.brand && product.brand.title}
              >
                {product.brand && product.brand.title}
              </div>
            )}

            <div className="mt-2 mb-4">
              <p className="line-clamp-3 text-sm" title={product.description}>
                {product.description}
              </p>
            </div>
          </div>
          <div className="card-actions h-full items-end space-x-0.5">
            <button
              className="btn grad grad-orange rounded-3xl"
              onClick={() => addItem(product)}
              title="Adicionar ao carrinho"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { HomeCard };
