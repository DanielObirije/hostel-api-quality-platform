import { check, group } from "k6";
import { Response } from "k6/http";
import { endpoint } from "endpoint";
import { performGet, performPut } from "src/lib/requestUtils";
import { BaseOperation } from "./BaseOperation";
import { AuthOperation } from "./AuthOperation";
import { brandingData } from "src/payloads/brandingPayload";
// const authOperation = new AuthOperation();

interface BrandDetails {
  name: string;
  address: object;
  contact: object;
  description: string;
}
interface UpdateBrandDetails {
  success: boolean;
}

export class BrandOperation extends AuthOperation {
  constructor() {
    super();
  }

  getBranding(): void {
    group("GET website branding", () => {
      const url = endpoint.branding.detail;
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, "Successfully retrieved branding", "Get Branding");
      if (response) {
        const data = response.json() as unknown as BrandDetails;
        check(response, {
          "Branding status is 200": (r: Response) => r.status === 200,
          "Branding has name": () => data.name !== undefined,
          "Branding has address": () => data.address !== undefined,
        });
      }
    });
  }

  updateBranding() {
    group("PUT  update website branding", () => {
      console.warn("yes yes");
      this.login("admin", "password");

      //   console.warn(this.getToken());
      //   const url = endpoint.branding.update;
      //   const headers = this.getAuthHeaders();
      //   console.warn(this.getToken());
      //   const response = performPut(url, headers, brandingData, "Successfully updated branding", "PUT Branding");
      //   if (response) {
      //     const data = response.json() as unknown as UpdateBrandDetails;
      //     check(response, {
      //       "Branding status is 200": (r: Response) => r.status === 200,
      //       "Response has success": () => data.success !== undefined,
      //       "Success is true": () => data.success === true,
      //     });
      //   }
    });
  }
}
