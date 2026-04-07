import { Box, Button, Typography, Stack, useTheme } from "@mui/material";
import { BackgroundLight } from "../../components/animated-components/div/BackgroundLight";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTranslation } from "../../providers/useTranslation";

export const ErrorPage = () => {
  const theme = useTheme();
  const MotionBox = motion(Box);
  const { translate } = useTranslation("pages.error");

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Background Lights */}
      <BackgroundLight intensity={0.7} />
      <BackgroundLight
        color={theme.palette.secondary.main}
        intensity={0.15}
        bottom={0}
        left={0}
      />

      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        sx={{
          textAlign: "center",
          maxWidth: 600,
          p: 5,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.03)"
              : "rgba(0,0,0,0.04)",
          boxShadow: "0 0 35px rgba(0,0,0,0.08)",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <ErrorOutlineIcon
            sx={{
              fontSize: 90,
              color: theme.palette.primary.main,
            }}
          />

          <Typography variant="h3" fontWeight="bold">
            {translate("title")}
          </Typography>

          <Typography variant="h6" color="text.secondary">
            {translate("subtitle")}
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              mt: 2,
              px: 4,
            }}
          >
            {translate("goHome")}
          </Button>
        </Stack>
      </MotionBox>
    </Box>
  );
};
