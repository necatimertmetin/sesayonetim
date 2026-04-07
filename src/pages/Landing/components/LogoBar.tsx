import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";

export const LogoBar = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: { xs: 3, sm: 5, md: 8, lg: 12 },
        py: { xs: 6, md: 8 },
        maxWidth: 1300,
        mx: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontWeight: 500,
            letterSpacing: 1,
            textTransform: "uppercase",
            fontSize: "0.7rem",
          }}
        >
          {translate("trustedBy")}
        </Typography>
        <Stack
          direction="row"
          spacing={{ xs: 3, md: 6 }}
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          sx={{ mt: 4, rowGap: 3 }}
        >
          {["Amazon FBA", "Amazon FBM", "Shopify", "Walmart", "eBay"].map(
            (name) => (
              <Typography
                key={name}
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: alpha(theme.palette.text.primary, 0.2),
                  letterSpacing: 1,
                  fontSize: { xs: "0.9rem", md: "1.2rem" },
                  userSelect: "none",
                }}
              >
                {name}
              </Typography>
            ),
          )}
        </Stack>
      </motion.div>
    </Box>
  );
};
