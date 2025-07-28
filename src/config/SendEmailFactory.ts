import { BullMQQueueAdapter } from "@/adapters/queue/BullMQQueueAdapter";
import { EmailService } from "@/core/services/EmailService";
import { EmailWebhookHandler } from "@/presentation/webhooks/EmailWebhookHandler";

export class SendEmailFactory {
  build() {
    const queueAdapter = new BullMQQueueAdapter("email");

    const emailService = new EmailService(queueAdapter);
    const emailWebhookHandler = new EmailWebhookHandler(emailService);

    return emailWebhookHandler;
  }
}
