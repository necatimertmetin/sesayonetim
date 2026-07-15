import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";

/* ═══════════════════════════════════════════
   HERO 4 — Minimal dark-band hero
   Horizontal line accents, huge number accent, clean CTA
   ═══════════════════════════════════════════ */
export const Hero4 = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, sm: 6, md: 10 },
        py: { xs: 14, md: 0 },
        background: isDark
          ? `linear-gradient(180deg, ${alpha(primary, 0.03)} 0%, transparent 40%)`
          : `linear-gradient(180deg, ${alpha(primary, 0.02)} 0%, transparent 40%)`,
      }}
    >
      {/* Horizontal accent lines */}
      {[20, 40, 60, 80].map((top) => (
        <Box
          key={top}
          sx={{
            position: "absolute",
            top: `${top}%`,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.divider, 0.06)}, transparent)`,
          }}
        />
      ))}

      {/* Big background number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{
          position: "absolute",
          right: "-2%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20rem", md: "28rem" },
            fontWeight: 900,
            lineHeight: 1,
            color: alpha(primary, isDark ? 0.04 : 0.03),
            userSelect: "none",
            display: { xs: "none", sm: "block" },
          }}
        >
          10
        </Typography>
      </motion.div>

      <Box
        sx={{
          maxWidth: 800,
          width: "100%",
          position: "relative",
          zIndex: 2,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Thin accent line above title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "left" }}
        >
          <Box
            sx={{
              width: 60,
              height: 3,
              background: `linear-gradient(90deg, ${primary}, ${secondary})`,
              borderRadius: 2,
              mb: 4,
              mx: { xs: "auto", md: 0 },
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              mb: 1,
            }}
          >
            {translate("hero4.titleLine1")}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              mb: 3,
              background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {translate("hero4.titleLine2")}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.95rem", md: "1.08rem" },
              lineHeight: 1.8,
              mb: 5,
              maxWidth: 520,
              mx: { xs: "auto", md: 0 },
            }}
          >
            {translate("hero4.subtitle")}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: "none",
                px: 4.5,
                py: 1.6,
                borderRadius: 2,
                fontWeight: 700,
                background: primary,
                "&:hover": {
                  boxShadow: `0 10px 36px ${alpha(primary, 0.35)}`,
                },
              }}
              href="#contact"
            >
              {translate("hero4.cta")}
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                textTransform: "none",
                px: 4,
                py: 1.6,
                borderRadius: 2,
                fontWeight: 600,
                borderColor: alpha(theme.palette.text.primary, 0.2),
                color: "text.primary",
                "&:hover": {
                  borderColor: primary,
                  color: primary,
                  background: "transparent",
                },
              }}
              href="#services"
            >
              {translate("hero4.ctaSecondary")}
            </Button>
          </Stack>
        </motion.div>

        {/* Inline stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Stack
            direction="row"
            spacing={{ xs: 3, md: 6 }}
            sx={{ mt: { xs: 6, md: 8 } }}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            {[
              { value: "10+", label: translate("hero4.statYears") },
              { value: "200+", label: translate("hero4.statSellers") },
              { value: "10M+", label: translate("hero4.statProducts") },
            ].map((s, i) => (
              <Box key={i}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    lineHeight: 1,
                    color:
                      i === 0 ? primary : i === 2 ? secondary : "text.primary",
                  }}
                >
                  {s.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    mt: 0.5,
                  }}
                >
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
};
