export interface JobProcessor {
  start(): Promise<void>;
  stop(): Promise<void>;
  process(jobName: string, handler: JobHandler): void;
}

export interface JobHandler {
  (data: any): Promise<any>;
}
