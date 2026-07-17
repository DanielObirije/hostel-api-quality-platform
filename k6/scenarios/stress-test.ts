import brandingJourney from "src/userjourneys/brandingJourney";
import { createSenarioOption, defultConfigurations } from "src/config/senaroBase";
import { logConfig } from "config";
import { sleep } from "k6";
import bookingJourney from "src/userjourneys/bookingJourney";
import MessageJourney from "src/userjourneys/messageJourney";
import RoomJourney from "src/userjourneys/roomJourney";
import ReportJourney from "src/userjourneys/reportJourney";

export const options = createSenarioOption("Stress Test", { smoke_test: defultConfigurations.stress });

export default function (): void {
  logConfig();
  brandingJourney();
  bookingJourney();
  MessageJourney()
  RoomJourney()
  ReportJourney()
  sleep(1);
}
