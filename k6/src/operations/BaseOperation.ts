
import { k6Config } from "../../config";
export class BaseOperation {
  protected readonly config = k6Config;

  protected readonly baseUrl = k6Config.baseUrl;

  protected readonly apiKey = k6Config.apiKey;

  protected readonly username = k6Config.credentials.username;

  protected readonly password = k6Config.credentials.password;

  constructor() {}
}
