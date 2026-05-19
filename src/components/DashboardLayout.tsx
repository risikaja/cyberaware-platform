import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Mail, Trophy, Shield, LogOut, Search, Sparkles } from "lucide-react";
import { ReactNode } from "react";
import { AITutor } from "./AITutor";
import { NotificationBell } from "./NotificationBell";
import { PageTransition } from "./PageTransition";
import { useAuth, initials } from "@/context/AuthContext";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/phishing", label: "Phishing Simulator", icon: Mail },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const name = user?.name ?? "Guest User";
  const role = user?.role ?? "employee";

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
        <div className="p-4 border-t border-sidebar-border space-y-1">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent/50 transition-all">
            <Shield className="w-4 h-4" />
            Admin View
          </Link>
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent/50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto flex flex-col">
        {user?.isDemo && (
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-primary/30 px-6 py-2 text-xs flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">You're viewing a demo account</span>
            <span className="text-muted-foreground">— explore the {role} experience with sample data.</span>
            <button onClick={() => { logout(); navigate({ to: "/login" }); }} className="ml-auto text-primary hover:underline">Exit demo</button>
          </div>
        )}
        <header className="h-14 border-b border-border px-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-30">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border w-72">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input className="bg-transparent outline-none text-sm flex-1" placeholder="Search courses, tests..." />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <NotificationBell />
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium leading-tight">{name}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{role}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-cyber flex items-center justify-center text-xs font-bold text-primary-foreground">
                {initials(name)}
              </div>
            </div>
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
