import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Crown, Medal, Trophy } from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — CyberAware" }, { name: "description", content: "Top security champions in your organization." }] }),
  component: Leaderboard,
});

const leaders = [
  { name: "Sarah Chen", dept: "Engineering", xp: 4820 },
  { name: "Marcus Reid", dept: "Sales", xp: 4310 },
  { name: "You (Alex Morgan)", dept: "Marketing", xp: 3870, you: true },
  { name: "Aisha Patel", dept: "HR", xp: 3520 },
  { name: "Tom Brennan", dept: "Finance", xp: 3210 },
  { name: "Lina Costa", dept: "Engineering", xp: 2980 },
  { name: "Diego Ramos", dept: "Sales", xp: 2750 },
  { name: "Yuki Tanaka", dept: "Operations", xp: 2530 },
];

function Leaderboard() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-warning" />
          <h1 className="text-3xl font-bold">Leaderboard</h1>
        </div>
        <p className="text-muted-foreground mb-8">Compete with your colleagues. Climb the ranks.</p>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {leaders.map((l, i) => (
            <div
              key={l.name}
              className={`flex items-center gap-4 p-5 border-b border-border last:border-0 ${l.you ? "bg-primary/10" : ""}`}
            >
              <div className="w-10 flex justify-center">
                {i === 0 ? <Crown className="w-6 h-6 text-warning" /> :
                 i === 1 ? <Medal className="w-6 h-6 text-muted-foreground" /> :
                 i === 2 ? <Medal className="w-6 h-6 text-warning/60" /> :
                 <span className="text-lg text-muted-foreground font-mono">#{i + 1}</span>}
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-cyber flex items-center justify-center font-bold text-primary-foreground">
                {l.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <p className="font-bold">{l.name}</p>
                <p className="text-sm text-muted-foreground">{l.dept}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold font-display">{l.xp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
