import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface FloatingPetalsProps {
  count?: number;
  color?: "rose" | "gold" | "white";
}

const FloatingPetals = ({ count = 20, color = "rose" }: FloatingPetalsProps) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      size: 8 + Math.random() * 16,
      rotation: Math.random() * 360,
    }));
    setPetals(newPetals);
  }, [count]);

  const colorClasses = {
    rose: "bg-ghibli-rose/60",
    gold: "bg-ghibli-gold/60",
    white: "bg-ghibli-cream/80",
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className={`absolute rounded-full ${colorClasses[color]}`}
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size * 0.6,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
          initial={{ y: -50, rotate: petal.rotation, opacity: 0 }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, Math.sin(petal.id) * 100, Math.cos(petal.id) * 50, 0],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
