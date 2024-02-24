"use server";

import { revalidateTag } from "next/cache";

interface RefreshCacheProps {
  keyTag: string;
}

async function refreshCache(props: RefreshCacheProps): Promise<void> {
  const { keyTag } = props;

  revalidateTag(keyTag);
}

export { refreshCache };
