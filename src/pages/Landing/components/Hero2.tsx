import { Box, Typography, Stack } from "@mui/material";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, useCallback, type MouseEvent, type ReactNode } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import { useTranslation } from "../../../providers/useTranslation";

/* ═══════════════════════════════════════════
   3-D TILT CARD  (scroll-triggered + hover)
   ═══════════════════════════════════════════ */
const TiltCard = ({
  children,
  delay = 0,
  sx: cardSx = {},
}: {
  children: ReactNode;
  delay?: number;
  sx?: Record<string, unknown>;
}) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(viewRef, { once: true, margin: "-60px" });

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!tiltRef.current) return;
      const r = tiltRef.current.getBoundingClientRect();
      rx.set(((e.clientY - r.top) / r.height - 0.5) * -10);
      ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    },
    [rx, ry],
  );
  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return (
    <motion.div
      ref={viewRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ height: "100%" }}
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX: srx,
          rotateY: sry,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
          height: "100%",
        }}
      >
        <Box sx={{ height: "100%", ...cardSx }}>{children}</Box>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   MINI BAR CHART  (animated)
   ═══════════════════════════════════════════ */
const MiniChart = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const bars = [40, 65, 45, 80, 55, 92, 70, 85, 60, 95, 50, 78];

  return (
    <Stack
      direction="row"
      spacing={0.6}
      alignItems="flex-end"
      sx={{ height: 100, mt: 2 }}
    >
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.6 + i * 0.06,
            ease: "easeOut",
          }}
          style={{
            flex: 1,
            borderRadius: 3,
            background:
              i === bars.length - 1 || i === bars.length - 4
                ? primary
                : i % 3 === 0
                  ? secondary
                  : alpha(theme.palette.text.primary, 0.12),
          }}
        />
      ))}
    </Stack>
  );
};

/* ═══════════════════════════════════════════
   SCROLLING MARQUEE
   ═══════════════════════════════════════════ */
const Marquee = ({ items }: { items: string[] }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const doubled = [...items, ...items];

  return (
    <Box sx={{ overflow: "hidden", width: "100%", py: 1 }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 24, whiteSpace: "nowrap" }}
      >
        {doubled.map((t, i) => (
          <Typography
            key={i}
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: 1.5,
              color: i % 2 === 0 ? primary : secondary,
              opacity: 0.7,
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            {t}
          </Typography>
        ))}
      </motion.div>
    </Box>
  );
};

/* ═══════════════════════════════════════════
   PULSING RING (animated SVG)
   ═══════════════════════════════════════════ */
const PulsingRing = ({
  color,
  size = 90,
}: {
  color: string;
  size?: number;
}) => (
  <Box sx={{ position: "relative", width: size, height: size }}>
    {[0, 0.6, 1.2].map((d) => (
      <motion.div
        key={d}
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
        transition={{
          duration: 2.4,
          delay: d,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `2px solid ${color}`,
        }}
      />
    ))}
    <Box
      sx={{
        position: "absolute",
        inset: "25%",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${alpha(color, 0.3)}, transparent 70%)`,
      }}
    />
  </Box>
);

/* ═══════════════════════════════════════════
   HERO 2  — BENTO GRID
   ═══════════════════════════════════════════ */
export const Hero2 = () => {
  const { translate } = useTranslation("pages.landing");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const glass = {
    background: alpha(theme.palette.background.paper, isDark ? 0.35 : 0.55),
    backdropFilter: "blur(20px)",
    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.12 : 0.08)}`,
    borderRadius: 4,
    p: { xs: 3, md: 4 },
    position: "relative" as const,
    overflow: "hidden",
    transition: "border-color 0.3s, box-shadow 0.3s",
    "&:hover": {
      borderColor: alpha(primary, 0.35),
      boxShadow: `0 8px 40px ${alpha(primary, 0.08)}`,
    },
  };

  const marqueeItems = [
    "FBA",
    "Inventory",
    "PPC",
    "Account Health",
    "Logistics",
    "Finance",
    "SEO",
    "Product Launch",
    "Brand Registry",
    "A+ Content",
  ];

  const features = [
    { icon: "📦", label: translate("hero2.feat1") },
    { icon: "📊", label: translate("hero2.feat2") },
    { icon: "🛡️", label: translate("hero2.feat3") },
    { icon: "🚀", label: translate("hero2.feat4") },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 10, md: 14 },
        maxWidth: 1200,
        mx: "auto",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* ── SECTION HEADER ── */}
      <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: secondary,
              mb: 2,
            }}
          >
            {translate("hero2.tag")}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              mb: 2,
            }}
          >
            {translate("hero2.title")}{" "}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {translate("hero2.titleHighlight")}
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.7,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            {translate("hero2.subtitle")}
          </Typography>
        </motion.div>

        {/* animated gradient line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "center", marginTop: 32 }}
        >
          <Box
            sx={{
              height: 2,
              mx: "auto",
              maxWidth: 120,
              borderRadius: 1,
              background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            }}
          />
        </motion.div>
      </Box>

      {/* ── BENTO GRID ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gridTemplateRows: { md: "auto auto auto" },
          gap: 2.5,
        }}
      >
        {/* CARD 1 — Dashboard (spans 2 cols) */}
        <Box sx={{ gridColumn: { md: "span 2" } }}>
          <TiltCard delay={0.1} sx={glass}>
            {/* shimmer border top */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${primary}, ${secondary}, transparent)`,
                opacity: 0.5,
              }}
            />
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: secondary,
                mb: 0.5,
              }}
            >
              {translate("hero2.dashTag")}
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
                mb: 1,
              }}
            >
              {translate("hero2.dashTitle")}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                mb: 1,
              }}
            >
              {translate("hero2.dashDesc")}
            </Typography>
            <MiniChart />
          </TiltCard>
        </Box>

        {/* CARD 2 — Counter / Live Metric */}
        <TiltCard delay={0.2} sx={glass}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
              minHeight: 200,
            }}
          >
            <PulsingRing color={primary} />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "2.4rem",
                mt: 2,
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              200+
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                mt: 0.5,
              }}
            >
              {translate("hero2.metricLabel")}
            </Typography>
          </Box>
        </TiltCard>

        {/* CARD 3 — Features list */}
        <TiltCard delay={0.3} sx={glass}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              mb: 2.5,
            }}
          >
            {translate("hero2.featTitle")}
          </Typography>
          <Stack spacing={2}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: alpha(
                        i % 2 === 0 ? primary : secondary,
                        isDark ? 0.15 : 0.1,
                      ),
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "text.primary",
                    }}
                  >
                    {f.label}
                  </Typography>
                </Stack>
              </motion.div>
            ))}
          </Stack>
        </TiltCard>

        {/* CARD 4 — Marquee (spans 2 cols) */}
        <Box sx={{ gridColumn: { md: "span 2" } }}>
          <TiltCard delay={0.4} sx={glass}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: primary,
                mb: 1.5,
              }}
            >
              {translate("hero2.marqueeTag")}
            </Typography>
            <Marquee items={marqueeItems} />
            <Box sx={{ mt: 2 }}>
              <Marquee items={[...marqueeItems].reverse()} />
            </Box>
          </TiltCard>
        </Box>

        {/* CARD 5 — Testimonial snippet */}
        <TiltCard delay={0.5} sx={glass}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              minHeight: 170,
            }}
          >
            <Typography
              sx={{
                fontSize: "2.4rem",
                lineHeight: 1,
                color: alpha(primary, 0.3),
                fontWeight: 800,
                fontFamily: "Georgia, serif",
              }}
            >
              &ldquo;
            </Typography>
            <Typography
              sx={{
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "text.secondary",
                fontStyle: "italic",
                flex: 1,
              }}
            >
              {translate("hero2.quote")}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                AS
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    lineHeight: 1.2,
                  }}
                >
                  {translate("hero2.quoteAuthor")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    color: "text.secondary",
                  }}
                >
                  {translate("hero2.quoteRole")}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </TiltCard>
      </Box>
    </Box>
  );
};
