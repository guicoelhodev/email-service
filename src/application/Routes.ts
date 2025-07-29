import { HttpService } from "@/core/ports/HttpService";
import { SendEmailFactory } from "./factories/SendEmailFactory";

export function setupRoutes(httpService: HttpService) {
	const sendEmail = new SendEmailFactory().build();
	httpService.addRoute("GET", "/", async () => {
		return {
			statusCode: 200,
			body: {
				message: "Server works correctly",
				envs: [
					process.env.SMTP_HOST,
					process.env.SMTP_USER,
					process.env.SMTP_PASS,
					process.env.SMTP_FROM,
					process.env.PORT,
					process.env.REDIS_PORT,
					process.env.REDIS_HOST,
				],
			},
		};
	});

	httpService.addRoute("POST", "/send-email", sendEmail.handleSendEmail);
}
