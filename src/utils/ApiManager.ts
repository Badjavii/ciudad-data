import fetch, { RequestInit } from "node-fetch";
import { AppError } from "./AppError";

export class ApiManager {
  public static async get<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, { method: "GET", ...options });

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
