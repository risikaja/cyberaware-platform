import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { BookOpen, Lock, CheckCircle2, PlayCircle } from "lucide-react";
import { COURSES } from "@/lib/courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [{ title: "Courses — CyberAware" }, { name: "description", content: "Browse all security training courses." }],
  }),
  component: Courses,
});

function Courses() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Courses</h1>
          <p className="text-muted-foreground">Master every aspect of cybersecurity at your own pace.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSES.map((c) => {
            const locked = c.status === "locked";
            const completed = c.status === "completed";
            const Card = (
              <div
                className={`p-6 rounded-xl border border-border bg-card h-full ${
                  locked ? "opacity-60" : "hover:border-primary/50 hover:shadow-glow transition-all cursor-pointer"
                }`}
              >
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
                  <span className="text-sm text-primary font-medium">
                    {completed ? "Review course" : "Continue learning"} →
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">Complete previous course</span>
                )}
              </div>
            );
            if (locked) return <div key={c.id}>{Card}</div>;
            return (
              <Link key={c.id} to="/courses/$courseId" params={{ courseId: c.id }} className="block">
                {Card}
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
