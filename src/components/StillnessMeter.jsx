import { useMemo } from "react";

export default function StillnessMeter({ notifications, className }) {
  const load = useMemo(() => {
    const weights = { high: 25, med: 12, low: 4 };
    const raw = notifications.reduce(
      (sum, n) => sum + (weights[n.heatLevel] || 0),
      0
    );
    return Math.min(100, raw);
  }, [notifications]);

  const isFocusMode = load >= 80;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (load / 100) * circumference;

  const meterColor =
    load >= 80
      ? "var(--color-heat-high)"
      : load >= 50
        ? "var(--color-heat-med)"
        : "var(--color-heat-low)";

  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      <div className="relative w-28 h-28 flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="var(--color-cream-200)"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={meterColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-walnut-700">
            {load}%
          </span>
          <span className="text-[10px] text-walnut-400 uppercase tracking-wider">
            Load
          </span>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg text-walnut-700">Stillness Meter</h2>
        <p className="text-xs text-walnut-400 mt-0.5">
          Cognitive load from {notifications.length} notifications
        </p>
        {isFocusMode && (
          <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-heat-high bg-heat-high/10 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-heat-high rounded-full animate-pulse" />
            Focus Mode Active
          </span>
        )}
      </div>
    </div>
  );
}
