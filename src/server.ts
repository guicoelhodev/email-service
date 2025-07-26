import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (_, response) => {
	console.log('Hello friend')
	response.status(200).send({ message: "Hello world" });
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
