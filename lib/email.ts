import nodemailer from 'nodemailer';
import * as React from 'react';
import { render } from '@react-email/render';
import { VerificationEmail } from '@/emails/VerificationEmail';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://pseudoengineer.dev'
      : 'http://localhost:3000';

  const verificationLink = `${baseUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  const html = await render(
    React.createElement(VerificationEmail, { verificationLink }),
  );

  return sendEmail({
    to: email,
    subject: 'Verify your pseudoEngineer account',
    html,
  });
}
