import { EmailData } from "../models/Email";

export interface EmailProvider {
  sendEmail(emailData: EmailData): Promise<{ messageId: string}>;
}
