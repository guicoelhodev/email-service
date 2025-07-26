import 'dotenv/config';
import { test } from "./test/test";

console.log(`Hello node server, running on ${process.env.PORT}`);

test();
