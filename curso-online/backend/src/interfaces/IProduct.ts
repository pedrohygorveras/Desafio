interface iCollectionProduct {
  filters: {
    search?: string | undefined;
  };
  parsedLimit: number;
  parsedIndex: number;
}

interface iShowProduct {
  product_id: string;
}

interface iStoreProduct {
  brand_id?: string | null;
  title: string;
  description: string;
}

interface iUpdateProduct {
  product_id: string;
  brand_id?: string | null;
  title: string;
  description: string;
}

interface iDeleteProduct {
  product_id: string;
}

export {
  iCollectionProduct,
  iShowProduct,
  iStoreProduct,
  iUpdateProduct,
  iDeleteProduct,
};
