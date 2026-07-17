import { RoomOperation } from "src/operations/RoomOperation";
export default function RoomJourney() {
  const operation = new RoomOperation();

  operation.getRoom()
  operation.getRoomById()
  operation.createMessage()
  operation.updateMessage()
}
