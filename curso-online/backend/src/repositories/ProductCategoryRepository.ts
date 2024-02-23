"use strict";

import { PrismaClient } from "@prisma/client";

import {
  iCollectionProductCategory,
  iStoreProductCategory,
  iDeleteProductCategory,
} from "../interfaces/IProductCategory";

class ProductCategoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      // log: ["query", "info", "warn"],
    });
  }

  async collection(data: iCollectionProductCategory) {
    try {
      const { filters, parsedLimit, parsedIndex } = data;

      const result = await this.prisma.productCategory.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: parsedLimit,
        skip: parsedIndex,
      });

      const qtd = await this.prisma.productCategory.count({});

      return { result, qtd };
    } catch (error: any) {
      return {
        error: error?.message,
      };
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async store(data: iStoreProductCategory) {
    try {
      const { product_id, category_id } = data;

      const result = await this.prisma.productCategory.create({
        select: {
          product_category_id: true,
        },
        data: {
          product_id,
          category_id,
        },
      });

      return result;
    } catch (error: any) {
      return {
        error: error?.message,
      };
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async delete(data: iDeleteProductCategory) {
    try {
      const { product_category_id } = data;

      const isExists = await this.prisma.productCategory.findFirst({
        select: {
          product_category_id: true,
        },
        where: {
          product_category_id: product_category_id,
        },
      });

      if (isExists) {
        await this.prisma.productCategory.delete({
          where: {
            product_category_id: product_category_id,
          },
        });

        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error: any) {
      return {
        error: error?.message,
      };
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

export default new ProductCategoryRepository();