import React from "react";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ContentPage } from "./content-page";

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

const CreateProduct: React.FC = async () => {
  const brands = await getBrands();
  const categories = await getCategories();

  return (
    <DashboardLayout>
      <ContentPage brands={brands.result} categories={categories.result} />
    </DashboardLayout>
  );
};

export default CreateProduct;
