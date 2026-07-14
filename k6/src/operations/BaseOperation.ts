
import { k6Config } from "../../config";
export class BaseOperation {
  protected readonly config = k6Config;

  protected readonly baseUrl = k6Config.baseUrl;

  protected readonly apiKey = k6Config.apiKey;

  protected readonly username = k6Config.credentials.username;

  protected readonly password = k6Config.credentials.password;

  protected baseHeaders: Record<string, string>;

  constructor() {
    this.baseHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.apiKey) {
      this.baseHeaders["x-api-key"] = this.apiKey;
    }
  }
  
  protected getHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
    return {
      ...this.baseHeaders,
      ...extraHeaders,
    };
  }


  protected getAuthHeaders(token?: string): Record<string, string> {
    const headers = this.getHeaders();
    if (token) {
      headers["Cookie"] = `token=${token}`;
    }
    return headers;
  }
}
