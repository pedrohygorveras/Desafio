import express, { Router } from "express";

import { body, header } from "express-validator";

import BrandController from "../controllers/BrandController";

class BrandRoutes {
  public routes: Router;

  constructor() {
    this.routes = express.Router();
    this.endpoints();
  }

  private endpoints(): void {
    this.routes.get("/collection", BrandController.collection);

    this.routes.get(
      "/",
      [header("brand_id").notEmpty().withMessage("brand_id is required.")],
      BrandController.show
    );

    this.routes.post(
      "/",
      [
        body("title").notEmpty().withMessage("title is required."),
        body("description").notEmpty().withMessage("description is required."),
      ],
      BrandController.store
    );

    this.routes.put(
      "/",
      [
        header("brand_id").notEmpty().withMessage("brand_id is required."),
        body("title").notEmpty().withMessage("title is required."),
        body("description").notEmpty().withMessage("description is required."),
      ],
      BrandController.update
    );

    this.routes.delete(
      "/",
      [header("brand_id").notEmpty().withMessage("brand_id is required.")],
      BrandController.delete
    );
  }
}

export default new BrandRoutes().routes;
