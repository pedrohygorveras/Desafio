"use client";

import React, { ChangeEvent, useState } from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Select } from "@/components/form/controls";
import { refreshCache } from "@/components/actions/server";

const FiltersOrderBy: React.FC<{ keyTag: string }> = ({ keyTag }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [orderBy, setOrderBy] = useState("desc");

  function handleOrderByChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = String(event.target.value);

    setOrderBy(value);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("order_by_direction", value);

    const currentQuery = current.toString();
    const query = currentQuery ? `?${currentQuery}` : ``;

    refreshCache({
      keyTag: keyTag,
    });

    router.push(`${pathname}${query}`);
  }

  return (
    <div className="mt-4">
      <Select
        label="Ordenamento"
        value={orderBy}
        onChange={handleOrderByChange}
      >
        <option value="desc" selected>
          Mais recentes primeiro
        </option>
        <option value="asc">Mais antigos primeiro</option>
      </Select>
    </div>
  );
};

export { FiltersOrderBy };
