
import brandingJourney from "../src/user-journeys/brandingJourney";
// import { createSenarioOption, defultConfigurations } from "../src/config/senaroBase";
import { createSenarioOption,defultConfigurations } from "../src/config/senaroBase";

export const options = createSenarioOption("Smoke Test", { smoke_test: defultConfigurations.smoke });

export default function () {
  brandingJourney();
}
