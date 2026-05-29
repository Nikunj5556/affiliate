// api/payouts/request.js — Backend payout request with RLS bypass
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { affiliate_id, payout_amount_inr } = req.body;

    if (!affiliate_id || !payout_amount_inr) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (payout_amount_inr <= 0) {
      return res.status(400).json({ error: 'Invalid payout amount' });
    }

    const { data, error } = await supabase
      .from('affiliate_payout_request')
      .insert([{
        affiliate_id,
        payout_amount_inr,
        payout_status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Payout request error:', error);
    res.status(500).json({ error: error.message });
  }
}
