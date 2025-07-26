import "dotenv/config";
import express from "express";
import { emailQueue } from "./queues/EmailQueue";
import serverAdapter from "./services/dashboard";

const app = express();

app.use(express.json());
app.use("/admin/queues", serverAdapter.getRouter());

const PORT = process.env.PORT || 3000;

app.get("/", (_, response) => {
	response.status(200).send({ message: "Hello world 1" });
});

app.post("/send-email", async (request, response) => {
	const { name, age } = request.body;

	if (!name || !age) {
		return response.status(400).json({
			message: "Body should have { name: string; age: number }",
		});
	}

	await emailQueue.addJob({ name, age });

	response.status(200).json({
		message: "Email has been added on queue",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
