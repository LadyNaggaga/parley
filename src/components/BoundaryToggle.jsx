import { Shield, ShieldOff } from "lucide-react";

export default function BoundaryToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
        enabled
          ? "bg-teal-500 border-teal-600 text-white shadow-sm"
          : "bg-cream-100 border-walnut-200 text-walnut-500 hover:border-walnut-300"
      }`}
    >
      {enabled ? <Shield size={16} /> : <ShieldOff size={16} />}
      <span className="text-sm font-medium">
        Boundary {enabled ? "On" : "Off"}
      </span>
      {/* Toggle track */}
      <div
        className={`relative w-8 h-4.5 rounded-full transition-colors duration-300 ${
          enabled ? "bg-teal-700" : "bg-walnut-200"
        }`}
      >
        <div
          className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-transform duration-300 ${
            enabled ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}
