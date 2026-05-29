// api/affiliates/check-email.js — Check if email is registered (with RLS bypass)
// Used during signup to prevent duplicate registrations.
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Missing email query parameter' });
    }

    const { data, error } = await supabase
      .from('affiliates')
      .select('id, is_email_verified')
      .eq('affiliate_email', email.toLowerCase().trim())
      .maybeSingle();

    if (error) throw error;

    res.status(200).json({
      exists: !!data,
      verified: data?.is_email_verified === true,
    });
  } catch (error) {
    console.error('Check email error:', error);
    res.status(500).json({ error: error.message });
  }
}
