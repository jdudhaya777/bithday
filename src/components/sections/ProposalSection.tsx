import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import Sparkles from "../Sparkles";
import FloatingPetals from "../FloatingPetals";
import Fireflies from "../Fireflies";

// Import proposal images
import ghibliProposal from "@/assets/ghibli-proposal.jpg";
import lotusBloom from "@/assets/lotus-bloom.jpg";
import magicOrb from "@/assets/magic-orb.jpg";

type ProposalStage = "orb" | "lotus" | "ring" | "fireworks";

const ProposalSection = () => {
  const [stage, setStage] = useState<ProposalStage>("orb");
  const [showMessage, setShowMessage] = useState(false);

  const handleOrbClick = () => {
    // Sparkle burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ["#fcd34d", "#f9a8d4", "#ffffff"],
    });
    setStage("lotus");
    setTimeout(() => setStage("ring"), 2000);
    setTimeout(() => setShowMessage(true), 3500);
  };

  const handleRingClick = () => {
    setStage("fireworks");
    
    // Epic fireworks
    const colors = ["#f9a8d4", "#fcd34d", "#c4b5fd", "#ffffff", "#fecaca"];
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Center burst
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors,
    });
  };

  return (
    <section className="ghibli-section relative overflow-hidden">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        {stage === "orb" && (
          <motion.div
            key="orb-bg"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${magicOrb})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-ghibli-sage-dark/30" />
          </motion.div>
        )}
        {stage === "lotus" && (
          <motion.div
            key="lotus-bg"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${lotusBloom})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-ghibli-rose/10" />
          </motion.div>
        )}
        {(stage === "ring" || stage === "fireworks") && (
          <motion.div
            key="ring-bg"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ghibliProposal})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-ghibli-gold/20 via-transparent to-ghibli-rose/30" />
          </motion.div>
        )}
      </AnimatePresence>

      <Sparkles count={60} color="gold" />
      <FloatingPetals count={20} color="rose" />
      {stage === "fireworks" && <Fireflies count={30} />}

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-5xl mb-4 inline-block animate-pulse-glow">✨</span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4 ghibli-text-shadow">
            A Promise
          </h2>
        </motion.div>

        {/* Interactive Element Container */}
        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Stage 1: Glowing Orb */}
            {stage === "orb" && (
              <motion.div
                key="orb"
                className="cursor-pointer"
                onClick={handleOrbClick}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-ghibli-gold via-ghibli-gold-glow to-ghibli-rose flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(251, 191, 36, 0.5)",
                      "0 0 60px rgba(251, 191, 36, 0.8)",
                      "0 0 30px rgba(251, 191, 36, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-5xl">✨</span>
                </motion.div>
                <motion.p
                  className="font-body text-foreground mt-6"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap the magical orb...
                </motion.p>
              </motion.div>
            )}

            {/* Stage 2: Lotus Blooming */}
            {stage === "lotus" && (
              <motion.div
                key="lotus"
                className="text-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1.5, type: "spring" }}
              >
                <motion.div
                  className="text-9xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌸
                </motion.div>
                <motion.p
                  className="font-display text-2xl text-foreground mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  The lotus blooms...
                </motion.p>
              </motion.div>
            )}

            {/* Stage 3: Ring Reveal */}
            {(stage === "ring" || stage === "fireworks") && (
              <motion.div
                key="ring"
                className="text-center"
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <motion.div
                  className={`text-8xl md:text-9xl mb-8 ${stage === "ring" ? "cursor-pointer" : ""}`}
                  onClick={stage === "ring" ? handleRingClick : undefined}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    filter: [
                      "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))",
                      "drop-shadow(0 0 40px rgba(251, 191, 36, 0.9))",
                      "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={stage === "ring" ? { scale: 1.2 } : {}}
                  whileTap={stage === "ring" ? { scale: 0.9 } : {}}
                >
                  💍
                </motion.div>

                {stage === "ring" && !showMessage && (
                  <motion.p
                    className="font-body text-foreground animate-pulse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Will you tap the ring? 💫
                  </motion.p>
                )}

                {/* Messages */}
                <AnimatePresence>
                  {showMessage && (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <motion.p
                        className="font-display text-2xl md:text-3xl text-foreground italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        "One day… I want to give you this for real."
                      </motion.p>
                      <motion.p
                        className="font-body text-lg md:text-xl text-foreground/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                      >
                        Because I choose you — today, tomorrow, and always.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Fireworks celebration message */}
                {stage === "fireworks" && (
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.p
                      className="font-display text-3xl md:text-4xl text-ghibli-gold ghibli-text-shadow"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      You said yes to my heart! 💖
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProposalSection;
