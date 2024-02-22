import express, { Router } from "express";

import ApiController from "../controllers/ApiController";

class ApiRoutes {
  public routes: Router;

  constructor() {
    this.routes = express.Router();
    this.endpoints();
  }

  private endpoints(): void {
    this.routes.get("/", ApiController.status);
  }
}

export default new ApiRoutes().routes;
