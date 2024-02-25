import { ContentPage } from "./content-page";
import { Footer } from "@/components/footer";

interface QueryProps {
  index?: string | number | undefined;
  limit?: string | number | undefined;
  category_id?: string | number | undefined;
  search?: string | number | undefined;
  order_by_direction?: string | number | undefined;
}

async function getProducts(query: QueryProps) {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const { limit, index, search, category_id, order_by_direction } = query;

    const parsedIndex = !isNaN(parseInt(String(index), 10)) ? index : 0;
    const parsedLimit = !isNaN(parseInt(String(limit), 10)) ? limit : 6;
    const parsedCategoryId = category_id ? `&category_id=${category_id}` : "";
    const parsedSearch = search ? `&search=${search}` : "";
    const parsedOrderByDirection = order_by_direction
      ? `&order_by_direction=${order_by_direction}`
      : "";

    const BASE_URL = `${NEXT_PUBLIC_BACKEND_API}/product-category/collection?index=${parsedIndex}&limit=${parsedLimit}${parsedOrderByDirection}${parsedCategoryId}${parsedSearch}`;

    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      cache: "no-store",
      next: {
        tags: ["product-category-collection"],
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

async function getCategories() {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const index = 0;
    const limit = 9999;

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_API}/category/collection?index=${index}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store",
        next: {
          tags: ["category-collection"],
        },
      }
    );

    if (!res.ok) {
      console.error("An error has occurred. Please try again later");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { result, qtd } = await getProducts(searchParams as QueryProps);
  const categories = await getCategories();

  return (
    <div data-theme="app">
      <div className="overflow-hidden">
        <main className="min-h-screen">
          <div className="mx-auto my-12 max-w-6xl space-y-6 px-5 mt-[140px]">
            <ContentPage
              categories={categories.result}
              products={result}
              qtd={qtd}
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
