import { Box, Chip, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";

export const AboutPreview = () => {
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
          label={translate("about.sectionTag")}
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
          sx={{ fontWeight: 800, mb: 4, letterSpacing: "-0.02em" }}
        >
          {translate("about.sectionTitle")}
        </Typography>
      </motion.div>

      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        {(["description1", "description2", "description3"] as const).map(
          (key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.8 }}
              >
                {translate(`about.${key}`)}
              </Typography>
            </motion.div>
          ),
        )}
      </Stack>

      {/* Mission & Vision cards */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mt: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flex: 1 }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              height: "100%",
              background: alpha(theme.palette.background.paper, 0.5),
              backdropFilter: "blur(16px)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
            >
              {translate("about.missionTitle")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {translate("about.missionText")}
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ flex: 1 }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              height: "100%",
              background: alpha(theme.palette.background.paper, 0.5),
              backdropFilter: "blur(16px)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 2, color: "secondary.main" }}
            >
              {translate("about.visionTitle")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {translate("about.visionText")}
            </Typography>
          </Box>
        </motion.div>
      </Stack>
    </Box>
  );
};
