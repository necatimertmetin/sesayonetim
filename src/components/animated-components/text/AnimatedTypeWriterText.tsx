import { motion } from "framer-motion";
import { Box, Typography, useTheme, type TypographyProps } from "@mui/material";

interface AnimatedTypewriterTextProps {
  text: string;
  variant?: TypographyProps["variant"];
  fontSize?: string;
  fontWeight?: number;
  delayPerChar?: number;
  start?: boolean;
}

export const AnimatedTypewriterText = ({
  text,
  variant = "body1",
  fontSize,
  fontWeight = 400,
  delayPerChar = 0.03,
  start = true,
}: AnimatedTypewriterTextProps) => {
  const theme = useTheme();
  const MotionTypography = motion(Typography);

  if (!start) return null;

  return (
    <Box>
      {text.split("").map((letter, i) => (
        <MotionTypography
          key={i}
          variant={variant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: i * delayPerChar,
            duration: 0.02,
          }}
          style={{
            display: "inline-block",
            fontSize,
            fontWeight,
            color: theme.palette.text.primary,
            whiteSpace: "pre", // boşlukları korumak için
          }}
        >
          {letter}
        </MotionTypography>
      ))}
    </Box>
  );
};
