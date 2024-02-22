interface iCollectionProductCategory {
  filters: {};
  parsedLimit: number;
  parsedIndex: number;
}

interface iStoreProductCategory {
  product_id: string;
  category_id: string;
}

interface iDeleteProductCategory {
  product_category_id: string;
}

export {
  iCollectionProductCategory,
  iStoreProductCategory,
  iDeleteProductCategory,
};
