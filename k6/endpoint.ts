import { k6Config } from "./config";

const BASE_URL = k6Config.baseUrl;

export const endpoint = {
  auth: {
    login: `${BASE_URL}/api/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
  },
  booking: {
    list: `${BASE_URL}/api/booking`,
    detail: (id: number) => `${BASE_URL}/api/booking/${id}`,
    summary: `${BASE_URL}/api/booking/summary`,
    byRoom: (roomId: number) => `${BASE_URL}/api/booking/?roomid=${roomId}`,
  },
  branding: {
    detail: `${BASE_URL}/api/branding`,
    update: `${BASE_URL}/api/branding`,
  },
  room: {
    list: `${BASE_URL}/api/room`,
    detail: (id: number) => `${BASE_URL}/api/room/${id}`,
    create: `${BASE_URL}/api/room`,
  },
  report: {
    list: `${BASE_URL}/api/report`,
    byRoom: (roomId: number) => `${BASE_URL}/api/report/room/${roomId}`,
  },
};
