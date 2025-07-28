import { RouteHandler } from "@/core/ports/HttpService";
import { EmailService } from "@/core/services/EmailService";
import z from "zod";

const sendEmailSchema = z.object({
  to: z.email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
});

export class EmailWebhookHandler {
  constructor(private emailService: EmailService) {}

  handleSendEmail: RouteHandler = async (request) => {
    try {
      const validatedData = sendEmailSchema.parse(request.body);
      const emailId = await this.emailService.sendEmail(validatedData);

      return {
        statusCode: 200,
        body: {
          message: "Email queued successfully",
          emailId,
        },
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            message: "Validation error",
            errors: error.issues.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          message: "Internal server error",
        },
      };
    }
  };
}
