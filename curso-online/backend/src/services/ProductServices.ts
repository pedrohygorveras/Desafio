"use strict";

import ProductRepository from "../repositories/ProductRepository";

import {
  iCollectionProduct,
  iShowProduct,
  iStoreProduct,
  iUpdateProduct,
  iDeleteProduct,
} from "../interfaces/IProduct";

class ProductServices {
  async collection(data: iCollectionProduct) {
    try {
      const offset = data.parsedLimit * data.parsedIndex;

      const dataObj = {
        filters: data.filters,
        parsedLimit: data.parsedLimit,
        parsedIndex: offset,
      };

      const result = await ProductRepository.collection(dataObj);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async show(data: iShowProduct) {
    try {
      const result = await ProductRepository.show(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async store(data: iStoreProduct) {
    try {
      const result = await ProductRepository.store(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async update(data: iUpdateProduct) {
    try {
      const result = await ProductRepository.update(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async delete(data: iDeleteProduct) {
    try {
      const result = await ProductRepository.delete(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }
}

export default new ProductServices();
