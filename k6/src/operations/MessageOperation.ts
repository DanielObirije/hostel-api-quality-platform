import { check, group } from "k6";
import { Response } from "k6/http";
import { endpoint } from "endpoint";
import { performGet, performPost } from "src/lib/requestUtils";
import { AuthOperation } from "./AuthOperation";
import { messageData } from "src/payloads/messagePayload";

interface CreateMessage {
  success: boolean;
}

interface MessageById {
  description: string;
  email: string;
  messageid: number;
  name: string;
  phone: string;
  subject: string;
}

interface Message {
  id: number;
  name: string;
  read: boolean;
  subject: string;
}

interface GetMessageResponse {
  messages: Message[];
}

export class MessageOperation extends AuthOperation {
  constructor() {
    super();
  }

  getMessage(): void {
    group("GET message", () => {
      const url = endpoint.message.list;
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, "Successfully retrieved messages", "Get Messages");
      if (response) {
        const data = response.json() as unknown as GetMessageResponse;
        check(response, {
          "Branding status is 200": (r: Response) => r.status === 200,
          "Messages array exists": () => Array.isArray(data.messages),
          "Messages array is not empt": () => data.messages.length > 0,
          "Messages has required fields": () => {
            const booking = data.messages[0];
            return (
              booking &&
              typeof booking.id === "number" &&
              typeof booking.name === "string" &&
              typeof booking.read === "boolean" &&
              typeof booking.subject === "string"
            );
          },
        });
      }
    });
  }

  getMessageById() {
    group("Get message by ID", () => {
      this.login("admin", "password");
      const url = endpoint.message.detail(1);
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, `Successfully retrieved messages by ID  `, `Get Messages By ID`);
      if (response) {
        const data = response.json() as unknown as MessageById;
        check(response, {
          "Message status is 200": (r: Response) => r.status === 200,
          "Message description is a string": () => typeof data.description === "string",
          "Message email is a string": () => typeof data.email === "string",
          "Message ID is a number": () => typeof data.messageid === "number",
          "Message name is a string": () => typeof data.name === "string",
          "Message phone is a string": () => typeof data.phone === "string",
          "Message subject is a string": () => typeof data.subject === "string",
        });
      }
    });
  }

  createMessage() {
    group("POST message", () => {
      this.login("admin", "password");
      const url = endpoint.message.create;
      const headers = this.getHeaders();
      const response = performPost(url, headers, messageData, `Successfully created messages  `, `POST Message`);
      if (response) {
        const data = response.json() as unknown as CreateMessage;
        check(response, {
          "Create Message status is 200": (r: Response) => r.status === 200,
          "Create Message is a string": () => typeof data.success === "boolean",
        });
      }
    });
  }
}
