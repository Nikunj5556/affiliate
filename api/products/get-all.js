// api/products/get-all.js — Fetch all products (with RLS bypass)
// Used by the dashboard to list all products with affiliate links.
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
    const { data: products, error } = await supabase
      .from('Products')
      .select('id, Product_name, Product_description, Product_price, Product_image_url, strikethrough_price')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, data: products || [] });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: error.message });
  }
}
