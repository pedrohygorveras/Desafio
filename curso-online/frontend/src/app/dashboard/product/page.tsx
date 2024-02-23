"use client";

import { useState } from "react";

import Link from "next/link";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { Header } from "@/components/header/title";

interface ProductProps {
  id: string;
  title: string;
  description: string;
}

export default function DashboardProduct() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  return (
    <DashboardLayout>
      <div className="overflow-x-hidden">
        <Header title="Produtos" />

        <div className="text-right">
          <Link className="btn btn-primary" href={"/dashboard/brand/create"}>
            Adicionar
          </Link>
        </div>

        <div className="py-10">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]"></div>
          ) : (
            <div className="">
              <div>
                <h1 className="font-bold text-2xl">
                  Nenhum foi produto cadastrado.
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
