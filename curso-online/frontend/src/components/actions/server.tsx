"use server";

import { revalidateTag } from "next/cache";

interface RefreshCacheProps {
  key: string;
}

async function refreshCache(props: RefreshCacheProps): Promise<void> {
  const { key } = props;

  revalidateTag(key);
}

export { refreshCache };
