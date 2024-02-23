"use client";

import { useState } from "react";

import Link from "next/link";

import { Header } from "@/components/header/title";
import { CategoryCard } from "@/components/card/category";
import { DashboardLayout } from "@/components/layouts/dashboard";

interface CategoryProps {
  id: string;
  title: string;
  description: string;
}

export default function DashboardCategory() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  return (
    <DashboardLayout>
      <div className="">
        <Header title="Categoria" />

        <div className="text-right">
          <Link className="btn btn-primary" href={"/dashboard/category/create"}>
            Adicionar
          </Link>
        </div>

        <div className="py-10">
          {categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
              {categories.map((category) => {
                return <CategoryCard key={category.id} category={category} />;
              })}
            </div>
          ) : (
            <div className="flex items-center">
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
