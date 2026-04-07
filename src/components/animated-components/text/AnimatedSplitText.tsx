import { motion } from "framer-motion";
import React from "react";
import { Box, Typography, useTheme, type TypographyProps } from "@mui/material";

interface AnimatedSplitTextProps {
  text: string;
  variant?: TypographyProps["variant"];
  fontSize?: string;
  fontWeight?: number;
  delayPerChar?: number;
  start?: boolean;
}

export const AnimatedSplitText: React.FC<AnimatedSplitTextProps> = ({
  text,
  variant = "body1",
  fontSize,
  fontWeight = 400,
  delayPerChar = 0.05,
  start = true,
}) => {
  const theme = useTheme();
  const MotionTypography = motion(Typography);

  if (!start) return null;

  return (
    <Box>
      {text.split("").map((letter, i) => (
        <MotionTypography
          key={i}
          variant={variant}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: i * delayPerChar,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          sx={{
            display: "inline-block",
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: theme.palette.text.primary,
            whiteSpace: "pre", // boşlukları koru
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </MotionTypography>
      ))}
    </Box>
  );
};
