import * as dotenv from "dotenv";

dotenv.config();

export class BaseOperation {
  public static readonly URL = process.env.URL;
  public static readonly ADMIN_NAME = process.env.ADMIN_NAME;
  public static readonly ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  public static readonly SECRET_API_KEY = process.env.SECRET_API_KEY;
  constructor() {}
}
