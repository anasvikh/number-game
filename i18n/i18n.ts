import { I18n } from 'i18n-js';
import { en, ru } from './supportedLanguages';
import { NativeModules } from 'react-native'

const locale = NativeModules.I18nManager.localeIdentifier;
const translations = { en, 'ru_RU': ru };
const i18n = new I18n(translations);

i18n.locale = locale;
i18n.enableFallback = true;

export default i18n;