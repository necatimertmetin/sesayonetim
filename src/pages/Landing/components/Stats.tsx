import { Box, Stack, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";

const AnimatedCounter = ({
  target,
  suffix = "+",
}: {
  target: number;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const step = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const statItems = [
  { key: "sellers", value: 200, suffix: "+" },
  { key: "products", value: 50, suffix: "K+" },
  { key: "experience", value: 10, suffix: "+" },
  { key: "countries", value: 5, suffix: "+" },
];

export const Stats = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();

  return (
    <Box sx={{ px: { xs: 3, sm: 5, md: 8, lg: 12 }, py: { xs: 8, md: 10 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 3, md: 4 }}
        justifyContent="center"
        alignItems="stretch"
        sx={{ maxWidth: 1300, mx: "auto" }}
      >
        {statItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            style={{ flex: 1 }}
          >
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                background: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(16px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                textAlign: "center",
                height: "100%",
              }}
            >
              <Stack alignItems="center" spacing={0.5}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontFamily: "monospace",
                    letterSpacing: "-0.02em",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <AnimatedCounter target={item.value} suffix={item.suffix} />
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: 500 }}
                >
                  {translate(`stats.${item.key}`)}
                </Typography>
              </Stack>
            </Box>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};
