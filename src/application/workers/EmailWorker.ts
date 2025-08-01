import { BullMQWorkerAdapter } from "@/adapters/driven/worker/BullMQWorkerAdapter";
import { EmailData } from "@/core/models/Email";
import { EmailProvider } from "@/core/ports/EmailProvider";

export class EmailWorker {
  private worker: BullMQWorkerAdapter;

  constructor(private emailProvider: EmailProvider) {
    this.worker = new BullMQWorkerAdapter("email");
  }

  private async handleEmailJob(data: EmailData): Promise<void> {
    try {
      console.log(`Processing email job for: ${data.to}`);

      const info = await this.emailProvider.sendEmail(data);

      console.log(`Email sent successfully: ${info}, to: ${data.to}`);
    } catch (error) {
      console.error(`Failed to send email to ${data.to}:`, error);
      throw error;
    }
  }

  async start(): Promise<void> {
    this.worker.process("email-job", this.handleEmailJob.bind(this));
    await this.worker.start();
    console.log("EmailWorker started");
  }

  async stop(): Promise<void> {
    await this.worker.stop();
    console.log("EmailWorker stopped");
  }
}
