import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import { Hero } from "./components/Hero";
import { LogoBar } from "./components/LogoBar";
import { WhyUs } from "./components/WhyUs";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { AboutPreview } from "./components/AboutPreview";
import { Testimonial } from "./components/Testimonial";
import { CtaSection } from "./components/CtaSection";

/* ── Floating dot grid with connecting lines ── */
const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    // Parse colors
    const parseColor = (c: string) => {
      const tmp = document.createElement("div");
      tmp.style.color = c;
      document.body.appendChild(tmp);
      const m = getComputedStyle(tmp).color.match(/(\d+)/g);
      document.body.removeChild(tmp);
      return m ? [+m[0], +m[1], +m[2]] : [255, 120, 0];
    };
    const [pr, pg, pb] = parseColor(primary);
    const [sr, sg, sb] = parseColor(secondary);

    // Particles
    type Particle = {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      r: number;
      color: number[];
      alpha: number;
    };
    let particles: Particle[] = [];

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.documentElement.scrollHeight;
      particles = [];

      const spacing = 120;
      const cols = Math.ceil(w / spacing);
      const rows = Math.ceil(h / spacing);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + spacing / 2 + (Math.random() - 0.5) * 30;
          const y = row * spacing + spacing / 2 + (Math.random() - 0.5) * 30;
          const isPrimary = Math.random() > 0.3;
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            r: 1 + Math.random() * 1.5,
            color: isPrimary ? [pr, pg, pb] : [sr, sg, sb],
            alpha: 0.15 + Math.random() * 0.25,
          });
        }
      }
    };

    const connectDist = 140;
    const mouseDist = 200;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const scrollY = window.scrollY;
      const viewTop = scrollY;
      const viewBottom = scrollY + window.innerHeight;

      // Only process/draw particles near viewport
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.y < viewTop - 200 || p.y > viewBottom + 200) continue;

        // Gentle float
        p.x += p.vx;
        p.y += p.vy;

        // Bounce back to base
        const dx = p.baseX - p.x;
        const dy = p.baseY - p.y;
        p.vx += dx * 0.0003;
        p.vy += dy * 0.0003;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Mouse repulsion
        const mdx = p.x - mouseX;
        const mdy = p.y - (mouseY + scrollY);
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouseDist) {
          const force = (1 - mDist / mouseDist) * 2;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }

        // Draw dot
        const baseAlpha = isDark ? p.alpha : p.alpha * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${baseAlpha})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          if (q.y < viewTop - 200 || q.y > viewBottom + 200) continue;
          const cdx = p.x - q.x;
          const cdy = p.y - q.y;
          const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cDist < connectDist) {
            const lineAlpha =
              (1 - cDist / connectDist) * (isDark ? 0.06 : 0.04);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const handleMouse = (e: globalThis.MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    init();
    animId = requestAnimationFrame(draw);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", init);
    };
  }, [isDark, primary, secondary]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export const Landing = () => {
  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      <DotGrid />

      <Hero />
      <LogoBar />
      <WhyUs />
      <Stats />
      <Services />
      <AboutPreview />
      <Testimonial />
      <CtaSection />
    </Box>
  );
};
