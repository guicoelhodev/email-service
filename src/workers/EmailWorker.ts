import { Worker } from "bullmq";
import { RedisClient } from "../services/redis";

export class EmailWorker {
	private worker: Worker;

	constructor() {
		const connection = RedisClient.getInstance().getClient();

		this.worker = new Worker(
			"email",
			async () => {
				const error = Math.random();
				await new Promise((resolve) => setTimeout(resolve, 2000));

				if (error < 0.5) throw new Error("Bad lucky");
			},

			{ connection },
		);

		this.worker.on("completed", (job) => {
			console.log(`Job ${job?.id} completed`);
		});

		this.worker.on("failed", (job, err) => {
			console.error(`Job ${job?.id} failed:`, err);
		});
	}
}
