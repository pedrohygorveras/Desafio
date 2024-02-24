"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { refreshCache } from "@/components/actions/server";

interface PaginationProps {
  route: string;
  key: string;
  qtd: number;
}

const Pagination: React.FC<PaginationProps> = ({ route, key, qtd }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getIndex = (param: string) => {
    const value = searchParams.get(param);
    return typeof value === "string" ? parseInt(value, 10) : 0;
  };

  const index = getIndex("index") || 0;
  const limit = getIndex("limit") || 6;

  const totalPages = limit !== 0 ? Math.ceil(qtd / limit) : 0;

  const hasNextPage = index < totalPages - 1;
  const hasPrevPage = index > 0;

  const nextPage = () => {
    if (hasNextPage) {
      refreshCache({
        key: key,
      });

      const current = new URLSearchParams(Array.from(searchParams.entries()));

      const offset = index + 1;

      current.set("index", String(offset));
      current.set("limit", String(limit));

      const currentQuery = current.toString();
      const query = currentQuery ? `?${currentQuery}` : ``;

      router.push(`${pathname}${query}`);
    }
  };

  const previousPage = () => {
    if (hasPrevPage) {
      refreshCache({
        key: key,
      });

      const current = new URLSearchParams(Array.from(searchParams.entries()));

      const offset = index - 1;

      current.set("index", String(offset));
      current.set("limit", String(limit));

      const currentQuery = current.toString();
      const query = currentQuery ? `?${currentQuery}` : ``;

      router.push(`${pathname}${query}`);
    }
  };

  return (
    <div className="flex items-center justify-end">
      <p className="text-sm font-medium">
        {index + 1} de {totalPages} Páginas
      </p>
      <div className="join ml-4">
        <button
          type="button"
          onClick={previousPage}
          className="btn btn-circle mr-2"
          disabled={!hasPrevPage}
        >
          «
        </button>
        <button
          type="button"
          onClick={nextPage}
          className="btn btn-circle"
          disabled={!hasNextPage}
        >
          »
        </button>
      </div>
    </div>
  );
};

export { Pagination };
