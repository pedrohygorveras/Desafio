"use strict";

import express from "express";
import cors from "cors";
import http from "http";

import env from "../environments";

import ApiRoutes from "./routes/ApiRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import BrandRoutes from "./routes/BrandRoutes";

class App {
  public app: express.Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.middlewares();
    this.virtualization();
    this.routes();
    this.run();
  }

  private middlewares(): void {
    this.app.use(cors());

    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
  }

  private virtualization(): void {
    this.app.use(express.static(__dirname + "/public/"));
  }

  private routes(): void {
    this.app.use("/", ApiRoutes);
    this.app.use("/category", CategoryRoutes);
    this.app.use("/brand", BrandRoutes);
  }

  private run(): void {
    const APP_PORT: number = parseInt(env.APP_PORT) || 8686;
    const APP_HOST: string = env.APP_HOST || "0.0.0.0";

    this.app.listen(APP_PORT, APP_HOST, () => {
      console.log(`Server is running.`);
    });
  }
}

export default new App().server;
