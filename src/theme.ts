import type { ButtonProps } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// ──────────────────────────────────────────
// SESA YÖNETİM — endüstriyel / metalik kimlik
// Logo referansı: fırçalanmış çelik "S" + turuncu globe
// Başlık: Space Grotesk — teknik, keskin
// Gövde:  Inter — okunur, nötr
// ──────────────────────────────────────────
const HEADING_FONT = '"Space Grotesk", "Inter", sans-serif';
const BODY_FONT = '"Inter", sans-serif';

// Marka renkleri
const ORANGE = "#F08C1A"; // logo globe turuncusu
const ORANGE_DARK = "#C26A00";
const ORANGE_LIGHT = "#FFA94D";

const headingVariants = {
  h1: { fontFamily: HEADING_FONT, fontWeight: 700, letterSpacing: "-0.03em" },
  h2: { fontFamily: HEADING_FONT, fontWeight: 700, letterSpacing: "-0.02em" },
  h3: { fontFamily: HEADING_FONT, fontWeight: 700, letterSpacing: "-0.02em" },
  h4: { fontFamily: HEADING_FONT, fontWeight: 600, letterSpacing: "-0.01em" },
  h5: { fontFamily: HEADING_FONT, fontWeight: 600 },
  h6: { fontFamily: HEADING_FONT, fontWeight: 600 },
};

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

// Light Theme — gümüş / çelik zemin, antrasit yazı, turuncu vurgu
const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D97706", // açık zeminde okunur turuncu
      light: ORANGE,
      dark: "#A85500",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5B6672", // çelik grisi
      light: "#8A93A0",
      dark: "#3D454F",
    },
    divider: "#C7CCD3",
    background: {
      default: "#EEF0F3", // gümüş
      paper: "#FFFFFF",
    },
    text: {
      primary: "#15181C", // antrasit
      secondary: "#4A515A",
    },
    customBackground: {
      box: "#E4E7EB",
    },
    highlightedRow: {
      main: "#F5F0E8",
    },
  },
  typography: {
    fontFamily: BODY_FONT,
    ...headingVariants,
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#EEF0F3",
          color: "#15181C",
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
          backgroundColor: "transparent",
          height: "64px",
          color: "#15181C",
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
  },
});

// Dark Theme — antrasit zemin, çelik yazı, turuncu vurgu (ana görünüm)
const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: ORANGE,
      light: ORANGE_LIGHT,
      dark: ORANGE_DARK,
      contrastText: "#101113",
    },
    secondary: {
      main: "#AEB6C2", // çelik grisi
      light: "#D4D9E0",
      dark: "#7C8592",
    },
    divider: "#2A2E34",
    background: {
      default: "#0C0D0F",
      paper: "#141619",
    },
    text: {
      primary: "#E8EAED",
      secondary: "#9BA3AD",
    },
    customBackground: {
      box: "#1A1D21",
    },
    highlightedRow: {
      main: "#22262B",
    },
  },
  typography: {
    fontFamily: BODY_FONT,
    ...headingVariants,
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0C0D0F",
          color: "#E8EAED",
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
          backgroundColor: "transparent",
          height: "64px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              color: "#101113",
              fontWeight: 700,
            }),
        }),
      },
    },
  },
});

// Responsive hale getir
const DarkThemeWithResponsiveFontSizes = responsiveFontSizes(DarkTheme);
const LightThemeWithResponsiveFontSizes = responsiveFontSizes(LightTheme);

// Export et
export { LightThemeWithResponsiveFontSizes, DarkThemeWithResponsiveFontSizes };
