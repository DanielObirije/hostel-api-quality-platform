import { expect, test } from "@playwright/test";
import { BaseClient } from "../../../resources/clients/BaseClient";
import { AuthClient } from "../../../resources/clients/AuthClient";
const authClient = new AuthClient();

test.describe("auth/login POST request @auth", async () => {
  const username = BaseClient.ADMIN_NAME;
  const password = BaseClient.ADMIN_PASSWORD;

  test("POST with valid credentails @happy", async () => {
    const response = await authClient.loginUser(username, password);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("token");
  });

  test("POST with invalid username and password", async () => {
    const invalidName = "invalidusername";
    const invalidPassword = "invalidpass";
    const response = await authClient.loginUser(invalidName, invalidPassword);

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  test("POST with valid username and  invalid password", async () => {
    const invalidPassword = "invalidpass";
    const response = await authClient.loginUser(username, invalidPassword);
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  test("POST with no username and  valid password", async ({ request }) => {
    const response = await request.post("api/auth/login", {
      data: {
        password: "invalidpass",
      },
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  test("POST with no body", async ({ request }) => {
    const response = await request.post("api/auth/login", {
      data: {},
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });
});
