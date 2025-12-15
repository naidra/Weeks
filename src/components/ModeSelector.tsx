import { motion } from "framer-motion";

interface ModeSelectorProps {
  onSelect: (mode: "human" | "superhuman") => void;
}

const ModeSelector = ({ onSelect }: ModeSelectorProps) => {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground mb-4 tracking-tight">
            Your Life in Weeks
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 font-light max-w-lg mx-auto leading-relaxed">
            Visualize your journey. Every box is a week. How will you spend them?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => onSelect("human")}
            className="group relative px-10 py-5 rounded-xl bg-card border border-border shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl mb-1">🌱</span>
              <span className="font-display text-2xl font-semibold text-foreground">
                Human
              </span>
              <span className="text-sm text-muted-foreground">
                90 years · 4,680 weeks
              </span>
            </div>
            <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => onSelect("superhuman")}
            className="group relative px-10 py-5 rounded-xl bg-card border border-border shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl mb-1">✨</span>
              <span className="font-display text-2xl font-semibold text-foreground">
                Superhuman
              </span>
              <span className="text-sm text-muted-foreground">
                150 years · 7,800 weeks
              </span>
            </div>
            <div className="absolute inset-0 rounded-xl border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-sm text-muted-foreground/70 italic"
        >
          "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate."
          <br />
          <span className="not-italic">— Ralph Waldo Emerson</span>
        </motion.p>
      </div>
    </div>
  );
};

export default ModeSelector;
