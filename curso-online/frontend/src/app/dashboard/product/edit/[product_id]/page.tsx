import React from "react";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ContentPage } from "./content-page";

interface PageProps {
  params: { product_id: string };
}

async function getBrands() {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const index = 0;
    const limit = 9999;

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_API}/brand/collection?index=${index}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store",
        next: {
          tags: ["brand-collection"],
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

async function getProduct(product_id: string) {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/product`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        product_id: product_id,
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

export default async function EditProduct({ params }: PageProps) {
  const { product_id } = params;

  const brands = await getBrands();
  const categories = await getCategories();
  const product = await getProduct(product_id);

  return (
    <DashboardLayout>
      <ContentPage
        brands={brands.result}
        categories={categories.result}
        product={product}
      />
    </DashboardLayout>
  );
}
