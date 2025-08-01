import { BullMQQueueAdapter } from "@/adapters/driven/queue/BullMQQueueAdapter";
import { EmailService } from "@/core/services/EmailService";
import { EmailWebhookHandler } from "@/adapters/driver/webhooks/EmailWebhookHandler";

export function makeEmailFactory() {
  const queueAdapter = new BullMQQueueAdapter("email");
  const emailService = new EmailService(queueAdapter);
  const emailWebhookHandler = new EmailWebhookHandler(emailService);

  return emailWebhookHandler;
}
