const notifications = [
  {
    id: 1,
    sender: "Jordan K. (VP Engineering)",
    timestamp: "2026-02-18T09:02:00Z",
    channel: "email",
    heatLevel: "high",
    rawText: "WHERE IS THE UPDATE?? I asked for this YESTERDAY. The board meeting is in 2 HOURS and I have NOTHING to show.",
    neutralSummary: "Status inquiry: Project Timeline — Board prep deadline today.",
    proposedResponse: "Hi Jordan, the update deck is in final review and will be in your inbox within 30 minutes. I'll flag any open items that need your sign-off.",
  },
  {
    id: 2,
    sender: "Slack: #general",
    timestamp: "2026-02-18T08:45:00Z",
    channel: "slack",
    heatLevel: "low",
    rawText: "Hey team! 🎉 Donuts in the kitchen. Happy Tuesday!",
    neutralSummary: "Social: Office morale message.",
    proposedResponse: null,
  },
  {
    id: 3,
    sender: "Morgan T. (Product)",
    timestamp: "2026-02-18T08:30:00Z",
    channel: "email",
    heatLevel: "med",
    rawText: "Can we hop on a quick call? I really need to align on the Q3 roadmap before the sprint starts tomorrow.",
    neutralSummary: "Meeting request: Q3 roadmap alignment — before tomorrow's sprint.",
    proposedResponse: "Hi Morgan, I have a focused block this morning. I can do a 15-min sync at 2:30 PM or share my roadmap notes async. Which works better?",
  },
  {
    id: 4,
    sender: "JIRA Bot",
    timestamp: "2026-02-18T08:15:00Z",
    channel: "notification",
    heatLevel: "low",
    rawText: "[PROJ-1042] Bug: Login page CSS broken on Safari 18.2 — Assigned to you.",
    neutralSummary: "Bug assignment: Login page Safari CSS issue.",
    proposedResponse: null,
  },
  {
    id: 5,
    sender: "Casey L. (CEO)",
    timestamp: "2026-02-18T07:58:00Z",
    channel: "email",
    heatLevel: "high",
    rawText: "I need you in the all-hands at 10. Non-negotiable. Also, pull the customer churn numbers and prepare a full strategic brief.",
    neutralSummary: "Attendance required: 10 AM all-hands. Data requests: churn metrics, strategic brief.",
    proposedResponse: "Hi Casey, confirmed for the 10 AM all-hands. I'll have the churn numbers ready. The strategic brief is a larger ask — I can deliver a draft by EOD Thursday.",
  },
  {
    id: 6,
    sender: "Calendar",
    timestamp: "2026-02-18T07:30:00Z",
    channel: "notification",
    heatLevel: "med",
    rawText: "Reminder: 'Design Review — New Onboarding Flow' starts in 1 hour. You are the presenter.",
    neutralSummary: "Calendar reminder: Design review in 1 hour — you're presenting.",
    proposedResponse: null,
  },
  {
    id: 7,
    sender: "Alex R. (Engineering)",
    timestamp: "2026-02-18T07:10:00Z",
    channel: "slack",
    heatLevel: "med",
    rawText: "Hey, the CI pipeline is failing on main. Looks like a flaky test — wanted to flag it since you touched that module last.",
    neutralSummary: "CI issue: Flaky test on main branch — review requested.",
    proposedResponse: "Thanks for flagging, Alex. I'll check the test logs after my 10 AM meeting. If it's blocking deploys, feel free to skip that test suite for now.",
  },
  {
    id: 8,
    sender: "Newsletter Bot",
    timestamp: "2026-02-18T06:00:00Z",
    channel: "email",
    heatLevel: "low",
    rawText: "This Week in Tech: AI agents are changing how we work.",
    neutralSummary: "Newsletter: Weekly tech digest (non-actionable).",
    proposedResponse: null,
  },
];

export default notifications;

export function getCognitiveLoad(items) {
  const weights = { high: 25, med: 12, low: 4 };
  return Math.min(
    100,
    items.reduce((sum, n) => sum + (weights[n.heatLevel] || 0), 0)
  );
}
