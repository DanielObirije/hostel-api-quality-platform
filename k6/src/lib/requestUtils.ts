import http from "k6/http";
import { logInfo, logSuccess, logError } from "./utils";

type HttpMethod = "get" | "post" | "put" | "patch" | "del";

function request(method: HttpMethod, url: string, headers: Record<string, string>, payload?: unknown) {
  // const body = payload && typeof payload === "object" ? JSON.stringify(payload) : payload;
  let body: string | undefined;

  if (payload !== undefined && payload !== null) {
    body = typeof payload === "object" ? JSON.stringify(payload) : String(payload);
  }
  let res;

  switch (method) {
    case "get":
      res = http.get(url, { headers });
      break;

    case "del":
      res = http.del(url, body, { headers });
      break;

    case "post":
      res = http.post(url, body, { headers });
      break;

    case "put":
      res = http.put(url, body, { headers });
      break;

    case "patch":
      res = http.patch(url, body, { headers });
      break;
  }

  return res;
}

export function performRequest(
  method: HttpMethod,
  url: string,
  payload: unknown,
  headers: Record<string, string>,
  successMsg: string,
  label: string
) {
  logInfo(`requesting ${label} at ${url}`);
  const res = request(method, url, headers, payload);

  if (res.status >= 200 && res.status < 300) {
    logSuccess(successMsg);
  } else {
    logError(`${label} returned status ${res.status}`);
  }

  return res;
}

export function performGet(
  method: HttpMethod,
  url: string,
  payload: unknown,
  headers: Record<string, string>,
  successMsg: string,
  label: string
) {
  return performRequest(method, url, payload, headers, successMsg, label);
}
