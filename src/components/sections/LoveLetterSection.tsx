import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import Fireflies from "../Fireflies";
import loveLetter from "@/assets/love-letter.jpg";

const LoveLetterSection = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dragY = useMotionValue(0);
  const envelopeRotate = useTransform(dragY, [0, 150], [0, 20]);
  const flapRotate = useTransform(dragY, [0, 100, 150], [0, -90, -180]);

  const letterContent = [
    "My Dearest Love,",
    "",
    "Thank you for being in my life.",
    "Thank you for loving me.",
    "You are my heart and my magic.",
    "",
    "I promise to love you endlessly,",
    "to cherish every moment with you,",
    "and to be your partner in all of life's adventures.",
    "",
    "Forever yours,",
    "With all my love ❤️",
  ];

  const handleDrag = (_: any, info: any) => {
    if (info.offset.y > 100 && !isOpening) {
      setIsOpening(true);
      setTimeout(() => setIsOpen(true), 800);
    }
  };

  return (
    <section className="ghibli-section gradient-night">
      <Fireflies count={40} />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loveLetter})`, filter: "blur(20px)" }}
        />
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-6xl mb-4 inline-block">💌</span>
          <h2 className="font-display text-3xl md:text-5xl text-ghibli-cream mb-4">
            A Letter For You
          </h2>
          {!isOpen && (
            <motion.p
              className="font-body text-ghibli-cream/70"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Pull down the envelope to open...
            </motion.p>
          )}
        </motion.div>

        {/* Envelope */}
        <AnimatePresence>
          {!isOpen && (
          <motion.div
            className="relative mx-auto cursor-grab active:cursor-grabbing"
            drag="y"
            dragConstraints={{ top: 0, bottom: 150 }}
            dragElastic={0.5}
            onDrag={handleDrag}
            style={{ width: 320, height: 220, perspective: 1000, y: dragY, rotateX: envelopeRotate }}
            initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-b from-ghibli-cream to-ghibli-peach rounded-lg shadow-2xl overflow-hidden">
                {/* Envelope texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-ghibli-rose/10 to-transparent" />
                
                {/* Heart seal */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={isOpening ? { scale: 0, opacity: 0 } : { scale: [1, 1.1, 1] }}
                  transition={isOpening ? { duration: 0.3 } : { duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                    <span className="text-3xl">💝</span>
                  </div>
                </motion.div>

                {/* Inner letter peek */}
                <div className="absolute bottom-4 left-4 right-4 h-8 bg-ghibli-cream rounded-t-lg shadow-inner opacity-50" />
              </div>

              {/* Envelope flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-28 origin-top"
                style={{
                  background: "linear-gradient(180deg, hsl(340 70% 80%) 0%, hsl(35 60% 90%) 100%)",
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  rotateX: isOpening ? -180 : flapRotate,
                  transformStyle: "preserve-3d",
                }}
                transition={{ duration: 0.8 }}
              />

              {/* Drag indicator */}
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-ghibli-cream/60 text-sm font-body">↓ Pull down ↓</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="bg-ghibli-cream/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-ghibli-rose/30 max-w-2xl mx-auto"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Letter paper texture */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <div className="w-full h-full bg-[linear-gradient(transparent_95%,_hsl(var(--ghibli-rose)/0.3)_95%)] bg-[length:100%_2rem]" />
                </div>

                <div className="relative z-10">
                  {letterContent.map((line, index) => (
                    <motion.p
                      key={index}
                      className={`font-body text-foreground ${
                        index === 0 ? "font-display text-2xl mb-4" : 
                        line === "" ? "h-4" : 
                        line.includes("Forever") ? "mt-4 font-display text-lg" :
                        "text-lg leading-relaxed"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                {/* Decorative hearts */}
                <motion.div
                  className="absolute -top-4 -right-4 text-4xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  💗
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 text-3xl"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  🌸
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveLetterSection;
