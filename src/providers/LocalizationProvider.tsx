import React, { useState, useEffect } from "react";
import i18n from "../localization/i18n";
import { LocalizationContext } from "./LocalizationContext";

const STORAGE_KEY = "app_language";

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || i18n.language || "en";
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem(STORAGE_KEY, lng);
  };

  return (
    <LocalizationContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};
