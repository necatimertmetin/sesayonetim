import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Box, useTheme } from "@mui/material";
import { Footer } from "./footer/Footer";
import { alpha } from "@mui/material/styles";
import { useEffect, useRef } from "react";

const NoiseBackground = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Simple 2D value noise
    const perm = new Uint8Array(512);
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    for (let i = 256; i < 512; i++) perm[i] = perm[i - 256];

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + t * (b - a);
    const grad = (hash: number, x: number, y: number) => {
      const h = hash & 3;
      const u = h < 2 ? x : y;
      const v = h < 2 ? y : x;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };
    const noise = (x: number, y: number) => {
      const xi = Math.floor(x) & 255,
        yi = Math.floor(y) & 255;
      const xf = x - Math.floor(x),
        yf = y - Math.floor(y);
      const u = fade(xf),
        v = fade(yf);
      const aa = perm[perm[xi] + yi],
        ab = perm[perm[xi] + yi + 1];
      const ba = perm[perm[xi + 1] + yi],
        bb = perm[perm[xi + 1] + yi + 1];
      return lerp(
        lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
        lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
        v,
      );
    };

    const lineColor = isDark
      ? alpha(theme.palette.primary.main, 0.09)
      : alpha(theme.palette.primary.main, 0.3);

    const draw = () => {
      const t = Date.now() / 12000;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = isDark ? 0.8 : 1.2;

      const scale = 0.003;
      const step = 6;
      const contourLevels = 12;

      // Build noise field
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 1;
      const field: number[][] = [];
      for (let j = 0; j < rows; j++) {
        field[j] = [];
        for (let i = 0; i < cols; i++) {
          const nx = i * step * scale + t;
          const ny = j * step * scale + t * 0.6;
          field[j][i] =
            noise(nx, ny) * 0.6 +
            noise(nx * 2.1, ny * 2.1) * 0.3 +
            noise(nx * 4.3, ny * 4.3) * 0.1;
        }
      }

      // Marching squares — draw contour lines
      for (let level = 0; level < contourLevels; level++) {
        const threshold = -0.5 + (level / contourLevels) * 1.0;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j][i] >= threshold ? 1 : 0;
            const b = field[j][i + 1] >= threshold ? 1 : 0;
            const c = field[j + 1][i + 1] >= threshold ? 1 : 0;
            const d = field[j + 1][i] >= threshold ? 1 : 0;
            const cell = a * 8 + b * 4 + c * 2 + d;
            if (cell === 0 || cell === 15) continue;

            const x = i * step;
            const y = j * step;
            const interpTop =
              x +
              ((threshold - field[j][i]) / (field[j][i + 1] - field[j][i])) *
                step;
            const interpBottom =
              x +
              ((threshold - field[j + 1][i]) /
                (field[j + 1][i + 1] - field[j + 1][i])) *
                step;
            const interpLeft =
              y +
              ((threshold - field[j][i]) / (field[j + 1][i] - field[j][i])) *
                step;
            const interpRight =
              y +
              ((threshold - field[j][i + 1]) /
                (field[j + 1][i + 1] - field[j][i + 1])) *
                step;

            const segments: [number, number, number, number][] = [];
            switch (cell) {
              case 1:
              case 14:
                segments.push([x, interpLeft, interpBottom, y + step]);
                break;
              case 2:
              case 13:
                segments.push([interpBottom, y + step, x + step, interpRight]);
                break;
              case 3:
              case 12:
                segments.push([x, interpLeft, x + step, interpRight]);
                break;
              case 4:
              case 11:
                segments.push([interpTop, y, x + step, interpRight]);
                break;
              case 5:
                segments.push([interpTop, y, x, interpLeft]);
                segments.push([interpBottom, y + step, x + step, interpRight]);
                break;
              case 6:
              case 9:
                segments.push([interpTop, y, interpBottom, y + step]);
                break;
              case 7:
              case 8:
                segments.push([interpTop, y, x, interpLeft]);
                break;
              case 10:
                segments.push([interpTop, y, x + step, interpRight]);
                segments.push([x, interpLeft, interpBottom, y + step]);
                break;
            }

            for (const [x1, y1, x2, y2] of segments) {
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
            }
          }
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isDark, theme.palette.primary.main]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
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

export const PageLayout = () => {
  const theme = useTheme();
  return (
    <Box>
      <Header />
      <Box
        sx={{
          position: "relative",
          color: theme.palette.text.primary,
        }}
      >
        <NoiseBackground />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
