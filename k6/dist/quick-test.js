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

// k6/scenarios/quick-test.ts
var quick_test_exports = {};
__export(quick_test_exports, {
  default: () => quick_test_default,
  options: () => options
});
module.exports = __toCommonJS(quick_test_exports);

// k6/src/operations/BrandOperation.ts
var import_k62 = require("k6");

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
function logConfig() {
  console.log("=== K6 Framework Configuration ===");
  console.log(`Environment: ${k6Config.environment}`);
  console.log(`Base URL: ${k6Config.baseUrl}`);
  console.log(`Timeout: ${k6Config.timeout}`);
  console.log(`Debug Mode: ${k6Config.debug}`);
  console.log(`Think Time: ${k6Config.thinkTime.min}-${k6Config.thinkTime.max}s`);
  console.log("===================================");
}

// k6/endpoint.ts
var BASE_URL = k6Config.baseUrl;
var endpoint = {
  auth: {
    login: `${BASE_URL}/api/auth/login`,
    logout: `${BASE_URL}/auth/logout`
  },
  booking: {
    list: (id) => `${BASE_URL}/api/booking?roomid=${id}`,
    detail: (id) => `${BASE_URL}/api/booking/${id}`,
    summary: (id) => `${BASE_URL}/api/booking/summary?roomid=${id}`,
    byRoom: (roomId) => `${BASE_URL}/api/booking/?roomid=${roomId}`,
    create: `${BASE_URL}/api/booking`,
    update: (id) => `${BASE_URL}/api/booking/${id}`
  },
  branding: {
    detail: `${BASE_URL}/api/branding`,
    update: `${BASE_URL}/api/branding`
  },
  message: {
    list: `${BASE_URL}/api/message`,
    detail: (id) => `${BASE_URL}/api/message/${id}`,
    create: `${BASE_URL}/api/message`
  },
  room: {
    list: `${BASE_URL}/api/room`,
    detail: (id) => `${BASE_URL}/api/room/${id}`,
    create: `${BASE_URL}/api/room`,
    update: (id) => `${BASE_URL}/api/room/${id}`
  },
  report: {
    list: `${BASE_URL}/api/report`,
    byRoom: (roomId) => `${BASE_URL}/api/report/room/${roomId}`
  }
};

// k6/src/lib/requestUtils.ts
var import_http = __toESM(require("k6/http"));

// k6/src/lib/utils.ts
function logInfo(message, data) {
  if (data) {
    console.log(`\u2139\uFE0F INFO: ${message}`, JSON.stringify(data));
  } else {
    console.log(`\u2139\uFE0F INFO: ${message}`);
  }
}
function logSuccess(message) {
  console.log(`\u2705 SUCCESS: ${message}`);
}
function logError(message, errorData) {
  if (errorData) {
    console.error(`\u274C FAILED: ${message}`, JSON.stringify(errorData));
  } else {
    console.error(`\u274C FAILED: ${message}`);
  }
}

// k6/src/lib/requestUtils.ts
function performRequest(method, url, headers, payload, successMsg, label) {
  if (label) logInfo(`Requesting ${label} at ${url}`);
  let body;
  if (payload !== void 0 && payload !== null) {
    body = typeof payload === "object" ? JSON.stringify(payload) : String(payload);
  }
  let res;
  try {
    switch (method) {
      case "get":
        res = import_http.default.get(url, { headers });
        break;
      case "delete":
        res = import_http.default.del(url, null, { headers });
        break;
      case "post":
        res = import_http.default.post(url, body, { headers });
        break;
      case "put":
        res = import_http.default.put(url, body, { headers });
        break;
      case "patch":
        res = import_http.default.patch(url, body, { headers });
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
function performGet(url, headers, successMsg, label) {
  return performRequest("get", url, headers, void 0, successMsg, label);
}
function performPost(url, headers, payload, successMsg, label) {
  return performRequest("post", url, headers, payload, successMsg, label);
}
function performPut(url, headers, payload, successMsg, label) {
  return performRequest("put", url, headers, payload, successMsg, label);
}

// k6/src/operations/AuthOperation.ts
var import_k6 = require("k6");

// k6/src/operations/BaseOperation.ts
var BaseOperation = class {
  constructor() {
    this.config = k6Config;
    this.baseUrl = k6Config.baseUrl;
    this.apiKey = k6Config.apiKey;
    this.username = k6Config.credentials.username;
    this.password = k6Config.credentials.password;
    this.baseHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    if (this.apiKey) {
      this.baseHeaders["x-api-key"] = this.apiKey;
    }
  }
  getHeaders(extraHeaders = {}) {
    return {
      ...this.baseHeaders,
      ...extraHeaders
    };
  }
  getAuthHeaders(token) {
    const headers = this.getHeaders();
    if (token) {
      headers["Cookie"] = `token=${token}`;
    }
    return headers;
  }
};

// k6/src/operations/AuthOperation.ts
var AuthOperation = class extends BaseOperation {
  constructor() {
    super();
    this.authToken = "";
  }
  getToken() {
    return this.authToken;
  }
  login(username, password) {
    (0, import_k6.group)("Login", () => {
      const url = endpoint.auth.login;
      const headers = this.getHeaders();
      const payload = {
        username: username || this.username,
        password: password || this.password
      };
      const response = performPost(url, headers, payload, "Successfully logged in", "Login");
      if (response) {
        (0, import_k6.check)(response, {
          "Login status 200": (r) => r.status === 200,
          "Login has token": (r) => {
            const data2 = r.json();
            return data2.token !== void 0;
          }
        });
        const data = response.json();
        if (data.token) {
          this.authToken = data.token;
        }
      }
    });
  }
  getAuthHeaders() {
    return super.getAuthHeaders(this.authToken);
  }
};

// k6/src/payloads/brandingPayload.ts
var brandingData = {
  name: "Willow Creek Lodge",
  logoUrl: "https://yourdomain.com/images/willow-creek-logo.jpg",
  description: "Welcome to Willow Creek Lodge, a quiet countryside retreat surrounded by rolling hills near Oakbridge. A calm and comfortable place to relax and enjoy nature. All our rooms are cozy and we serve fresh breakfast every morning.",
  directions: "Turn off the main road toward Maple Ridge Valley and follow signs for Willow Creek Lodge.",
  contact: {
    name: "Willow Creek Lodge",
    phone: "019876543210",
    email: "contact@willowcreeklodge.com"
  },
  address: {
    line1: "Willow Creek Lodge",
    line2: "Maple Ridge Valley",
    postTown: "Oakbridge",
    county: "Greenvale",
    postCode: "G7 4XZ"
  },
  map: {
    latitude: 54.123456,
    longitude: -1.234567
  }
};

// k6/src/operations/BrandOperation.ts
var BrandOperation = class extends AuthOperation {
  constructor() {
    super();
  }
  getBranding() {
    (0, import_k62.group)("GET website branding", () => {
      const url = endpoint.branding.detail;
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, "Successfully retrieved branding", "Get Branding");
      if (response) {
        const data = response.json();
        (0, import_k62.check)(response, {
          "Branding status is 200": (r) => r.status === 200,
          "Branding has name": () => data.name !== void 0,
          "Branding has address": () => data.address !== void 0
        });
      }
    });
  }
  updateBranding() {
    (0, import_k62.group)("PUT  update website branding", () => {
      this.login("admin", "password");
      const url = endpoint.branding.update;
      const headers = this.getAuthHeaders();
      const response = performPut(url, headers, brandingData, "Successfully updated branding", "PUT Branding");
      if (response) {
        const data = response.json();
        (0, import_k62.check)(response, {
          "Branding status is 200": (r) => r.status === 200,
          "Response has success": () => data.success !== void 0,
          "Success is true": () => data.success === true
        });
      }
    });
  }
};

// k6/src/userjourneys/brandingJourney.ts
function brandingJourney() {
  const operation = new BrandOperation();
  operation.getBranding();
  operation.updateBranding();
}

// k6/src/operations/BookingOperation.ts
var import_k63 = require("k6");

// k6/src/payloads/bookingPayload.ts
var bookingPayloads = {
  createBooking: {
    roomid: Math.floor(Math.random() * 1e4) + 1,
    firstname: "mark",
    lastname: "Deadf",
    depositpaid: true,
    email: "tesdaft@email.com",
    phone: "07123daf456789",
    bookingdates: {
      checkin: "2026-03-06",
      checkout: "2026-03-07"
    }
  },
  updateBooking: {
    roomid: Math.floor(Math.random() * 1e4) + 1,
    firstname: "Jane",
    lastname: "Smith",
    depositpaid: false,
    bookingdates: {
      checkin: "2024-12-21",
      checkout: "2024-12-26"
    }
  }
};

// k6/src/operations/BookingOperation.ts
var BookingOperation = class extends AuthOperation {
  constructor() {
    super();
  }
  getAllBookings() {
    (0, import_k63.group)("Get all bookings", () => {
      this.login("admin", "password");
      const url = endpoint.booking.list(1);
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, "Successfully retrieved all bookings", "Get All Bookings");
      if (response) {
        const data = response.json();
        (0, import_k63.check)(response, {
          "Boookings Status is 200": (r) => r.status === 200,
          "Bookings array exists": () => Array.isArray(data.bookings),
          "Response contains at least one booking": () => data.bookings.length > 0,
          "First booking has required fields": () => {
            const booking = data.bookings[0];
            return booking && typeof booking.bookingid === "number" && typeof booking.firstname === "string" && typeof booking.lastname === "string" && typeof booking.depositpaid === "boolean" && typeof booking.roomid === "number" && booking.bookingdates && typeof booking.bookingdates.checkin === "string" && typeof booking.bookingdates.checkout === "string";
          }
        });
      }
    });
  }
  getBookingById() {
    (0, import_k63.group)("Get booking by ID", () => {
      this.login("admin", "password");
      const url = endpoint.booking.detail(1);
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, `Successfully retrieved booking `, `Get Booking`);
      if (response) {
        const data = response.json();
        (0, import_k63.check)(response, {
          "Boooking Status is 200": (r) => r.status === 200,
          "Booking id matches": () => {
            return typeof data.bookingid === "number" && typeof data.firstname === "string" && typeof data.lastname === "string" && typeof data.depositpaid === "boolean" && typeof data.roomid === "number" && data.bookingdates && typeof data.bookingdates.checkin === "string" && typeof data.bookingdates.checkout === "string";
          }
        });
      }
    });
  }
  getBookingSummary() {
    (0, import_k63.group)("Get bookingDates by ID", () => {
      this.login("admin", "password");
      const url = endpoint.booking.summary(1);
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, `Successfully retrieved booking Dates `, `Get Booking Dates`);
      if (response) {
        const data = response.json();
        (0, import_k63.check)(response, {
          "Bookings dates status is 200": (r) => r.status === 200,
          "Bookings dates array exists": () => Array.isArray(data.bookings),
          "Bookings dates array is not empty": () => data.bookings.length > 0,
          "Booking dates exist": () => data.bookings.every((booking) => booking.bookingDates !== void 0),
          "Booking dates have checkin and checkout": () => data.bookings.every(
            (booking) => typeof booking.bookingDates.checkin === "string" && typeof booking.bookingDates.checkout === "string"
          )
        });
      }
    });
  }
  createBooking() {
    (0, import_k63.group)("Create booking", () => {
      const url = endpoint.booking.create;
      const headers = this.getAuthHeaders();
      const response = performPost(
        url,
        headers,
        bookingPayloads.createBooking,
        "Successfully created booking",
        "Create Booking"
      );
      const data = response.json();
      if (response) {
        (0, import_k63.check)(response, {
          "Create Boooking Status is 201": (r) => r.status === 201,
          "create Booking matches": () => {
            return typeof data.bookingid === "number" && typeof data.firstname === "string" && typeof data.lastname === "string" && typeof data.depositpaid === "boolean" && typeof data.roomid === "number" && data.bookingdates && typeof data.bookingdates.checkin === "string" && typeof data.bookingdates.checkout === "string";
          }
        });
      }
    });
  }
  updateBooking() {
    (0, import_k63.group)("update booking", () => {
      const url = endpoint.booking.update(1);
      const headers = this.getAuthHeaders();
      const response = performPut(
        url,
        headers,
        bookingPayloads.updateBooking,
        "Successfully updated booking",
        "update Booking"
      );
      const data = response.json();
      if (response) {
        (0, import_k63.check)(response, {
          "Updated Booking Status is 200": (r) => r.status === 200,
          "Updated Response has booking": () => data.booking !== void 0,
          "Updated Response booking id exists": () => typeof data.bookingid === "number",
          "Updated booking matches schema": () => {
            const booking = data.booking;
            return typeof booking.bookingid === "number" && typeof booking.firstname === "string" && typeof booking.lastname === "string" && typeof booking.depositpaid === "boolean" && typeof booking.roomid === "number" && booking.bookingdates !== void 0 && typeof booking.bookingdates.checkin === "string" && typeof booking.bookingdates.checkout === "string";
          },
          "Updated Response booking IDs match": () => data.bookingid === data.booking.bookingid
        });
      }
    });
  }
};

// k6/src/userjourneys/bookingJourney.ts
function bookingJourney() {
  const operation = new BookingOperation();
  operation.getAllBookings();
  operation.getBookingById();
  operation.getBookingSummary();
  operation.createBooking();
  operation.updateBooking();
}

// k6/src/operations/MessageOperation.ts
var import_k64 = require("k6");

// k6/src/payloads/messagePayload.ts
var messageData = {
  name: "James Dean",
  email: "james@email.com",
  phone: "01402 619211",
  subject: "Booking enquiry",
  description: "I would like to book a room at your place"
};

// k6/src/operations/MessageOperation.ts
var MessageOperation = class extends AuthOperation {
  constructor() {
    super();
  }
  getMessage() {
    (0, import_k64.group)("GET message", () => {
      const url = endpoint.message.list;
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, "Successfully retrieved messages", "Get Messages");
      if (response) {
        const data = response.json();
        (0, import_k64.check)(response, {
          "Branding status is 200": (r) => r.status === 200,
          "Messages array exists": () => Array.isArray(data.messages),
          "Messages array is not empt": () => data.messages.length > 0,
          "Messages has required fields": () => {
            const booking = data.messages[0];
            return booking && typeof booking.id === "number" && typeof booking.name === "string" && typeof booking.read === "boolean" && typeof booking.subject === "string";
          }
        });
      }
    });
  }
  getMessageById() {
    (0, import_k64.group)("Get message by ID", () => {
      this.login("admin", "password");
      const url = endpoint.message.detail(1);
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, `Successfully retrieved messages by ID  `, `Get Messages By ID`);
      if (response) {
        const data = response.json();
        (0, import_k64.check)(response, {
          "Message status is 200": (r) => r.status === 200,
          "Message description is a string": () => typeof data.description === "string",
          "Message email is a string": () => typeof data.email === "string",
          "Message ID is a number": () => typeof data.messageid === "number",
          "Message name is a string": () => typeof data.name === "string",
          "Message phone is a string": () => typeof data.phone === "string",
          "Message subject is a string": () => typeof data.subject === "string"
        });
      }
    });
  }
  createMessage() {
    (0, import_k64.group)("POST message", () => {
      this.login("admin", "password");
      const url = endpoint.message.create;
      const headers = this.getHeaders();
      const response = performPost(url, headers, messageData, `Successfully created messages  `, `POST Message`);
      if (response) {
        const data = response.json();
        (0, import_k64.check)(response, {
          "Create Message status is 200": (r) => r.status === 200,
          "Create Message is a string": () => typeof data.success === "boolean"
        });
      }
    });
  }
};

// k6/src/userjourneys/messageJourney.ts
function MessageJourney() {
  const operation = new MessageOperation();
  operation.getMessage();
  operation.getMessageById();
  operation.createMessage();
}

// k6/src/operations/RoomOperation.ts
var import_k65 = require("k6");

// k6/src/payloads/roomPayload.ts
var roomData = {
  roomName: Math.floor(Math.random() * 1e4) + 1,
  type: "Suite",
  accessible: true,
  image: "https://blog.postman.com/wp-content/uploads/2014/07/logo.png",
  description: "This is room 101, dare you enter?",
  roomPrice: 100,
  features: ["WiFi", "Safe"]
};

// k6/src/operations/RoomOperation.ts
var RoomOperation = class extends AuthOperation {
  constructor() {
    super();
  }
  getRoom() {
    (0, import_k65.group)("GET room", () => {
      this.login("admin", "password");
      const url = endpoint.room.list;
      const headers = this.getHeaders();
      const response = performGet(url, headers, `Successfully retrieved rooms `, `Get Rooms`);
      if (response) {
        const data = response.json();
        (0, import_k65.check)(response, {
          "Rooms status is 200": (r) => r.status === 200,
          "Rooms array exists": () => Array.isArray(data.rooms),
          "Rooms array is not empty": () => data.rooms.length > 0,
          "Rooms have accessible": () => data.rooms.every((room) => typeof room.accessible === "boolean"),
          "Rooms have description": () => data.rooms.every((room) => typeof room.description === "string"),
          "Rooms have features": () => data.rooms.every((room) => Array.isArray(room.features)),
          "Rooms have image": () => data.rooms.every((room) => typeof room.image === "string"),
          "Rooms have room name": () => data.rooms.every((room) => typeof room.roomName === "string"),
          "Rooms have room price": () => data.rooms.every((room) => typeof room.roomPrice === "number"),
          "Rooms have room ID": () => data.rooms.every((room) => typeof room.roomid === "number"),
          "Rooms have type": () => data.rooms.every((room) => typeof room.type === "string")
        });
      }
    });
  }
  getRoomById() {
    (0, import_k65.group)("GET room by ID", () => {
      this.login("admin", "password");
      const url = endpoint.room.detail(1);
      const headers = this.getHeaders();
      const response = performGet(url, headers, `Successfully retrieved rooms by ID `, `Get Rooms By ID`);
      if (response) {
        const data = response.json();
        (0, import_k65.check)(response, {
          "Room status is 200": (r) => r.status === 200,
          "Room accessible is a boolean": () => typeof data.accessible === "boolean",
          "Room description is a string": () => typeof data.description === "string",
          "Room features is an array": () => Array.isArray(data.features),
          "Room image is a string": () => typeof data.image === "string",
          "Room name is a string": () => typeof data.roomName === "string",
          "Room price is a number": () => typeof data.roomPrice === "number",
          "Room ID is a number": () => typeof data.roomid === "number",
          "Room type is a string": () => typeof data.type === "string"
        });
      }
    });
  }
  createMessage() {
    (0, import_k65.group)("POST room", () => {
      this.login("admin", "password");
      const url = endpoint.room.create;
      const headers = this.getAuthHeaders();
      const response = performPost(url, headers, roomData, `Successfully created room `, `POST Room`);
      if (response) {
        const data = response.json();
        (0, import_k65.check)(response, {
          "Create Room status is 200": (r) => r.status === 200,
          "Create Room is a string": () => typeof data.success === "boolean"
        });
      }
    });
  }
  updateMessage() {
    (0, import_k65.group)("PUT room", () => {
      this.login("admin", "password");
      const url = endpoint.room.update(1);
      const headers = this.getAuthHeaders();
      const response = performPut(url, headers, roomData, `Successfully updated room `, `PUT Room`);
      if (response) {
        const data = response.json();
        (0, import_k65.check)(response, {
          "Update Room status is 202": (r) => r.status === 202,
          "Update Room accessible is a boolean": () => typeof data.accessible === "boolean",
          "Update Room description is a string": () => typeof data.description === "string",
          "Update Room features is an array": () => Array.isArray(data.features),
          "Update Room image is a string": () => typeof data.image === "string",
          "Update Room name is a string": () => typeof data.roomName === "string",
          "Update Room price is a number": () => typeof data.roomPrice === "number",
          "Update Room ID is a number": () => typeof data.roomid === "number",
          "Update Room type is a string": () => typeof data.type === "string"
        });
      }
    });
  }
};

// k6/src/userjourneys/roomJourney.ts
function RoomJourney() {
  const operation = new RoomOperation();
  operation.getRoom();
  operation.getRoomById();
  operation.createMessage();
  operation.updateMessage();
}

// k6/src/config/senaroBase.ts
function createSenarioOption(testName, senarioConfig, customThresholds = {}, additionalOption = {}) {
  return {
    cloud: {
      projectID: 1,
      name: testName
    },
    summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
    summaryTimeUnit: "ms",
    senarios: senarioConfig,
    thresholds: {
      http_req_duration: [k6Config.thresholds.http_req_duration],
      http_req_failed: [k6Config.thresholds.http_req_failed],
      checks: [k6Config.thresholds.checks],
      ...customThresholds
    },
    ...additionalOption
  };
}
var defultConfigurations = {
  smoke: {
    executor: "constant-vus",
    vus: 1,
    duration: "1m",
    gracefulStop: "5s"
  },
  load: {
    executor: "constant-vus",
    vus: 5,
    duration: "5m",
    gracefulStop: "10s"
  },
  quick: {
    executor: "constant-vus",
    vus: 1,
    iterations: 1
  }
};

// k6/scenarios/quick-test.ts
var import_k67 = require("k6");

// k6/src/operations/ReportOperation.ts
var import_k66 = require("k6");
var ReportOperation = class extends AuthOperation {
  constructor() {
    super();
  }
  getReportById() {
    (0, import_k66.group)("GET report by ID", () => {
      this.login("admin", "password");
      const url = endpoint.report.byRoom(1);
      const headers = this.getHeaders();
      const response = performGet(url, headers, `Successfully retrieved report by ID `, `Get Report BY ID`);
      if (response) {
        const data = response.json();
        (0, import_k66.check)(response, {
          "Report by ID status is 200": (r) => r.status === 200,
          "Report by ID  array exists": () => Array.isArray(data.report),
          "Report by ID array is not empty": () => data.report.length > 0,
          "Report by ID  start is a string": () => data.report.every((report) => typeof report.start === "string"),
          "Report by ID  end is a string": () => data.report.every((report) => typeof report.end === "string"),
          "Report by ID  title is a string": () => data.report.every((report) => typeof report.title === "string")
        });
      }
    });
  }
  getReport() {
    (0, import_k66.group)("GET report", () => {
      this.login("admin", "password");
      const url = endpoint.report.list;
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, `Successfully retrieved report  `, `Get Report`);
      if (response) {
        const data = response.json();
        if (response) {
          (0, import_k66.check)(response, {
            "Report status is 200": (r) => r.status === 200,
            "Report array exists": () => Array.isArray(data.report),
            "Report array is not empty": () => data.report.length > 0,
            "Report start is a string": () => data.report.every((report) => typeof report.start === "string"),
            "Report end is a string": () => data.report.every((report) => typeof report.end === "string"),
            "Report title is a string": () => data.report.every((report) => typeof report.title === "string")
          });
        }
      }
    });
  }
};

// k6/src/userjourneys/reportJourney.ts
function ReportJourney() {
  const operation = new ReportOperation();
  operation.getReportById();
  operation.getReport();
}

// k6/scenarios/quick-test.ts
var options = createSenarioOption("Quick Test", { quick_test: defultConfigurations.quick });
function quick_test_default() {
  logConfig();
  brandingJourney();
  bookingJourney();
  MessageJourney();
  RoomJourney();
  ReportJourney();
  (0, import_k67.sleep)(1);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  options
});
