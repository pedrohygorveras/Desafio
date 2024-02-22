"use strict";

import { PrismaClient } from "@prisma/client";

import {
  iCollectionBrand,
  iShowBrand,
  iStoreBrand,
  iUpdateBrand,
  iDeleteBrand,
} from "../interfaces/IBrand";

class BrandRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      // log: ["query", "info", "warn"],
    });
  }

  async collection(data: iCollectionBrand) {
    try {
      const { filters, parsedLimit, parsedIndex } = data;

      const result = await this.prisma.brand.findMany({
        select: {
          brand_id: true,
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

      const qtd = await this.prisma.brand.count({
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

  async show(data: iShowBrand) {
    try {
      const { brand_id } = data;

      const result = await this.prisma.brand.findUnique({
        select: {
          brand_id: true,
          title: true,
          description: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          brand_id: brand_id,
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

  async store(data: iStoreBrand) {
    try {
      const { title, description } = data;

      const result = await this.prisma.brand.create({
        select: {
          brand_id: true,
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

  async update(data: iUpdateBrand) {
    try {
      const { brand_id, title, description } = data;

      const isExists = await this.prisma.brand.findFirst({
        select: {
          brand_id: true,
        },
        where: {
          brand_id: brand_id,
        },
      });

      if (isExists) {
        await this.prisma.brand.update({
          data: {
            title: title,
            description: description,
          },
          where: {
            brand_id: brand_id,
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

  async delete(data: iDeleteBrand) {
    try {
      const { brand_id } = data;

      const isExists = await this.prisma.brand.findFirst({
        select: {
          brand_id: true,
        },
        where: {
          brand_id: brand_id,
        },
      });

      if (isExists) {
        await this.prisma.brand.delete({
          where: {
            brand_id: brand_id,
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

export default new BrandRepository();
