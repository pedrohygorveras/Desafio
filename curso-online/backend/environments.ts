import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, ".env") });

interface EnvironmentVariables {
  APP_NAME: string;
  APP_PORT: string;
  APP_HOST: string;
}

const env: EnvironmentVariables = {
  APP_NAME: process.env.APP_NAME!,
  APP_PORT: process.env.APP_PORT!,
  APP_HOST: process.env.APP_HOST!,
};

export default env;
