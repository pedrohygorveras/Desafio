"use strict";

import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";

import ProductServices from "../services/ProductServices";

class ProductController {
  constructor() {}

  async collection(req: Request, res: Response): Promise<Response> {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const {
        search,
        order_by_field,
        order_by_direction,
        brand,
        limit,
        index,
      } = req.query;

      const filters = {
        search: typeof search === "string" ? search : undefined,

        brand: typeof brand === "string" ? brand : undefined,

        order_by_field:
          typeof order_by_field === "string" ? order_by_field : undefined,

        order_by_direction:
          typeof order_by_direction === "string"
            ? order_by_direction
            : undefined,
      };

      const dataObj = {
        filters,
        parsedLimit: limit ? parseInt(limit as string) : 15,
        parsedIndex: index ? parseInt(index as string) : 0,
      };

      const result = await ProductServices.collection(dataObj);

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { product_id } = req.headers;

      const dataObj = {
        product_id: String(product_id),
      };

      const result = await ProductServices.show(dataObj);

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
      const { brand_id } = req.headers;
      const { title, description } = req.body;

      const dataObj = {
        brand_id: String(brand_id) || null,
        title: String(title),
        description: String(description),
      };

      const result = await ProductServices.store(dataObj);

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { product_id, brand_id } = req.headers;
      const { title, description } = req.body;

      const dataObj = {
        product_id: String(product_id),
        brand_id: String(brand_id) || null,
        title: String(title),
        description: String(description),
      };

      const result = await ProductServices.update(dataObj);

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
      const { product_id } = req.headers;

      const dataObj = {
        product_id: String(product_id),
      };

      const result = await ProductServices.delete(dataObj);

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  }
}

export default new ProductController();
