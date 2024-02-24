import Link from "next/link";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { Header } from "@/components/header/title";
import { Pagination } from "@/components/pagination/main";
import { BrandCard } from "@/components/card/brand";
import { Filter } from "@/components/filters/search-only";

interface BrandProps {
  brand_id: string;
  title: string;
  description: string;
}

interface QueryProps {
  index?: string | number | undefined;
  limit?: string | number | undefined;
  search?: string | number | undefined;
}

async function getBrands(query: QueryProps) {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const { limit, index, search } = query;

    const parsedIndex = !isNaN(parseInt(String(index), 10)) ? index : 0;
    const parsedLimit = !isNaN(parseInt(String(limit), 10)) ? limit : 6;
    const parsedSearch = search ? `&search=${search}` : "";

    const BASE_URL = `${NEXT_PUBLIC_BACKEND_API}/brand/collection?index=${parsedIndex}&limit=${parsedLimit}${parsedSearch}`;

    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      cache: "no-store",
      next: {
        tags: ["brand-collection"],
      },
    });

    if (!res.ok) {
      console.error("An error has occurred. Please try again later");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function DashboardBrand({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let { result, qtd } = await getBrands(searchParams as QueryProps);

  return (
    <DashboardLayout>
      <div className="overflow-x-hidden">
        <Header title="Marcas" />

        <div className="text-right">
          <Link className="btn btn-primary" href={"/dashboard/brand/create"}>
            Adicionar
          </Link>
        </div>

        <Filter keyTag="brand-collection" />

        <div className="py-10">
          {result && result.length > 0 ? (
            <div className="">
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  <div></div>
                  <Pagination
                    qtd={qtd}
                    keyTag="brand-collection"
                    route="brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[220px]">
                {result.map((brand: BrandProps) => {
                  return <BrandCard key={brand.brand_id} brand={brand} />;
                })}
              </div>

              <div className="my-10">
                <div className="h-px bg-base-200 mb-5"></div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="o-sm font-bold hidden sm:block">
                      {qtd} registros
                    </p>
                  </div>
                  <Pagination
                    qtd={qtd}
                    keyTag="brand-collection"
                    route="brand"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <div>
                <h1 className="font-bold o-2xl">
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
