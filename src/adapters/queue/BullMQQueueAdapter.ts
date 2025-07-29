import { QueueService } from "@/core/ports/QueueService";
import { QueueRegistry } from "@/shared/QueueRegistry";
import { Queue } from "bullmq";

export class BullMQQueueAdapter implements QueueService {
	private queue: Queue;

	constructor(queueName: string) {
		this.queue = new Queue(queueName, {
			connection: {
				host: process.env.REDIS_HOST || "localhost",
				port: parseInt(process.env.REDIS_PORT!) || 6379,
				lazyConnect: true,
			},
		});

		QueueRegistry.register(queueName, this.queue);
	}

	async addJob(jobName: string, data: any) {
		await this.queue.add(jobName, data);
	}

	getQueue() {
		return this.queue;
	}
}
