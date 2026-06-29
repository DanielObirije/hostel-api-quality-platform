import { expect, request } from "@playwright/test";
import { BaseClient } from "./BaseClient";
import { faker } from "@faker-js/faker";
const baseurl = BaseClient.URL;
let cookies;

type ResponseBody = {
  token: string;
};
export class AuthClient extends BaseClient {
  constructor() {
    super();
  }

  async createCookies(username?: string, password?: string) {
    if (!username) {
      username = "admin";
    }
    if (!password) {
      password = "password";
    }
    const contextRequest = await request.newContext();
    const response = await contextRequest.post(baseurl + "auth/login", {
      data: {
        username: username,
        password: password,
      },
    });
    // expect(response).toBe(200);
    const headers = response.headers();
    cookies = headers["set-cookie"];
    return cookies;
  }

  async createToken(username?: string, password?: string) {
    if (!username) {
      username = "admin";
    }
    if (!password) {
      password = "password";
    }
    const contextRequest = await request.newContext();
    const response = await contextRequest.post(baseurl + "api/auth/login", {
      data: {
        username: username,
        password: password,
      },
    });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as ResponseBody;

    // const body = await response.json();
    // console.warn(body);
    return body.token;
  }

  async createheaderWithToken(token?: string) {
    if (!token) {
      token = await this.createToken(BaseClient.ADMIN_NAME, BaseClient.ADMIN_PASSWORD);
    }
    const header = {
      Authorization: `Bearer ${token}`,
    };
    return header;
  }

  createinvalidToken() {
    const header = {
      Authorization: `Bearer ${faker.string.alphanumeric(10)}`,
    };
    return header;
  }
  async loginUser(username?: string, password?: string) {
    const response = await fetch(AuthClient.URL + "api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username || AuthClient.ADMIN_NAME,
        password: password || AuthClient.ADMIN_PASSWORD,
      }),
    });
    return response;
  }
}
