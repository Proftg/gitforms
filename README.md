# Journal des Migraines - GitForms

Un formulaire simple pour enregistrer tes crises de migraines, automatiquement stockées dans GitHub Issues.

---

## Configuration

Les variables d'environnement sont dans `.env.local` :

```bash
GITHUB_TOKEN=ghp_xxxxx
GITHUB_REPO=Proftg/migraines-journal
NEXT_PUBLIC_DEFAULT_LOCALE=fr
```

---

## Lancer en local

```bash
npm install
npm run dev
```

Accessible sur : http://localhost:3000

---

## Champs du formulaire

| Champ | Description |
|-------|-------------|
| Date | Date de la crise |
| Durée | Durée de la crise |
| Intensité | 1-10 |
| Localisation | Tempe, front, occiput... |
| Symptômes | Nausées, lumière, son... |
| Déclencheur | Sport, stress, alimentation... |
| Médicaments | Paracétamol, ibuprofène... |
| Notes | Observations supplémentaires |

---

## Accéder aux données

Les crises sont enregistrées dans GitHub Issues :
👉 https://github.com/Proftg/migraines-journal/issues

---

*Créé: 2026-02-11*
