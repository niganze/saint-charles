import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_SERVICE,
  port: parseInt(process.env.MAILER_PORT!),
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  try {
    transporter
      .sendMail({
        from: `${process.env.MAILER_NAME}<${process.env.MAILER_USERNAME}>`,
        to,
        subject,
        html,
      })
      .then(() => {})
      .catch((error) => {
        console.error("Failed to send email:", error);
      });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}

export function generateRegistrationEmail(data: {
  name: string;
  email: string;
  phone: string;
  preferredCourse: string;
  preferredSchedule: string;
  additionalInfo?: string;
}) {
  return `
    <h2>New Registration Received</h2>
    <p>A new student has registered for a course:</p>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Preferred Course:</strong> ${data.preferredCourse}</li>
      <li><strong>Preferred Schedule:</strong> ${data.preferredSchedule}</li>
      ${
        data.additionalInfo
          ? `<li><strong>Additional Information:</strong> ${data.additionalInfo}</li>`
          : ""
      }
    </ul>
  `;
}

export function generateContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return `
    <h2>New Contact Inquiry</h2>
    <p>A new contact inquiry has been received:</p>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Message:</strong> ${data.message}</li>
    </ul>
  `;
}
