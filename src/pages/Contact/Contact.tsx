import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../providers/useTranslation";
import { BackgroundLight } from "../../components/animated-components/div/BackgroundLight";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import type { FormEvent } from "react";

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2.5,
          background: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          display: "flex",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 600, letterSpacing: 0.5 }}
        >
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export const Contact = () => {
  const { translate } = useTranslation("pages.contact");
  const theme = useTheme();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

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
            {translate("title")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            {translate("subtitle")}
          </Typography>
        </motion.div>
      </Box>

      <Box
        sx={{
          px: { xs: 3, sm: 5, md: 8, lg: 12 },
          pb: { xs: 10, md: 16 },
          maxWidth: 1300,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: 8 },
        }}
      >
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ flex: 1 }}
        >
          <Stack spacing={4}>
            <InfoItem
              icon={<EmailRoundedIcon />}
              label={translate("emailLabel")}
              value={translate("email")}
            />
            <InfoItem
              icon={<PhoneRoundedIcon />}
              label={translate("phoneLabel")}
              value={translate("phone")}
            />
            <InfoItem
              icon={<BusinessRoundedIcon />}
              label={translate("companyLabel")}
              value={`${translate("companyName")}\n${translate("companyNote")}`}
            />
            <InfoItem
              icon={<LocationOnRoundedIcon />}
              label={translate("addressLabel")}
              value={translate("address")}
            />

            <Chip
              label={translate("responseTime")}
              size="small"
              sx={{
                alignSelf: "flex-start",
                px: 1,
                background: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                fontWeight: 600,
              }}
            />
          </Stack>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ flex: 1 }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.5),
              backdropFilter: "blur(16px)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              {translate("form.title")}
            </Typography>
            <Stack spacing={2.5}>
              <TextField
                label={translate("form.name")}
                fullWidth
                variant="outlined"
                required
              />
              <TextField
                label={translate("form.email")}
                fullWidth
                variant="outlined"
                type="email"
                required
              />
              <TextField
                label={translate("form.subject")}
                fullWidth
                variant="outlined"
                required
              />
              <TextField
                label={translate("form.message")}
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  textTransform: "none",
                  py: 1.5,
                  borderRadius: 2.5,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.35)}`,
                }}
              >
                {translate("form.submit")}
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};
