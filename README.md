# Lead Capture System

🎯 **Zero-cost lead capture system** using GitHub Issues as a database.

Every form submission creates a GitHub Issue, and GitHub automatically sends email notifications. No external database, no monthly costs.

## Features

- ✅ Next.js 13+ with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ GitHub Issues as database
- ✅ Automatic email notifications via GitHub
- ✅ Production-ready error handling
- ✅ Zero external dependencies for backend
- ✅ 100% free to run

## Architecture

```
User fills form → POST /api/contact → GitHub API → Creates Issue → GitHub sends email
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/omega-suite-finance/lead-capture-system.git
cd lead-capture-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure GitHub

#### Create a GitHub Personal Access Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a name: `Lead Capture System`
4. Select scope: **`repo`** (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)

#### Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your values:

```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO=your-username/your-repo-name
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the contact form.

### 5. Test with curl

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "ACME Corp",
    "message": "I am interested in your services."
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Your message has been received. We'll get back to you soon!",
  "issueUrl": "https://github.com/owner/repo/issues/1"
}
```

### 6. Configure GitHub notifications

Make sure you receive email notifications for new Issues:

1. Go to [GitHub Settings → Notifications](https://github.com/settings/notifications)
2. Under **"Participating"**, enable **"Email"**
3. You'll now receive emails when new Issues are created

## API Endpoints

### `POST /api/contact`

Creates a new lead in GitHub Issues.

**Request body:**

```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "company": "string (optional)",
  "message": "string (required)"
}
```

**Success response (201):**

```json
{
  "success": true,
  "message": "Your message has been received. We'll get back to you soon!",
  "issueUrl": "https://github.com/owner/repo/issues/123"
}
```

**Error response (400/500):**

```json
{
  "error": "Error message describing what went wrong"
}
```

## GitHub Issue Format

Each submission creates an Issue with:

**Title:** `🎯 Lead: John Doe (ACME Corp)`

**Body:**

```markdown
## Lead Information

| Field | Value |
|-------|-------|
| **Name** | John Doe |
| **Email** | john@example.com |
| **Company** | ACME Corp |
| **Submitted** | 2024-01-15T10:30:00.000Z |

## Message

I am interested in your services.

---

*This issue was automatically created by the Lead Capture System*
```

**Labels:** `lead`, `contact-form`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `GITHUB_TOKEN`
   - `GITHUB_REPO`
4. Deploy!

### Environment Variables (Production)

In your hosting platform (Vercel, Netlify, etc.), set:

- `GITHUB_TOKEN`: Your GitHub Personal Access Token
- `GITHUB_REPO`: Format `owner/repo-name`

## Security Notes

- ⚠️ **Never commit `.env.local` or `.env`** to version control
- ✅ The `.env.example` file is safe to commit (contains no secrets)
- ✅ GitHub token has minimal permissions (only `repo` scope)
- ✅ API route validates all inputs before processing
- ✅ Email validation prevents invalid submissions

## Cost Analysis

| Service | Cost |
|---------|------|
| GitHub (private repo) | **$0** (free tier) |
| GitHub Issues | **$0** (unlimited) |
| GitHub email notifications | **$0** (built-in) |
| Vercel hosting | **$0** (hobby tier) |
| **Total** | **$0/month** |

## Customization

### Change form fields

Edit `src/app/page.tsx` to add/remove fields.

### Change Issue format

Edit `src/app/api/contact/route.ts` to customize the Issue title, body, or labels.

### Add more labels

In `src/app/api/contact/route.ts`, modify the `labels` array:

```typescript
labels: ['lead', 'contact-form', 'high-priority'],
```

## Troubleshooting

### "Server configuration error"

- Check that `.env.local` exists and has correct values
- Verify `GITHUB_TOKEN` is set correctly
- Verify `GITHUB_REPO` format is `owner/repo-name`

### "Failed to create GitHub Issue"

- Check that your GitHub token has `repo` permission
- Verify the repository name is correct
- Check GitHub API status: https://www.githubstatus.com/

### Form submission fails silently

- Open browser console to see error messages
- Check Network tab for API response
- Verify API route is running at `/api/contact`

## License

MIT

## Repository

https://github.com/omega-suite-finance/lead-capture-system
