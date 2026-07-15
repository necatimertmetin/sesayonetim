import { AppBar, Box, Typography, Button, Stack } from "@mui/material";
import { ThemeToggle } from "./components/ThemeToggle";
import LanguageSwitch from "./components/LanguageSwitch";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/SesaYonetim.png";
import { Routes } from "../../../router/Routes";
import { useTranslation } from "../../../providers/useTranslation";
import { useTheme, alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";

export const Header = () => {
  const { translateWithoutPrefix } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navRoutes = Routes.filter((r) => r.visibleOnHeader);
  const primary = theme.palette.primary.main;

  const isActive = (path: string) => {
    const resolved = path === "/" ? "/" : `/${path}`;
    return location.pathname === resolved;
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: scrolled
          ? alpha(theme.palette.background.default, 0.85)
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
        borderBottom: `1px solid ${
          scrolled ? alpha(theme.palette.divider, 0.6) : "transparent"
        }`,
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 64,
          px: { xs: 2, sm: 3, md: 5 },
          maxWidth: 1400,
          mx: "auto",
          width: "100%",
        }}
      >
        {/* ── Brand ── */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.4,
            textDecoration: "none",
            color: "inherit",
            flexShrink: 0,
            mr: 4,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              // logonun beyaz zeminiyle bütünleşen gümüş plaka
              background: "linear-gradient(160deg, #FFFFFF 0%, #E9EBEE 100%)",
              border: `1px solid ${
                isDark ? alpha("#FFFFFF", 0.18) : "#C7CCD3"
              }`,
              boxShadow: isDark
                ? "0 2px 12px rgba(0,0,0,0.5)"
                : "0 2px 8px rgba(21,24,28,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                borderColor: alpha(primary, 0.5),
              },
            }}
          >
            <img
              src={Logo}
              alt="Sesa Yönetim"
              style={{ height: 40, width: 40, objectFit: "contain" }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.02em",
              color: "text.primary",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            Sesa{" "}
            <Box component="span" sx={{ color: primary }}>
              Yönetim
            </Box>
          </Typography>
        </Box>

        {/* ── Nav Links ── */}
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {navRoutes.map((route) => {
            const active = isActive(route.path);
            return (
              <Button
                key={route.path}
                component={RouterLink}
                to={route.path === "/" ? "/" : `/${route.path}`}
                disableRipple
                sx={{
                  textTransform: "none",
                  position: "relative",
                  px: 2,
                  py: 0.8,
                  borderRadius: "8px",
                  color: active ? primary : "text.primary",
                  fontWeight: active ? 700 : 500,
                  fontSize: "0.875rem",
                  backgroundColor: active
                    ? alpha(primary, 0.08)
                    : "transparent",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: alpha(primary, 0.06),
                    color: primary,
                  },
                }}
              >
                {translateWithoutPrefix(route.label)}
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 16,
                      height: 2,
                      borderRadius: 1,
                      background: primary,
                    }}
                  />
                )}
              </Button>
            );
          })}
        </Stack>

        {/* ── Controls ── */}
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
          <ThemeToggle />
          <LanguageSwitch />
        </Stack>
      </Box>
    </AppBar>
  );
};
