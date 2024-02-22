import express, { Router } from "express";

import { body, header } from "express-validator";

import CategoryController from "../controllers/CategoryController";

class CategoryRoutes {
  public routes: Router;

  constructor() {
    this.routes = express.Router();
    this.endpoints();
  }

  private endpoints(): void {
    this.routes.get("/collection", CategoryController.collection);

    this.routes.get(
      "/",
      [
        header("category_id")
          .notEmpty()
          .withMessage("category_id is required."),
      ],
      CategoryController.show
    );

    this.routes.post(
      "/",
      [
        body("title").notEmpty().withMessage("title is required."),
        body("description").notEmpty().withMessage("description is required."),
      ],
      CategoryController.store
    );

    this.routes.put(
      "/",
      [
        header("category_id")
          .notEmpty()
          .withMessage("category_id is required."),
        body("title").notEmpty().withMessage("title is required."),
        body("description").notEmpty().withMessage("description is required."),
      ],
      CategoryController.update
    );

    this.routes.delete(
      "/",
      [
        header("category_id")
          .notEmpty()
          .withMessage("category_id is required."),
      ],
      CategoryController.delete
    );
  }
}

export default new CategoryRoutes().routes;
