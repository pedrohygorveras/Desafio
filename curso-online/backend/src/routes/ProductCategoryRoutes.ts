import express, { Router } from "express";

import { body, header } from "express-validator";

import ProductCategoryController from "../controllers/ProductCategoryController";

class ProductCategoryRoutes {
  public routes: Router;

  constructor() {
    this.routes = express.Router();
    this.endpoints();
  }

  private endpoints(): void {
    this.routes.get("/collection", ProductCategoryController.collection);

    this.routes.post(
      "/",
      [
        header("product_id").notEmpty().withMessage("product_id is required."),
        header("category_id")
          .notEmpty()
          .withMessage("category_id is required."),
      ],
      ProductCategoryController.store
    );

    this.routes.delete(
      "/",
      [
        header("product_category_id")
          .notEmpty()
          .withMessage("product_category_id is required."),
      ],
      ProductCategoryController.delete
    );
  }
}

export default new ProductCategoryRoutes().routes;
