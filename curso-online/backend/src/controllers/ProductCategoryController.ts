"use strict";

import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";

import ProductCategoryServices from "../services/ProductCategoryServices";

class ProductCategoryController {
  constructor() {}

  async collection(req: Request, res: Response): Promise<Response> {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { limit, index } = req.query;

      const filters = {};

      const dataObj = {
        filters,
        parsedLimit: limit ? parseInt(limit as string) : 15,
        parsedIndex: index ? parseInt(index as string) : 0,
      };

      const result = await ProductCategoryServices.collection(dataObj);

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  }

  async store(req: Request, res: Response): Promise<Response> {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { product_id, category_id } = req.headers;

      const dataObj = {
        product_id: String(product_id),
        category_id: String(category_id),
      };

      const result = await ProductCategoryServices.store(dataObj);

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { product_category_id } = req.headers;

      const dataObj = {
        product_category_id: String(product_category_id),
      };

      const result = await ProductCategoryServices.delete(dataObj);

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  }
}

export default new ProductCategoryController();
