import { motion } from "framer-motion";
import Sparkles from "../Sparkles";

const ChangedMyWorldSection = () => {
  const moments = [
    { emoji: "🌅", title: "Shared memories", text: "Every moment with you becomes a treasure" },
    { emoji: "😂", title: "Inside jokes", text: "Our secret language of laughter" },
    { emoji: "🌙", title: "Late-night talks", text: "When the world sleeps, we dream together" },
    { emoji: "🎉", title: "Fun moments", text: "Adventures that fill my heart with joy" },
    { emoji: "🤗", title: "Support", text: "You lift me up when I fall" },
    { emoji: "💝", title: "Love", text: "The way you make everything brighter" },
  ];

  return (
    <section className="ghibli-section gradient-dreamy py-20">
      <Sparkles count={35} color="white" />

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-5xl mb-6 inline-block animate-float-slow">🌻</span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
            How You Changed My World
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto italic">
            "Ever since you came into my life, everything feels lighter, brighter, and more beautiful."
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ghibli-rose/30 to-ghibli-lavender/30 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="relative bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-ghibli-rose/10 group-hover:shadow-2xl transition-all duration-300">
                <motion.span
                  className="text-5xl mb-4 inline-block"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {moment.emoji}
                </motion.span>
                <h3 className="font-display text-xl text-foreground mb-2">{moment.title}</h3>
                <p className="font-body text-foreground/70">{moment.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChangedMyWorldSection;
