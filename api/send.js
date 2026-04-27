// Vercel serverless function — POST /api/send
// Subscribes the email to the Mailchimp audience list.
// No API key needed — uses the public embedded-form endpoint.

const MC_U   = 'd82aa994b4119d6bb713e7774';
const MC_ID  = '7783dbc292';
const MC_URL = 'https://empiredom.us1.list-manage.com/subscribe/post-json';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const body = new URLSearchParams({
      u:     MC_U,
      id:    MC_ID,
      EMAIL: email,
    });

    const mcRes = await fetch(MC_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    body.toString(),
    });

    const text = await mcRes.text();

    // Mailchimp returns JSONP: jQuery12345({"result":"success","msg":"..."})
    // Extract the JSON object regardless of wrapper
    const match = text.match(/\{[\s\S]*\}/);
    const json  = match ? JSON.parse(match[0]) : null;

    if (json?.result === 'error') {
      // "already subscribed" is still a win — treat as success on the frontend
      const alreadySubscribed = json.msg?.toLowerCase().includes('already subscribed');
      if (alreadySubscribed) {
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ error: json.msg ?? 'Mailchimp rejected the request.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mailchimp error:', err);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
}
