import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // backend ile public dosyalarını yükle
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    backend: {
      loadPath: "/locales/{{lng}}/common.json",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
