// hooks/useConnectorPaths.ts
import { useEffect, useState } from "react";

type Coord = { x: number; y: number };

function createPath(start: Coord, end: Coord) {
  const diagX = start.x + (end.x - start.x) * 0.5;
  const diagY = start.y + (end.y - start.y) * 1;
  return `M${start.x},${start.y} L${diagX},${diagY} L${end.x},${diagY} L${end.x},${end.y}`;
}

export const useConnectorPaths = (
  centerRef: React.RefObject<HTMLElement>,
  targets: React.RefObject<HTMLElement>[]
) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (!centerRef.current || targets.some((t) => !t.current)) return;
      const container = centerRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      const getCenter = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      };

      const center = getCenter(centerRef.current);
      const points = targets.map((ref) => getCenter(ref.current!));
      const newPaths = points.map((p) => createPath(center, p));

      setPaths(newPaths);
      setSvgSize({ width: containerRect.width, height: containerRect.height });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [centerRef, targets]);

  return { paths, svgSize };
};
