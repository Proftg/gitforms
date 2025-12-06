# Landing Page Contact Form

**Form di contatto gratuito per la tua landing page** con email automatiche.

Ogni volta che qualcuno compila il form, ricevi un'email di notifica. Zero costi mensili, nessun database esterno da gestire.

## Caratteristiche

- ✅ **100% Configurabile senza codice** (JSON files)
- ✅ Email automatiche quando ricevi un contatto
- ✅ Multilingua (IT/EN) con auto-rilevamento browser
- ✅ Stile personalizzabile (colori, bordi, ombre)
- ✅ Testi personalizzabili (etichette, messaggi)
- ✅ Next.js 13+ con App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Completamente gratuito

## Come Funziona

```
Utente compila form → Dati salvati → Email automatica inviata
```

## Setup Rapido

```bash
# 1. Clona
git clone https://github.com/omega-suite-finance/lead-capture-system.git
cd lead-capture-system

# 2. Installa
npm install

# 3. Configura
cp .env.example .env.local
# Modifica .env.local con il tuo GITHUB_TOKEN e GITHUB_REPO

# 4. Avvia
npm run dev
```

Apri http://localhost:3000

## 🎨 Personalizzazione (ZERO Codice!)

### 1. Cambia Tutti i Colori

**File:** `config/theme.json`

```json
{
  "colors": {
    "primary": {
      "DEFAULT": "#10b981",  // Verde invece di blu
      "hover": "#059669",
      "ring": "#34d399"
    }
  }
}
```

**Altri colori popolari:**
- Viola: `#8b5cf6`, `#7c3aed`, `#a78bfa`
- Arancione: `#f97316`, `#ea580c`, `#fb923c`
- Rosa: `#ec4899`, `#db2777`, `#f472b6`

### 2. Cambia Tutti i Testi

**File:** `config/translations.json`

```json
{
  "it": {
    "title": "Richiedi Informazioni",  // Cambia "Contattaci"
    "fields": {
      "company": "Società"  // Cambia "Azienda" in "Società"
    },
    "buttons": {
      "submit": "Richiedi Contatto"  // Cambia bottone
    }
  }
}
```

### 3. Cambia la Lingua Default

**File:** `.env.local`

```env
NEXT_PUBLIC_DEFAULT_LOCALE=it   # Forza italiano
# oppure
NEXT_PUBLIC_DEFAULT_LOCALE=en   # Forza inglese
# oppure rimuovi per auto-detection
```

### 4. Aggiungi Nuova Lingua (es. Francese)

**File:** `config/translations.json`

```json
{
  "it": { ... },
  "en": { ... },
  "fr": {
    "title": "Contactez-nous",
    "subtitle": "Remplissez le formulaire...",
    "fields": {
      "firstName": "Prénom",
      "lastName": "Nom",
      "email": "Email",
      "company": "Entreprise",
      "message": "Message"
    }
  }
}
```

Poi aggiorna `src/app/translations.ts`:

```typescript
export type Locale = 'it' | 'en' | 'fr'
```

## 📁 File di Configurazione

| File | Cosa Configuri |
|------|----------------|
| **`config/theme.json`** | Colori, bordi, ombre, stile |
| **`config/translations.json`** | TUTTI i testi (titolo, campi, messaggi, bottoni) |
| **`.env.local`** | Token GitHub, repo, lingua default |

**Modifica solo questi 3 file = personalizzazione completa!**

## Campi del Form

Tutti i campi sono **obbligatori**:
- Nome
- Cognome
- Email
- Azienda
- Messaggio

## Test

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Mario",
    "lastName": "Rossi",
    "email": "mario@example.com",
    "company": "ACME",
    "message": "Ciao"
  }'
```

## Deploy Vercel

1. Push su GitHub
2. Importa su [Vercel](https://vercel.com)
3. Aggiungi variabili:
   - `GITHUB_TOKEN`
   - `GITHUB_REPO`
   - `NEXT_PUBLIC_DEFAULT_LOCALE` (opzionale)
4. Deploy!

## Costi

| Servizio | Costo |
|----------|-------|
| GitHub | **€0** |
| Email | **€0** |
| Vercel | **€0** |
| **Totale** | **€0/mese** |

## Esempi Personalizzazione

### Landing Page Aziendale B2B
```json
// config/translations.json
{
  "it": {
    "title": "Richiedi una Demo",
    "subtitle": "Compila il form per una demo personalizzata",
    "buttons": { "submit": "Richiedi Demo" }
  }
}

// config/theme.json
{ "colors": { "primary": { "DEFAULT": "#1e3a8a" } } }  // Blu corporate
```

### Landing Page E-commerce
```json
// config/translations.json
{
  "it": {
    "title": "Hai Domande?",
    "fields": { "company": "Settore" },
    "buttons": { "submit": "Invia Richiesta" }
  }
}

// config/theme.json
{ "colors": { "primary": { "DEFAULT": "#dc2626" } } }  // Rosso vendita
```

## Licenza

MIT

## Repository

https://github.com/omega-suite-finance/lead-capture-system
