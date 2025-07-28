import { WorkersManager } from "@/application/workers/WorkersManager";
import "dotenv/config";

const workersManager = new WorkersManager();

async function startWorkers() {
	try {
		await workersManager.start();
	} catch (error) {
		process.exit(1);
	}
}

process.on("SIGINT", async () => {
	console.log("Shutting down workers...");
	await workersManager.stop();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("Shutting down workers...");
	await workersManager.stop();
	process.exit(0);
});

startWorkers();
