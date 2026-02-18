import { useState, useMemo } from "react";
import { Feather } from "lucide-react";
import notifications from "../data/notifications";
import StillnessMeter from "./StillnessMeter";
import CliStatus from "./CliStatus";
import BoundaryToggle from "./BoundaryToggle";
import TriageTable from "./TriageTable";
import DraftingRoom from "./DraftingRoom";

export default function Dashboard() {
  const [boundaryEnabled, setBoundaryEnabled] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [view, setView] = useState("triage"); // "triage" | "drafting"

  const cognitiveLoad = useMemo(() => {
    const weights = { high: 25, med: 12, low: 4 };
    return Math.min(
      100,
      notifications.reduce((s, n) => s + (weights[n.heatLevel] || 0), 0)
    );
  }, []);

  const isFocusMode = cognitiveLoad >= 80;

  const handleSelect = (notification) => {
    setSelectedNotification(notification);
    setView("drafting");
  };

  const handleBack = () => {
    setSelectedNotification(null);
    setView("triage");
  };

  return (
    <div
      className={`min-h-screen bg-cream-50 ${isFocusMode ? "focus-mode" : ""}`}
    >
      {/* Top bar */}
      <header className="border-b border-walnut-100 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Feather size={20} className="text-teal-600" />
            </div>
            <div>
              <h1 className="font-serif text-xl text-walnut-700 leading-none">
                Parley
              </h1>
              <p className="text-[11px] text-walnut-400 tracking-wide">
                Communication Shield
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <CliStatus connected={true} />
            <BoundaryToggle
              enabled={boundaryEnabled}
              onToggle={() => setBoundaryEnabled((b) => !b)}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stillness Meter */}
        <div className="mb-8 p-6 rounded-2xl bg-white border border-walnut-100 shadow-sm">
          <StillnessMeter notifications={notifications} />
        </div>

        {/* Boundary active banner */}
        {boundaryEnabled && (
          <div className="mb-6 p-3 rounded-xl bg-teal-50 border border-teal-200 text-sm text-teal-700 flex items-center gap-2 dim">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            Boundary Mode active — auto-rejecting non-critical pings and meeting
            invites via OpenClaw.
          </div>
        )}

        {/* Content area */}
        {view === "triage" ? (
          <TriageTable
            notifications={notifications}
            onSelect={handleSelect}
            className="dim"
          />
        ) : (
          <DraftingRoom
            notification={selectedNotification}
            onBack={handleBack}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-walnut-100 mt-12 dim">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-walnut-400">
          <span>
            Parley · An extension of{" "}
            <a
              href="https://ladynaggaga.github.io/Stillness/"
              className="text-teal-500 hover:text-teal-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stillness
            </a>
          </span>
          <span>Powered by OpenClaw</span>
        </div>
      </footer>
    </div>
  );
}
