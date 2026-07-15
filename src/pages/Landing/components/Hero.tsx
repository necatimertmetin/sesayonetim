import { Box, Button, Stack, Typography } from "@mui/material";
import { motion, animate, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";
import { useTranslation as useI18Next } from "react-i18next";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

/* ── animated counter ── */
const Counter = ({ target }: { target: string }) => {
  const num = parseInt(target.replace(/[^0-9]/g, ""), 10);
  const suffix = target.replace(/[0-9]/g, "");
  const [val, setVal] = useState(0);
  useEffect(() => {
    const c = animate(0, num, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => c.stop();
  }, [num]);
  return (
    <>
      {val}
      {suffix}
    </>
  );
};

/* ── word-by-word stagger ── */
const StaggerWords = ({
  text,
  delay = 0,
  sx = {},
}: {
  text: string;
  delay?: number;
  sx?: Record<string, unknown>;
}) => (
  <Box component="span" sx={{ display: "inline" }}>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: delay + i * 0.08,
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{ display: "inline-block", marginRight: "0.3em" }}
      >
        <Box component="span" sx={sx}>
          {word}
        </Box>
      </motion.span>
    ))}
  </Box>
);

/* ── typewriter subtitle ── */
const TypewriterSubtitle = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % texts.length), 3500);
    return () => clearInterval(id);
  }, [texts.length]);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45 }}
      >
        {texts[index]}
      </motion.span>
    </AnimatePresence>
  );
};

export const Hero = () => {
  const { translate } = useTranslation("pages.landing");
  const { t } = useI18Next();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const gradientText = {
    background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const stats = [
    {
      label: translate("hero.cardSellers"),
      value: translate("hero.cardSellersValue"),
      color: primary,
    },
    {
      label: translate("hero.cardProducts"),
      value: translate("hero.cardProductsValue"),
      color: isDark ? "#fff" : "#222",
    },
    {
      label: translate("hero.cardExperience"),
      value: translate("hero.cardExperienceValue"),
      color: secondary,
    },
  ];

  const subtitleTexts: string[] = (t("pages.landing.hero.subtitleRotate", {
    returnObjects: true,
  }) as unknown as string[]) ?? [translate("hero.subtitle")];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 14, md: 0 },
      }}
    >
      {/* ── MAIN CONTENT ── */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 3,
        }}
      >
        {/* Badge with glowing dot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              mb: 4,
              px: 2.5,
              py: 0.8,
              borderRadius: 10,
              background: alpha(primary, 0.06),
              border: `1px solid ${alpha(primary, 0.2)}`,
              backdropFilter: "blur(12px)",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: primary,
                boxShadow: `0 0 10px ${primary}, 0 0 20px ${alpha(primary, 0.4)}`,
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1, transform: "scale(1)" },
                  "50%": { opacity: 0.6, transform: "scale(1.3)" },
                },
              }}
            />
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: primary,
                letterSpacing: 0.8,
              }}
            >
              {translate("hero.badge")}
            </Typography>
          </Box>
        </motion.div>

        {/* Title — staggered word reveal */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: "2.8rem",
              sm: "3.8rem",
              md: "4.5rem",
              lg: "5.2rem",
            },
            lineHeight: 1.04,
            mb: 3,
            letterSpacing: "-0.035em",
          }}
        >
          <StaggerWords text={translate("hero.titleLine1")} delay={0.2} />
          <StaggerWords
            text={translate("hero.titleHighlight")}
            delay={0.45}
            sx={gradientText}
          />
          <br />
          <StaggerWords text={translate("hero.titleLine2")} delay={0.55} />
        </Typography>

        {/* Subtitle — typewriter rotate */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 5,
              maxWidth: 520,
              mx: "auto",
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.1rem" },
              minHeight: { xs: 54, md: 44 },
            }}
          >
            <TypewriterSubtitle texts={subtitleTexts} />
          </Typography>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                textTransform: "none",
                px: 5,
                py: 1.8,
                borderRadius: 3,
                fontSize: "1.02rem",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${primary}, ${theme.palette.primary.dark || primary})`,
                boxShadow: `0 0 0 0 ${alpha(primary, 0)}, 0 12px 40px ${alpha(primary, 0.4)}`,
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: `0 0 0 6px ${alpha(primary, 0.15)}, 0 16px 48px ${alpha(primary, 0.5)}`,
                  transform: "translateY(-2px)",
                },
              }}
              href="#contact"
            >
              {translate("hero.cta")}
            </Button>

            <Button
              variant="text"
              size="large"
              sx={{
                textTransform: "none",
                px: 3,
                py: 1.5,
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "text.secondary",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 1,
                  background: "text.secondary",
                  transition: "width 0.3s",
                },
                "&:hover::after": { width: "60%" },
                "&:hover": {
                  background: "transparent",
                  color: "text.primary",
                },
              }}
              href="#services"
            >
              {translate("hero.ctaSecondary")} →
            </Button>
          </Stack>
        </motion.div>

        {/* ── STAT ROW ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{ width: "100%" }}
        >
          <Stack
            direction="row"
            sx={{
              mt: { xs: 7, md: 10 },
              justifyContent: "center",
              gap: { xs: 3, sm: 5, md: 8 },
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.15, duration: 0.6 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                      color: s.color,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <Counter target={s.value} />
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.5,
                      color: "text.secondary",
                      fontWeight: 500,
                      fontSize: { xs: "0.7rem", sm: "0.78rem" },
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </motion.div>

        {/* ── SCROLL INDICATOR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ marginTop: 64 }}
        >
          <Box
            sx={{
              width: 24,
              height: 40,
              borderRadius: 12,
              border: `2px solid ${alpha(theme.palette.text.primary, 0.2)}`,
              display: "flex",
              justifyContent: "center",
              pt: 1,
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 8,
                  borderRadius: 2,
                  background: alpha(theme.palette.text.primary, 0.4),
                }}
              />
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};
