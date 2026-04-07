import { useTheme } from "@mui/material";
import { useEffect, useRef } from "react";

type BackgroundLightProps = {
  color?: string;
  size?: number;
  intensity?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
};

export const BackgroundLight = ({
  color,
  size = 512,
  intensity = 0.1,
  top,
  left,
  right,
  bottom,
}: BackgroundLightProps) => {
  const theme = useTheme();
  const lightColor = color ?? theme.palette.primary.main;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const computedTop = bottom !== undefined ? undefined : (top ?? 0);
  const computedRight = left !== undefined ? undefined : (right ?? 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Parse color to RGB
    const temp = document.createElement("div");
    temp.style.color = lightColor;
    document.body.appendChild(temp);
    const computed = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    const match = computed.match(/(\d+)/g);
    const r = match ? parseInt(match[0]) : 255;
    const g = match ? parseInt(match[1]) : 120;
    const b = match ? parseInt(match[2]) : 0;

    let animId: number;
    const blobCount = 4;
    const blobs = Array.from({ length: blobCount }, (_, i) => ({
      x: size * (0.3 + Math.random() * 0.4),
      y: size * (0.3 + Math.random() * 0.4),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: size * (0.22 + Math.random() * 0.15),
      phase: i * Math.PI * 0.5,
    }));

    const draw = () => {
      const t = Date.now() / 1000;
      ctx.clearRect(0, 0, size, size);

      // Move blobs in smooth paths
      blobs.forEach((blob) => {
        blob.x += Math.sin(t * 0.4 + blob.phase) * 0.4;
        blob.y += Math.cos(t * 0.35 + blob.phase * 1.3) * 0.4;
        // Contain
        if (blob.x < size * 0.15) blob.x = size * 0.15;
        if (blob.x > size * 0.85) blob.x = size * 0.85;
        if (blob.y < size * 0.15) blob.y = size * 0.15;
        if (blob.y > size * 0.85) blob.y = size * 0.85;
      });

      // Draw each blob as radial gradient — they blend together via globalCompositeOperation
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((blob, i) => {
        const pulseFactor = 1 + Math.sin(t * 0.6 + i * 1.2) * 0.12;
        const rad = blob.radius * pulseFactor;

        const grad = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          rad,
        );
        // Shift hue slightly per blob for color variety
        const hueShift = i * 25;
        const rr = Math.min(255, r + hueShift * (i % 2 === 0 ? 1 : -1));
        const gg = Math.min(255, g + hueShift * (i % 2 === 0 ? -1 : 1));

        grad.addColorStop(0, `rgba(${rr}, ${gg}, ${b}, 0.6)`);
        grad.addColorStop(0.4, `rgba(${rr}, ${gg}, ${b}, 0.15)`);
        grad.addColorStop(1, `rgba(${rr}, ${gg}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [lightColor, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        width: size,
        height: size,
        opacity: intensity,
        zIndex: -1,
        pointerEvents: "none",
        top: computedTop,
        left,
        right: computedRight,
        bottom,
        filter: `blur(${size * 0.12}px)`,
      }}
    />
  );
};
