import {
	HttpMethod,
	HttpRequest,
	HttpService,
	RouteHandler,
} from "@/core/ports/HttpService";

import express, { Application, json, Request, Response, Router } from "express";
import { Server } from "http";

export class ExpressAdapter implements HttpService {
	private app: Application;
	private server: Server | null;

	constructor() {
		this.app = express();
		this.app.use(json());
		this.server = null;
	}

	async start(port: number): Promise<void> {
		this.server = this.app.listen(port, () => {
			console.log(`Server running on:`, port);
		});
	}

	use(path: string, router: Router) {
		this.app.use(path, router);
	}

	async stop() {
		if (this.server) {
			console.log("Received SIGTERM, shutting down...");
			this.server.close();
		}
	}

	addRoute(method: HttpMethod, path: string, handler: RouteHandler) {
		async function expressHandler(req: Request, res: Response) {
			try {
				const httpRequest: HttpRequest = {
					body: req.body,
					params: req.params,
					query: req.query as Record<string, string>,
				};

				const httpResponse = await handler(httpRequest);

				res.status(httpResponse.statusCode).json(httpResponse.body);
			} catch (error) {
				console.error("Route handler error:", error);
				res.status(500).json({ message: "Internal server error" });
			}
		}

		switch (method) {
			case "GET":
				this.app.get(path, expressHandler);
				break;
			case "POST":
				this.app.post(path, expressHandler);
				break;
			case "PUT":
				this.app.put(path, expressHandler);
				break;
			case "DELETE":
				this.app.delete(path, expressHandler);
				break;
			case "PATCH":
				this.app.patch(path, expressHandler);
				break;
			default:
				throw new Error(`HTTP method ${method} not supported`);
		}
	}
}
