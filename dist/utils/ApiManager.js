"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiManager = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const AppError_1 = require("./AppError");
class ApiManager {
    static async get(url, options) {
        try {
            const response = await (0, node_fetch_1.default)(url, { method: "GET", ...options });
            if (!response.ok) {
                throw new AppError_1.AppError(`API GET error: ${response.statusText}`, response.status);
            }
            const data = await response.json();
            return data;
        }
        catch (err) {
            throw new AppError_1.AppError(`Failed GET request to ${url}: ${err.message}`, 500);
        }
    }
}
exports.ApiManager = ApiManager;
