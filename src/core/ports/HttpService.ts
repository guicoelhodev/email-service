type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface HttpService {
  start(port: number): Promise<void>;
  stop(): Promise<void>;
  addRoute(method: HttpMethod, path: string, handler: RouteHandler): void;
}

export interface RouteHandler {
  (request: HttpRequest): Promise<HttpResponse>;
}

export interface HttpRequest {
  body: any;
  params: Record<string, string>;
  query: Record<string, string>;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
