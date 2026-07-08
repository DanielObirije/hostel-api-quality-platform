export const k6Config = {
  baseUrl: __ENV.BASE_URL || "https://automationintesting.online",

  apiKey: __ENV.API_KEY || "WQS6e4P!!",

  timeout: __ENV.TIME_OUT || "30s",

  environment: __ENV.ENVIRONMENT || "dev",

  debug: __ENV.DEBUG == "true" || false,

  credentials: {
    username: __ENV.TEST_USERNAME || "admin",
    password: __ENV.TEST_PASSWORD || "password",
  },

  thinkTime: {
    min: parseInt(__ENV.THINK_TIME_MIN || "1"),
    max: parseInt(__ENV.THINK_TIME_MAX || "3"),
  },
};

export function lofConfig() {
  console.log("=== K6 Framework Configuration ===");
  console.log(`Environment: ${k6Config.environment}`);
  console.log(`Base URL: ${k6Config.baseUrl}`);
  console.log(`API Key: ${k6Config.apiKey.substring(0, 8)}...`);
  console.log(`Timeout: ${k6Config.timeout}`);
  console.log(`Debug Mode: ${k6Config.debug}`);
  console.log(`Think Time: ${k6Config.thinkTime.min}-${k6Config.thinkTime.max}s`);
  console.log("===================================");
}
