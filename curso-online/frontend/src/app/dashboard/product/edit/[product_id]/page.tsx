import React from "react";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ContentPage } from "./content-page";

interface PageProps {
  params: { product_id: string };
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
      next: {
        tags: ["product-collection"],
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

export default async function EditProduct({ params }: PageProps) {
  const { product_id } = params;

  const product = await getProduct(product_id);

  return (
    <DashboardLayout>
      <ContentPage product={product} />
    </DashboardLayout>
  );
}
