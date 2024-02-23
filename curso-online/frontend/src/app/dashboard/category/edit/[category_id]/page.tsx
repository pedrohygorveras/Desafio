import React from "react";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ContentPage } from "./content-page";

interface PageProps {
  params: { category_id: string };
}

async function getCategory(category_id: string) {
  try {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/category`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        category_id: category_id,
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

export default async function EditCategory({ params }: PageProps) {
  const { category_id } = params;

  const category = await getCategory(category_id);

  return (
    <DashboardLayout>
      <ContentPage category={category} />
    </DashboardLayout>
  );
}
