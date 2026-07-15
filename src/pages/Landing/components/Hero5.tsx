import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useRef, useCallback, type MouseEvent } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════
   HERO 5 — Spotlight / mouse-following glow
   Centered minimal text with interactive light
   ═══════════════════════════════════════════ */
export const Hero5 = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 25, stiffness: 100 });
  const smy = useSpring(my, { damping: 25, stiffness: 100 });
  const spotX = useTransform(smx, [0, 1], ["0%", "100%"]);
  const spotY = useTransform(smy, [0, 1], ["0%", "100%"]);

  const handleMouse = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my],
  );

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, md: 6 },
        py: { xs: 14, md: 0 },
      }}
    >
      {/* Mouse-following spotlight */}
      <motion.div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(primary, isDark ? 0.08 : 0.06)} 0%, transparent 70%)`,
          left: spotX,
          top: spotY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Grid pattern background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${alpha(theme.palette.text.primary, isDark ? 0.06 : 0.04)} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          zIndex: 0,
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <Box
        sx={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          maxWidth: 720,
        }}
      >
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              px: 2.5,
              py: 0.6,
              borderRadius: 10,
              border: `1px solid ${alpha(primary, 0.25)}`,
              background: alpha(primary, isDark ? 0.08 : 0.04),
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: primary,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {translate("hero5.badge")}
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.8rem", sm: "3.8rem", md: "5rem" },
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              mb: 3,
            }}
          >
            {translate("hero5.titleLine1")}
            <br />
            <Box
              component="span"
              sx={{
                background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {translate("hero5.titleLine2")}
            </Box>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.95rem", md: "1.08rem" },
              lineHeight: 1.8,
              maxWidth: 520,
              mx: "auto",
              mb: 5,
            }}
          >
            {translate("hero5.subtitle")}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              px: 6,
              py: 2,
              borderRadius: 50,
              fontWeight: 700,
              fontSize: "1.02rem",
              background: `linear-gradient(135deg, ${primary}, ${theme.palette.primary.dark || primary})`,
              boxShadow: `0 0 60px ${alpha(primary, 0.3)}`,
              "&:hover": {
                boxShadow: `0 0 80px ${alpha(primary, 0.5)}`,
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s",
            }}
            href="#contact"
          >
            {translate("hero5.cta")}
          </Button>
        </motion.div>

        {/* Glowing rings decoration */}
        {[200, 350, 500].map((size, i) => (
          <motion.div
            key={size}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.2, duration: 1 }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `1px solid ${alpha(primary, 0.06 - i * 0.015)}`,
              pointerEvents: "none",
              zIndex: -1,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
