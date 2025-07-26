import "dotenv/config";
import IORedis from "ioredis";

export class RedisClient {
	static instance: RedisClient;
	private redis!: IORedis;

	constructor() {
		if (RedisClient.instance) {
			return RedisClient.instance;
		}

		this.redis = new IORedis({
			host: process.env.REDIS_HOST,
			port: 6379,
		});

		this.redis.on("connect", () => {
			console.log("Connected to redis");
		});

		this.redis.on("error", (err) => {
			console.log("Redis connection error:", err);
		});

		RedisClient.instance = this;
	}

	public static getInstance(): RedisClient {
		if (!RedisClient.instance) {
			RedisClient.instance = new RedisClient();
		}

		return RedisClient.instance;
	}

	public getClient(): IORedis {
		return this.redis;
	}
}
