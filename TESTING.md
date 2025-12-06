# Testing Guide

Complete guide for testing the Lead Capture System.

## Prerequisites

Before testing, ensure you have:

1. ✅ Cloned the repository
2. ✅ Installed dependencies (`npm install`)
3. ✅ Created `.env.local` with valid GitHub credentials
4. ✅ Dev server running (`npm run dev`)

## Quick Setup

```bash
# Clone the repository
git clone https://github.com/omega-suite-finance/lead-capture-system.git
cd lead-capture-system

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Edit .env.local and add your GitHub token and repo
# GITHUB_TOKEN=ghp_your_token_here
# GITHUB_REPO=omega-suite-finance/lead-capture-system

# Start dev server
npm run dev
```

## Test 1: Valid Submission (All Fields)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "ACME Corp",
    "message": "I am interested in your services. Please contact me."
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Your message has been received. We'll get back to you soon!",
  "issueUrl": "https://github.com/omega-suite-finance/lead-capture-system/issues/1"
}
```

**Expected GitHub Issue:**
- Title: `🎯 Lead: John Doe (ACME Corp)`
- Labels: `lead`, `contact-form`
- Body: Formatted table with all information

---

## Test 2: Valid Submission (No Company)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Looking forward to hearing from you!"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Your message has been received. We'll get back to you soon!",
  "issueUrl": "https://github.com/omega-suite-finance/lead-capture-system/issues/2"
}
```

**Expected GitHub Issue:**
- Title: `🎯 Lead: Jane Smith`
- Company field: "Not provided"

---

## Test 3: Missing Required Field (Name)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "message": "This should fail"
  }'
```

**Expected Response (400):**
```json
{
  "error": "Missing required fields: name, email, and message are required"
}
```

---

## Test 4: Missing Required Field (Email)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "message": "This should fail"
  }'
```

**Expected Response (400):**
```json
{
  "error": "Missing required fields: name, email, and message are required"
}
```

---

## Test 5: Missing Required Field (Message)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

**Expected Response (400):**
```json
{
  "error": "Missing required fields: name, email, and message are required"
}
```

---

## Test 6: Invalid Email Format

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "message": "This should fail"
  }'
```

**Expected Response (400):**
```json
{
  "error": "Invalid email format"
}
```

---

## Test 7: Special Characters in Name

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "François O'\''Brien-Smith",
    "email": "francois@example.com",
    "company": "Société Générale",
    "message": "Testing with special characters: é, à, ñ, ü"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Your message has been received. We'll get back to you soon!",
  "issueUrl": "https://github.com/omega-suite-finance/lead-capture-system/issues/3"
}
```

---

## Test 8: Long Message

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Johnson",
    "email": "sarah@example.com",
    "company": "TechCorp Inc",
    "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }'
```

**Expected Response (201):**
Should handle long messages without issues.

---

## Test 9: Missing .env Configuration

Before running this test, temporarily rename `.env.local`:

```bash
mv .env.local .env.local.backup

curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This should fail"
  }'

# Restore .env.local
mv .env.local.backup .env.local
```

**Expected Response (500):**
```json
{
  "error": "Server configuration error. Please contact the administrator."
}
```

**Expected Console Log:**
```
Missing GitHub configuration
```

---

## Test 10: Invalid GitHub Token

Edit `.env.local` temporarily with an invalid token:

```bash
# In .env.local, set:
# GITHUB_TOKEN=ghp_invalid_token_123456

curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This should fail"
  }'

# Restore valid token after test
```

**Expected Response (500):**
```json
{
  "error": "Failed to create GitHub Issue. Please try again later."
}
```

---

## Browser Testing

### Test the UI:

1. Open http://localhost:3000
2. Fill out the form:
   - Name: Your Name
   - Email: your@email.com
   - Company: (optional)
   - Message: Test message
3. Click "Send Message"
4. Verify success message appears
5. Check GitHub Issues for new issue

### Test Error Display:

1. Fill form with invalid email: `not-an-email`
2. Submit form
3. Verify error message appears in red box

### Test Loading State:

1. Fill form with valid data
2. Submit and watch "Sending..." state
3. Verify button is disabled during submission

---

## GitHub Verification

After each successful test:

1. Go to https://github.com/omega-suite-finance/lead-capture-system/issues
2. Verify new issue was created
3. Check issue title format: `🎯 Lead: [Name] ([Company])`
4. Verify issue has labels: `lead`, `contact-form`
5. Check issue body has formatted table
6. Verify email notification was sent to your GitHub email

---

## Automated Test Script

Save this as `test-all.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:3000/api/contact"

echo "🧪 Testing Lead Capture System..."
echo ""

# Test 1: Valid submission
echo "Test 1: Valid submission with all fields"
curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","company":"ACME","message":"Test"}' | jq
echo ""

# Test 2: No company
echo "Test 2: Valid submission without company"
curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","message":"Test"}' | jq
echo ""

# Test 3: Missing name
echo "Test 3: Missing name (should fail)"
curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","message":"Test"}' | jq
echo ""

# Test 4: Invalid email
echo "Test 4: Invalid email (should fail)"
curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"not-an-email","message":"Test"}' | jq
echo ""

echo "✅ All tests completed!"
```

Make it executable:
```bash
chmod +x test-all.sh
./test-all.sh
```

---

## Performance Testing

Test multiple submissions:

```bash
# Send 10 submissions
for i in {1..10}; do
  curl -s -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Test User $i\",\"email\":\"test$i@example.com\",\"message\":\"Performance test #$i\"}"
  echo ""
done
```

Verify all 10 Issues were created in GitHub.

---

## Success Criteria

✅ All valid submissions create GitHub Issues  
✅ All validation errors return appropriate error messages  
✅ GitHub sends email notification for each new Issue  
✅ Form resets after successful submission  
✅ Loading state displays correctly  
✅ Error messages display in UI  
✅ Special characters handled correctly  
✅ Long messages don't break formatting  
✅ Configuration errors handled gracefully  

---

## Troubleshooting

### No email notifications?

Check GitHub notification settings:
https://github.com/settings/notifications

### Issues not creating?

1. Verify GitHub token has `repo` permission
2. Check token is not expired
3. Verify repository name is correct in `.env.local`
4. Check server console for error messages

### CORS errors in browser?

This shouldn't happen with Next.js API routes, but if it does:
- Make sure you're accessing `http://localhost:3000` (not `127.0.0.1`)
- Clear browser cache

---

**Ready to test!** 🚀
