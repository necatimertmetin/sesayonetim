import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

/* ═══════════════════════════════════════════
   HERO 3 — Split diagonal layout
   Left side: big text.  Right side: accent color diagonal slab
   ═══════════════════════════════════════════ */
export const Hero3 = () => {
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
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, sm: 6, md: 10 },
        py: { xs: 14, md: 0 },
      }}
    >
      {/* Diagonal accent slab */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: { xs: "100%", md: "50%" },
          height: "100%",
          background: `linear-gradient(160deg, ${alpha(primary, isDark ? 0.08 : 0.05)} 0%, ${alpha(secondary, isDark ? 0.12 : 0.07)} 100%)`,
          clipPath: {
            xs: "none",
            md: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
          },
          zIndex: 0,
        }}
      />

      {/* Floating circles */}
      {[
        { size: 300, top: "10%", right: "8%", color: primary, delay: 0 },
        {
          size: 180,
          bottom: "15%",
          right: "20%",
          color: secondary,
          delay: 0.3,
        },
        { size: 120, top: "60%", right: "5%", color: primary, delay: 0.6 },
      ].map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + c.delay, duration: 1, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: c.size,
            height: c.size,
            top: "top" in c ? c.top : undefined,
            bottom: "bottom" in c ? c.bottom : undefined,
            right: c.right,
            zIndex: 0,
          }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: `1.5px solid ${alpha(c.color, 0.15)}`,
                background: `radial-gradient(circle at 30% 30%, ${alpha(c.color, 0.06)}, transparent 70%)`,
                display: { xs: "none", md: "block" },
              }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Content */}
      <Box sx={{ maxWidth: 620, position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: secondary,
              mb: 3,
            }}
          >
            {translate("hero3.tag")}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.6rem", sm: "3.6rem", md: "4.4rem" },
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              mb: 3,
            }}
          >
            {translate("hero3.title")}{" "}
            <Box
              component="span"
              sx={{
                color: primary,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 4,
                  left: 0,
                  width: "100%",
                  height: 6,
                  background: alpha(primary, 0.2),
                  borderRadius: 2,
                },
              }}
            >
              {translate("hero3.titleAccent")}
            </Box>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.12rem" },
              lineHeight: 1.8,
              mb: 5,
              maxWidth: 480,
            }}
          >
            {translate("hero3.subtitle")}
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
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              textTransform: "none",
              px: 5,
              py: 1.8,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: "1rem",
              background: primary,
              "&:hover": { transform: "translateY(-2px)" },
              transition: "transform 0.3s",
            }}
            href="#contact"
          >
            {translate("hero3.cta")}
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};
