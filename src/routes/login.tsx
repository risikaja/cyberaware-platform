import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth, AuthUser } from "@/context/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — CyberAware" }] }),
  component: LoginPage,
});

const demoAdmin: AuthUser = { name: "Alex Morgan", email: "admin@demo.cyberaware.io", company: "Acme Corp", role: "admin", isDemo: true };
const demoEmployee: AuthUser = { name: "Jamie Lee", email: "employee@demo.cyberaware.io", company: "Acme Corp", role: "employee", isDemo: true };

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const role: AuthUser["role"] = email.toLowerCase().includes("admin") ? "admin" : "employee";
    const u: AuthUser = { name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), email, company: "Your Company", role };
    login(u);
    toast.success(`Welcome back, ${u.name}`);
    navigate({ to: role === "admin" ? "/admin/dashboard" : "/dashboard" });
  };

  const demoLogin = (u: AuthUser) => {
    login(u);
    toast.success(`Signed in as demo ${u.role}`);
    navigate({ to: u.role === "admin" ? "/admin/dashboard" : "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a3a8f, #0d47e8)" }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg">CyberAware</span>
          </Link>
          <Link to="/register" className="text-sm text-muted-foreground hover:text-foreground">Need an account? <span className="text-primary">Register</span></Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your CyberAware workspace</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 p-6 rounded-2xl bg-card border border-border shadow-elegant">
            <div>
              <label className="block text-sm font-medium mb-1.5">Work email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-input outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="you@company.com"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-input outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/login" className="text-primary hover:underline">Forgot password?</Link>
            </div>
            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-elegant disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign in <ArrowRight className="w-4 h-4" /></>}
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground">or try a demo</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => demoLogin(demoAdmin)} className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-secondary text-sm font-medium transition">
                <Sparkles className="w-3.5 h-3.5" /> Try as Admin
              </button>
              <button type="button" onClick={() => demoLogin(demoEmployee)} className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-secondary text-sm font-medium transition">
                <Sparkles className="w-3.5 h-3.5" /> Try as Employee
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
