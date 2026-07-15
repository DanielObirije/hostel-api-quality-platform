// import { brandOperation } from "../operations/BrandOperation";

// export default function brandingJourney() {
//   const operation = new brandOperation();

//   operation.getBranding();
// }

import { BrandOperation } from "src/operations/BrandOperation";

export default function brandingJourney() {
  const operation = new BrandOperation();

  operation.getBranding();
  operation.updateBranding();
}
