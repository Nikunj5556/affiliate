# 📋 FILE GUIDE & GETTING STARTED

## 📂 Your CreatorStack Affiliate Portal Files

### Core Application Files

#### 1. **affiliate.html** (Homepage & Signup)
- **What it does**: Landing page with signup and login functionality
- **When to use**: When affiliates first visit the portal
- **Key features**:
  - How-it-works tutorial
  - Commission tier information
  - FAQ section
  - Multi-step registration with OTP
  - Login with OTP
- **Open in browser**: Yes ✅

#### 2. **dashboard.html** (Main Dashboard)
- **What it does**: Complete affiliate dashboard with stats and management
- **When to use**: After affiliate logs in (auto-redirects from affiliate.html)
- **Key features**:
  - Sales tracking
  - Revenue display
  - Affiliate links
  - Coupon management
  - Payout requests
  - Profile settings
- **Open in browser**: Auto-loads after login ✅

#### 3. **credentials.html** (Supabase Configuration)
- **What it does**: UI for entering and saving Supabase credentials
- **When to use**: First time setup (5 minutes)
- **Key features**:
  - Easy credential entry form
  - Validation checks
  - Local storage saving
  - Load previous credentials
- **Open in browser**: Yes ✅

---

## 📚 Documentation Files

#### 1. **README.md** (Full Documentation)
- Complete feature list
- Setup instructions
- File structure
- API integration guide
- Mobile optimization details
- Troubleshooting section
- **Read this for**: Complete understanding of the system

#### 2. **CONFIG.md** (Configuration Guide)
- Supabase setup steps
- Database schema details
- Environment variable configuration
- Security considerations
- Deployment recommendations
- **Read this for**: Technical setup details

#### 3. **QUICKSTART.md** (5-Minute Setup)
- Step-by-step quick start
- Dashboard overview
- Key features to try
- Common issues & fixes
- **Read this for**: Get running immediately

#### 4. **IMPLEMENTATION_SUMMARY.md** (What's Included)
- Feature checklist (all ✅)
- What's been fixed
- Mobile optimization details
- Security implementation
- Database integration
- **Read this for**: Verify all requirements are met

#### 5. **FILE_GUIDE.md** (This File)
- Overview of all files
- Which file to use when
- Getting started steps
- **Read this for**: Navigation & orientation

---

## ⚙️ Configuration Files

#### 1. **config.example.json**
- Example configuration template
- Shows expected format:
  ```json
  {
    "SUPABASE_URL": "https://...",
    "SUPABASE_ANON_KEY": "...",
    "SUPABASE_SERVICE_ROLE_KEY": "..."
  }
  ```
- **Use**: Copy this format for config.json (optional)

---

## 🚀 Getting Started (3 Steps)

### Step 1: Configure Supabase (5 minutes)
```
1. Open credentials.html in your browser
2. Get credentials from supabase.com/dashboard
3. Enter URL and API keys
4. Click "Save & Configure"
```

### Step 2: Create Database Tables (5 minutes)
```
1. Go to your Supabase project
2. Open SQL Editor
3. Paste schema from CONFIG.md
4. Run the SQL
```

### Step 3: Test the System (5 minutes)
```
1. Open affiliate.html
2. Click "Apply as Affiliate"
3. Fill form, verify email with OTP
4. Complete registration
5. View your dashboard
```

---

## 📖 Reading Order (Recommended)

1. **Start Here**: QUICKSTART.md (5 min read)
   - Get your system running quickly
   - Basic understanding of workflow

2. **Next**: IMPLEMENTATION_SUMMARY.md (10 min read)
   - Verify all features are present
   - Understand what's been built

3. **For Setup**: CONFIG.md (15 min read)
   - Detailed configuration
   - Database schema
   - Security setup

4. **For Reference**: README.md (30 min read)
   - Complete feature documentation
   - Troubleshooting guide
   - API integration details

---

## 🎯 Quick Navigation

### "I want to..."

**...get the system running immediately**
→ Open `credentials.html` then `affiliate.html`

**...understand all features**
→ Read `IMPLEMENTATION_SUMMARY.md`

**...set up the database**
→ Go to `CONFIG.md` → Copy SQL → Run in Supabase

**...troubleshoot an issue**
→ Check `QUICKSTART.md` → "If Something Doesn't Work" section

**...understand the mobile version**
→ Open any file on your phone browser
→ Check `CONFIG.md` → "Mobile Optimization" section

**...deploy to production**
→ Read `README.md` → "Security Best Practices" section
→ Follow `CONFIG.md` → "Deployment Recommendations"

**...modify the design**
→ Edit `affiliate.html` or `dashboard.html`
→ CSS is in `<style>` tags at the top of each file

**...add more features**
→ Reference `CONFIG.md` for database schema
→ Follow existing code patterns in HTML files

---

## 🔍 File Breakdown

### JavaScript Functions by File

#### affiliate.html
- `openModal()` / `closeModal()` - Modal management
- `obStep1()` - Registration step 1 (name/email)
- `obVerifyOtp()` - Verify OTP code
- `obSubmit()` - Complete registration
- `loginSendOtp()` - Send login OTP
- `loginVerify()` - Verify login OTP
- `toggleFaq()` - FAQ accordion
- `getOtpValue()` - Get 6-digit OTP
- Various helper functions

#### dashboard.html
- `initDashboard()` - Initialize on page load
- `updateOverviewPage()` - Update overview stats
- `updateSalesPage()` - Update sales table
- `updateLinksPage()` - Show affiliate links
- `updateCouponsPage()` - Show coupons
- `updatePayoutsPage()` - Show payouts
- `updateProfilePage()` - Show profile info
- `createCoupon()` - Create new coupon
- `requestPayout()` - Request withdrawal
- `showPage()` - Switch between tabs
- `logout()` - Logout user

#### credentials.html
- `saveCredentials()` - Save Supabase credentials
- `loadCredentials()` - Load saved credentials
- `showError()` / `showSuccess()` - Display messages

---

## 🔐 Credentials & Storage

### How Credentials Are Stored

**localStorage Keys Used:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Anonymous API key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for backend)
- `cs_affiliate` - Current logged-in affiliate data
- `cs_affiliate_token` - Session token

### To Reset Credentials

Open browser console (F12) and run:
```javascript
localStorage.clear();
location.href = 'credentials.html';
```

---

## 📊 Database Tables Overview

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `affiliates` | Affiliate profiles | id, name, email, phone, commission, sales, revenue |
| `affiliate_email_otp` | OTP verification | email, otp_code, is_used, expires_at |
| `coupons` | Discount codes | code, discount_type, discount, affiliate_id |
| `orders` | Sales records | order_number, product_id, customer_name, affiliate_id |
| `products` | Product catalog | product_name, price, description, image_url |
| `affiliate_payout_request` | Withdrawal requests | affiliate_id, amount, status, payment_id |

---

## ⚡ Performance Tips

1. **For Fast Loading**:
   - All CSS & JS are embedded (single file)
   - No external dependencies except Supabase
   - Optimized animations with CSS only

2. **For Better UX**:
   - Lazy load images if adding more products
   - Paginate sales if showing 100+ records
   - Use Supabase indexes for frequently queried columns

3. **For Scaling**:
   - Consider using a CDN for static files
   - Implement API rate limiting
   - Cache product data locally

---

## 🛡️ Security Checklist

Before going live:

- [ ] Change all test data in database
- [ ] Enable Supabase Row Level Security (RLS)
- [ ] Use HTTPS in production
- [ ] Implement email backend for OTP delivery
- [ ] Implement payout backend service
- [ ] Set up error logging/monitoring
- [ ] Review and adjust commission rates
- [ ] Test with real payment processing
- [ ] Set up SSL certificate
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Add two-factor authentication (optional)

---

## 🎨 Customization Guide

### Change Colors
Edit in `affiliate.html` and `dashboard.html` in the `<style>` section:
```css
:root {
  --accent: #C8882E;        /* Orange/Gold */
  --primary: #1C1835;       /* Dark Purple */
  --success: #2A7A45;       /* Green */
  /* ... more colors */
}
```

### Change Typography
```css
font-family: 'Plus Jakarta Sans', sans-serif;     /* Body font */
font-family: 'Cormorant Garamond', serif;        /* Headings */
```

### Change Commission Rates
Search for commission calculation in `dashboard.html`:
```javascript
if(commission.includes('elite')) rate = 0.40;    // 40%
else if(commission.includes('growth')) rate = 0.30;  // 30%
else rate = 0.20;                                  // 20%
```

---

## 🆘 Help & Support

### Most Common Issues

1. **Credentials not saving** → Refresh page, check localStorage
2. **OTP not working** → Check browser console (F12), Supabase connection
3. **Dashboard not loading** → Verify affiliate record in Supabase
4. **Links not copying** → Check browser console, try manual copy
5. **Mobile menu not working** → Clear cache, hard refresh (Ctrl+Shift+R)

### Debug Tips

1. **Open Developer Console**: F12 → Console tab
2. **Check localStorage**: Type `localStorage` in console
3. **Check Supabase**: Go to supabase.com/dashboard → view tables directly
4. **Check Network**: F12 → Network tab → see API calls

---

## ✅ Pre-Launch Checklist

- [ ] Credentials configured in credentials.html
- [ ] Database tables created in Supabase
- [ ] Test affiliate registered successfully
- [ ] OTP verification working
- [ ] Dashboard displays correct data
- [ ] Affiliate links generate correctly
- [ ] Coupon creation working
- [ ] Commission rates verified
- [ ] Mobile view tested
- [ ] All links working
- [ ] Error messages clear
- [ ] Ready for affiliate signup

---

## 📞 Need Help?

1. **For Setup**: Read QUICKSTART.md
2. **For Technical Details**: Check CONFIG.md
3. **For All Features**: See IMPLEMENTATION_SUMMARY.md
4. **For Troubleshooting**: Check README.md
5. **For Errors**: Open F12 console and look for red error messages

---

**You're all set! Start with QUICKSTART.md or open credentials.html now. 🚀**
