
import { AuthOperation } from "../operations/AuthOperation";
// import { brandOperation } from "../operations/BrandOperation";

export function completeJourney() {
  const auth = new AuthOperation();
  // const brand = new brandOperation();

  auth.login();
  // brand.getBranding()
}
