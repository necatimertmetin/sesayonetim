import { Box, Chip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";

const whyUsKeys = ["expertise", "dataDriven", "fastSupport"] as const;

export const WhyUs = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();

  return (
    <Box
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
          label={translate("whyUs.sectionTag")}
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
          {translate("whyUs.sectionTitle")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 6,
            maxWidth: 600,
            lineHeight: 1.7,
          }}
        >
          {translate("whyUs.sectionSubtitle")}
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {whyUsKeys.map((key, i) => (
          <Box
            key={key}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                height: "100%",
                background: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(16px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: "all 0.3s ease",
                cursor: "default",
                "&:hover": {
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  transform: "translateY(-4px)",
                  boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.1)}`,
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: "0.85rem",
                  letterSpacing: 1,
                }}
              >
                {translate(`whyUs.${key}.tag`)}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mt: 1.5, mb: 1.5 }}
              >
                {translate(`whyUs.${key}.title`)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.7 }}
              >
                {translate(`whyUs.${key}.description`)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
