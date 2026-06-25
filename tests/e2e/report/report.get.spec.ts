import { expect, test } from "@playwright/test";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { ReportClient } from "../../../resources/clients/ReportClient";

const reportClient = new ReportClient();

test.describe("report/ GET requests @report", async () => {
  test("GET a report @happy", async ({ request }) => {
    const id = 1;
    const response = await request.get(`api/report/room/${id}`);
    expect(response.status()).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("GET_report", "report", body);
  });

  test("GET room report by id @happy", async () => {
    const response = await reportClient.getRoomReportById();
    expect(response.status).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("GET_report_room_id", "report", body);
  });
});
