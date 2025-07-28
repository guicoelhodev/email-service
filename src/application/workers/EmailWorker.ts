import { BullMQWorkerAdapter } from "@/adapters/worker/BullMQWorkerAdapter";
import { EmailData } from "@/core/models/Email";
import { createTransport, Transporter } from "nodemailer";

export class EmailWorker {
	private worker: BullMQWorkerAdapter;
	private transporter: Transporter;

	constructor() {
		this.worker = new BullMQWorkerAdapter("email");

		this.transporter = createTransport({
			host: process.env.SMTP_HOST,
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
	}

	private async handleEmailJob(data: EmailData): Promise<void> {
		try {
			console.log(`Processing email job for: ${data.to}`);

			await new Promise((resolve) => setTimeout(resolve, 10000));

			const mailOptions = {
				from: process.env.SMTP_FROM || process.env.SMTP_USER,
				to: data.to,
				subject: data.subject,
				html: data.body,
			};

			const info = await this.transporter.sendMail(mailOptions);
			console.log(`Email sent successfully: ${info.messageId}, to: ${data.to}`);
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
