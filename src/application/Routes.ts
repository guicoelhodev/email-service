import { HttpService } from "@/core/ports/HttpService";
import { makeEmailFactory } from "./factories/makeEmailFactory";

export function setupRoutes(httpService: HttpService) {
  const sendEmail = makeEmailFactory();
  httpService.addRoute("GET", "/", async () => {
    return {
      statusCode: 200,
      body: {
        message: "Server works correctly",
      },
    };
  });

  httpService.addRoute("POST", "/send-email", sendEmail.handleSendEmail);
}
