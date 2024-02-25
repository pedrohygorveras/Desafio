"use client";

import React, { ChangeEvent, useState } from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Input } from "@/components/form/controls";
import { refreshCache } from "@/components/actions/server";

const Filter: React.FC<{ keyTag: string; placeholder?: string }> = ({
  keyTag,
  placeholder,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = String(event.target.value);

    setSearch(value);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("search", value);

    const currentQuery = current.toString();
    const query = currentQuery ? `?${currentQuery}` : ``;

    refreshCache({
      keyTag: keyTag,
    });

    router.push(`${pathname}${query}`);
  }

  return (
    <div className="mt-8">
      <Input
        label="Buscar"
        value={search}
        placeholder={placeholder ? placeholder : "Pesquise por títulos..."}
        length={false}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export { Filter };
