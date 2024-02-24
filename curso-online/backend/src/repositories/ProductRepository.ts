"use strict";

import { PrismaClient } from "@prisma/client";

import {
  iCollectionProduct,
  iShowProduct,
  iStoreProduct,
  iUpdateProduct,
  iDeleteProduct,
} from "../interfaces/IProduct";

class ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      // log: ["query", "info", "warn"],
    });
  }

  async collection(data: iCollectionProduct) {
    try {
      const { filters, parsedLimit, parsedIndex } = data;

      const order_by_field = filters.order_by_field
        ? filters.order_by_field
        : "created_at";

      const order_by_direction = filters.order_by_direction
        ? filters.order_by_direction
        : "desc";

      const result = await this.prisma.product.findMany({
        include: {
          brand: true,
          product_category: {
            include: {
              category: true,
            },
          },
        },
        where: {
          title: {
            contains: filters.search,
          },
          ...(filters.brand && {
            AND: [
              {
                brand: {
                  title: {
                    contains: filters.brand,
                  },
                },
              },
            ],
          }),
        },
        orderBy: {
          [order_by_field]: order_by_direction,
        },
        take: parsedLimit,
        skip: parsedIndex,
      });

      const qtd = await this.prisma.product.count({
        where: {
          title: {
            contains: filters.search,
          },
        },
      });

      return { result, qtd };
    } catch (error: any) {
      return {
        error: error?.message,
      };
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async show(data: iShowProduct) {
    try {
      const { product_id } = data;

      const result = await this.prisma.product.findUnique({
        include: {
          brand: true,
          product_category: {
            include: {
              category: true,
            },
          },
        },
        where: {
          product_id: product_id,
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

  async store(data: iStoreProduct) {
    try {
      const { brand_id, title, description } = data;

      const result = await this.prisma.product.create({
        select: {
          product_id: true,
        },
        data: {
          title: title,
          description: description,
          brand_id: brand_id ? brand_id : null,
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

  async update(data: iUpdateProduct) {
    try {
      const { product_id, brand_id, title, description } = data;

      const isExists = await this.prisma.product.findFirst({
        select: {
          product_id: true,
        },
        where: {
          product_id: product_id,
        },
      });

      if (isExists) {
        return await this.prisma.product.update({
          data: {
            title: title,
            description: description,
            brand_id: brand_id,
          },
          where: {
            product_id: product_id,
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

  async delete(data: iDeleteProduct) {
    try {
      const { product_id } = data;

      const isExists = await this.prisma.product.findFirst({
        select: {
          product_id: true,
        },
        where: {
          product_id: product_id,
        },
      });

      if (isExists) {
        await this.prisma.product.delete({
          where: {
            product_id: product_id,
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

export default new ProductRepository();
