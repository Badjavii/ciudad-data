// config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export function initSwagger(app: Application): void {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "CiudadData API",
        version: "1.0.0",
        description: "Public Data Gateway API",
      },
    },
    apis: [
      "./src/controllers/*.ts",
      "./src/repositories/*.ts",
      "./src/models/*.ts",
      "./src/config/*.ts",
      "./src/services/*.ts",
      "./dist/controllers/*.js",
      "./dist/repositories/*.js",
      "./dist/models/*.js",
      "./dist/config/*.js",
      "./dist/services/*.js",
    ],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}

