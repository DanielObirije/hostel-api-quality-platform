import { group, check } from "k6";
import http from "k6/http";
// import { config } from "../config";

import { k6Config } from "../../config";
export class AuthOperation {
  private token: string = "";

  login() {
    group("Login", () => {
      const url = `${k6Config.baseUrl}/auth/login`;
      const payload = JSON.stringify({
        username: k6Config.credentials.username,
        password: k6Config.credentials.password,
      });

      const response = http.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      check(response, {
        "login status is 200": (r) => r.status === 200,
      });

      // Store token if needed
      try {
        const data = response.json();
        if (data.token) {
          this.token = data.token;
        }
      } catch (e) {
        // No token
      }
    });
  }

  getToken() {
    return this.token;
  }
}
