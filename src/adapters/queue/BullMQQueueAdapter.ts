import { QueueService } from "@/core/ports/QueueService";
import { Queue } from "bullmq";

export class BullMQQueueAdapter implements QueueService {
  private queue: Queue;

  constructor(queueName: string) {
    this.queue = new Queue(queueName, {
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT!),
      },
    });
  }

  async addJob(jobName: string, data: any) {
    await this.queue.add(jobName, data);
  }
}
