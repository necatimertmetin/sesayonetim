import React from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Link as MuiLink,
  Divider,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import Logo from "../../../assets/SesaYonetim.png";
import { Routes } from "../../../router/Routes";
import { useTranslation } from "../../../providers/useTranslation";
import { Link as RouterLink } from "react-router-dom";

export const Footer: React.FC = () => {
  const theme = useTheme();
  const { translateWithoutPrefix } = useTranslation();
  const isDark = theme.palette.mode === "dark";

  const footerLinks = Routes.filter((r) => r.visibleOnFooter);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 6,
      }}
      py={6}
    >
      {/* üstte ince turuncu aksan çizgisi */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
        }}
      />

      <Stack spacing={3} alignItems="center" justifyContent="center">
        {/* Brand */}
        <Stack direction="row" spacing={1.4} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: "linear-gradient(160deg, #FFFFFF 0%, #E9EBEE 100%)",
              border: `1px solid ${
                isDark ? alpha("#FFFFFF", 0.18) : "#C7CCD3"
              }`,
            }}
          >
            <img
              src={Logo}
              alt="Sesa Yönetim"
              style={{ height: 36, width: 36, objectFit: "contain" }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "text.primary",
            }}
          >
            Sesa{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Yönetim
            </Box>
          </Typography>
        </Stack>

        {/* Nav */}
        <Stack direction="row" spacing={3}>
          {footerLinks.map((route) => (
            <MuiLink
              key={route.path}
              component={RouterLink}
              to={route.path === "/" ? "/" : `/${route.path}`}
              underline="none"
              color="text.secondary"
              sx={{
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                transition: "color 0.2s",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {translateWithoutPrefix(route.label)}
            </MuiLink>
          ))}
        </Stack>

        {/* Social */}
        <IconButton
          href="https://instagram.com"
          target="_blank"
          sx={{
            color: "text.secondary",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "10px",
            transition: "all 0.25s",
            "&:hover": {
              color: theme.palette.primary.main,
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
          }}
        >
          <InstagramIcon fontSize="small" />
        </IconButton>

        <Divider sx={{ width: "80%", opacity: 0.4 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: "center", px: 2 }}
        >
          {translateWithoutPrefix("footer.company")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.75rem" }}
        >
          {translateWithoutPrefix("footer.allRightsReserved", {
            year: new Date().getFullYear(),
          })}
        </Typography>
      </Stack>
    </Box>
  );
};
