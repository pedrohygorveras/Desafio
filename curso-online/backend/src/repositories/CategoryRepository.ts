"use strict";

import { PrismaClient } from "@prisma/client";

import {
  iCollectionCategory,
  iShowCategory,
  iStoreCategory,
  iUpdateCategory,
  iDeleteCategory,
} from "../interfaces/ICategory";

class CatalogRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      // log: ["query", "info", "warn"],
    });
  }

  async collection(data: iCollectionCategory) {
    try {
      const { filters, parsedLimit, parsedIndex } = data;

      const result = await this.prisma.category.findMany({
        select: {
          category_id: true,
          title: true,
          description: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          title: {
            contains: filters.search,
          },
        },
        orderBy: {
          created_at: "desc",
        },
        take: parsedLimit,
        skip: parsedIndex,
      });

      const qtd = await this.prisma.category.count({
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

  async show(data: iShowCategory) {
    try {
      const { category_id } = data;

      const result = await this.prisma.category.findUnique({
        select: {
          category_id: true,
          title: true,
          description: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          category_id: category_id,
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

  async store(data: iStoreCategory) {
    try {
      const { title, description } = data;

      const result = await this.prisma.category.create({
        select: {
          category_id: true,
        },
        data: {
          title: title,
          description: description,
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

  async update(data: iUpdateCategory) {
    try {
      const { category_id, title, description } = data;

      const isExists = await this.prisma.category.findFirst({
        select: {
          category_id: true,
        },
        where: {
          category_id: category_id,
        },
      });

      if (isExists) {
        await this.prisma.category.update({
          data: {
            title: title,
            description: description,
          },
          where: {
            category_id: category_id,
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

  async delete(data: iDeleteCategory) {
    try {
      const { category_id } = data;

      const isExists = await this.prisma.category.findFirst({
        select: {
          category_id: true,
        },
        where: {
          category_id: category_id,
        },
      });

      if (isExists) {
        await this.prisma.category.delete({
          where: {
            category_id: category_id,
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

export default new CatalogRepository();
