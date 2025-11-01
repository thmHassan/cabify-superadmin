# ✅ Production API Issue - Quick Checklist

Print this out or keep it handy while debugging!

---

## 🎯 Step 1: Access Debug Tools (2 minutes)

### Option A: Use Debug Page
- [ ] Go to: `https://admin.cabifyit.com/debug.html`
- [ ] Click "Run Full Diagnostics"
- [ ] Take screenshot of results

### Option B: Use Browser Console  
- [ ] Go to: `https://admin.cabifyit.com/overview`
- [ ] Press `F12` to open DevTools
- [ ] Click "Console" tab
- [ ] Type: `window.debugApi.diagnostics()`
- [ ] Press Enter
- [ ] Take screenshot of output

---

## 🔍 Step 2: Identify the Issue (5 minutes)

Check Console for these messages:

### ❌ CORS Error?
```
blocked by CORS policy: No 'Access-Control-Allow-Origin' header
```
- [ ] Yes → Go to **Solution A**
- [ ] No → Continue

### ❌ Network Error?
```
❌ Network Error: No response received
Failed to fetch
```
- [ ] Yes → Go to **Solution B**
- [ ] No → Continue

### ⚠️ No Token Warning?
```
⚠️ No access token found
```
- [ ] Yes → Go to **Solution C**
- [ ] No → Continue

### 🔴 401/403 Error?
```
❌ API Error: 401 or 403
```
- [ ] Yes → Go to **Solution D**
- [ ] No → Continue

### ❓ No Errors But No Requests?
- [ ] Yes → Go to **Solution E**

---

## 🛠️ Solutions

### Solution A: CORS Issue
**The Problem:** Backend not configured for production domain

**Quick Test:**
```javascript
// In console:
fetch('https://backend.cabifyit.com/api', {method: 'OPTIONS'})
  .then(r => console.log('CORS OK'))
  .catch(e => console.error('CORS BLOCKED'))
```

**Action Required:**
- [ ] Contact backend team
- [ ] Share this message:
  ```
  Please whitelist: https://admin.cabifyit.com
  Add CORS header: Access-Control-Allow-Origin: https://admin.cabifyit.com
  ```
- [ ] Wait for backend deployment
- [ ] Test again

**Timeline:** Depends on backend team (usually 15-30 minutes)

---

### Solution B: Network/Connectivity Issue
**The Problem:** Can't reach backend server

**Quick Tests:**
```bash
# Test 1: Is backend reachable?
curl -I https://backend.cabifyit.com/api

# Test 2: DNS working?
nslookup backend.cabifyit.com
```

**Checklist:**
- [ ] Is backend server running?
- [ ] Is backend accessible publicly?
- [ ] Is SSL certificate valid?
- [ ] Any firewall blocking?
- [ ] Try from different network (mobile hotspot)

**Action Required:**
- [ ] Check with backend/DevOps team
- [ ] Verify server status
- [ ] Check deployment logs

**Timeline:** Depends on issue (5 minutes to hours)

---

### Solution C: No Authentication Token
**The Problem:** Not logged in or token cleared

**Quick Check:**
```javascript
// In console:
localStorage.getItem('admin_token')
// Should return a long string, not null
```

**Action Required:**
- [ ] Clear storage:
  ```javascript
  localStorage.clear()
  ```
- [ ] Reload page
- [ ] Log in again
- [ ] Navigate to `/overview`
- [ ] Check if APIs work now

**Timeline:** 2-3 minutes

---

### Solution D: Authentication Failed (401/403)
**The Problem:** Token invalid or expired

**Quick Fix:**
```javascript
// Clear everything and re-login
localStorage.clear()
sessionStorage.clear()
location.reload()
```

**Checklist:**
- [ ] Token might be expired
- [ ] Token format might be wrong
- [ ] Backend auth might have changed
- [ ] Try logging in again
- [ ] If still fails, check with backend team

**Timeline:** 3-5 minutes

---

### Solution E: No Requests Appearing
**The Problem:** JavaScript not executing or component not mounting

**Quick Checks:**
- [ ] Any red errors in Console?
- [ ] Is page fully loaded?
- [ ] Try hard refresh: `Ctrl+Shift+R`
- [ ] Try incognito/private mode
- [ ] Try different browser

**Debug:**
```javascript
// Check if React is loaded:
window.React

// Check if component exists:
document.querySelector('#root')

// Check for errors:
console.log('Check above for any errors')
```

**Action Required:**
- [ ] Screenshot console errors
- [ ] Check for JavaScript errors
- [ ] Verify build was successful
- [ ] Check deployment logs

**Timeline:** 10-30 minutes

---

## 📋 Information to Collect

Before asking for help, gather:

### From Browser Console:
```javascript
// Copy output of this:
window.debugApi.diagnostics()
```

### From Network Tab:
- [ ] Screenshot of Network tab
- [ ] Any requests to `backend.cabifyit.com`?
- [ ] What status codes?
- [ ] Any failed requests?

### From Console Tab:
- [ ] Any red error messages?
- [ ] Any yellow warnings?
- [ ] Screenshot all errors

### Environment Info:
- [ ] Browser: _______________
- [ ] Version: _______________
- [ ] OS: _______________
- [ ] Network: (Home/Office/Mobile)

### Test Results:
```javascript
// Has token?
localStorage.getItem('admin_token') !== null  // true/false?

// API base URL?
// (check in diagnostics output)

// Is authenticated?
// (check in diagnostics output)
```

---

## 🎯 Most Likely Solutions (in order)

Based on similar issues, try these in order:

### 1. CORS (80% of cases)
- [ ] Backend needs to whitelist production domain
- [ ] Contact backend team with domain: `https://admin.cabifyit.com`

### 2. Authentication (15% of cases)  
- [ ] Clear storage and re-login
- [ ] Check token exists: `localStorage.getItem('admin_token')`

### 3. Backend Down (3% of cases)
- [ ] Test: `curl https://backend.cabifyit.com/api`
- [ ] Check with backend team

### 4. Build/Deploy Issue (2% of cases)
- [ ] Verify build succeeded
- [ ] Check for console errors
- [ ] Try clearing CDN cache

---

## ⚡ Quick Commands Reference

Copy-paste these into browser console:

### Check Status
```javascript
window.debugApi.status()
```

### Test CORS
```javascript
window.debugApi.cors()
```

### Test API
```javascript
window.debugApi.test('/super-admin/company-cards')
```

### Full Diagnostics
```javascript
window.debugApi.diagnostics()
```

### Check Token
```javascript
console.log('Token:', !!localStorage.getItem('admin_token'))
```

### Clear & Reload
```javascript
localStorage.clear(); location.reload()
```

---

## 📞 Who to Contact

### For CORS Issues:
→ **Backend Team** - They need to add CORS headers

### For Authentication Issues:
→ **Try fixing yourself first** (clear storage, re-login)
→ If still fails: **Backend Team** (auth service)

### For Network Issues:
→ **DevOps Team** - Server/network configuration

### For Frontend Errors:
→ **Frontend Team** - JavaScript errors, build issues

---

## ⏱️ Expected Resolution Times

| Issue | Expected Time | Who |
|-------|--------------|-----|
| CORS configuration | 15-30 min | Backend |
| Re-authentication | 2-3 min | Self |
| Backend deployment | 30-60 min | Backend/DevOps |
| Frontend rebuild | 10-15 min | Frontend |
| DNS/Network | Varies | DevOps |

---

## ✅ Success Criteria

You'll know it's working when:

- [ ] No errors in console
- [ ] Network tab shows requests to `backend.cabifyit.com`
- [ ] Requests have status `200` (green)
- [ ] Data loads on the page
- [ ] `window.debugApi.diagnostics()` shows all green ✅

---

## 📝 Notes Section

Use this space to write down what you find:

**Console Errors:**
_______________________________________
_______________________________________

**Network Tab:**
_______________________________________
_______________________________________

**Tests Tried:**
_______________________________________
_______________________________________

**Next Steps:**
_______________________________________
_______________________________________

**Contacted:**
_______________________________________
_______________________________________

