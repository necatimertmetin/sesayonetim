import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "@mui/material";

interface EnterAnimationProps {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  delay?: number;
  start?: boolean;
}

export const EnterAnimation: React.FC<EnterAnimationProps> = ({
  children,
  fontSize = "1.5rem",
  fontWeight = 400,
  delay = 0,
  start = true,
}) => {
  const theme = useTheme();

  if (!start) return null;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        fontSize,
        fontWeight,
        color: theme.palette.text.primary,
        display: "inline-block",
      }}
    >
      {children}
    </motion.div>
  );
};
