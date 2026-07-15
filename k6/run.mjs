import { execSync } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const scenario = process.argv[2];

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

console.log("🚀 Running smoke test...");
try {
  const envVars = ["BASE_URL", "TEST_USERNAME", "TEST_PASSWORD"]
    .filter((key) => process.env[key])
    .map((key) => `-e ${key}=${process.env[key]}`)
    .join(" ");

  // Run TypeScript directly - k6 handles TypeScript via esbuild
  execSync(`k6 run ${envVars} k6/scenarios/${scenario}.ts`, {
    stdio: "inherit",
  });
} catch (e) {
  process.exit(1);
}
