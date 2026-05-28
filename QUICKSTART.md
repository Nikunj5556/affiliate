# 🚀 QUICK START GUIDE

## Get Up & Running in 5 Minutes

### Step 1: Open Credentials Setup (30 seconds)
1. Open `credentials.html` in your browser
2. You'll see a form for entering Supabase credentials

### Step 2: Get Supabase Credentials (2 minutes)
1. Go to https://supabase.com and sign in
2. Click your project or create a new one
3. Go to **Settings → API** (bottom left)
4. Copy these three values:
   - Project URL → paste in "Supabase URL" field
   - Public Anonymous Key → paste in "Anonymous Key" field
   - Service Role Key → paste in "Service Role Key" field

### Step 3: Save Credentials (1 minute)
1. Paste all three values in `credentials.html`
2. Click "Save & Configure"
3. You'll be redirected to the homepage

### Step 4: Test Registration (1-2 minutes)
1. Click "Apply as Affiliate" button
2. Fill in your details:
   - Name: Your name
   - Email: Your email
3. Click "Continue — Verify Email →"
4. Check browser console (press F12) and look for the OTP code
5. Enter the 6-digit code in the OTP field
6. Click "Verify OTP →"
7. Complete the remaining steps with your details and bank information
8. After success, click "Go to Your Dashboard"

---

## 📊 Dashboard Overview

Once logged in, you'll see:

### Left Sidebar Navigation
- 📊 Overview (main dashboard)
- 💰 Sales & Revenue (detailed sales history)
- 🔗 Affiliate Links (your unique links for products)
- 🎟 Coupons (create and manage discount codes)
- 💳 Payouts (request withdrawals)
- ⚙️ Profile (account settings)

### Top Right
- Your name and tier badge (🥈 Standard/🥇 Growth/💎 Elite)
- User avatar and logout button

---

## 💡 Key Features to Try

### 1. Check Your Affiliate Links
- Click "Affiliate Links" tab
- See your unique link for each product
- Format: `creatorstack.breakfastclub.co.in/PRODUCT_ID?ref=YOUR_ID`
- Click "Copy" to copy to clipboard

### 2. Create a Coupon
- Click "Coupons" tab
- Click "+ Create Coupon" button
- Fill in:
  - Code: `SAVE20` (for example)
  - Type: Percentage (% discount)
  - Amount: 10 (for 10% off)
  - Validity: Number of Sales
  - Value: 50 (valid for 50 sales)
- Click "Create Coupon"

### 3. Request Payout
- Click "Payouts" tab
- Click "Request Payout" button
- Enter amount (minimum ₹100)
- Click "Request Payout"
- Status will show as "pending" initially

### 4. View Your Stats
- On Overview tab, see:
  - Total Sales count
  - Revenue earned in ₹
  - Available balance
  - Active coupons
  - Recent sales (last 7 days)

---

## 🎯 Commission Rates

| Tier | Commission | How to Unlock | Features |
|------|-----------|----------------|----------|
| Standard | 20% | Starting | % coupons only (up to 20%) |
| Growth | 30% | 25 sales | % + fixed coupons (fixed up to ₹498) |
| Elite | 40% | 100 sales | % + fixed coupons + exclusive rewards |

**Rewards at 100+ monthly sales:**
- International trips 🌍
- Premium electronics 📱
- Exclusive accessories 🎒
- Monthly recognition 🏆

---

## 🐛 If Something Doesn't Work

### Credentials Won't Save
- Make sure you copied the FULL key (not truncated)
- Try refreshing the page
- Check if localStorage is enabled in your browser

### OTP Not Appearing
- **Important**: This app doesn't send real emails
- OTP appears in browser console (F12 → Console tab)
- The backend service will send the actual email
- For testing, copy the code from console

### Can't Login After Registration
- Make sure you used the same email for registration
- Try checking Supabase directly:
  - Go to Supabase dashboard
  - Go to "SQL Editor"
  - Run: `SELECT * FROM affiliates WHERE affiliate_email = 'your-email@example.com';`
  - Verify the record exists

### Dashboard Shows "Loading..."
- Make sure Supabase credentials are correct
- Check if products table has data in Supabase
- Try refreshing the page

---

## 📱 Mobile Testing

The portal is fully mobile-optimized. Test on your phone:
1. Open `affiliate.html` on mobile
2. Click "Apply as Affiliate"
3. Fill form (inputs should be easily readable)
4. After login, the sidebar becomes a hamburger menu
5. All features work on mobile

---

## 🔐 Important Notes

### For Development
- OTP codes are logged to browser console (F12)
- Credentials are stored in browser localStorage
- No data is sent to external servers

### For Production
- Set up a backend service to send real OTP emails
- Use environment variables instead of localStorage
- Enable Row Level Security (RLS) in Supabase
- Never expose Service Role Key in frontend code
- Use HTTPS always

---

## 📚 File Descriptions

| File | Purpose | Usage |
|------|---------|-------|
| `affiliate.html` | Homepage & signup | Open first |
| `dashboard.html` | Main dashboard | Auto-loads after login |
| `credentials.html` | Setup credentials | Run once to configure |
| `README.md` | Full documentation | Reference guide |
| `CONFIG.md` | Advanced config | For developers |

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] Supabase project created
- [ ] All tables created in Supabase
- [ ] Credentials configured in credentials.html
- [ ] Can register as new affiliate
- [ ] Can see OTP in console
- [ ] Can verify email with OTP
- [ ] Can complete registration
- [ ] Can login with email
- [ ] Dashboard loads with stats
- [ ] Can create a coupon
- [ ] Can view affiliate links
- [ ] Can see recent sales
- [ ] Can request payout
- [ ] Mobile navigation works
- [ ] All links work correctly

---

## 🎉 You're All Set!

Your affiliate portal is ready to go. Start by:

1. Creating some test products in Supabase Products table
2. Creating a test order to see the dashboard in action
3. Sharing the `affiliate.html` link with your affiliates
4. Monitoring their activity in the dashboard

---

**Questions?** Check README.md or CONFIG.md for detailed information.

**Need help?** Check the troubleshooting section above or your browser console (F12) for error messages.

---

**Happy affiliate marketing! 🚀**
