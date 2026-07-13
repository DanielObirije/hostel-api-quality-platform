"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// k6/scenarios/smoke-test.ts
var smoke_test_exports = {};
__export(smoke_test_exports, {
  default: () => smoke_test_default,
  options: () => options
});
module.exports = __toCommonJS(smoke_test_exports);

// k6/src/operations/AuthOperation.ts
var import_k6 = require("k6");
var import_http = __toESM(require("k6/http"));

// k6/config.ts
var k6Config = {
  baseUrl: __ENV.BASE_URL || "https://automationintesting.online",
  apiKey: __ENV.API_KEY || "",
  timeout: __ENV.TIMEOUT || "30s",
  environment: __ENV.ENVIRONMENT || "dev",
  debug: __ENV.DEBUG === "true",
  credentials: {
    username: __ENV.TEST_USERNAME || "admin",
    password: __ENV.TEST_PASSWORD || "password"
  },
  thinkTime: {
    min: parseInt(__ENV.THINK_TIME_MIN || "1"),
    max: parseInt(__ENV.THINK_TIME_MAX || "3")
  },
  thresholds: {
    http_req_duration: __ENV.HTTP_REQ_DURATION || "p(95)<500",
    http_req_failed: __ENV.HTTP_REQ_FAILED || "rate<0.01",
    checks: __ENV.CHECKS || "rate>0.95"
  }
};

// k6/src/operations/AuthOperation.ts
var AuthOperation = class {
  constructor() {
    this.token = "";
  }
  login() {
    (0, import_k6.group)("Login", () => {
      const url = `${k6Config.baseUrl}/auth/login`;
      const payload = JSON.stringify({
        username: k6Config.credentials.username,
        password: k6Config.credentials.password
      });
      const response = import_http.default.post(url, payload, {
        headers: { "Content-Type": "application/json" }
      });
      (0, import_k6.check)(response, {
        "login status is 200": (r) => r.status === 200
      });
      try {
        const data = response.json();
        if (data.token) {
          this.token = data.token;
        }
      } catch (e) {
      }
    });
  }
  getToken() {
    return this.token;
  }
};

// k6/src/userjourneys/completeJourney.ts
function completeJourney() {
  const auth = new AuthOperation();
  auth.login();
}

// k6/scenarios/smoke-test.ts
var options = {
  vus: 1,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<2000"]
  }
};
function smoke_test_default() {
  completeJourney();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  options
});
