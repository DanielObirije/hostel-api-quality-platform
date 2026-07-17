import brandingJourney from "src/userjourneys/brandingJourney";
import bookingJourney from "src/userjourneys/bookingJourney";
import MessageJourney from "src/userjourneys/messageJourney";
import RoomJourney from "src/userjourneys/roomJourney";
import { createSenarioOption, defultConfigurations } from "src/config/senaroBase";
import { logConfig } from "config";
import { sleep } from "k6";
import ReportJourney from "src/userjourneys/reportJourney";

export const options = createSenarioOption("Quick Test", { quick_test: defultConfigurations.soak });

export default function (): void {
  logConfig();

  brandingJourney();
  bookingJourney();
  MessageJourney()
  RoomJourney()
  ReportJourney()
  sleep(1);
}
