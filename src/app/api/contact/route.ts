import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get GitHub credentials from environment variables
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const GITHUB_REPO = process.env.GITHUB_REPO

    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      console.error('Missing GitHub configuration')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Parse repo (format: owner/repo-name)
    const [owner, repo] = GITHUB_REPO.split('/')
    if (!owner || !repo) {
      console.error('Invalid GITHUB_REPO format. Expected: owner/repo-name')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Create GitHub Issue title
    const companyInfo = body.company ? ` (${body.company})` : ''
    const issueTitle = `🎯 Lead: ${body.name}${companyInfo}`

    // Create GitHub Issue body (formatted as markdown table)
    const issueBody = `## Lead Information

| Field | Value |
|-------|-------|
| **Name** | ${body.name} |
| **Email** | ${body.email} |
| **Company** | ${body.company || 'Not provided'} |
| **Submitted** | ${new Date().toISOString()} |

## Message

${body.message}

---

*This issue was automatically created by the Lead Capture System*
`

    // Create GitHub Issue via GitHub API
    const githubResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          title: issueTitle,
          body: issueBody,
          labels: ['lead', 'contact-form'],
        }),
      }
    )

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json()
      console.error('GitHub API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to create GitHub Issue. Please try again later.' },
        { status: 500 }
      )
    }

    const issueData = await githubResponse.json()

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We\'ll get back to you soon!',
        issueUrl: issueData.html_url,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
