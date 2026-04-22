import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Mail, Trophy, Shield, LogOut } from "lucide-react";
import { ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/phishing", label: "Phishing Tests", icon: Mail },
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
            <span className="font-display font-bold text-lg">CyberAware</span>
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
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
