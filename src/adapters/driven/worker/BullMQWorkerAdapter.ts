import { JobHandler, JobProcessor } from "@/core/ports/JobProcessor";
import { Job, Worker } from "bullmq";

export class BullMQWorkerAdapter implements JobProcessor {
  private worker: Worker;
  private handlers: Map<string, JobHandler> = new Map();

  constructor(queueName: string) {
    this.worker = new Worker(
      queueName,
      async (job: Job) => {
        const handler = this.handlers.get(job.name);

        if (!handler) {
          return console.warn(`No handler found for job: ${job.name}`);
        }

        await handler(job.data);
      },
      {
        connection: {
          host: process.env.REDIS_HOST || "localhost",
          port: parseInt(process.env.REDIS_PORT!) || 6379,
          lazyConnect: true,
        },
      },
    );

    this.worker.on("completed", (job) => {
      console.log(`Job ${job.id} completed`);
    });

    this.worker.on("failed", (job, err) => {
      console.error(`Job ${job?.id} failed:`, err);
    });
  }

  async start(): Promise<void> {
    console.log("Worker started", this.worker.name);
  }

  async stop(): Promise<void> {
    await this.worker.close();
  }

  process(jobName: string, handler: JobHandler): void {
    this.handlers.set(jobName, handler);
  }
}
