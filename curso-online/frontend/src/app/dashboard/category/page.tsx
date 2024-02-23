// import { use, useState } from "react";

import Link from "next/link";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { Header } from "@/components/header/title";
import { CategoryCard } from "@/components/card/category";

interface CategoryProps {
  category_id: string;
  title: string;
  description: string;
}

async function getCategories() {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/category/collection`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      next: {
        tags: ["category-collection"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function DashboardCategory() {
  const { result, qtd } = await getCategories();

  return (
    <DashboardLayout>
      <div className="overflow-x-hidden">
        <Header title="Categorias" />

        <div className="text-right">
          <Link className="btn btn-primary" href={"/dashboard/category/create"}>
            Adicionar
          </Link>
        </div>

        <div className="py-10">
          {result && result.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
              {result.map((category: CategoryProps) => {
                return (
                  <CategoryCard
                    key={category.category_id}
                    category={category}
                  />
                );
              })}
            </div>
          ) : (
            <div className="">
              <div>
                <h1 className="font-bold text-2xl">
                  Nenhuma foi categoria cadastrada.
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
