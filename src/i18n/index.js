import en from './en.json';
import hi from './hi.json';

const translations = { en, hi };

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
];

class I18nManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.listeners = [];
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.notifyListeners();
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  translate(key, defaultValue = key) {
    const keys = key.split('.');
    let value = translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return value || defaultValue;
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback());
  }
}

export const i18n = new I18nManager();

// React Hook
export const useTranslation = () => {
  const [, setLanguage] = React.useState(i18n.getCurrentLanguage());

  React.useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.getCurrentLanguage());
    };

    i18n.addListener(handleLanguageChange);
    return () => i18n.removeListener(handleLanguageChange);
  }, []);

  return {
    t: (key, defaultValue) => i18n.translate(key, defaultValue),
    currentLanguage: i18n.getCurrentLanguage(),
    setLanguage: (lang) => i18n.setLanguage(lang),
  };
};

export default i18n;
