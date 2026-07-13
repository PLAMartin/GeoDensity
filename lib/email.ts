import { Resend } from "resend";

export async function sendWaitlistConfirmationEmail(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  // DEV-ONLY FALLBACK — remove once RESEND_API_KEY / RESEND_FROM_EMAIL are configured.
  if (!apiKey || !fromEmail) {
    console.log("[dev-fallback] would send confirmation email to", email);
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "You're on the Geodensity waitlist",
    text: "Thanks for joining the Geodensity waitlist. We'll email you when there is something useful to try.",
  });
}
