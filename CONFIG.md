# CreatorStack Affiliate Portal - Configuration Guide

## Supabase Setup

### 1. Get Your Credentials
- Visit [supabase.com](https://supabase.com) and create a project
- Go to Project Settings → API → Copy your:
  - **SUPABASE_URL** (Project URL)
  - **SUPABASE_ANON_KEY** (Public Anonymous Key)
  - **SUPABASE_SERVICE_ROLE_KEY** (Service Role Key - keep this secret!)

### 2. Setup Instructions

#### Option A: Direct Configuration (Development)
Open `affiliate.html` in a text editor and find this line:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual credentials.

**⚠️ WARNING**: Never commit credentials to public repositories!

#### Option B: Environment Variables (Recommended)
Create a `config.json` file in the same directory as `affiliate.html`:

```json
{
  "SUPABASE_URL": "https://your-project.supabase.co",
  "SUPABASE_ANON_KEY": "your-anon-key-here"
}
```

Then add this before the HTML loads (in the `<head>` tag):
```html
<script>
  fetch('./config.json')
    .then(r => r.json())
    .then(d => window.ENV = d)
    .catch(() => console.warn('config.json not found'));
</script>
```

#### Option C: Server-Side Configuration
If you're using a backend server, set these as environment variables and inject them into the HTML.

---

## Database Schema

Run the provided SQL in your Supabase console to create all necessary tables and enums:

```sql
-- Enum Types
CREATE TYPE public.email_type AS ENUM ('product_delivery', 'product_delivery_resend', 'delivery');
CREATE TYPE public.discount_type AS ENUM ('fixed', 'percentage');
CREATE TYPE public.coupon_validity_time AS ENUM ('Number_of_sales', 'Number_of_days');
CREATE TYPE public.affiliate_payout_request_status AS ENUM ('pending', 'accepted', 'declined', 'processing', 'initiated');
CREATE TYPE public.affiliate_commission AS ENUM ('standard_partner_20%', 'growth_partner_30%', 'elite_partner_40%');
CREATE TYPE public.affiliate_best_role AS ENUM ('student', 'freelancer', 'self employed', 'social media creator', 'side hustler');

-- Tables (as per the provided schema)
-- [Copy all CREATE TABLE statements from your SQL file]
```

---

## Features Overview

### Affiliate Tiers & Commission Structure

| Tier | Commission | Sales Threshold | Coupon Types | Max Fixed Discount |
|------|-----------|-----------------|--------------|------------------|
| Standard | 20% | 0-24 | Percentage (up to 20%) | N/A |
| Growth | 30% | 25-99 | Percentage (up to 30%) + Fixed (up to ₹498) | ₹498 |
| Elite | 40% | 100+ | Percentage (up to 40%) + Fixed (up to ₹498) | ₹498 |

### Special Rewards
Affiliates with **100+ monthly sales** automatically qualify for:
- International trips (fully sponsored)
- Premium electronics & gadgets
- Exclusive accessories
- Monthly recognition

---

## Homepage Features

✅ Premium, elegant, light-themed design
✅ Affiliate tier information with commission breakdown
✅ How-it-works section (4-step onboarding process)
✅ Comprehensive FAQ section
✅ OTP-based email verification
✅ Mobile-responsive design
✅ Call-to-action sections
✅ Rewards program highlights

---

## Dashboard Features

### Overview Tab
- Total sales count
- Total revenue in ₹
- Available payout balance
- Active coupons count
- Recent sales (last 7 days)
- Rewards program information

### Sales & Revenue Tab
- Total sales count & average
- Total revenue & pending payouts
- Complete sales history with:
  - Date, Order ID, Product name
  - Customer info, Price
  - Coupon used indicator
  - Commission earned, Payment status

### Affiliate Links Tab
- Unique affiliate link for each product
- Format: `https://creatorstack.breakfastclub.co.in/PRODUCT_ID?ref=AFFILIATE_ID`
- One-click copy functionality

### Coupons Tab
- Create new coupons with:
  - Custom coupon code
  - Percentage or fixed discounts
  - Sales or days-based validity
- View all active coupons
- Track coupon usage
- Monitor best-performing coupons

### Payouts Tab
- Request payouts (minimum ₹100)
- View payout history
- Track payment status
- See all account balance information

### Profile Tab
- View account information
- Bank account details (secure display)
- Logout functionality

---

## OTP & Email Verification

### How It Works
1. User enters name & email
2. System creates OTP record in `affiliate_email_otp` table
3. Backend service sends email with 6-digit OTP (not handled by frontend)
4. User enters OTP in UI
5. System verifies OTP:
   - Checks if OTP matches
   - Verifies OTP hasn't expired (10-minute validity)
   - Marks OTP as used after successful verification
6. User proceeds to next registration step

### Database Fields
- `affiliate_email`: Email address
- `otp_code`: Auto-generated 6-digit code
- `is_used`: Boolean flag (false until verified)
- `expires_at`: 10-minute expiration from creation
- `email_sent`: Boolean tracking if email was sent
- `affiliate_name`: Name provided during signup

---

## Mobile Optimization

✅ Responsive grid layouts
✅ Mobile-friendly navigation (collapsible sidebar)
✅ Touch-friendly buttons and inputs
✅ Optimized typography for small screens
✅ Single-column layouts on mobile
✅ Proper viewport settings
✅ Readable font sizes on all devices

---

## Security Considerations

1. **Never expose service role key** in client-side code
2. **Enable RLS** (Row Level Security) on all tables:
   ```sql
   ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
   ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
   ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
   -- etc.
   ```

3. **Create RLS policies** to ensure:
   - Affiliates can only see their own data
   - OTP records are only readable by backend
   - Payout requests are affiliate-specific

4. **Validate inputs** on both frontend and backend
5. **Use HTTPS** in production
6. **Rate limit** OTP requests (prevent abuse)

---

## Troubleshooting

### OTP Not Inserting?
- ✓ Check Supabase credentials are correct
- ✓ Verify `affiliate_email_otp` table exists
- ✓ Check table has RLS enabled/policies configured
- ✓ Test with Supabase dashboard directly
- ✓ Check browser console for error messages

### Dashboard Not Loading?
- ✓ Verify localStorage has affiliate data: `localStorage.getItem('cs_affiliate')`
- ✓ Check Supabase connection
- ✓ Verify all table names match schema

### Links Not Working?
- ✓ Check affiliate ID is correct
- ✓ Verify products table is populated
- ✓ Test affiliate link format

---

## Support

For issues or questions:
1. Check browser console (F12 → Console tab) for error messages
2. Verify all Supabase configuration
3. Test with Supabase SQL editor directly
4. Check that all required tables exist
5. Verify column names match exactly (case-sensitive)

---

**Last Updated**: 2025-05-28
**Version**: 1.0
