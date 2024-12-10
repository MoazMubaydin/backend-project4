// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
import "dotenv/config";
// ℹ️ Connects to the database

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express from "express";

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
import configMiddleware from "./config";
configMiddleware(app);
// 👇 Start handling routes here
import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

import mealRoutes from "./routes/meals.routes";
app.use("/api", mealRoutes);

import recipeRoutes from "./routes/recipes.routes";
app.use("/api", recipeRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import errorHandling from "./error-handling";
errorHandling(app);

export default app;
