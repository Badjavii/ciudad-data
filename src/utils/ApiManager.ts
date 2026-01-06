import fetch, { RequestInit } from "node-fetch";
import { AppError } from "./AppError";

export class ApiManager {
  public static async get<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      
      const safeOptions: RequestInit = {
        ...options,
        body: options?.body ?? undefined,
      };

      const response = await fetch(url, { method: "GET", ...safeOptions });

      if (!response.ok) {
        throw new AppError(`API GET error: ${response.statusText}`, response.status);
      }

      const data = await response.json();
      return data as T;
    } catch (err: any) {
      throw new AppError(`Failed GET request to ${url}: ${err.message}`, 500);
    }
  }
}
