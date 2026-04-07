import { useTheme, IconButton } from "@mui/material";
import { useContext } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../../../providers/ColorModeContext";

export const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton onClick={colorMode.toggleMode} color="inherit">
      {theme.palette.mode === "dark" ? <DarkModeIcon /> : <Brightness7Icon />}
    </IconButton>
  );
};
