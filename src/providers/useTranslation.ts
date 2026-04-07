import { useCallback } from "react";
import { useTranslation as useI18NextTranslation } from "react-i18next";
import { useContext } from "react";
import { LocalizationContext } from "./LocalizationContext";

type TranslateOptions = {
  [key: string]: string | number | boolean | null | undefined;
};

interface UseTranslationReturn {
  translate: (key: string, options?: TranslateOptions) => string;
  translateWithoutPrefix: (key: string, options?: TranslateOptions) => string;
  changeLocale: (lng: string) => void;
  getLocale: () => string;
}

export const useTranslation = (keyPrefix?: string): UseTranslationReturn => {
  const { t, i18n } = useI18NextTranslation();
  const { changeLanguage, language } = useContext(LocalizationContext);

  // Prefix ile çeviri yapan fonksiyon
  const translate = useCallback(
    (key: string, options?: TranslateOptions): string => {
      const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;
      return t(fullKey, { ...options, returnObjects: false });
    },
    [t, keyPrefix]
  );

  // Prefix kullanmadan direkt çeviri yapan fonksiyon
  const translateWithoutPrefix = useCallback(
    (key: string, options?: TranslateOptions): string => {
      return t(key, { ...options, returnObjects: false });
    },
    [t]
  );

  // Dili değiştirme fonksiyonu
  const changeLocale = useCallback(
    (lng: string) => {
      changeLanguage(lng);
      i18n.changeLanguage(lng);
    },
    [changeLanguage, i18n]
  );

  // Şu anki dili alma
  const getLocale = useCallback(() => {
    return language || i18n.language;
  }, [language, i18n]);

  return { translate, translateWithoutPrefix, changeLocale, getLocale };
};
