import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

function sendErrorResponse(res: Response, err: any) {
  const status = err instanceof AppError ? err.statusCode : 500;
  const message = err?.message || "Unexpected error";
  res.status(status).json({ error: message });
}

export function withErrorCatcher(handler: (req: Request, res: Response, next?: NextFunction) => Promise<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err: any) {
      sendErrorResponse(res, err);
    }
  };
}
