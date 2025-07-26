import { Queue } from "bullmq";
import { RedisClient } from "../services/redis";

export class EmailQueue {
	private queue: Queue;

	constructor() {
		const connection = RedisClient.getInstance().getClient();

		this.queue = new Queue("email", { connection: connection });
	}

	public async addJob(data: { name: string; age: number }) {
		this.queue.add("sendEmail", data);
	}

	public getQueue() {
		return this.queue;
	}
}

export const emailQueue = new EmailQueue();
