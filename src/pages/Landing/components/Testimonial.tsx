import { Box, Chip, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

export const Testimonial = () => {
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Chip
          label={translate("testimonial.sectionTag")}
          size="small"
          sx={{
            mb: 4,
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

        <Box sx={{ position: "relative", maxWidth: 800 }}>
          <FormatQuoteRoundedIcon
            sx={{
              fontSize: 80,
              color: alpha(theme.palette.primary.main, 0.1),
              position: "absolute",
              top: -20,
              left: -10,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              lineHeight: 1.5,
              fontStyle: "italic",
              mb: 4,
              position: "relative",
              zIndex: 1,
            }}
          >
            "{translate("testimonial.text")}"
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontWeight: 700 }}
              >
                {translate("testimonial.author").charAt(0)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {translate("testimonial.author")}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {translate("testimonial.role")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
};
