import { NextRequest, NextResponse } from 'next/server'

interface MigraineFormData {
  title: string
  body: string
}

export async function POST(request: NextRequest) {
  try {
    const body: MigraineFormData = await request.json()

    // Validate required fields
    if (!body.title || !body.body) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      )
    }

    // Get GitHub config
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const GITHUB_REPO = process.env.GITHUB_REPO

    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      console.error('Missing GitHub configuration')
      return NextResponse.json(
        { error: 'Erreur de configuration. Contacte l\'admin.' },
        { status: 500 }
      )
    }

    const [owner, repo] = GITHUB_REPO.split('/')
    if (!owner || !repo) {
      console.error('Invalid GITHUB_REPO format')
      return NextResponse.json(
        { error: 'Erreur de configuration. Contacte l\'admin.' },
        { status: 500 }
      )
    }

    // Save to GitHub Issues (free database storage)
    const response = await fetch(
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
          title: body.title,
          body: body.body,
          labels: ['migraine'],
        }),
      }
    )

    if (!response.ok) {
      console.error('Failed to save migraine entry')
      const errorData = await response.json()
      console.error('GitHub error:', errorData)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement. Réessaie.' },
        { status: 500 }
      )
    }

    // Success
    return NextResponse.json(
      {
        success: true,
        message: 'Crise enregistrée avec succès !',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Erreur inattendue. Réessaie plus tard.' },
      { status: 500 }
    )
  }
}
