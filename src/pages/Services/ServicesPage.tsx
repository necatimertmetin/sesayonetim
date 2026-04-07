import { Box, Chip, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../providers/useTranslation";
import { BackgroundLight } from "../../components/animated-components/div/BackgroundLight";

const serviceKeys = [
  "inventory",
  "logistics",
  "accountHealth",
  "accounting",
  "ppc",
  "software",
] as const;

export const ServicesPage = () => {
  const { translate } = useTranslation("pages.services");
  const theme = useTheme();

  return (
    <Box sx={{ overflow: "hidden" }}>
      <BackgroundLight intensity={0.5} />

      {/* Hero */}
      <Box
        sx={{
          px: { xs: 3, sm: 5, md: 8, lg: 12 },
          pt: { xs: 14, md: 20 },
          pb: { xs: 8, md: 12 },
          maxWidth: 1300,
          mx: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em" }}
          >
            {translate("hero.title")}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", fontWeight: 400, maxWidth: 600 }}
          >
            {translate("hero.subtitle")}
          </Typography>
        </motion.div>
      </Box>

      {/* Services grid */}
      <Box
        sx={{
          px: { xs: 3, sm: 5, md: 8, lg: 12 },
          pb: { xs: 10, md: 16 },
          maxWidth: 1300,
          mx: "auto",
        }}
      >
        <Stack spacing={3}>
          {serviceKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: 4,
                  background: alpha(theme.palette.background.paper, 0.5),
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    transform: "translateY(-4px)",
                    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                }}
              >
                <Chip
                  label={`0${i + 1}`}
                  size="small"
                  sx={{
                    mb: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    background: alpha(theme.palette.primary.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                  {translate(`${key}.title`)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    maxWidth: 800,
                  }}
                >
                  {translate(`${key}.description`)}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
