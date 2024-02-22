"use strict";

import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";

import ApiServices from "../services/ApiServices";

class ApiController {
  constructor() {}

  async status(req: Request, res: Response): Promise<Response> {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const result = await ApiServices.status();

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message });
    }
  }
}

export default new ApiController();
