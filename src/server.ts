import "dotenv/config";
import { EmailServer } from "./services/emailServer";

const emailServer = new EmailServer();
emailServer.start();
