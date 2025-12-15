import { useState } from "react";
import { motion } from "framer-motion";

interface AgeInputProps {
  onAgeSubmit: (age: number) => void;
  maxAge: number;
}

const AgeInput = ({ onAgeSubmit, maxAge }: AgeInputProps) => {
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);

    if (isNaN(ageNum) || ageNum < 0) {
      setError("Please enter a valid age");
      return;
    }

    if (ageNum > maxAge) {
      setError(`Age cannot exceed ${maxAge} years`);
      return;
    }

    setError("");
    onAgeSubmit(ageNum);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 justify-center"
    >
      <div className="relative">
        <input
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setError("");
          }}
          placeholder="Enter your age"
          min={0}
          max={maxAge}
          className="w-48 px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-center font-body"
        />
        {error && (
          <p className="absolute -bottom-6 left-0 right-0 text-xs text-destructive text-center">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-glow"
      >
        Visualize
      </button>
    </motion.form>
  );
};

export default AgeInput;
