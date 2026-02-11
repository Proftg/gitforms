'use client'

import { useState, FormEvent } from 'react'
import { useLanguage } from './useLanguage'

export default function Home() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: `Migraine - ${formData.get('date')}`,
      body: `
## Informations

- **Date:** ${formData.get('date')}
- **Durée:** ${formData.get('duree')}
- **Intensité:** ${formData.get('intensite')}/10
- **Localisation:** ${formData.get('localisation')}
- **Symptômes:** ${formData.get('symptomes')}
- **Déclencheur:** ${formData.get('declencheur')}
- **Médicaments:** ${formData.get('medicaments')}

## Notes
${formData.get('notes')}
      `.trim(),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setSuccess(true)
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-background-page">
      <div className="max-w-md w-full bg-background-main rounded-card shadow-card p-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {t.title}
        </h1>
        <p className="text-text-secondary mb-6">
          {t.subtitle}
        </p>

        {success && (
          <div className="mb-6 p-4 bg-success-bg border border-success-border rounded-input">
            <p className="text-success-text font-medium">
              ✓ {t.messages.success}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-error-bg border border-error-border rounded-input">
            <p className="text-error-text font-medium">
              ✗ {t.messages.error}: {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text-label mb-1">
              {t.fields.date} {t.required}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="w-full px-4 py-2 border border-border rounded-input focus:ring-2 focus:ring-primary-ring focus:border-transparent text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="duree" className="block text-sm font-medium text-text-label mb-1">
              {t.fields.duree} {t.required}
            </label>
            <input
              type="text"
              id="duree"
              name="duree"
              required
              placeholder={t.placeholders.duree}
              className="w-full px-4 py-2 border border-border rounded-input focus:ring-2 focus:ring-primary-ring focus:border-transparent text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="intensite" className="block text-sm font-medium text-text-label mb-1">
              {t.fields.intensite} {t.required}
            </label>
            <input
              type="number"
              id="intensite"
              name="intensite"
              min="1"
              max="10"
              required
              placeholder="1-10"
              className="w-full px-4 py-2 border border-border rounded-input focus:ring-2 focus:ring-primary-ring focus:border-transparent text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="localisation" className="block text-sm font-medium text-text-label mb-1">
              {t.fields.localisation} {t.required}
            </label>
            <input
              type="text"
              id="localisation"
              name="localisation"
              required
              placeholder={t.placeholders.localisation}
              className="w-full px-4 py-2 border border-border rounded-input focus:ring-2 focus:ring-primary-ring focus:border-transparent text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="symptomes" className="block text-sm font-medium text-text-label mb-1">
              {t.fields.symptomes} {t.required}
            </label>
            <input
              type="text"
              id="symptomes"
              name="symptomes"
              required
              placeholder={t.placeholders.symptomes}
              className="w-full px-4 py-2 border border-border rounded-input focus:ring-2 focus:ring-primary-ring focus:border-transparent text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="declencheur" className="block text-sm font-medium text-text-label mb-1">
              {t.fields.declencheur} {t.required}
            </label>
            <input
              type="text"
              id="declencheur"
              name="declencheur"
              required
              placeholder={t.placeholders.declencheur}
              className="w-full px-4 py-2 border border-border rounded-input focus:ring-2 focus:ring-primary-ring focus:border-transparent text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="medicaments" className="block text-sm font-medium text-text-label mb-1">
              {t.fields.medicaments} {t.required}
            </label>
            <input
              type="text"
              id="medicaments"
              name="medicaments"
              required
              placeholder={t.placeholders.medicaments}
              className="w-full px-4 py-2 border border-border rounded-input focus:ring-2 focus:ring-primary-ring focus:border-transparent text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-text-label mb-1">
              {t.fields.notes}
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder={t.placeholders.notes}
              className="w-full px-4 py-2 border border-border rounded-input focus:ring-2 focus:ring-primary-ring focus:border-transparent text-text-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 px-6 rounded-button font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t.buttons.submitting : t.buttons.submit}
          </button>
        </form>
      </div>
    </main>
  )
}
