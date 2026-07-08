import * as fileSystem from "fs";
export const warningsFile = "./warning.log";

export async function addWarning(warning: string, warningFilesToUse = warningsFile) {
  fileSystem.appendFile(warningFilesToUse, "WARNING: " + warning + "\n", (error) => {
    if (error) {
      console.log(error);
    }
  });
}
