// api/config.js — Vercel Serverless Function
// Reads SUPABASE_URL and SUPABASE_ANON_KEY from Vercel environment variables
// and returns them to the frontend. NEVER exposes SERVICE_ROLE_KEY.
export default function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(500).json({
      error: 'Supabase environment variables are not configured on this server.',
      hint: 'Set SUPABASE_URL and SUPABASE_ANON_KEY in your Vercel project settings.'
    });
  }

  // Cache for 5 minutes — credentials rarely change
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.status(200).json({ SUPABASE_URL: url, SUPABASE_ANON_KEY: key });
}
