import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, RefreshCw } from "lucide-react";
import longevityAdvice from "@/data/longevity-advice.json";

interface Advice {
  advice: string;
  url: string;
}

const AdviceCard = () => {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomAdvice = () => {
    setIsLoading(true);
    // Simulate network request with setTimeout
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * longevityAdvice.length);
      setAdvice(longevityAdvice[randomIndex]);
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchRandomAdvice();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="gradient-card rounded-xl border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            💡 Longevity Wisdom
          </h3>
          <button
            onClick={fetchRandomAdvice}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            aria-label="Get new advice"
          >
            <RefreshCw
              className={`w-4 h-4 text-muted-foreground ${
                isLoading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {advice && (
            <motion.div
              key={advice.advice}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-foreground leading-relaxed mb-4 font-body">
                {advice.advice}
              </p>
              <a
                href={advice.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                <span>Learn more</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdviceCard;
