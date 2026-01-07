"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwagger = initSwagger;
// config/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
function initSwagger(app) {
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
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
