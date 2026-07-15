import { k6Config } from "config";

interface senarioConfig {
  executor: string;
  vus?: number;
  duration?: string;
  iterations?: number;
  stages?: Array<{ duration: string; target: number }>;
  gracefulStop?: string;
}

export function createSenarioOption(
  testName: string,
  senarioConfig: Record<string, senarioConfig>,
  customThresholds = {},
  additionalOption = {}
): Record<string, unknown> {
  return {
    cloud: {
      projectID: 1,
      name: testName,
    },

    summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
    summaryTimeUnit: "ms",

    senarios: senarioConfig,

    thresholds: {
      http_req_duration: [k6Config.thresholds.http_req_duration],
      http_req_failed: [k6Config.thresholds.http_req_failed],
      checks: [k6Config.thresholds.checks],
      ...customThresholds,
    },
    ...additionalOption,
  };
}

export const defultConfigurations = {
  smoke: {
    executor: "constant-vus",
    vus: 1,
    duration: "1m",
    gracefulStop: "5s",
  },
  load: {
    executor: "constant-vus",
    vus: 5,
    duration: "5m",
    gracefulStop: "10s",
  },
  quick: {
    executor: "constant-vus",
    vus: 1,
    iterations: 1,
  },
};
