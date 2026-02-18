import { useState } from "react";
import {
  Flame,
  Thermometer,
  Leaf,
  Mail,
  MessageSquare,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react";

const heatConfig = {
  high: {
    icon: Flame,
    color: "text-heat-high",
    bg: "bg-heat-high/10",
    border: "border-heat-high/30",
    label: "High",
  },
  med: {
    icon: Thermometer,
    color: "text-heat-med",
    bg: "bg-heat-med/10",
    border: "border-heat-med/30",
    label: "Med",
  },
  low: {
    icon: Leaf,
    color: "text-heat-low",
    bg: "bg-heat-low/10",
    border: "border-heat-low/30",
    label: "Low",
  },
};

const channelIcons = {
  email: Mail,
  slack: MessageSquare,
  notification: Bell,
};

function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationCard({ notification, onSelect }) {
  const [revealed, setRevealed] = useState(false);
  const heat = heatConfig[notification.heatLevel];
  const HeatIcon = heat.icon;
  const ChannelIcon = channelIcons[notification.channel] || Bell;
  const isHot = notification.heatLevel === "high";

  return (
    <button
      onClick={() => onSelect(notification)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer group ${heat.bg} ${heat.border}`}
    >
      <div className="flex items-start gap-3">
        {/* Heat badge */}
        <div
          className={`flex-shrink-0 mt-0.5 p-2 rounded-lg ${heat.bg} ${heat.color}`}
        >
          <HeatIcon size={18} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <ChannelIcon size={14} className="text-walnut-400" />
              <span className="font-medium text-sm text-walnut-700 truncate">
                {notification.sender}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${heat.bg} ${heat.color}`}
              >
                {heat.label}
              </span>
            </div>
            <span className="text-xs text-walnut-400 flex-shrink-0">
              {timeAgo(notification.timestamp)}
            </span>
          </div>

          {/* Neutral summary — always visible */}
          <p className="text-sm font-medium text-walnut-600 mb-1">
            {notification.neutralSummary}
          </p>

          {/* Raw text — blurred for high heat unless revealed */}
          {isHot ? (
            <div className="relative">
              <p
                className={`text-xs text-walnut-400 leading-relaxed transition-all duration-500 ${
                  revealed ? "" : "blur-sm select-none"
                }`}
              >
                {notification.rawText}
              </p>
              {!revealed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRevealed(true);
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex items-center gap-1.5 text-xs bg-cream-100/90 text-walnut-500 px-3 py-1.5 rounded-full border border-walnut-200 hover:bg-cream-200 transition-colors">
                    <Eye size={12} />
                    Reveal original
                  </span>
                </button>
              )}
              {revealed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRevealed(false);
                  }}
                  className="mt-1 flex items-center gap-1 text-xs text-walnut-400 hover:text-walnut-600 transition-colors"
                >
                  <EyeOff size={12} />
                  Re-shield
                </button>
              )}
            </div>
          ) : (
            <p className="text-xs text-walnut-400 leading-relaxed">
              {notification.rawText}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
