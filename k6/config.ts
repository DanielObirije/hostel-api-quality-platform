export const k6Config = {
  baseUrl: __ENV.BASE_URL || "https://automationintesting.online",
  apiKey: __ENV.API_KEY || "",
  timeout: __ENV.TIMEOUT || "30s",
  environment: __ENV.ENVIRONMENT || "dev",
  debug: __ENV.DEBUG === "true",
  credentials: {
    username: __ENV.TEST_USERNAME || "admin",
    password: __ENV.TEST_PASSWORD || "password",
  },
  thinkTime: {
    min: parseInt(__ENV.THINK_TIME_MIN || "1"),
    max: parseInt(__ENV.THINK_TIME_MAX || "3"),
  },
  thresholds: {
    http_req_duration: __ENV.HTTP_REQ_DURATION || "p(95)<500",
    http_req_failed: __ENV.HTTP_REQ_FAILED || "rate<0.01",
    checks: __ENV.CHECKS || "rate>0.95",
  },
};

export function logConfig(): void {
  console.log("=== K6 Framework Configuration ===");
  console.log(`Environment: ${k6Config.environment}`);
  console.log(`Base URL: ${k6Config.baseUrl}`);
  console.log(`Timeout: ${k6Config.timeout}`);
  console.log(`Debug Mode: ${k6Config.debug}`);
  console.log(`Think Time: ${k6Config.thinkTime.min}-${k6Config.thinkTime.max}s`);
  console.log("===================================");
}
