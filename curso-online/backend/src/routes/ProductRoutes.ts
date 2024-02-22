import express, { Router } from "express";

import { body, header } from "express-validator";

import ProductController from "../controllers/ProductController";

class ProductRoutes {
  public routes: Router;

  constructor() {
    this.routes = express.Router();
    this.endpoints();
  }

  private endpoints(): void {
    this.routes.get("/collection", ProductController.collection);

    this.routes.get(
      "/",
      [header("product_id").notEmpty().withMessage("product_id is required.")],
      ProductController.show
    );

    this.routes.post(
      "/",
      [
        body("title").notEmpty().withMessage("title is required."),
        body("description").notEmpty().withMessage("description is required."),
      ],
      ProductController.store
    );

    this.routes.put(
      "/",
      [
        header("product_id").notEmpty().withMessage("product_id is required."),
        body("title").notEmpty().withMessage("title is required."),
        body("description").notEmpty().withMessage("description is required."),
      ],
      ProductController.update
    );

    this.routes.delete(
      "/",
      [header("product_id").notEmpty().withMessage("product_id is required.")],
      ProductController.delete
    );
  }
}

export default new ProductRoutes().routes;
