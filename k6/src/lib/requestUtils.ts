import http from "k6/http";
import { logInfo, logSuccess, logError } from "./utils";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

function performRequest(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  payload?: unknown,
  successMsg?: string,
  label?: string
): http.Response | null {
  if (label) logInfo(`Requesting ${label} at ${url}`);

  let body: string | undefined;

  if (payload !== undefined && payload !== null) {
    body = typeof payload === "object" ? JSON.stringify(payload) : String(payload);
  }

  let res: http.Response;

  try {
    switch (method) {
      case "get":
        res = http.get(url, { headers });
        break;

      case "delete":
        res = http.del(url, null, { headers });
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

      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    if (res.status >= 200 && res.status < 300) {
      if (successMsg) logSuccess(successMsg);
    } else {
      if (label) logError(`${label} returned status ${res.status}`);
    }

    return res;
  } catch (error) {
    logError(`Request failed: ${label}`, error);
    return null;
  }
}

// export function performRequest(
//   method: HttpMethod,
//   url: string,
//   payload: unknown,
//   headers: Record<string, string>,
//   successMsg: string,
//   label: string
// ) {
//   logInfo(`requesting ${label} at ${url}`);
//   const res = request(method, url, headers, payload);

//   if (res.status >= 200 && res.status < 300) {
//     logSuccess(successMsg);
//   } else {
//     logError(`${label} returned status ${res.status}`);
//   }

//   return res;
// }

export function performGet(
  url: string,
  headers: Record<string, string>,
  successMsg: string,
  label: string
): http.Response | null {
  return performRequest("get", url, headers, undefined, successMsg, label);
}
export function performPost(
  url: string,
  headers: Record<string, string>,
  payload?: unknown,
  successMsg?: string,
  label?: string
): http.Response | null {
  return performRequest("post", url, headers, payload, successMsg, label);
}

export function performPut(
  url: string,
  headers: Record<string, string>,
  payload?: unknown,
  successMsg?: string,
  label?: string
): http.Response | null {
  return performRequest("put", url, headers, payload, successMsg, label);
}

export function performDelete(
  url: string,
  headers: Record<string, string>,
  successMsg?: string,
  label?: string
): http.Response | null {
  return performRequest("delete", url, headers, undefined, successMsg, label);
}
