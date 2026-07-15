import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

/* ═══════════════════════════════════════════
   HERO 6 — Editorial / typographic hero
   Oversized stacked text, vertical rhythm, no noise
   ═══════════════════════════════════════════ */
export const Hero6 = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === "dark";

  const line = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, sm: 6, md: 12 },
        py: { xs: 14, md: 0 },
      }}
    >
      {/* Side accent bar */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "40%" }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: 0,
          top: "30%",
          width: 4,
          borderRadius: 2,
          background: `linear-gradient(180deg, ${primary}, ${secondary})`,
          zIndex: 0,
        }}
      />

      {/* Subtle corner gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "50%",
          background: `radial-gradient(ellipse at 100% 0%, ${alpha(secondary, isDark ? 0.04 : 0.03)}, transparent 60%)`,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
        {/* Overline */}
        <motion.div {...line} transition={{ duration: 0.7 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Box
              sx={{
                width: 40,
                height: 2,
                background: primary,
                borderRadius: 1,
              }}
            />
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: primary,
              }}
            >
              {translate("hero6.overline")}
            </Typography>
          </Stack>
        </motion.div>

        {/* Big title lines */}
        {["hero6.line1", "hero6.line2", "hero6.line3"].map((key, i) => (
          <motion.div
            key={key}
            {...line}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: i === 1 ? 900 : 300,
                fontSize: { xs: "2.2rem", sm: "3rem", md: "4.2rem" },
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                ...(i === 1
                  ? {
                      background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : {}),
              }}
            >
              {translate(key)}
            </Typography>
          </motion.div>
        ))}

        {/* Subtitle + CTA row */}
        <motion.div {...line} transition={{ duration: 0.7, delay: 0.6 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ md: "flex-end" }}
            justifyContent="space-between"
            sx={{ mt: { xs: 4, md: 6 }, gap: 4 }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.8,
                maxWidth: 420,
              }}
            >
              {translate("hero6.subtitle")}
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                textTransform: "none",
                px: 5,
                py: 1.8,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "1rem",
                flexShrink: 0,
                background: `linear-gradient(135deg, ${primary}, ${theme.palette.primary.dark || primary})`,
                boxShadow: `0 12px 40px ${alpha(primary, 0.3)}`,
                "&:hover": {
                  boxShadow: `0 16px 48px ${alpha(primary, 0.45)}`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s",
              }}
              href="#contact"
            >
              {translate("hero6.cta")}
            </Button>
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
};
