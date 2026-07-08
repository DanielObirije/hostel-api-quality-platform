import { BaseClient } from "./BaseClient";
import { AuthClient } from "./AuthClient";
const auth = new AuthClient();
export class BrandingClient extends BaseClient {
  constructor() {
    super();
  }
  async updateBranding(brandingData: object) {
    const cookie = await auth.createToken();
    const response = await fetch(BrandingClient.URL + `api/branding`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
      body: JSON.stringify(brandingData),
    });
    return response;
  }
}
