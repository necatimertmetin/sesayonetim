import type { ButtonProps } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// ──────────────────────────────────────────
// FONT PRESET — Değiştirmek için aşağıdakilerden birini aç:
//
// Seçenek 1: Sora (başlık) + Inter (body)
// const FONT = '"Sora", "Inter", sans-serif';
//
// Seçenek 2: Plus Jakarta Sans (tek font)
// const FONT = '"Plus Jakarta Sans", sans-serif';
//
// Seçenek 3: Outfit (tek font)
// const FONT = '"Outfit", sans-serif';
//
// Seçenek 4: Space Grotesk (başlık) + DM Sans (body) — eski combo
// const FONT = '"Space Grotesk", "DM Sans", sans-serif';
// ──────────────────────────────────────────
const FONT = '"Sora", "Inter", sans-serif';

// MUI palette genişletme
declare module "@mui/material/styles" {
  interface Palette {
    customBackground: {
      box: string;
    };
    highlightedRow: {
      main: string;
    };
  }

  interface PaletteOptions {
    customBackground?: {
      box: string;
    };
    highlightedRow?: {
      main: string;
    };
  }
}

// Light Theme
const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D35400",
      light: "#E67E22",
      dark: "#A84300",
      contrastText: "#fff", // primary button yazısı için
    },
    secondary: {
      main: "#26C6DA", // açık turkuaz-mavi ton, canlı ve soft
    },
    background: {
      default: "#d6d6d6", // orta açık gri, beyaza çok yakın değil
      paper: "#eee", // defaulttan biraz daha koyu ama hâlâ açık ton
    },
    text: {
      primary: "#111111", // koyu - ana yazı
      secondary: "#3a3a3a", // yardımcı yazılar - daha okunur
    },
    customBackground: {
      box: "#f5f5f5",
    },
    highlightedRow: {
      main: "#f0f8ff",
    },
  },
  typography: {
    fontFamily: FONT,
  },

  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: FONT,
      },
      styleOverrides: {
        root: {
          color: "#111111", // açık tema için yazı rengi koyu
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "default",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "white",
          height: "64px",
          color: "#222222", // appbar yazısı koyu olsun
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#fff", // body arka plan beyaz
          color: "#222222", // body yazı koyu
        },
        "main.MuiBox-root": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({
          ownerState,
        }: {
          ownerState: { variant?: string; color?: string };
        }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              color: "#fff",
            }),
        }),
      },
    },
  },
});

// Dark Theme
const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF6F00",
      light: "#FFA040",
      dark: "#C43E00",
    },
    secondary: {
      main: "#00BFA5",
    },
    background: {
      default: "#0d0d0d",
      paper: "#121212",
    },
    customBackground: {
      box: "#1a1a1a",
    },
    highlightedRow: {
      main: "#2a2a2a",
    },
  },
  typography: {
    fontFamily: FONT,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "default",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
          height: "64px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              color: "#fff",
            }),
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0d0d0d",
          color: "#ffffff",
        },
        "main.MuiBox-root": {
          backgroundColor: "#1a1a1a",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: FONT,
      },
    },
  },
});

// Responsive hale getir
const DarkThemeWithResponsiveFontSizes = responsiveFontSizes(DarkTheme);
const LightThemeWithResponsiveFontSizes = responsiveFontSizes(LightTheme);

// Export et
export { LightThemeWithResponsiveFontSizes, DarkThemeWithResponsiveFontSizes };
