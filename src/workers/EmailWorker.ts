import { Job, Worker, JobScheduler } from "bullmq";
import { RedisClient } from "../services/redis";

export class EmailWorker {
	private worker: Worker;

	constructor() {
		const connection = RedisClient.getInstance().getClient();

		new JobScheduler("email", { connection });

		this.worker = new Worker(
			"email",
			async (job: Job) => {
				await new Promise((resolve) => setTimeout(resolve, 2000));

				console.log(`process email job:`, job);
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
