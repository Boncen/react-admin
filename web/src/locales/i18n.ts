import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './lang/en_US'
import zh from './lang/zh_CN'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en_US: { translation: en },
      zh_CN: { translation: zh },
    },
    fallbackLng: 'en',
    debug: false,
    react: {
      useSuspense: true,
    },
    detection: {
      order: ['querystring', 'navigator', 'localStorage'],
      lookupQuerystring: 'lang',
    },
  })

export default i18n