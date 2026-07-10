export function createSenarioOption(
  testName: string,
  senarioConfig: object,
  customThresholds = {},
  additionalOption = {}
) {
  return {
    cloud: {
      projectID: 1,
      name: testName,
    },

    summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
    summaryTimeUnit: "ms",

    senarios: senarioConfig,

    thresholds:{
      http_req_duration: ["p(95)<500"],
      http_req_failed: ["rate<0.01"],

      ...customThresholds,
    },
    ...additionalOption,
  };
}

export const defultConfigurations = {
   smoke:{
     executor: "constant-vus",
     vus: 1,
     duration: "1m",
     gracefulStop: "5s"

   }
}
