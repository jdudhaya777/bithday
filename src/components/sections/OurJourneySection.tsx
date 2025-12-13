import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Sparkles from "../Sparkles";

// Import journey images
import journeyLateNight from "@/assets/journey-late-night.jpg";
import journeyFunMoments from "@/assets/journey-fun-moments.jpg";
import journeySupport from "@/assets/journey-support.jpg";
import journeySunset from "@/assets/journey-sunset.jpg";
import storySpecialMoment from "@/assets/story-special-moment.jpg";

interface JourneyMoment {
  image: string;
  title: string;
  hiddenText: string;
  emoji: string;
}

const journeyMoments: JourneyMoment[] = [
  {
    image: journeyLateNight,
    title: "Late-Night Talks",
    hiddenText: "Those endless conversations where time stood still...",
    emoji: "🌙",
  },
  {
    image: journeyFunMoments,
    title: "Fun Adventures",
    hiddenText: "Every moment with you is an adventure I treasure.",
    emoji: "🎉",
  },
  {
    image: journeySupport,
    title: "Always There",
    hiddenText: "You held me up when I couldn't stand on my own.",
    emoji: "🤗",
  },
  {
    image: journeySunset,
    title: "Peaceful Moments",
    hiddenText: "Just being with you is all I ever need.",
    emoji: "🌅",
  },
  {
    image: storySpecialMoment,
    title: "Deep Connection",
    hiddenText: "Our souls speak a language only we understand.",
    emoji: "💫",
  },
];

const OurJourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  return (
    <section className="min-h-screen py-20 gradient-dreamy relative overflow-hidden">
      <Sparkles count={40} color="white" />

      <div className="relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 px-6"
        >
          <span className="text-6xl mb-4 inline-block animate-float-slow">🌻</span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            Our Journey Together
          </h2>
          <p className="font-body text-lg text-foreground/70 italic max-w-2xl mx-auto">
            "Every moment with you is a treasure I hold close to my heart."
          </p>
          <p className="font-body text-sm text-ghibli-rose mt-4">
            ← Scroll horizontally & tap cards to reveal messages →
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ 
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {journeyMoments.map((moment, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[300px] md:w-[400px] snap-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="relative cursor-pointer group"
                onClick={() => setActiveCard(activeCard === index ? null : index)}
                whileHover={{ scale: 1.03, y: -10 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-ghibli-rose/20 aspect-[3/4]">
                  {/* Image */}
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ghibli-night/70 via-transparent to-ghibli-rose/10" />

                  {/* Sparkle effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Sparkles count={10} color="gold" />
                  </motion.div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                      className="text-5xl mb-3"
                      animate={{ 
                        rotate: activeCard === index ? [0, 10, -10, 0] : 0,
                        scale: activeCard === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {moment.emoji}
                    </motion.div>
                    <h3 className="font-display text-2xl text-ghibli-cream mb-2">
                      {moment.title}
                    </h3>
                    
                    {/* Hidden Text Reveal */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: activeCard === index ? "auto" : 0,
                        opacity: activeCard === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-ghibli-rose/90 backdrop-blur-sm rounded-xl p-4 mt-3 border border-ghibli-gold/30">
                        <p className="font-body text-foreground italic">
                          "{moment.hiddenText}"
                        </p>
                      </div>
                    </motion.div>

                    {!activeCard && (
                      <p className="font-body text-sm text-ghibli-cream/70 mt-2">
                        Tap to reveal...
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Progress Bar */}
        <div className="w-full max-w-md mx-auto h-1 bg-ghibli-rose/20 rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-ghibli-rose rounded-full"
            style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
          />
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default OurJourneySection;
