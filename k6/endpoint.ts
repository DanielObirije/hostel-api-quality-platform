import { k6Config } from "./config";

const BASE_URL = k6Config.baseUrl;

export const endpoint = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
  },

  branding: {
    detail: `${BASE_URL}/api/branding/`,
    update: `${BASE_URL}/api/branding/`,
  },
};
