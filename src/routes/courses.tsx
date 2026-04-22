import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { BookOpen, Lock, CheckCircle2, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [{ title: "Courses — CyberAware" }, { name: "description", content: "Browse all security training courses." }],
  }),
  component: Courses,
});

const allCourses = [
  { title: "Phishing 101", category: "Email Security", status: "completed", duration: "20 min" },
  { title: "Social Engineering", category: "Human Risk", status: "in-progress", duration: "35 min" },
  { title: "Password Safety", category: "Credentials", status: "locked", duration: "15 min" },
  { title: "Ransomware Defense", category: "Malware", status: "locked", duration: "40 min" },
  { title: "Safe Remote Work", category: "Best Practices", status: "locked", duration: "25 min" },
  { title: "Data Privacy & GDPR", category: "Compliance", status: "locked", duration: "30 min" },
];

function Courses() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Courses</h1>
          <p className="text-muted-foreground">Master every aspect of cybersecurity at your own pace.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCourses.map((c) => {
            const locked = c.status === "locked";
            const completed = c.status === "completed";
            return (
              <div key={c.title} className={`p-6 rounded-xl border border-border bg-card ${locked ? "opacity-60" : "hover:border-primary/50 hover:shadow-glow transition-all"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-lg bg-gradient-cyber flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  {locked ? <Lock className="w-4 h-4 text-muted-foreground" /> :
                   completed ? <CheckCircle2 className="w-5 h-5 text-success" /> :
                   <PlayCircle className="w-5 h-5 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{c.category}</p>
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{c.duration}</p>
                {!locked ? (
                  <Link to="/course" className="text-sm text-primary font-medium hover:underline">
                    {completed ? "Review course" : "Continue learning"} →
                  </Link>
                ) : <span className="text-sm text-muted-foreground">Complete previous course</span>}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
