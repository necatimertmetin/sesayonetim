import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "@mui/material";

interface EnterAnimation2Props {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  delay?: number;
  start?: boolean;
}

export const EnterAnimation2: React.FC<EnterAnimation2Props> = ({
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
      initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 12,
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
