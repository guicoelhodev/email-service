import { HttpService } from "@/core/ports/HttpService";
import { SendEmailFactory } from "./factories/SendEmailFactory";

export function setupRoutes(httpService: HttpService) {
  const sendEmail = new SendEmailFactory().build();

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
