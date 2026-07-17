import { check, group } from "k6";
import { head, Response } from "k6/http";
import { endpoint } from "endpoint";
import { performGet } from "src/lib/requestUtils";
import { AuthOperation } from "./AuthOperation";

interface Report {
  end: string;
  start: string;
  title: string;
}

interface ReportResponse {
  report: Report[];
}

export class ReportOperation extends AuthOperation {
  constructor() {
    super();
  }

  getReportById() {
    group("GET report by ID", () => {
      this.login("admin", "password");
      const url = endpoint.report.byRoom(1);
      const headers = this.getHeaders();
      const response = performGet(url, headers, `Successfully retrieved report by ID `, `Get Report BY ID`);
      if (response) {
        const data = response.json() as unknown as ReportResponse;

        check(response, {
          "Report by ID status is 200": (r: Response) => r.status === 200,
          "Report by ID  array exists": () => Array.isArray(data.report),
          "Report by ID array is not empty": () => data.report.length > 0,
          "Report by ID  start is a string": () => data.report.every((report) => typeof report.start === "string"),
          "Report by ID  end is a string": () => data.report.every((report) => typeof report.end === "string"),
          "Report by ID  title is a string": () => data.report.every((report) => typeof report.title === "string"),
        });
      }
    });
  }

  getReport() {
    group("GET report", () => {
      this.login("admin", "password");
      const url = endpoint.report.list;
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, `Successfully retrieved report  `, `Get Report`);
      if (response) {
        const data = response.json() as unknown as ReportResponse;
        if (response) {
          check(response, {
            "Report status is 200": (r: Response) => r.status === 200,

            "Report array exists": () => Array.isArray(data.report),
            "Report array is not empty": () => data.report.length > 0,

            "Report start is a string": () => data.report.every((report) => typeof report.start === "string"),

            "Report end is a string": () => data.report.every((report) => typeof report.end === "string"),

            "Report title is a string": () => data.report.every((report) => typeof report.title === "string"),
          });
        }
      }
    });
  }
}
