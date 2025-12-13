import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useState, useEffect } from "react";
import Fireflies from "../Fireflies";
import ghibliStarryNight from "@/assets/ghibli-starry-night.jpg";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  reason: string;
  emoji: string;
  size: number;
}

const reasons = [
  { reason: "Your kindness that touches everyone around you", emoji: "💗" },
  { reason: "Your strength that inspires me every day", emoji: "💪" },
  { reason: "Your smile that lights up my darkest days", emoji: "😊" },
  { reason: "Your innocence that makes the world beautiful", emoji: "🌸" },
  { reason: "Your love that makes me want to be better", emoji: "💖" },
  { reason: "Your presence that completes my world", emoji: "✨" },
  { reason: "You are my peace and my adventure", emoji: "🌙" },
];

const WhyILoveYouSection = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [activeHeart, setActiveHeart] = useState<number | null>(null);
  const [revealedHearts, setRevealedHearts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newHearts: FloatingHeart[] = reasons.map((r, i) => ({
      id: i,
      x: 15 + (i % 3) * 30 + Math.random() * 10,
      y: 20 + Math.floor(i / 3) * 35 + Math.random() * 10,
      reason: r.reason,
      emoji: r.emoji,
      size: 50 + Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  const handleHeartClick = (id: number) => {
    setActiveHeart(activeHeart === id ? null : id);
    setRevealedHearts(prev => new Set([...prev, id]));
  };

  return (
    <section className="ghibli-section relative overflow-hidden">
      {/* Starry Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ghibliStarryNight})` }}
      >
        <div className="absolute inset-0 bg-ghibli-night/40" />
      </div>

      <Fireflies count={50} />

      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.span
            className="text-6xl mb-4 inline-block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💖
          </motion.span>
          <h2 className="font-display text-3xl md:text-5xl text-ghibli-cream mb-4 ghibli-text-shadow">
            Why I Love You
          </h2>
          <p className="font-body text-ghibli-cream/70 mb-2">
            Tap or drag the floating hearts to discover...
          </p>
          <p className="font-body text-sm text-ghibli-gold">
            {revealedHearts.size} / {hearts.length} reasons discovered ✨
          </p>
        </motion.div>

        {/* Floating Hearts Container */}
        <div className="relative w-full max-w-4xl h-[400px] md:h-[500px]">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute cursor-pointer"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
              }}
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.2, zIndex: 100 }}
              onClick={() => handleHeartClick(heart.id)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: heart.id * 0.1 },
                scale: { duration: 0.5, delay: heart.id * 0.1 },
                y: { duration: 3 + Math.random() * 2, repeat: Infinity, delay: heart.id * 0.2 }
              }}
            >
              {/* Heart */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={activeHeart === heart.id ? { 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.3, 1.1]
                } : {}}
              >
                <motion.div
                  className="text-5xl md:text-6xl filter drop-shadow-lg"
                  style={{ fontSize: heart.size }}
                  animate={{
                    filter: revealedHearts.has(heart.id) 
                      ? "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))"
                      : "drop-shadow(0 0 10px rgba(249, 168, 212, 0.5))"
                  }}
                >
                  {revealedHearts.has(heart.id) ? "💛" : "💗"}
                </motion.div>

                {/* Sparkle around revealed hearts */}
                {revealedHearts.has(heart.id) && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-sm"
                        style={{
                          top: `${Math.sin(i * Math.PI / 2) * 30}px`,
                          left: `${Math.cos(i * Math.PI / 2) * 30 + 20}px`,
                        }}
                      >
                        ✨
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Popup Bubble */}
              <AnimatePresence>
                {activeHeart === heart.id && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-64 md:w-80 z-50"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-ghibli-cream/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border-2 border-ghibli-gold/40 relative">
                      {/* Pointer */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-ghibli-cream/95 rotate-45 border-r-2 border-b-2 border-ghibli-gold/40" />
                      
                      <div className="text-center relative z-10">
                        <span className="text-4xl mb-3 block">{heart.emoji}</span>
                        <p className="font-body text-foreground italic leading-relaxed">
                          "{heart.reason}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyILoveYouSection;
