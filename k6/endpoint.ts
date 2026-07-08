import { k6Config } from "./config";

const BASE_URL = k6Config.baseUrl;

export const endpoint = {
  brand: `${BASE_URL}/api/branding/`,
};
