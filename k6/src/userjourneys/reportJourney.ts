import { ReportOperation } from "src/operations/ReportOperation";
export default function ReportJourney() {
  const operation = new ReportOperation;

  operation.getReportById()
  operation.getReport()
}
