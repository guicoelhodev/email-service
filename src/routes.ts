import { HttpService } from "./core/ports/HttpService";

export class Routes {
  constructor(private httpService: HttpService) {}

  setup() {
    this.httpService.addRoute("GET", "/", async () => {
      return {
        statusCode: 200,
        body: {
          message: "Hello world",
        },
      };
    });
  }
}
