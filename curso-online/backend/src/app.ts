"use strict";

import express from 'express';
import env from "../environments";

const app = express();


const PORT: number = parseInt(env.APP_PORT) || 8686;
const HOST: string = env.APP_HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
