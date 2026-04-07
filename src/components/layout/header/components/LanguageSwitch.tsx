import React from "react";
import { useTranslation } from "../../../../providers/useTranslation";
import { IconButton, Avatar, useTheme } from "@mui/material";

// Görsellerin doğru yoldan import edildiğinden emin olun
import enFlag from "../../../../assets/en.png";
import trFlag from "../../../../assets/tr.png";

const LanguageSwitch: React.FC = () => {
  const { getLocale, changeLocale } = useTranslation();
  const currentLang = getLocale();
  const theme = useTheme();

  const handleToggle = () => {
    changeLocale(currentLang === "en" ? "tr" : "en");
  };

  const flagSrc = currentLang === "en" ? enFlag : trFlag;
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <IconButton onClick={handleToggle} sx={{ aspectRatio: 1 }}>
      <Avatar
        src={flagSrc}
        alt={currentLang}
        sx={{
          width: 24,
          height: 24,
          filter: isDarkMode ? "grayscale(80%)" : "none",
        }}
        variant="circular"
      />
    </IconButton>
  );
};

export default LanguageSwitch;
