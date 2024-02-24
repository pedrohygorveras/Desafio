"use client";

import React, { ChangeEvent, useState } from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Input } from "@/components/form/controls";
import { refreshCache } from "@/components/actions/server";

const FilterBrand: React.FC<{ keyTag: string }> = ({ keyTag }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [brand, setBrand] = useState("");

  function handleBrandChange(event: ChangeEvent<HTMLInputElement>) {
    const value = String(event.target.value);

    setBrand(value);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("brand", value);

    const currentQuery = current.toString();
    const query = currentQuery ? `?${currentQuery}` : ``;

    refreshCache({
      keyTag: keyTag,
    });

    router.push(`${pathname}${query}`);
  }

  return (
    <div className="mt-4">
      <Input
        label="Marcas"
        value={brand}
        placeholder="Pesquise por marcas..."
        length={false}
        onChange={handleBrandChange}
      />
    </div>
  );
};

export { FilterBrand };
