"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorCatcher = withErrorCatcher;
const AppError_1 = require("../utils/AppError");
function sendErrorResponse(res, err) {
    const status = err instanceof AppError_1.AppError ? err.statusCode : 500;
    const message = err?.message || "Unexpected error";
    res.status(status).json({ error: message });
}
function withErrorCatcher(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (err) {
            sendErrorResponse(res, err);
        }
    };
}
