import { AuthOperation } from "../operations/AuthOperation";
import { k6Config } from "config";

export function completeJourney() {
  const auth = new AuthOperation();

  auth.login(k6Config.credentials.username, k6Config.credentials.password);
}
