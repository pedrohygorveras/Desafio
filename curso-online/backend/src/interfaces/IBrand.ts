interface iCollectionBrand {
  filters: {
    search?: string | undefined;
  };
  parsedLimit: number;
  parsedIndex: number;
}

interface iShowBrand {
  brand_id: string;
}

interface iStoreBrand {
  title: string;
  description: string;
}

interface iUpdateBrand {
  brand_id: string;
  title: string;
  description: string;
}

interface iDeleteBrand {
  brand_id: string;
}

export {
  iCollectionBrand,
  iShowBrand,
  iStoreBrand,
  iUpdateBrand,
  iDeleteBrand,
};
