import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Mail, Trophy, Shield, LogOut, Search } from "lucide-react";
import { ReactNode } from "react";
import { AITutor } from "./AITutor";
import { NotificationBell } from "./NotificationBell";
import { PageTransition } from "./PageTransition";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/phishing", label: "Phishing Simulator", icon: Mail },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div className="dark min-h-screen bg-background text-foreground flex">
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-glow">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">CyberAware</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-sidebar-accent text-primary shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent/50 transition-all">
            <LogOut className="w-4 h-4" />
            Admin View
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="h-14 border-b border-border px-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-30">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border w-72">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input className="bg-transparent outline-none text-sm flex-1" placeholder="Search courses, tests..." />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <NotificationBell />
            <div className="w-8 h-8 rounded-full bg-gradient-cyber flex items-center justify-center text-xs font-bold text-primary-foreground">AM</div>
          </div>
        </header>
        <div className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        <AITutor />
      </main>
    </div>
  );
}
