"use strict";

import ProductCategoryRepository from "../repositories/ProductCategoryRepository";

import {
  iCollectionProductCategory,
  iStoreProductCategory,
  iDeleteProductCategory,
} from "../interfaces/IProductCategory";

class ProductCategoryServices {
  async collection(data: iCollectionProductCategory) {
    try {
      const offset = data.parsedLimit * data.parsedIndex;

      const dataObj = {
        filters: data.filters,
        parsedLimit: data.parsedLimit,
        parsedIndex: offset,
      };

      const result = await ProductCategoryRepository.collection(dataObj);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async store(data: iStoreProductCategory) {
    try {
      const result = await ProductCategoryRepository.store(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async delete(data: iDeleteProductCategory) {
    try {
      const result = await ProductCategoryRepository.delete(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }
}

export default new ProductCategoryServices();
