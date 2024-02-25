interface iCollectionProductCategory {
  filters: {
    category_id?: string | undefined;
    search?: string | undefined;
    order_by_field?: string | undefined;
    order_by_direction?: string | undefined;
  };
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
