

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

export function MagneticButton({
  children,
  href,
  variant = "solid",
  className = "",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.45);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[0.95rem] font-medium transition-colors duration-300";
  const styles = {
    solid: "bg-blue text-white font-semibold hover:bg-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]",
    outline: "border border-line text-text hover:border-blue hover:text-blue hover:bg-blue/5",
    ghost: "text-text/80 hover:text-blue",
  } as const;

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
