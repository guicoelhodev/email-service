import { EmailData } from "@/core/models/Email";
import { EmailProvider } from "@/core/ports/EmailProvider";
import { createTransport, Transporter } from "nodemailer";

export class NodemailerAdapter implements EmailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(emailData: EmailData) {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.body,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log(
      `Email sent successfully: ${info.messageId}, to: ${emailData.to}`,
    );

    return { messageId: info.messageId };
  }
}
