// api/orders/get-affiliate-sales.js — Fetch affiliate sales with RLS bypass
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

    // Fetch orders for affiliate
    const { data: orders, error } = await supabase
      .from('Orders')
      .select(`
        id,
        created_at,
        Order_number,
        Product,
        Customer_name,
        Razorpay_payment_id,
        Is_paid,
        Customer_email,
        coupon_used,
        affiliate_id,
        Products(Product_name, Product_price, Product_image_url)
      `)
      .eq('affiliate_id', affiliateId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Fetch sales error:', error);
    res.status(500).json({ error: error.message });
  }
}
