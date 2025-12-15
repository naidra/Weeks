import { useMemo } from "react";
import { motion } from "framer-motion";

interface WeeksGridProps {
  totalYears: number;
  livedWeeks: number;
}

const WEEKS_PER_YEAR = 52;

const WeeksGrid = ({ totalYears, livedWeeks }: WeeksGridProps) => {
  const totalWeeks = totalYears * WEEKS_PER_YEAR;

  const weeks = useMemo(() => {
    return Array.from({ length: totalWeeks }, (_, index) => {
      if (index < livedWeeks) return "lived";
      if (index === livedWeeks) return "current";
      return "remaining";
    });
  }, [totalWeeks, livedWeeks]);

  const years = useMemo(() => {
    const yearGroups = [];
    for (let i = 0; i < totalYears; i++) {
      yearGroups.push(weeks.slice(i * WEEKS_PER_YEAR, (i + 1) * WEEKS_PER_YEAR));
    }
    return yearGroups;
  }, [weeks, totalYears]);

  const percentLived = ((livedWeeks / totalWeeks) * 100).toFixed(1);
  const weeksRemaining = totalWeeks - livedWeeks;

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-8 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-week-lived" />
            <span className="text-sm text-muted-foreground">
              Lived ({livedWeeks.toLocaleString()} weeks)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-week-current animate-pulse" />
            <span className="text-sm text-muted-foreground">This week</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-week-remaining" />
            <span className="text-sm text-muted-foreground">
              Remaining ({weeksRemaining.toLocaleString()} weeks)
            </span>
          </div>
        </div>
        <p className="text-lg text-foreground font-display">
          You've lived <span className="font-semibold text-primary">{percentLived}%</span> of your {totalYears}-year journey
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto pb-4"
      >
        <div className="flex flex-col gap-[2px] min-w-fit mx-auto" style={{ maxWidth: "fit-content" }}>
          {years.map((yearWeeks, yearIndex) => (
            <div key={yearIndex} className="flex items-center gap-1">
              <span className="w-8 text-[10px] text-muted-foreground/60 text-right pr-1 shrink-0">
                {yearIndex + 1}
              </span>
              <div className="flex gap-[2px]">
                {yearWeeks.map((status, weekIndex) => (
                  <motion.div
                    key={weekIndex}
                    initial={status === "lived" ? { scale: 0, opacity: 0 } : {}}
                    animate={status === "lived" ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: Math.min((yearIndex * WEEKS_PER_YEAR + weekIndex) * 0.0005, 1),
                      duration: 0.2,
                    }}
                    className={`week-box ${
                      status === "lived"
                        ? "week-lived"
                        : status === "current"
                        ? "week-current"
                        : "week-remaining"
                    }`}
                    title={`Year ${yearIndex + 1}, Week ${weekIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-4 flex justify-center gap-4 text-xs text-muted-foreground/50">
        <span>← Each row = 1 year</span>
        <span>Each box = 1 week →</span>
      </div>
    </div>
  );
};

export default WeeksGrid;
