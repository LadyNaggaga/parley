import { Wifi, WifiOff } from "lucide-react";

export default function CliStatus({ connected = true }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {connected ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          <Wifi size={14} className="text-teal-600" />
          <span className="text-walnut-500">
            CLI <span className="text-teal-600 font-medium">Connected</span> · OpenClaw ✓
          </span>
        </>
      ) : (
        <>
          <span className="h-2 w-2 rounded-full bg-walnut-300" />
          <WifiOff size={14} className="text-walnut-400" />
          <span className="text-walnut-400">CLI Disconnected</span>
        </>
      )}
    </div>
  );
}
