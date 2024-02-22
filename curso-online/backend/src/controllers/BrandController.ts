"use strict";

import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";

import BrandServices from "../services/BrandServices";

class BrandController {
  constructor() {}

  async collection(req: Request, res: Response): Promise<Response> {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { search, limit, index } = req.query;

      const filters = {
        search: typeof search === "string" ? search : undefined,
      };

      const dataObj = {
        filters,
        parsedLimit: limit ? parseInt(limit as string) : 15,
        parsedIndex: index ? parseInt(index as string) : 0,
      };

      const result = await BrandServices.collection(dataObj);

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
      const { brand_id } = req.headers;

      const dataObj = {
        brand_id: String(brand_id),
      };

      const result = await BrandServices.show(dataObj);

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
      const { title, description } = req.body;

      const dataObj = {
        title: String(title),
        description: String(description),
      };

      const result = await BrandServices.store(dataObj);

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
      const { brand_id } = req.headers;
      const { title, description } = req.body;

      const dataObj = {
        brand_id: String(brand_id),
        title: String(title),
        description: String(description),
      };

      const result = await BrandServices.update(dataObj);

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
      const { brand_id } = req.headers;

      const dataObj = {
        brand_id: String(brand_id),
      };

      const result = await BrandServices.delete(dataObj);

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  }
}

export default new BrandController();
