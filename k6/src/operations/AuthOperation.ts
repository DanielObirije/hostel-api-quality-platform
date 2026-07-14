import { group, check } from "k6";
import http, { head } from "k6/http";
import { Response } from "k6/http";
import { endpoint } from "endpoint";
import { BaseOperation } from "./BaseOperation";
import { performPost } from "src/lib/requestUtils";

interface LoginResponse {
  token: string;
}

export class AuthOperation extends BaseOperation {
  private authToken: string = "";

  constructor() {
    super();
  }

  getToken() {
    return this.authToken;
  }

  login(username: string, password: string): void {
    group("Login", () => {
      const url = endpoint.auth.login;
      const headers = this.getHeaders();
      const payload = {
        username: this.username,
        password: this.password,
      };
      const response = performPost(url, headers, payload, "Successfully logged in", "Login");
      if (response) {
        check(response, {
          "Login status 200": (r: Response) => r.status === 200,
          "Login has token": (r: Response) => {
            const data = r.json() as unknown as LoginResponse;
            return data.token !== undefined;
          },
        });
        const data = response.json() as unknown as LoginResponse;
        if (data.token) {
          this.authToken = data.token;
        }
      }
    });
  }

  protected getAuthHeaders(token?: string): Record<string, string> {
    return this.getAuthHeaders(this.authToken);
  }

  getHeadersWithAuth(extraHeaders: Record<string, string> = {}): Record<string, string> {
    const headers = this.getAuthHeaders;
    if (this.authToken) {
      headers["Cookies"] = `token=${this.authToken}`;
    }
    return {
      ...headers,
      ...extraHeaders,
    };
  }
}
