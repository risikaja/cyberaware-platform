import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, ArrowRight, Loader2, UserCog, User } from "lucide-react";
import { useState } from "react";
import { useAuth, AuthUser, UserRole } from "@/context/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — CyberAware" }] }),
  component: RegisterPage,
});

interface FormState { name: string; email: string; company: string; password: string; confirm: string; role: UserRole }
type Errors = Partial<Record<keyof FormState, string>>;

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", password: "", confirm: "", role: "employee" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm({ ...form, [k]: v });

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const u: AuthUser = { name: form.name, email: form.email, company: form.company, role: form.role };
    login(u);
    toast.success("Account created");
    navigate({ to: form.role === "admin" ? "/admin/dashboard" : "/dashboard" });
  };

  const fields: { k: keyof FormState; label: string; type: string; placeholder?: string }[] = [
    { k: "name", label: "Full name", type: "text", placeholder: "Jane Doe" },
    { k: "email", label: "Work email", type: "email", placeholder: "jane@company.com" },
    { k: "company", label: "Company name", type: "text", placeholder: "Acme Inc." },
    { k: "password", label: "Password", type: "password", placeholder: "At least 8 characters" },
    { k: "confirm", label: "Confirm password", type: "password", placeholder: "Repeat password" },
  ];

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
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Have an account? <span className="text-primary">Sign in</span></Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start your 14-day pilot — no credit card required.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 p-6 rounded-2xl bg-card border border-border shadow-elegant">
            {fields.map((f) => (
              <div key={f.k}>
                <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.k] as string}
                  onChange={(e) => set(f.k, e.target.value as never)}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-input outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                {errors[f.k] && <p className="text-xs text-destructive mt-1">{errors[f.k]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-1.5">Account type</label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { v: "employee", label: "Employee", Icon: User, desc: "Take training" },
                  { v: "admin", label: "Admin", Icon: UserCog, desc: "Manage team" },
                ] as const).map(({ v, label, Icon, desc }) => {
                  const active = form.role === v;
                  return (
                    <button
                      type="button"
                      key={v}
                      onClick={() => set("role", v)}
                      className={`flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition ${active ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-secondary"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-semibold">{label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-elegant disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
