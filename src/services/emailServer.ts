import express, { Application, Request, Response } from "express";
import { emailQueue } from "../queues/EmailQueue";
import serverAdapter from "../services/dashboard";

interface EmailRequestBody {
	name: string;
	age: number;
}

export class EmailServer {
	private app: Application;
	private port: number;

	constructor() {
		this.app = express();
		this.port = Number(process.env.PORT) || 3000;
		this.initializeMiddleware();
		this.initializeRoutes();
	}

	private initializeMiddleware(): void {
		this.app.use(express.json());
		this.app.use("/admin/queues", serverAdapter.getRouter());
	}

	private initializeRoutes(): void {
		this.app.get("/", this.handleHealthCheck);
		this.app.post("/send-email", this.handleSendEmail);
	}

	private handleHealthCheck = (_: Request, response: Response): void => {
		response.status(200).send({ message: "Hello world 1" });
	};

	private handleSendEmail = async (
		request: Request<{}, {}, EmailRequestBody>,
		response: Response,
	): Promise<void> => {
		const { name, age } = request.body;

		if (!name || !age) {
			response.status(400).json({
				message: "Body should have { name: string; age: number }",
			});
			return;
		}

		try {
			await emailQueue.addJob({ name, age });

			response.status(200).json({
				message: "Email has been added on queue",
			});
		} catch (error) {
			console.error("Error adding email to queue:", error);
			response.status(500).json({
				message: "Internal server error",
			});
		}
	};

	public start(): void {
		this.app.listen(this.port, () => {
			console.log(`Server is running on ${this.port}`);
		});
	}

	public getApp(): Application {
		return this.app;
	}
}
