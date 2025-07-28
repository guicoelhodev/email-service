import { Queue } from "bullmq";

export class QueueRegistry {
	private static queues: Map<string, Queue> = new Map();

	static register(name: string, queue: Queue): void {
		this.queues.set(name, queue);
	}

	static getAll(): Queue[] {
		return Array.from(this.queues.values());
	}

	static getAllNames(): string[] {
		return Array.from(this.queues.keys());
	}
}
