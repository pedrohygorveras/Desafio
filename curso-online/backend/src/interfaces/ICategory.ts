interface iCollectionCategory {
  filters: {
    search?: string | undefined;
  };
  parsedLimit: number;
  parsedIndex: number;
}

interface iShowCategory {
  category_id: string;
}

interface iStoreCategory {
  title: string;
  description: string;
}

interface iUpdateCategory {
  category_id: string;
  title: string;
  description: string;
}

interface iDeleteCategory {
  category_id: string;
}

export {
  iCollectionCategory,
  iShowCategory,
  iStoreCategory,
  iUpdateCategory,
  iDeleteCategory,
};
