import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const GlassCard = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: "blur(24px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
          minWidth: 180,
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
};

export const Hero = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const card1X = useTransform(smoothX, [0, 1], [20, -20]);
  const card1Y = useTransform(smoothY, [0, 1], [15, -15]);
  const card2X = useTransform(smoothX, [0, 1], [-15, 15]);
  const card2Y = useTransform(smoothY, [0, 1], [25, -25]);
  const card3X = useTransform(smoothX, [0, 1], [12, -12]);
  const card3Y = useTransform(smoothY, [0, 1], [-12, 12]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const gradientText = {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, sm: 5, md: 8, lg: 12 },
        py: { xs: 12, md: 0 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1300,
          mx: "auto",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 6, md: 8 },
        }}
      >
        {/* Left Content */}
        <Box sx={{ flex: 1.2, maxWidth: { md: 640 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip
              label={translate("hero.badge")}
              size="small"
              sx={{
                mb: 3,
                px: 1.5,
                height: 32,
                background: alpha(theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: 0.5,
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
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.2rem",
                  md: "3.8rem",
                  lg: "4.2rem",
                },
                lineHeight: 1.08,
                mb: 3,
                letterSpacing: "-0.02em",
              }}
            >
              {translate("hero.titleLine1")}{" "}
              <Box component="span" sx={gradientText}>
                {translate("hero.titleHighlight")}
              </Box>
              <br />
              {translate("hero.titleLine2")}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                mb: 5,
                maxWidth: 480,
                lineHeight: 1.7,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              {translate("hero.subtitle")}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2.5,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  boxShadow: `0 8px 32px ${alpha(
                    theme.palette.primary.main,
                    0.35,
                  )}`,
                }}
                href="#contact"
              >
                {translate("hero.cta")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrowRoundedIcon />}
                sx={{
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2.5,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  borderColor: alpha(theme.palette.text.primary, 0.2),
                  color: "text.primary",
                  "&:hover": {
                    borderColor: alpha(theme.palette.text.primary, 0.4),
                    background: alpha(theme.palette.text.primary, 0.04),
                  },
                }}
                href="#services"
              >
                {translate("hero.ctaSecondary")}
              </Button>
            </Stack>
          </motion.div>
        </Box>

        {/* Right: Floating Glass Cards */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            minHeight: { xs: 300, md: 420 },
            display: { xs: "none", md: "block" },
          }}
        >
          {/* Card 1: Sellers Served */}
          <motion.div
            style={{
              x: card1X,
              y: card1Y,
              position: "absolute",
              top: 0,
              right: 20,
            }}
          >
            <GlassCard delay={0.5}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  letterSpacing: 0.5,
                }}
              >
                {translate("hero.cardSellers")}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, mt: 0.5, ...gradientText }}
              >
                {translate("hero.cardSellersValue")}
              </Typography>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ mt: 1.5 }}
                alignItems="flex-end"
              >
                {[40, 55, 35, 70, 60, 85, 95].map((h, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: h * 0.4,
                      borderRadius: 1,
                      background: `linear-gradient(to top, ${alpha(theme.palette.primary.main, 0.3)}, ${theme.palette.primary.main})`,
                    }}
                  />
                ))}
              </Stack>
            </GlassCard>
          </motion.div>

          {/* Card 2: Products Managed */}
          <motion.div
            style={{
              x: card2X,
              y: card2Y,
              position: "absolute",
              top: 170,
              left: 0,
            }}
          >
            <GlassCard delay={0.7}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  letterSpacing: 0.5,
                }}
              >
                {translate("hero.cardProducts")}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
                {translate("hero.cardProductsValue")}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 1 }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#4caf50",
                    boxShadow: "0 0 8px #4caf50",
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Live
                </Typography>
              </Stack>
            </GlassCard>
          </motion.div>

          {/* Card 3: Experience */}
          <motion.div
            style={{
              x: card3X,
              y: card3Y,
              position: "absolute",
              bottom: 20,
              right: 60,
            }}
          >
            <GlassCard delay={0.9}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  letterSpacing: 0.5,
                }}
              >
                {translate("hero.cardExperience")}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, mt: 0.5, color: "secondary.main" }}
              >
                {translate("hero.cardExperienceValue")}
              </Typography>
            </GlassCard>
          </motion.div>

          {/* Decorative border */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "5%",
              width: "80%",
              height: "60%",
              border: `1px dashed ${alpha(theme.palette.primary.main, 0.12)}`,
              borderRadius: 4,
              pointerEvents: "none",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
