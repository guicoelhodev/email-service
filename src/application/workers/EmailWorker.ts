import { BullMQWorkerAdapter } from "@/adapters/worker/BullMQWorkerAdapter";
import { EmailData } from "@/core/models/Email";

export class EmailWorker {
	private worker: BullMQWorkerAdapter;

	constructor() {
		this.worker = new BullMQWorkerAdapter("email");
	}

	private async handleEmailJob(data: EmailData): Promise<void> {
		try {
			console.log(`Processing email job for: ${data.to}`);

			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log(`Email processed successfully for: ${data.to}`);
		} catch (error) {
			console.error(`Failed to process email job:`, error);
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
