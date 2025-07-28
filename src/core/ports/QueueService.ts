export interface QueueService {
	addJob(jobName: string, data: any): Promise<void>;
}
