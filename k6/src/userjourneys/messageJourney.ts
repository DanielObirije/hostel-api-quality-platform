import { MessageOperation } from "src/operations/MessageOperation";
export default function MessageJourney() {
  const operation = new MessageOperation();

  operation.getMessage();
  operation.getMessageById();
  operation.createMessage();
}
