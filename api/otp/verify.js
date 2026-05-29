// api/otp/verify.js — Backend OTP verification with RLS bypass
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
    const { otp_id, otp_code } = req.body;

    if (!otp_id || !otp_code) {
      return res.status(400).json({ error: 'Missing otp_id or otp_code' });
    }

    // Fetch OTP record
    const { data: otp, error: selectError } = await supabase
      .from('affiliate_email_otp')
      .select('*')
      .eq('id', otp_id)
      .eq('is_used', false)
      .maybeSingle();

    if (selectError) throw selectError;
    if (!otp) {
      return res.status(404).json({ error: 'Invalid or expired OTP' });
    }

    // Check expiration
    if (new Date(otp.expires_at) < new Date()) {
      return res.status(410).json({ error: 'OTP has expired' });
    }

    // Verify code
    if (otp.otp_code !== otp_code) {
      return res.status(401).json({ error: 'Invalid OTP code' });
    }

    // Mark as used
    const { error: updateError } = await supabase
      .from('affiliate_email_otp')
      .update({ is_used: true })
      .eq('id', otp_id);

    if (updateError) throw updateError;

    res.status(200).json({ success: true, message: 'OTP verified' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: error.message });
  }
}
