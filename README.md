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
- ✅ **Deploy ovunque** (Vercel, Netlify, Railway, Docker, AWS...)
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

## 🚀 Deploy Options

### 1. Vercel (Recommended) ⚡

**Più semplice per Next.js** - 2 click, zero configurazione.

```bash
# Installa Vercel CLI (opzionale)
npm i -g vercel

# Deploy
vercel
```

**Oppure via Dashboard:**
1. Push su GitHub
2. Importa su [vercel.com](https://vercel.com/new)
3. Aggiungi environment variables:
   - `GITHUB_TOKEN`
   - `GITHUB_REPO`
   - `NEXT_PUBLIC_DEFAULT_LOCALE` (opzionale)
4. Deploy automatico!

**Free Tier:** Illimitato per progetti personali

---

### 2. Netlify

**Ottima alternativa a Vercel** - 2 click, ottimo free tier.

1. Push su GitHub
2. Importa su [netlify.com](https://app.netlify.com/start)
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Environment variables:
   - `GITHUB_TOKEN`
   - `GITHUB_REPO`
   - `NEXT_PUBLIC_DEFAULT_LOCALE` (opzionale)
5. Deploy!

**Free Tier:** 100GB bandwidth/mese

---

### 3. Railway

**Deploy rapido con database inclusi** - 3 click, buon free tier.

1. Push su GitHub
2. Vai su [railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Aggiungi variabili d'ambiente (Dashboard → Variables)
5. Railway auto-rileva Next.js e deploya

**Free Tier:** $5 credit/mese (~500h runtime)

---

### 4. Render.com

**Alternative con free tier** - Auto-sleep dopo inattività.

1. Push su GitHub
2. New Web Service su [render.com](https://render.com)
3. Connect repository
4. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Environment variables:
   - `GITHUB_TOKEN`
   - `GITHUB_REPO`

**Free Tier:** Illimitato (con auto-sleep)

---

### 5. Docker / Self-Hosted 🐳

**Full control** - Deploy su qualsiasi VPS/cloud.

```bash
# Build
docker build -t lead-capture-system .

# Run
docker run -p 3000:3000 \
  -e GITHUB_TOKEN=your_token \
  -e GITHUB_REPO=your_repo \
  lead-capture-system
```

**Con Docker Compose:**

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - GITHUB_REPO=${GITHUB_REPO}
      - NEXT_PUBLIC_DEFAULT_LOCALE=it
    restart: unless-stopped
```

```bash
docker-compose up -d
```

**Costi:** VPS da €5/mese (DigitalOcean, Hetzner, Linode)

---

### 6. AWS Amplify

**Enterprise deployment** - Auto-scaling, CDN globale.

1. Push su GitHub
2. AWS Console → Amplify → New App
3. Connect repository
4. Build settings (auto-detected):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Environment variables:
   - `GITHUB_TOKEN`
   - `GITHUB_REPO`

**Free Tier:** 1000 build minuti/mese, 15GB storage

---

## 💰 Costi

| Piattaforma | Free Tier | Costo Paid |
|-------------|-----------|------------|
| **GitHub** (storage) | ✅ Illimitato | €0 |
| **GitHub** (email) | ✅ Illimitato | €0 |
| **Vercel** | ✅ Illimitato (personal) | €20/mese (team) |
| **Netlify** | ✅ 100GB bandwidth | €19/mese (pro) |
| **Railway** | ✅ $5 credit/mese | $5/mese per $5 usage |
| **Render.com** | ✅ Con auto-sleep | $7/mese (sempre attivo) |
| **Docker VPS** | ❌ | €5-20/mese |
| **AWS Amplify** | ✅ 1000 build min | Pay-as-you-go |

**Raccomandazione:** Vercel o Netlify per €0/mese garantito.

---

## 📦 Deployment Comparison

| Feature | Vercel | Netlify | Railway | Render | Docker |
|---------|--------|---------|---------|--------|--------|
| **Setup Time** | 2 min | 2 min | 3 min | 5 min | 10 min |
| **Free Tier** | ✅ Best | ✅ Good | ✅ Limited | ✅ Auto-sleep | ❌ |
| **Auto Deploy** | ✅ | ✅ | ✅ | ✅ | ❌ Manual |
| **Custom Domain** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **SSL/HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto | ✅ Auto | ⚙️ Manual |
| **Logs** | ✅ | ✅ | ✅ | ✅ | ⚙️ Manual |
| **Scaling** | ✅ Auto | ✅ Auto | ✅ Auto | ⚙️ Manual | ⚙️ Manual |

---

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
