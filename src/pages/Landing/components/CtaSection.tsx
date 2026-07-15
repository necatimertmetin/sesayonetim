import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export const CtaSection = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();

  return (
    <Box
      id="contact"
      sx={{
        px: { xs: 3, sm: 5, md: 8, lg: 12 },
        py: { xs: 10, md: 16 },
        maxWidth: 1300,
        mx: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Box
          sx={{
            p: { xs: 5, md: 8 },
            borderRadius: 4,
            // antrasit metal panel — logodaki koyu iç yüzey
            background: "linear-gradient(150deg, #1E2126 0%, #0C0D0F 100%)",
            border: "1px solid #2A2E34",
            borderTop: `2px solid ${theme.palette.primary.main}`,
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -80,
              left: -80,
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              pointerEvents: "none",
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#E8EAED",
              mb: 2,
              position: "relative",
              letterSpacing: "-0.02em",
            }}
          >
            {translate("cta.title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(232,234,237,0.72)",
              mb: 4,
              maxWidth: 500,
              mx: "auto",
              lineHeight: 1.7,
              position: "relative",
            }}
          >
            {translate("cta.subtitle")}
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              textTransform: "none",
              px: 5,
              py: 1.5,
              borderRadius: 2.5,
              fontSize: "1rem",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main} 55%, ${theme.palette.primary.dark})`,
              color: "#101113",
              position: "relative",
              boxShadow: "0 10px 30px rgba(240,140,26,0.3)",
              "&:hover": {
                boxShadow: "0 14px 38px rgba(240,140,26,0.45)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s",
            }}
            href="mailto:info@sesayonetim.com"
          >
            {translate("cta.button")}
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};
