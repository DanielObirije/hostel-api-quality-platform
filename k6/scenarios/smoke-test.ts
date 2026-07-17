import { completeJourney } from "../src/userjourneys/completeJourney";
import brandingJourney from "src/userjourneys/brandingJourney";
import { createSenarioOption, defultConfigurations } from "src/config/senaroBase";
import { logConfig } from "config";
import { sleep } from "k6";
import bookingJourney from "src/userjourneys/bookingJourney";
import MessageJourney from "src/userjourneys/messageJourney";
import RoomJourney from "src/userjourneys/roomJourney";
import ReportJourney from "src/userjourneys/reportJourney";
// export const options = {
//   vus: 1,
//   duration: "10s",
//   thresholds: {
//     http_req_failed: ["rate<0.01"],
//     http_req_duration: ["p(95)<2000"],
//   },
// };
export const options = createSenarioOption("Smoke Test", { smoke_test: defultConfigurations.smoke });

export default function (): void {
  logConfig();

  // completeJourney();
  brandingJourney();
  bookingJourney();
  MessageJourney()
  RoomJourney()
  ReportJourney()
  sleep(1);
}
