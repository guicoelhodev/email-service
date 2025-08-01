import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";
import { Queue } from "bullmq";

import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

export class BullBoardAdapter {
	private serverAdapter: ExpressAdapter;

	constructor() {
		this.serverAdapter = new ExpressAdapter();
		this.serverAdapter.setBasePath("/admin/queues");
	}

	create(queues: Queue[]) {
		createBullBoard({
			queues: queues.map((i) => new BullMQAdapter(i)),
			serverAdapter: this.serverAdapter,
		});
	}

	getRouter() {
		return this.serverAdapter.getRouter();
	}
}
