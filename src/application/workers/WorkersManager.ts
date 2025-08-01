import { NodemailerAdapter } from "@/adapters/driven/nodemailer/NodeMailerAdapter";
import { EmailWorker } from "./EmailWorker";

export class WorkersManager {
  private workers: EmailWorker[] = [];

  constructor() {
    const emailProvider = new NodemailerAdapter();
    this.workers = [new EmailWorker(emailProvider)];
  }

  async start(): Promise<void> {
    try {
      await Promise.all(this.workers.map((worker) => worker.start()));

      console.log(`WorkersManager started with ${this.workers.length} workers`);
    } catch (error) {
      console.error("Failed to start workers:", error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      await Promise.all(this.workers.map((worker) => worker.stop()));
      console.log("All workers stopped");
    } catch (error) {
      console.error("Error stopping workers:", error);
      throw error;
    }
  }
}
