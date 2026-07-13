const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["k6/scenarios/smoke-test.ts"],
    bundle: true,
    outfile: "k6/dist/smoke-test.js",
    platform: "node",
    target: "es2020",
    external: ["k6", "https://*"],
  })
  .catch(() => process.exit(1));
