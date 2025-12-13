import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Sparkles from "../Sparkles";
import Fireflies from "../Fireflies";
import coupleFireworks from "@/assets/couple-fireworks.jpg";
import ghibliCelebration from "@/assets/ghibli-celebration.jpg";

const BirthdaySurpriseSection = () => {
  const [isActive, setIsActive] = useState(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const [fireworkColors, setFireworkColors] = useState(["#f9a8d4", "#fcd34d"]);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);

  const colorSets = [
    ["#f9a8d4", "#fcd34d", "#c4b5fd"],
    ["#fecaca", "#fef3c7", "#fbcfe8"],
    ["#a5f3fc", "#c4b5fd", "#f9a8d4"],
    ["#fde68a", "#fca5a5", "#d8b4fe"],
  ];

  const triggerFirework = () => {
    const newColors = colorSets[Math.floor(Math.random() * colorSets.length)];
    setFireworkColors(newColors);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6, x: Math.random() },
      colors: newColors,
    });

    // Add floating heart
    setFloatingHearts(prev => [...prev, Date.now()]);
  };

  const handleScreenTap = () => {
    if (!isActive) {
      setIsActive(true);
    }
    triggerFirework();
  };

  const handleFinalSurprise = () => {
    setShowFinalSurprise(true);
    
    // Epic finale
    const duration = 6 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f9a8d4", "#fcd34d", "#c4b5fd", "#ffffff"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f9a8d4", "#fcd34d", "#c4b5fd", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big center burst
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 180,
        origin: { y: 0.5 },
        colors: ["#f9a8d4", "#fcd34d", "#c4b5fd", "#fecaca", "#ffffff"],
        shapes: ["circle", "square"],
      });
    }, 500);
  };

  // Clean up old floating hearts
  useEffect(() => {
    const timer = setInterval(() => {
      setFloatingHearts(prev => prev.filter(h => Date.now() - h < 3000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="ghibli-section cursor-pointer"
      onClick={!showFinalSurprise ? handleScreenTap : undefined}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${showFinalSurprise ? coupleFireworks : ghibliCelebration})`,
        }}
      >
        <div className="absolute inset-0 bg-ghibli-night/30" />
      </div>

      <Sparkles count={70} color="gold" />
      <Fireflies count={40} />

      {/* Floating Hearts from taps */}
      {floatingHearts.map(id => (
        <motion.div
          key={id}
          className="fixed text-4xl pointer-events-none z-30"
          style={{
            left: `${20 + Math.random() * 60}%`,
            bottom: "10%",
          }}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -400, opacity: 0, scale: 0.5 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          💖
        </motion.div>
      ))}

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.div
            className="text-7xl md:text-9xl mb-8"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉
          </motion.div>

          <motion.h2
            className="font-display text-4xl md:text-6xl lg:text-7xl text-ghibli-cream mb-4 ghibli-text-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Happy Birthday,
          </motion.h2>
          <motion.h2
            className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 ghibli-text-shadow"
            style={{ color: `${fireworkColors[0]}` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            animate={{ 
              color: fireworkColors,
              textShadow: [
                `0 0 20px ${fireworkColors[0]}`,
                `0 0 40px ${fireworkColors[1] || fireworkColors[0]}`,
                `0 0 20px ${fireworkColors[0]}`,
              ]
            }}
          >
            My Princess 💖✨
          </motion.h2>

          {!isActive && (
            <motion.p
              className="font-body text-ghibli-cream/80 mb-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Tap anywhere to celebrate! ✨
            </motion.p>
          )}

          {isActive && !showFinalSurprise && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <motion.p
                className="font-body text-ghibli-cream/80 mb-6"
              >
                Keep tapping for more magic! ✨
              </motion.p>

              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-ghibli-rose to-ghibli-gold text-foreground font-display text-xl rounded-full shadow-2xl border-2 border-ghibli-gold/50 relative overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFinalSurprise();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.5)",
                    "0 0 40px rgba(251, 191, 36, 0.8)",
                    "0 0 20px rgba(251, 191, 36, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10">🎁 Tap for Your Last Surprise 🎁</span>
                <motion.div
                  className="absolute inset-0 bg-ghibli-cream/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
          )}

          {/* Final Surprise */}
          <AnimatePresence>
            {showFinalSurprise && (
              <motion.div
                className="mt-8 space-y-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <motion.div
                  className="text-8xl md:text-[10rem]"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💝
                </motion.div>

                <motion.p
                  className="font-display text-2xl md:text-4xl text-ghibli-cream italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  "I love you more than words can ever say."
                </motion.p>

                <motion.p
                  className="font-body text-lg md:text-xl text-ghibli-cream/90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  You are my forever and always.
                </motion.p>

                <motion.p
                  className="font-body text-lg text-ghibli-gold mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  Thank you for being born. Thank you for being mine. 💖
                </motion.p>

                <motion.div
                  className="flex justify-center gap-4 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                >
                  {["🌸", "💗", "✨", "💖", "🌷"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-4xl"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdaySurpriseSection;
