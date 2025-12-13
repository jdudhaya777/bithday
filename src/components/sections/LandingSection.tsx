import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import TypewriterText from "../TypewriterText";
import Sparkles from "../Sparkles";
import FloatingPetals from "../FloatingPetals";
import ghibliSunrise from "@/assets/ghibli-sunrise.jpg";

const ParallaxClouds = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-ghibli-cream/40 rounded-full blur-xl"
          style={{
            width: 150 + Math.random() * 200,
            height: 60 + Math.random() * 40,
            top: `${10 + Math.random() * 30}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const LandingSection = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleStart = () => {
    // Petal burst confetti
    const colors = ["#f9a8d4", "#fcd34d", "#fecaca", "#fef3c7", "#fbcfe8"];
    
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors,
      shapes: ["circle"],
      gravity: 0.3,
      drift: 1,
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 200);

    setHasStarted(true);
    setTimeout(() => setShowContent(true), 500);
  };

  useEffect(() => {
    // Scroll to next section after animation
    if (showContent) {
      setTimeout(() => {
        const nextSection = document.getElementById("how-we-met");
        if (nextSection) {
          // Just show scroll indicator, don't auto scroll
        }
      }, 4000);
    }
  }, [showContent]);

  return (
    <section className="ghibli-section">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ghibliSunrise})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ghibli-lavender/40 via-transparent to-ghibli-cream/60" />
      </motion.div>

      <ParallaxClouds />
      <Sparkles count={50} color="gold" />
      
      <AnimatePresence>
        {hasStarted && <FloatingPetals count={30} color="rose" />}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div
              key="start-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl md:text-9xl"
              >
                🌸
              </motion.div>
              
              <motion.h1 
                className="font-display text-3xl md:text-5xl text-foreground ghibli-text-shadow"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                A Story Written in the Stars...
              </motion.h1>

              <motion.button
                className="mt-8 px-10 py-5 bg-ghibli-rose/80 backdrop-blur-sm text-foreground font-display text-xl rounded-full shadow-2xl border-2 border-ghibli-gold/30 relative overflow-hidden group"
                onClick={handleStart}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(249, 168, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ["0 0 20px rgba(249, 168, 212, 0.3)", "0 0 40px rgba(249, 168, 212, 0.6)", "0 0 20px rgba(249, 168, 212, 0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  ✨ Tap to Begin Our Story ✨
                </span>
                <motion.div
                  className="absolute inset-0 bg-ghibli-gold/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              <motion.p
                className="text-foreground/60 font-body text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Touch the button to release the magic
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-7xl md:text-9xl"
              >
                🌸
              </motion.div>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground ghibli-text-shadow">
                <TypewriterText
                  text="Happy Birthday, My Love ✨"
                  delay={800}
                  speed={80}
                />
              </h1>

              <motion.p
                className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 4 }}
              >
                Scroll down to begin our magical journey together...
              </motion.p>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
                onClick={() => {
                  document.getElementById("how-we-met")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="text-sm font-body text-foreground/70">Scroll to continue</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl"
                >
                  ↓
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ghibli-cream to-transparent pointer-events-none" />
    </section>
  );
};

export default LandingSection;
