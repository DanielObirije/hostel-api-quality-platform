import { BaseClient } from "./BaseClient";
import { AuthClient } from "./AuthClient";
const auth = new AuthClient();

export class ReportClient extends BaseClient {
  constructor() {
    super();
  }

  async getRoomReportById() {
    const cookie = await auth.createToken();
    const response = await fetch(ReportClient.URL + "api/report", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
    });
    return response;
  }
}
