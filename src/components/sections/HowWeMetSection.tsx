import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Sparkles from "../Sparkles";

// Import story images
import storyPathsCrossing from "@/assets/story-paths-crossing.jpg";
import storyFirstTalk from "@/assets/story-first-talk.jpg";
import storyFirstLaugh from "@/assets/story-first-laugh.jpg";
import storySpecialMoment from "@/assets/story-special-moment.jpg";

interface StoryCard {
  image: string;
  title: string;
  dialogue: string;
  emoji: string;
}

const storyCards: StoryCard[] = [
  {
    image: storyPathsCrossing,
    title: "Two Paths Crossing",
    dialogue: "This is where it all started… two paths destined to become one.",
    emoji: "🌸",
  },
  {
    image: storyFirstTalk,
    title: "Our First Conversation",
    dialogue: "The moment we first spoke, I felt something magical in the air.",
    emoji: "💬",
  },
  {
    image: storyFirstLaugh,
    title: "The First Laugh",
    dialogue: "Your smile changed something inside me forever.",
    emoji: "😊",
  },
  {
    image: storySpecialMoment,
    title: "That Special Moment",
    dialogue: "When I realized you were the one I had been waiting for...",
    emoji: "💫",
  },
];

const HowWeMetSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeDialogue, setActiveDialogue] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setActiveDialogue(null);
  }, [emblaApi]);

  useState(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  });

  const handleCardClick = (index: number) => {
    setActiveDialogue(activeDialogue === index ? null : index);
  };

  return (
    <section id="how-we-met" className="ghibli-section bg-ghibli-cream py-20">
      <Sparkles count={30} color="rose" />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-6xl mb-4 inline-block animate-float-slow">🌷</span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            How We Met
          </h2>
          <p className="font-body text-lg text-foreground/70 italic max-w-2xl mx-auto">
            "Some stories begin with magic… ours began the moment we met."
          </p>
          <p className="font-body text-sm text-ghibli-rose mt-4">
            ✨ Tap each card to reveal our story ✨
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {storyCards.map((card, index) => (
                <div key={index} className="flex-[0_0_85%] md:flex-[0_0_60%] min-w-0 pl-4 first:pl-0">
                  <motion.div
                    className="relative cursor-pointer group"
                    onClick={() => handleCardClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Card */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-ghibli-rose/20 aspect-[4/5]">
                      {/* Image */}
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ghibli-night/60 via-transparent to-transparent" />
                      
                      {/* Glow on hover */}
                      <motion.div
                        className="absolute inset-0 bg-ghibli-gold/0 group-hover:bg-ghibli-gold/10 transition-colors duration-300"
                        animate={activeDialogue === index ? { backgroundColor: "rgba(251, 191, 36, 0.15)" } : {}}
                      />

                      {/* Title Badge */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 border border-ghibli-rose/20">
                          <span className="text-3xl mb-2 block">{card.emoji}</span>
                          <h3 className="font-display text-xl text-foreground">{card.title}</h3>
                          <p className="font-body text-sm text-foreground/70 mt-1">Tap to reveal...</p>
                        </div>
                      </div>

                      {/* Sparkle effect on active */}
                      {activeDialogue === index && (
                        <div className="absolute inset-0 pointer-events-none">
                          <Sparkles count={15} color="gold" />
                        </div>
                      )}
                    </div>

                    {/* Dialogue Bubble */}
                    <AnimatePresence>
                      {activeDialogue === index && (
                        <motion.div
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-10"
                          initial={{ opacity: 0, y: -20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 20, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="bg-ghibli-rose/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border-2 border-ghibli-gold/30 relative">
                            {/* Speech bubble pointer */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-ghibli-rose/95 rotate-45 border-l-2 border-t-2 border-ghibli-gold/30" />
                            <p className="font-body text-foreground text-center italic relative z-10">
                              "{card.dialogue}"
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm shadow-lg border border-ghibli-rose/20 flex items-center justify-center text-2xl hover:bg-ghibli-rose/20 transition-colors z-10"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm shadow-lg border border-ghibli-rose/20 flex items-center justify-center text-2xl hover:bg-ghibli-rose/20 transition-colors z-10"
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {storyCards.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                selectedIndex === index ? "bg-ghibli-rose" : "bg-ghibli-rose/30"
              }`}
              animate={selectedIndex === index ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeMetSection;
