import React from "react";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ContentPage } from "./content-page";

interface PageProps {
  params: { brand_id: string };
}

async function getBrand(brand_id: string) {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/brand`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        brand_id: brand_id,
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

export default async function EditBrand({ params }: PageProps) {
  const { brand_id } = params;

  const brand = await getBrand(brand_id);

  return (
    <DashboardLayout>
      <ContentPage brand={brand} />
    </DashboardLayout>
  );
}
