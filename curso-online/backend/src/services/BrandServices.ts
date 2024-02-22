"use strict";

import BrandRepository from "../repositories/BrandRepository";

import {
  iCollectionBrand,
  iShowBrand,
  iStoreBrand,
  iUpdateBrand,
  iDeleteBrand,
} from "../interfaces/IBrand";

class BrandServices {
  async collection(data: iCollectionBrand) {
    try {
      const offset = data.parsedLimit * data.parsedIndex;

      const dataObj = {
        filters: data.filters,
        parsedLimit: data.parsedLimit,
        parsedIndex: offset,
      };

      const result = await BrandRepository.collection(dataObj);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async show(data: iShowBrand) {
    try {
      const result = await BrandRepository.show(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async store(data: iStoreBrand) {
    try {
      const result = await BrandRepository.store(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async update(data: iUpdateBrand) {
    try {
      const result = await BrandRepository.update(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async delete(data: iDeleteBrand) {
    try {
      const result = await BrandRepository.delete(data);

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }
}

export default new BrandServices();
