import "dotenv/config";
import { ExpressAdapter } from "./adapters/driven/http/ExpressAdapter";
import { setupRoutes } from "./application/Routes";
import { BullBoardAdapter } from "./adapters/driven/dashboard/BuildBoardAdapter";
import { QueueRegistry } from "./shared/QueueRegistry";

async function server() {
	const port = Number(process.env.PORT) || 3000;
	const express = new ExpressAdapter();

	setupRoutes(express);

	// Setup dashboard
	const dashboard = new BullBoardAdapter();
	dashboard.create(QueueRegistry.getAll());

	express.use("/admin/queues", dashboard.getRouter());
	//
	await express.start(port);

	process.on("SIGTERM", async () => {
		await express.stop();
	});

	process.on("SIGINT", async () => {
		await express.stop();
	});
}

server().catch(console.error);
