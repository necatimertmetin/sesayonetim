import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticCursorProps {
  children: React.ReactNode;
  strength?: number; // Manyetik etki mesafesi (px)
  style?: React.CSSProperties;
  className?: string;
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({
  children,
  strength = 50,
  style,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  // Spring ile daha yumuşak animasyon
  const springX = useSpring(offsetX, { stiffness: 300, damping: 30 });
  const springY = useSpring(offsetY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < strength) {
        const force = (strength - distance) / strength;
        offsetX.set(deltaX * force * 0.5);
        offsetY.set(deltaY * force * 0.5);
      } else {
        offsetX.set(0);
        offsetY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [strength, offsetX, offsetY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        cursor: "pointer",
        x: springX,
        y: springY,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticCursor;
