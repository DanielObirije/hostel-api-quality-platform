const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: [
      "k6/scenarios/smoke-test.ts",
      "k6/scenarios/quick-test.ts",
      "k6/scenarios/soak-test.ts",
      "k6/scenarios/load-test.ts",
      "k6/scenarios/stress-test.ts",
    ],
    bundle: true,
    // outfile: "k6/dist/smoke-test.js",
    outdir: "k6/dist",
    platform: "node",
    target: "es2020",
    external: ["k6", "https://*"],
  })
  .catch(() => process.exit(1));
