import { createContext } from "react";

interface LocalizationContextType {
  language: string;
  changeLanguage: (lng: string) => void;
}

export const LocalizationContext = createContext<LocalizationContextType>({
  language: "en",
  changeLanguage: () => {},
});
