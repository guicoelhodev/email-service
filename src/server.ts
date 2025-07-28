import "dotenv/config";
import { ExpressAdapter } from "./adapters/http/ExpressAdapter";
import { Routes } from "./routes";

async function server() {
  const port = Number(process.env.PORT) || 3000;
  const express = new ExpressAdapter();
  await express.start(port);

  new Routes(express).setup();

  process.on("SIGTERM", async () => {
    await express.stop();
  });
}

server().catch(console.error);
