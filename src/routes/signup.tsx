import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — CyberAware" },
      { name: "description", content: "Create your CyberAware account and start strengthening your human firewall." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "" });
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">CyberAware</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start your 14-day pilot. No credit card required.</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}
            className="space-y-4 p-6 rounded-2xl bg-card border border-border shadow-elegant"
          >
            {[
              { k: "name", label: "Full name", type: "text" },
              { k: "email", label: "Work email", type: "email" },
              { k: "company", label: "Company", type: "text" },
              { k: "password", label: "Password", type: "password" },
            ].map((f) => (
              <div key={f.k}>
                <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                <input
                  required
                  type={f.type}
                  value={(form as any)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-input outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            ))}
            <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-elegant">
              Create account <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Already have an account? <Link to="/dashboard" className="text-primary hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
