"use strict";

import CategoryRepository from "../repositories/CategoryRepository";

import {
  iCollectionCategory,
  iShowCategory,
  iStoreCategory,
  iUpdateCategory,
  iDeleteCategory,
} from "../interfaces/ICategory";

class CategoryServices {
  async collection(data: iCollectionCategory) {
    try {
      const offset = data.parsedLimit * data.parsedIndex;

      const dataObj = {
        filters: data.filters,
        parsedLimit: data.parsedLimit,
        parsedIndex: offset,
      };

      const result = await CategoryRepository.collection(dataObj);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async show(data: iShowCategory) {
    try {
      const result = await CategoryRepository.show(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async store(data: iStoreCategory) {
    try {
      const result = await CategoryRepository.store(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async update(data: iUpdateCategory) {
    try {
      const result = await CategoryRepository.update(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async delete(data: iDeleteCategory) {
    try {
      const result = await CategoryRepository.delete(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }
}

export default new CategoryServices();
