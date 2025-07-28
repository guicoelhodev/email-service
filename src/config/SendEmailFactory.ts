import { BullMQQueueAdapter } from "@/adapters/queue/BullMQQueueAdapter";
import { HttpService } from "@/core/ports/HttpService";
import { EmailService } from "@/core/services/EmailService";
import { EmailWebhookHandler } from "@/presentation/webhooks/EmailWebhookHandler";

export class SendEmailFactory {
  constructor(private httpAdapter: HttpService) {}

  build() {
    const queueAdapter = new BullMQQueueAdapter("email");

    const emailService = new EmailService(queueAdapter);
    const emailWebhookHandler = new EmailWebhookHandler(emailService);

    this.httpAdapter.addRoute(
      "POST",
      "/send-email",
      emailWebhookHandler.handleSendEmail,
    );
  }
}
