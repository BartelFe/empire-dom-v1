// Vercel serverless function — POST /api/send
// Requires RESEND_API_KEY in Vercel Environment Variables.
// "from" domain (empiredom.com) must be verified in the Resend dashboard.

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    await resend.emails.send({
      from: 'Empire Dom <noreply@empiredom.com>',
      to:   'office@empiredom.com',
      subject: '👑 New Waitlist Signup',
      html: `
        <div style="font-family:sans-serif;background:#141414;color:#d9dadb;padding:40px;max-width:480px;margin:auto;border:1px solid rgba(196,154,108,0.25);">
          <h2 style="color:#c49a6c;letter-spacing:0.15em;margin-bottom:8px;">NEW WAITLIST SIGNUP</h2>
          <p style="color:#d9dadb;margin:0 0 24px;">A new person has joined the Empire Dom waitlist.</p>
          <p style="background:#1e1e1e;border:1px solid rgba(196,154,108,0.2);padding:16px 20px;font-size:15px;letter-spacing:0.05em;color:#e8c290;">
            ${email}
          </p>
          <p style="color:#888;font-size:11px;margin-top:24px;letter-spacing:0.05em;">Empire Dom · empiredom.com</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send. Try again.' });
  }
}
