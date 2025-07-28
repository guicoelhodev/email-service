import { Email, EmailData } from "@/core/models/Email";
import { QueueService } from "@/core/ports/QueueService";

type SendEmail = Omit<EmailData, "createdAt" | "id">;

export class EmailService {
  constructor(private queueService: QueueService) {}

  async sendEmail(emailData: SendEmail) {
    const emailId = crypto.randomUUID();

    const email = new Email({
      id: emailId,
      createdAt: new Date(),
      body: emailData.body,
      subject: emailData.subject,
      to: emailData.to,
    });

    await this.queueService.addJob("email-job", email.getEmailData());

    return emailId;
  }
}
