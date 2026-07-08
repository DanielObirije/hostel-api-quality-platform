// import http from "k6/http";
// import { logInfo, logSuccess, logError } from "./utils";

// export function performRequest(
//   method: string,
//   url: string,
//   payload: unknown,
//   headers: Record<string, string>,
//   successMsg: string,
//   label: string
// ) {
//   logInfo(`requesting ${label} at ${url}`);

//   const body = payload && typeof payload === "object" ? JSON.stringify(payload) : payload;

//   const args =
//     method === "get" ? [url, { headers }] : method === "del" ? [url, null, { headers }] : [url, body, { headers }];

//   const res = http[method](...args);

//   if (res.status >= 200 && res.status < 300) {
//     logSuccess(successMsg);
//   } else {
//     logError(`${label} returned status ${res.status}`);
//   }

//   return res;
// }

// export function performGet(
//   method: string,
//   url: string,
//   payload: unknown,
//   headers: Record<string, string>,
//   successMsg: string,
//   label: string
// ) {
//   return performRequest(method, url, payload, headers, successMsg, label);
// }

