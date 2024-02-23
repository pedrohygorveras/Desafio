"use client";

import { useState } from "react";

import Link from "next/link";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { Header } from "@/components/header/title";

interface BrandProps {
  id: string;
  title: string;
  description: string;
}

export default function DashboardBrand() {
  const [brands, setBrands] = useState<BrandProps[]>([]);

  return (
    <DashboardLayout>
      <div className="overflow-x-hidden">
        <Header title="Marcas" />

        <div className="text-right">
          <Link className="btn btn-primary" href={"/dashboard/brand/create"}>
            Adicionar
          </Link>
        </div>

        <div className="py-10">
          {brands && brands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]"></div>
          ) : (
            <div className="">
              <div>
                <h1 className="font-bold text-2xl">
                  Nenhuma foi marca cadastrada.
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
