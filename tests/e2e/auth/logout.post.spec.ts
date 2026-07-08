import { expect, test } from "@playwright/test";
import { AuthClient } from "../../../resources/clients/AuthClient";

const authClient = new AuthClient();

test.describe("Logout API", () => {
  let Token: string;

  test.beforeEach(async () => {
    Token = await authClient.createToken();
  });

  test("POST with valid token @happy", async ({ request }) => {
    const response = await request.post("api/auth/logout", {
      data: {
        token: Token,
      },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ success: true });
  });

  test("POST with  empty token ", async ({ request }) => {
    const response = await request.post("api/auth/logout", {
      data: {
        token: "",
      },
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ message: "Token is required" });
  });

  test("POST with valid token then attempt to validate @happy", async ({ request }) => {
    const response = await request.post("api/auth/logout", {
      data: {
        token: Token,
      },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ success: true });

    const validateResponse = await request.post("api/auth/validate", {
      data: {
        token: Token,
      },
    });
    expect(validateResponse.status()).toBe(200);
    expect(await validateResponse.json()).toEqual({ valid: true });
  });

  test("POST with invalid token", async ({ request }) => {
    const validateResponse = await request.post("api/auth/validate", {
      data: {
        token: "invalidtoken",
      },
    });
    expect(validateResponse.status()).toBe(403);
    expect(await validateResponse.json()).toEqual({ error: "Invalid token" });
  });

  test("POST  with token that doesn't existn", async ({ request }) => {
    const validateResponse = await request.post("api/auth/validate", {
      data: {
        token: "invalidtoken",
      },
    });
    expect(validateResponse.status()).toBe(403);
    expect(await validateResponse.json()).toEqual({ error: "Invalid token" });
  });

  test("POST with empty token", async ({ request }) => {
    const validateResponse = await request.post("api/auth/validate", {
      data: {
        token: "",
      },
    });
    expect(validateResponse.status()).toBe(401);
    expect(await validateResponse.json()).toEqual({ error: "No token provided" });
  });

  test("POST with no token", async ({ request }) => {
    const validateResponse = await request.post("api/auth/validate");
    expect(validateResponse.status()).toBe(500);
    expect(await validateResponse.json()).toEqual({ error: "An unexpected error occurred" });
  });
});
