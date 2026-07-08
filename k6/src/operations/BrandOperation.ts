import { group, check } from "k6";
import type { Response } from "k6/http";
import { endpoint } from "../../endpoint";
import { BaseOperation } from "./BaseOperation";
import { performGet } from "../lib/requestUtils";
import type { BrandDetails } from "../../types";

export class brandOperation extends BaseOperation {
  public static readonly URL = process.env.UR;
  constructor() {
    super();
  }

  async getBranding() {
    return group("GET website branding", () => {
      //const startTime = Date.now();
      const url = endpoint.branding.detail;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = performGet(
        "get",
        url,
        headers,
        {},
        "Successfully retrieved Get All Branding",
        "Get All Branding"
      );

      // Validate response
      if (response) {
        const data = response.json() as unknown as BrandDetails;
        check(response, {
          "status is 200": (r: Response) => r.status === 200,
          "has name": () => data.name !== undefined,
          "has address": () => data.address !== undefined,
        });
        return response;
      }
    });
  }
}
