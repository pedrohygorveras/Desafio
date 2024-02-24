import Link from "next/link";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { Header } from "@/components/header/title";
import { Pagination } from "@/components/pagination/main";
import { ProductCard } from "@/components/card/product";
import { Filter } from "@/components/filters/search-only";
import { FiltersOrderBy } from "@/components/filters/order-by";
import { FilterBrand } from "@/components/filters/search-brand";

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

interface ProductProps {
  product_id: string;
  title: string;
  description: string;
  brand?: {
    brand_id?: string;
    title?: string;
    description?: string;
  };
  product_category?: ProductCategoryProps[];
}

interface QueryProps {
  index?: string | number | undefined;
  limit?: string | number | undefined;
  search?: string | number | undefined;
  brand?: string | number | undefined;
  order_by_direction?: string | number | undefined;
}

async function getProducts(query: QueryProps) {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const { limit, index, search, brand, order_by_direction } = query;

    const parsedIndex = !isNaN(parseInt(String(index), 10)) ? index : 0;
    const parsedLimit = !isNaN(parseInt(String(limit), 10)) ? limit : 6;
    const parsedSearch = search ? `&search=${search}` : "";
    const parsedBrand = brand ? `&brand=${brand}` : "";
    const parsedOrderByDirection = order_by_direction
      ? `&order_by_direction=${order_by_direction}`
      : "";

    const BASE_URL = `${NEXT_PUBLIC_BACKEND_API}/product/collection?index=${parsedIndex}&limit=${parsedLimit}${parsedSearch}${parsedOrderByDirection}${parsedBrand}`;

    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      cache: "no-store",
      next: {
        tags: ["product-collection"],
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

export default async function DashboardProduct({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let { result, qtd } = await getProducts(searchParams as QueryProps);

  return (
    <DashboardLayout>
      <div className="overflow-x-hidden">
        <Header title="Produtos" />

        <div className="text-right">
          <Link className="btn btn-primary" href={"/dashboard/product/create"}>
            Adicionar
          </Link>
        </div>

        <Filter keyTag="product-collection" />

        <div className="grid grid-cols-12 lg:grid-cols-2 items-center gap-6">
          <div className="col-12 lg:col-7">
            <FilterBrand keyTag="product-collection" />
          </div>
          <div className="col-12 lg:col-5">
            <FiltersOrderBy keyTag="product-collection" />
          </div>
        </div>

        <div className="py-10">
          {result && result.length > 0 ? (
            <div className="">
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  <div></div>
                  <Pagination
                    qtd={qtd}
                    keyTag="product-collection"
                    route="product"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {result.map((product: ProductProps) => {
                  return (
                    <ProductCard key={product.product_id} product={product} />
                  );
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
                    keyTag="product-collection"
                    route="product"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <div>
                <h1 className="font-bold o-2xl">
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
