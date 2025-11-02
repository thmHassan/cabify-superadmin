# 🚨 Production API Debugging Guide

## Current Situation
- ✅ APIs work locally on `localhost:5173`
- ❌ APIs don't work on production `https://admin.cabifyit.com/overview`
- ❌ No API calls visible in Network tab on production

---

## 🔧 Debugging Steps

### Method 1: Use the Built-in Debug Page (EASIEST)

1. **Go to the debug page:**
   ```
   https://admin.cabifyit.com/debug.html
   ```

2. **Click "Run Full Diagnostics"**

3. **Review the results** - it will tell you exactly what's wrong

4. **Take a screenshot** of the results and share it

---

### Method 2: Use Browser Console

1. **Open production site:**
   ```
   https://admin.cabifyit.com/overview
   ```

2. **Open Developer Tools** (Press `F12`)

3. **Go to Console tab**

4. **Run diagnostics:**
   ```javascript
   window.debugApi.diagnostics()
   ```

5. **Wait for results and screenshot**

---

### Method 3: Manual Network Tab Check

#### Step 1: Open Network Tab
1. Press `F12` to open DevTools
2. Click on **"Network"** tab
3. Check the **"Preserve log"** checkbox
4. Make sure **"All"** filter is selected (not just XHR/Fetch)

#### Step 2: Clear and Reload
1. Click the 🚫 (clear) button in Network tab
2. Hard reload: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

#### Step 3: Check for Requests
Look for requests to `backend.cabifyit.com`

**Scenario A: No requests appear at all**
- ❌ This means JavaScript might not be running
- Check Console tab for red errors
- Possible causes:
  - JavaScript errors preventing code execution
  - No authentication token (not logged in)
  - Component not mounting

**Scenario B: Requests appear but fail**
- Check the status code and error message
- Common statuses:
  - `(failed)` or `(cancelled)` = CORS or network error
  - `401` or `403` = Authentication problem
  - `404` = Wrong URL
  - `500` = Backend server error

---

## 🔍 Common Issues & Solutions

### Issue 1: CORS Error

**Symptoms:**
```
Access to fetch at 'https://backend.cabifyit.com/api/...' from origin 
'https://admin.cabifyit.com' has been blocked by CORS policy
```

**Solution:**
Backend team needs to add CORS headers. Send them this:

```
Backend Team: Please whitelist our production domain

Domain to whitelist: https://admin.cabifyit.com

Required headers:
Access-Control-Allow-Origin: https://admin.cabifyit.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization, Accept
Access-Control-Allow-Credentials: true
```

**Backend Configuration Examples:**

For **Express.js**:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://admin.cabifyit.com', 'http://localhost:5173'],
  credentials: true
}));
```

For **Laravel** (config/cors.php):
```php
'allowed_origins' => [
    'https://admin.cabifyit.com',
    'http://localhost:5173'
],
```

---

### Issue 2: No API Calls in Network Tab

**Possible Causes:**

#### A. Not Logged In
```javascript
// Check in console:
localStorage.getItem('admin_token')
```
If this returns `null`, you need to log in.

#### B. JavaScript Error
- Check Console tab for red errors
- Common errors:
  - Import/module errors
  - Undefined variables
  - Syntax errors from build process

#### C. Component Not Mounting
- Page loads but React component doesn't mount
- Check for routing issues
- Check protected route logic

---

### Issue 3: Authentication Token Missing

**Symptoms:**
- Console shows: "⚠️ No access token found"
- 401/403 errors
- Redirected to login page

**Solution:**
```javascript
// Clear everything and re-login
localStorage.clear()
sessionStorage.clear()
// Then go to login page and authenticate
```

---

### Issue 4: Network Error / Failed to Fetch

**Symptoms:**
```
❌ Network Error: No response received
Failed to fetch
```

**Possible Causes:**
1. Backend server is down
2. CORS blocking
3. Firewall/network blocking
4. SSL certificate issues

**Test Backend Directly:**
```bash
curl -I https://backend.cabifyit.com/api/super-admin/company-cards

# Expected: HTTP/2 200 or 401 (if auth required)
# Problem: Connection refused, timeout, or no response
```

---

## 📊 Diagnostic Checklist

Run through this checklist and note the results:

### Environment Check
- [ ] Production URL loads: `https://admin.cabifyit.com/overview`
- [ ] No errors on page load (check Console)
- [ ] JavaScript is enabled
- [ ] No browser extensions blocking requests

### Authentication Check
```javascript
// Run in console:
localStorage.getItem('admin_token')
```
- [ ] Returns a value (not null)
- [ ] Value is a long string

### API Configuration Check
```javascript
// Run in console:
window.debugApi.status()
```
- [ ] Shows correct API base URL: `https://backend.cabifyit.com/api`
- [ ] Shows `isAuthenticated: true`
- [ ] Shows `hasToken: true`

### Network Check
- [ ] Network tab shows requests to backend
- [ ] Requests have status codes (not "failed")
- [ ] No CORS errors in console

### Backend Check
```bash
curl https://backend.cabifyit.com/api
```
- [ ] Returns a response (not connection error)
- [ ] Uses HTTPS (not HTTP)

---

## 🎯 Quick Tests

### Test 1: Can you reach the backend?
```bash
ping backend.cabifyit.com
curl -I https://backend.cabifyit.com
```

### Test 2: Is CORS configured?
```javascript
// In browser console on production:
fetch('https://backend.cabifyit.com/api', {method: 'OPTIONS'})
  .then(r => console.log('Status:', r.status, 'Headers:', [...r.headers]))
  .catch(e => console.error('Failed:', e))
```

### Test 3: Does the token exist and work?
```javascript
// In console:
const token = localStorage.getItem('admin_token');
console.log('Has token:', !!token);
console.log('Token length:', token?.length);
```

---

## 📸 What to Screenshot

If you need help, take screenshots of:

1. **Console tab** showing any errors
2. **Network tab** showing (or not showing) backend requests
3. **Output of** `window.debugApi.diagnostics()`
4. **localStorage** showing `admin_token` exists (first 20 chars only)

---

## 🚀 Action Items

### Immediate Actions:
1. ✅ Go to production site
2. ✅ Open DevTools (F12)
3. ✅ Run `window.debugApi.diagnostics()` in Console
4. ✅ Check Network tab for requests
5. ✅ Screenshot any errors

### If CORS Error:
1. ✅ Contact backend team
2. ✅ Ask them to whitelist `https://admin.cabifyit.com`
3. ✅ Provide CORS configuration examples (above)

### If No Token:
1. ✅ Log out completely
2. ✅ Clear browser data: `localStorage.clear()`
3. ✅ Log in again
4. ✅ Test API calls

### If Backend Unreachable:
1. ✅ Check if backend is running
2. ✅ Verify DNS: `nslookup backend.cabifyit.com`
3. ✅ Test connectivity: `curl https://backend.cabifyit.com/api`
4. ✅ Check firewall rules

---

## 💡 Pro Tips

1. **Always check Console first** - Most issues show errors there
2. **Use Incognito mode** - Rules out browser extensions/cache
3. **Test in different browser** - Rules out browser-specific issues
4. **Compare with local** - Run same diagnostics locally and compare
5. **Check timing** - Are you testing right after deployment? Might need time to propagate

---

## 🆘 Still Stuck?

Collect this information and share:

```javascript
// Run in production console:
const info = {
  url: window.location.href,
  hasToken: !!localStorage.getItem('admin_token'),
  apiBase: 'https://backend.cabifyit.com/api',
  diagnostics: window.debugApi ? 'available' : 'not loaded',
  errors: 'check console screenshot'
};
console.log(JSON.stringify(info, null, 2));
```

Plus:
- Screenshot of Console errors
- Screenshot of Network tab
- Screenshot of `window.debugApi.diagnostics()` output
- Browser name and version
- Any recent changes to backend or frontend

---

## 📞 Backend Team Contact Template

Use this when reaching out to backend team:

```
Subject: CORS Configuration Needed for Production Frontend

Hi Backend Team,

Our production frontend at https://admin.cabifyit.com cannot reach the API due to CORS.

Issue: API calls work locally (localhost:5173) but fail in production
Error: "blocked by CORS policy: No 'Access-Control-Allow-Origin' header"

Action Required:
Please add the following CORS configuration to allow requests from our production domain:

Domain to whitelist: https://admin.cabifyit.com

Required CORS headers:
- Access-Control-Allow-Origin: https://admin.cabifyit.com (or *)
- Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
- Access-Control-Allow-Headers: Content-Type, Authorization, Accept
- Access-Control-Allow-Credentials: true

Current domains that should be whitelisted:
- https://admin.cabifyit.com (production)
- http://localhost:5173 (development)

Please let me know once this is deployed so I can verify.

Thanks!
```

