import { AppBar, Box, Typography, Button, Stack } from "@mui/material";
import { ThemeToggle } from "./components/ThemeToggle";
import LanguageSwitch from "./components/LanguageSwitch";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Sesa from "../../../assets/logo.png";
import { Routes } from "../../../router/Routes";
import { useTranslation } from "../../../providers/useTranslation";
import { useTheme, alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";

export const Header = () => {
  const { translateWithoutPrefix } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navRoutes = Routes.filter((r) => r.visibleOnHeader);
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

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
          ? alpha(theme.palette.background.default, 0.8)
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${scrolled ? alpha(theme.palette.divider, 0.12) : "transparent"}`,
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
            gap: 1.2,
            textDecoration: "none",
            color: "inherit",
            flexShrink: 0,
            mr: 4,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${alpha(primary, 0.12)}, ${alpha(secondary, 0.08)})`,
              border: `1px solid ${alpha(primary, 0.15)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                background: `linear-gradient(135deg, ${alpha(primary, 0.2)}, ${alpha(secondary, 0.14)})`,
                transform: "scale(1.05)",
              },
            }}
          >
            <img
              src={Sesa}
              alt="Sesa"
              style={{ height: 42, width: 42, objectFit: "contain" }}
            />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.15rem",
              letterSpacing: "0.04em",
              background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sesa
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
                  borderRadius: "10px",
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
                      background: `linear-gradient(90deg, ${primary}, ${secondary})`,
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
