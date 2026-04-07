import { Box, Chip, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const serviceKeys = [
  "inventory",
  "accounting",
  "ppc",
  "accountHealth",
  "software",
] as const;

export const Services = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();

  return (
    <Box
      id="services"
      sx={{
        px: { xs: 3, sm: 5, md: 8, lg: 12 },
        py: { xs: 10, md: 16 },
        maxWidth: 1300,
        mx: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Chip
          label={translate("services.sectionTag")}
          size="small"
          sx={{
            mb: 2,
            px: 1.5,
            height: 28,
            background: alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: "0.7rem",
            letterSpacing: 0.5,
          }}
        />
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mb: 1.5, letterSpacing: "-0.02em" }}
        >
          {translate("services.sectionTitle")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 6,
            maxWidth: 520,
            lineHeight: 1.7,
          }}
        >
          {translate("services.sectionSubtitle")}
        </Typography>
      </motion.div>

      <Stack spacing={3}>
        {serviceKeys.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Box
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: 4,
                background: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(16px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { md: "center" },
                gap: { xs: 2, md: 4 },
                transition: "all 0.3s ease",
                cursor: "default",
                "&:hover": {
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  transform: "translateY(-4px)",
                  boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.1)}`,
                  "& .service-arrow": {
                    transform: "translateX(4px)",
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 800,
                  fontSize: "2.2rem",
                  color: alpha(theme.palette.primary.main, 0.2),
                  lineHeight: 1,
                  minWidth: 60,
                  flexShrink: 0,
                }}
              >
                {translate(`services.${key}.number`)}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {translate(`services.${key}.title`)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7,
                    maxWidth: 700,
                  }}
                >
                  {translate(`services.${key}.description`)}
                </Typography>
              </Box>
              <ArrowForwardRoundedIcon
                className="service-arrow"
                sx={{
                  color: "text.secondary",
                  transition: "all 0.3s ease",
                  fontSize: 28,
                  flexShrink: 0,
                  display: { xs: "none", md: "block" },
                }}
              />
            </Box>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};
