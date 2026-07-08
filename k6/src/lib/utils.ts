export function logInfo(message: string, data?: object) {
  if (data) {
    console.log(`INFO: ${message}`, data);
  }
  console.log(`INFO: ${message}`);
}

export function logSuccess(message: string) {
  console.log(`SUCCESS: ${message}`);
}

export function logError(message: string, errorData?: object) {
  if (errorData) {
    console.log(`FAILED: ${message}`, errorData);
  }
  console.log(`FAILED: ${message}`);
}
