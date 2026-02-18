import {
  Flame,
  Thermometer,
  Leaf,
  ArrowLeft,
  Copy,
  Check,
  Send,
} from "lucide-react";
import { useState } from "react";

const heatConfig = {
  high: { icon: Flame, color: "text-heat-high", label: "High Heat" },
  med: { icon: Thermometer, color: "text-heat-med", label: "Medium Heat" },
  low: { icon: Leaf, color: "text-heat-low", label: "Low Heat" },
};

export default function DraftingRoom({ notification, onBack, className }) {
  const [copied, setCopied] = useState(false);

  if (!notification) {
    return (
      <div className={`${className || ""}`}>
        <h2 className="font-serif text-xl text-walnut-700 mb-4">
          Drafting Room
        </h2>
        <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-walnut-200 bg-cream-100/50">
          <p className="text-walnut-400 text-sm">
            Select a notification to draft a response
          </p>
        </div>
      </div>
    );
  }

  const heat = heatConfig[notification.heatLevel];
  const HeatIcon = heat.icon;

  const handleCopy = () => {
    if (notification.proposedResponse) {
      navigator.clipboard.writeText(notification.proposedResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`${className || ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl text-walnut-700">Drafting Room</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-walnut-400 hover:text-walnut-600 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Triage
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <HeatIcon size={16} className={heat.color} />
        <span className={`text-xs font-medium ${heat.color}`}>
          {heat.label}
        </span>
        <span className="text-walnut-300">·</span>
        <span className="text-sm text-walnut-600">{notification.sender}</span>
      </div>

      {/* Split pane */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Raw message */}
        <div className="rounded-xl border border-walnut-200 bg-cream-100 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-walnut-400 mb-3">
            Raw Message
          </h3>
          <p className="text-sm text-walnut-600 leading-relaxed whitespace-pre-wrap">
            {notification.rawText}
          </p>
        </div>

        {/* Right: Proposed response */}
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-600">
              Parley's Proposed Response
            </h3>
            {notification.proposedResponse && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-teal-500 hover:text-teal-700 transition-colors cursor-pointer"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          {notification.proposedResponse ? (
            <>
              <p className="text-sm text-teal-700 leading-relaxed whitespace-pre-wrap">
                {notification.proposedResponse}
              </p>
              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer">
                  <Send size={12} />
                  Send Response
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-walnut-500 bg-cream-100 border border-walnut-200 rounded-lg hover:bg-cream-200 transition-colors cursor-pointer">
                  Edit Draft
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-teal-500 italic">
              No response needed — informational only.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
