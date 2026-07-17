// import { completeJourney } from "../src/userjourneys/completeJourney";
import brandingJourney from "src/userjourneys/brandingJourney";
import bookingJourney from "src/userjourneys/bookingJourney";
import MessageJourney from "src/userjourneys/messageJourney";
import { createSenarioOption, defultConfigurations } from "src/config/senaroBase";
import { logConfig } from "config";
import { sleep } from "k6";

export const options = createSenarioOption("Quick Test", { quick_test: defultConfigurations.quick });

export default function (): void {
  logConfig();

  brandingJourney();
  bookingJourney();
  MessageJourney()

  sleep(1);
}
