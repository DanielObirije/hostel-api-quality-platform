export const config = {
  baseUrl: __ENV.BASE_URL || "https://automationintesting.online",

  apiKey: __ENV.API_KEY || "WQS6e4P!!",

  timeout: __ENV.TIME_OUT || "30s",

  environment: __ENV.ENVIRONMENT || "dev",

  debug: __ENV.DEBUG == "true" || false,

  thinkTIme: {
    min: parseInt(__ENV.THINK_TIME_MIN) || 1,
    max: parseInt(__ENV.THINK_TIME_MAX) || 3,
  },
};

export function lofConfig() {
  console.log("=== K6 Framework Configuration ===");
  console.log(`Environment: ${config.environment}`);
  console.log(`Base URL: ${config.baseUrl}`);
  console.log(`API Key: ${config.apiKey.substring(0, 8)}...`);
  console.log(`Timeout: ${config.timeout}`);
  console.log(`Debug Mode: ${config.debug}`);
  console.log(`Think Time: ${config.thinkTime.min}-${config.thinkTime.max}s`);
  console.log("===================================");
}
