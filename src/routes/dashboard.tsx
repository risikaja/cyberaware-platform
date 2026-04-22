import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Award, Zap, TrendingUp, Lock, CheckCircle2, PlayCircle, Trophy, Crown, Medal } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CyberAware" },
      { name: "description", content: "Your security training progress, courses, and rank." },
    ],
  }),
  component: Dashboard,
});

const courses = [
  { id: "phishing-101", title: "Phishing 101", desc: "Spot the signs of a phishing email", status: "completed", progress: 100, xp: 250 },
  { id: "social-eng", title: "Social Engineering", desc: "Defending against manipulation", status: "in-progress", progress: 60, xp: 180 },
  { id: "password", title: "Password Safety", desc: "Build unbreakable credentials", status: "locked", progress: 0, xp: 0 },
  { id: "ransomware", title: "Ransomware Defense", desc: "Recognize and prevent attacks", status: "locked", progress: 0, xp: 0 },
];

const leaders = [
  { name: "Sarah Chen", xp: 4820, rank: 1 },
  { name: "Marcus Reid", xp: 4310, rank: 2 },
  { name: "You", xp: 3870, rank: 3, you: true },
  { name: "Aisha Patel", xp: 3520, rank: 4 },
  { name: "Tom Brennan", xp: 3210, rank: 5 },
];

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
          <h1 className="text-3xl font-bold">Alex Morgan</h1>
        </div>

        {/* Top stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={Award}
            label="Current Level"
            value="Security Champion"
            sub="Level 7"
            accent
          />
          <StatCard icon={Zap} label="Total XP" value="3,870" sub="+250 this week" />
          <StatCard icon={TrendingUp} label="Overall Progress" value="68%" sub="On track for monthly goal" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Training Path</h2>
              <span className="text-sm text-muted-foreground">2 of 4 active</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {courses.map((c, i) => (
                <CourseCard key={c.id} course={c} index={i} />
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" /> Leaderboard
              </h2>
              <Link to="/leaderboard" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            <div className="bg-card border border-border rounded-xl p-2">
              {leaders.map((l) => (
                <div
                  key={l.name}
                  className={`flex items-center gap-3 p-3 rounded-lg ${l.you ? "bg-primary/10 border border-primary/30" : ""}`}
                >
                  <div className="w-8 flex justify-center">
                    {l.rank === 1 ? <Crown className="w-5 h-5 text-warning" /> :
                     l.rank === 2 ? <Medal className="w-5 h-5 text-muted-foreground" /> :
                     l.rank === 3 ? <Medal className="w-5 h-5 text-warning/70" /> :
                     <span className="text-sm text-muted-foreground font-mono">#{l.rank}</span>}
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-cyber flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {l.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.xp.toLocaleString()} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent }: { icon: any; label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={`p-6 rounded-xl border border-border bg-card ${accent ? "shadow-glow" : ""}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent ? "bg-gradient-cyber" : "bg-secondary"}`}>
          <Icon className={`w-5 h-5 ${accent ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const locked = course.status === "locked";
  const completed = course.status === "completed";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`p-5 rounded-xl border bg-card transition-all ${
        locked ? "border-border opacity-60" : "border-border hover:border-primary/50 hover:shadow-glow"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          {locked ? <Lock className="w-4 h-4 text-muted-foreground" /> :
           completed ? <CheckCircle2 className="w-5 h-5 text-success" /> :
           <PlayCircle className="w-5 h-5 text-primary" />}
        </div>
        {!locked && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            completed ? "bg-success/15 text-success" : "bg-primary/15 text-primary"
          }`}>
            {completed ? "Completed" : "In Progress"}
          </span>
        )}
      </div>
      <h3 className="font-bold mb-1">{course.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{course.desc}</p>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-cyber transition-all"
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{course.progress}% complete</span>
        {!locked ? (
          <Link to="/course" className="text-xs text-primary hover:underline font-medium">
            {completed ? "Review" : "Continue"} →
          </Link>
        ) : (
          <span className="text-xs text-muted-foreground">Locked</span>
        )}
      </div>
    </motion.div>
  );
}
