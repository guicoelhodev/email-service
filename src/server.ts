import "dotenv/config";
import { ExpressAdapter } from "./adapters/http/ExpressAdapter";
import { setupRoutes } from "./application/Routes";

async function server() {
  const port = Number(process.env.PORT) || 3000;
  const express = new ExpressAdapter();

  setupRoutes(express);

  await express.start(port);

  process.on("SIGTERM", async () => {
    await express.stop();
  });
}

server().catch(console.error);
