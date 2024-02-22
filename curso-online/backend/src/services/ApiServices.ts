"use strict";

import env from "../../environments";

class ApiRepository {
  constructor() {}

  async status(): Promise<
    | {
        name: string;
        version: string;
      }
    | {
        error: string;
      }
  > {
    try {
      const APP_NAME: string | undefined = env.APP_NAME;
      const APP_VERSION: string | "1.0.0" = env.APP_VERSION;

      return {
        name: APP_NAME,
        version: APP_VERSION,
      };
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }
}

export default new ApiRepository();
