import 'dotenv/config';
import { test } from "./test/test";

console.log(`Hello docker-compose, running on ${process.env.PORT}`);

test();
