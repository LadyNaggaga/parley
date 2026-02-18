import NotificationCard from "./NotificationCard";

export default function TriageTable({ notifications, onSelect, className }) {
  const sorted = [...notifications].sort((a, b) => {
    const order = { high: 0, med: 1, low: 2 };
    return order[a.heatLevel] - order[b.heatLevel];
  });

  return (
    <div className={className}>
      <h2 className="font-serif text-xl text-walnut-700 mb-4">
        Triage Table
      </h2>
      <div className="space-y-3">
        {sorted.map((n) => (
          <NotificationCard key={n.id} notification={n} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
