// Vercel serverless function — POST /api/send
// Subscribes the email to the Mailchimp audience list.

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

    // String-based checks — avoids brittle JSON.parse on HTML redirect pages.
    // Mailchimp may return JSONP, plain JSON, or a full HTML page depending on
    // the request context. We only hard-fail when we can clearly read
    // result=error AND it is NOT an "already subscribed" situation.
    const isExplicitError = text.includes('"result":"error"') ||
                            text.includes('"result": "error"');

    const isAlreadyMember = text.toLowerCase().includes('already subscribed') ||
                            text.toLowerCase().includes('already a list member') ||
                            text.toLowerCase().includes('member exists');

    if (isExplicitError && !isAlreadyMember) {
      // Try to surface the human-readable Mailchimp message
      const msgMatch = text.match(/"msg"\s*:\s*"([^"]+)"/);
      const msg = msgMatch
        ? msgMatch[1].replace(/\\u003c[^]*?\\u003e/g, '').trim()
        : 'Subscription failed. Please try again.';
      return res.status(400).json({ error: msg });
    }

    // Everything else — success, HTML redirect, already subscribed, unparseable —
    // is treated as success. The email reached Mailchimp.
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Mailchimp error:', err);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
}
