import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import AgeInput from "./AgeInput";
import WeeksGrid from "./WeeksGrid";
import AdviceCard from "./AdviceCard";

interface LifeVisualizationProps {
  mode: "human" | "superhuman";
  onBack: () => void;
}

const WEEKS_PER_YEAR = 52;

const LifeVisualization = ({ mode, onBack }: LifeVisualizationProps) => {
  const [age, setAge] = useState<number | null>(null);
  const totalYears = mode === "human" ? 90 : 150;

  const livedWeeks = age !== null ? age * WEEKS_PER_YEAR : 0;

  return (
    <div className="min-h-screen gradient-hero">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Change mode</span>
          </button>
          <div className="text-right">
            <span className="text-sm text-muted-foreground">
              {mode === "human" ? "🌱 Human" : "✨ Superhuman"} Mode
            </span>
            <p className="text-xs text-muted-foreground/60">
              {totalYears} years · {totalYears * WEEKS_PER_YEAR} weeks
            </p>
          </div>
        </motion.header>

        {/* Title & Age Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-2">
            Your Life in Weeks
          </h1>
          <p className="text-muted-foreground mb-6">
            Each box represents one week of your life
          </p>
          <AgeInput onAgeSubmit={setAge} maxAge={totalYears} />
        </motion.div>

        {/* Visualization */}
        {age !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <WeeksGrid totalYears={totalYears} livedWeeks={livedWeeks} />
            <AdviceCard />
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-muted-foreground/60"
        >
          <p className="italic font-display text-base mb-1">
            "Life is what happens when you're busy making other plans."
          </p>
          <p>— John Lennon</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default LifeVisualization;
