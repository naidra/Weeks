import { useState } from "react";
import ModeSelector from "@/components/ModeSelector";
import LifeVisualization from "@/components/LifeVisualization";

type Mode = "human" | "superhuman" | null;

const Index = () => {
  const [mode, setMode] = useState<Mode>(null);

  if (!mode) {
    return <ModeSelector onSelect={setMode} />;
  }

  return <LifeVisualization mode={mode} onBack={() => setMode(null)} />;
};

export default Index;
