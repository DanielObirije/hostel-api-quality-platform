// import { execSync } from "child_process";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import path from "path";
// const scenario = process.argv[2];

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load .env
// const envPath = path.join(__dirname, "../.env");
// if (fs.existsSync(envPath)) {
//   const envContent = fs.readFileSync(envPath, "utf8");
//   envContent.split("\n").forEach((line) => {
//     if (line && !line.startsWith("#")) {
//       const [key, value] = line.split("=");
//       if (key && value) {
//         process.env[key.trim()] = value.trim();
//       }
//     }
//   });
// }

// console.log("🚀 Running smoke test...");
// try {
//   const envVars = ["BASE_URL", "TEST_USERNAME", "TEST_PASSWORD"]
//     .filter((key) => process.env[key])
//     .map((key) => `-e ${key}=${process.env[key]}`)
//     .join(" ");

//   // Run TypeScript directly - k6 handles TypeScript via esbuild
//   execSync(`k6 run ${envVars} k6/scenarios/${scenario}.ts`, {
//     stdio: "inherit",
//   });
// } catch (e) {
//   process.exit(1);
// }

import { execSync } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
const envPath = path.join(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    if (line && !line.startsWith("#")) {
      const [key, value] = line.split("=");
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  });
}

// Get test file - if just a name like "smoke-test", add path
let testFile = process.argv[2];
if (!testFile) {
  testFile = "k6/scenarios/smoke-test.ts"; // Default
} else if (!testFile.includes("/") && !testFile.endsWith(".ts")) {
  testFile = `k6/scenarios/${testFile}.ts`; // Add path if just a name
}

console.log(`🚀 Running: ${testFile}`);

// Build environment variables
const envVars = ["BASE_URL", "TEST_USERNAME", "TEST_PASSWORD"]
  .filter((key) => process.env[key])
  .map((key) => `-e ${key}=${process.env[key]}`)
  .join(" ");

// // Prometheus output
// const prometheusUrl = process.env.K6_PROMETHEUS_RW_SERVER_URL || "http://localhost:9090/api/v1/write";
// const prometheusOutput =
//   process.env.ENABLE_PROMETHEUS === "true" ? `--out experimental-prometheus-rw=${prometheusUrl}` : "";

// // Run the test
// const command = `k6 run ${envVars} ${prometheusOutput} ${testFile}`;
// console.log(`📝 Command: ${command}`);

// ALWAYS push to Prometheus (uses localhost:9090 by default)
const prometheusUrl = process.env.K6_PROMETHEUS_RW_SERVER_URL || "http://localhost:9090/api/v1/write";
const command = `k6 run ${envVars} --out experimental-prometheus-rw=${prometheusUrl} ${testFile}`;

console.log(`📝 Command: ${command}`);


try {
  execSync(command, { stdio: "inherit" });
} catch (e) {
  process.exit(1);
}
