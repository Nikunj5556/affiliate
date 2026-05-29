// api/payouts/get-affiliate-payouts.js — Fetch affiliate payouts with RLS bypass
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
    const { affiliateId } = req.query;

    if (!affiliateId) {
      return res.status(400).json({ error: 'Missing affiliateId' });
    }

    const { data: payouts, error } = await supabase
      .from('affiliate_payout_request')
      .select('*')
      .eq('affiliate_id', affiliateId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, data: payouts });
  } catch (error) {
    console.error('Fetch payouts error:', error);
    res.status(500).json({ error: error.message });
  }
}
