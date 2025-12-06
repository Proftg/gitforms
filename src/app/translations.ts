import translationsData from '../../config/translations.json'

export type Locale = 'it' | 'en'

type Translations = typeof translationsData

export function getTranslations(locale: Locale) {
  return translationsData[locale] || translationsData.en
}
