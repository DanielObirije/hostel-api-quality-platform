export function logInfo(message: string, data?: unknown): void {
  if (data) {
    console.log(`ℹ️ INFO: ${message}`, JSON.stringify(data));
  } else {
    console.log(`ℹ️ INFO: ${message}`);
  }
}

export function logSuccess(message: string): void {
  console.log(`✅ SUCCESS: ${message}`);
}

export function logError(message: string, errorData?: unknown): void {
  if (errorData) {
    console.error(`❌ FAILED: ${message}`, JSON.stringify(errorData));
  } else {
    console.error(`❌ FAILED: ${message}`);
  }
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
