import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Mail, BookOpen, BarChart3, Lock, Zap, ArrowRight, CheckCircle2, Rocket, GraduationCap, LineChart, Menu, X } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuth, initials } from "@/context/AuthContext";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberAware — Strengthen Your Human Firewall" },
      { name: "description", content: "Enterprise cybersecurity awareness platform: phishing simulations, interactive training, real-time analytics." },
      { property: "og:title", content: "CyberAware — Strengthen Your Human Firewall" },
      { property: "og:description", content: "Enterprise cybersecurity awareness platform with phishing simulations and detailed analytics." },
    ],
  }),
  component: Landing,
});

function CountUp({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, to]);

  return <span ref={ref}>{display}</span>;
}

function smoothScroll(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  const navClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    smoothScroll(id);
  };


  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a3a8f, #0d47e8)" }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg">CyberAware</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" onClick={(e) => navClick(e, "features")} className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" onClick={(e) => navClick(e, "how-it-works")} className="hover:text-foreground transition-colors">How it works</a>
            <a href="#for-admins" onClick={(e) => navClick(e, "for-admins")} className="hover:text-foreground transition-colors">For Admins</a>
            <a href="#for-employees" onClick={(e) => navClick(e, "for-employees")} className="hover:text-foreground transition-colors">For Employees</a>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Link to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary text-sm font-medium hover:bg-secondary/70 transition">
                <div className="w-7 h-7 rounded-full bg-gradient-cyber flex items-center justify-center text-[10px] font-bold text-primary-foreground">{initials(user.name)}</div>
                <span>{user.name}</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden md:inline-flex px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition">
                  Sign in
                </Link>
                <Link to="/register" className="hidden md:inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-elegant">
                  Get Started
                </Link>
              </>
            )}
            <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden p-2 rounded-lg hover:bg-secondary" aria-label="Menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-3 flex flex-col gap-1 text-sm">
              {[
                { id: "features", label: "Features" },
                { id: "how-it-works", label: "How it works" },
                { id: "for-admins", label: "For Admins" },
                { id: "for-employees", label: "For Employees" },
              ].map((i) => (
                <a key={i.id} href={`#${i.id}`} onClick={(e) => navClick(e, i.id)} className="px-3 py-2 rounded-lg hover:bg-secondary">{i.label}</a>
              ))}
              <Link to="/signup" className="mt-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-center font-medium">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero — airy, bento-grid */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute inset-0 dot-bg opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs uppercase tracking-wider mb-6 text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Trusted by 500+ enterprises
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
              Strengthen your{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-cyber to-primary bg-clip-text text-transparent">
                  human firewall
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                  <path d="M2 7 Q 50 1 100 5 T 198 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
                </svg>
              </span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Train every employee to spot phishing, defend against social engineering, and stay
              ahead of evolving threats — through immersive, gamified learning.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-elegant">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/admin" search={{ demo: "1" } as any} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass text-foreground font-medium hover:bg-card transition">
                See Admin Demo
              </Link>
            </div>
          </motion.div>

          {/* Bento grid preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-6 grid-rows-2 gap-4 md:gap-5 max-w-5xl mx-auto"
          >
            <div className="col-span-6 md:col-span-4 row-span-2 rounded-2xl bg-card border border-border p-6 md:p-8 shadow-soft relative overflow-hidden group hover:shadow-elegant transition-all">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition" />
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-semibold mb-3">
                <Mail className="w-3.5 h-3.5" /> Phishing Simulator
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Real attacks. Safer team.</h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">Launch realistic email, SMS, and QR campaigns. Track click-rates by department in real time.</p>
              <div className="space-y-2.5">
                {[{ d: "Engineering", v: 92, c: "bg-success" }, { d: "Sales", v: 74, c: "bg-warning" }, { d: "Marketing", v: 58, c: "bg-primary" }].map((r) => (
                  <div key={r.d} className="flex items-center gap-3">
                    <span className="text-xs w-24 text-muted-foreground">{r.d}</span>
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${r.v}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} className={`h-full ${r.c} rounded-full`} />
                    </div>
                    <span className="text-xs font-semibold w-8 text-right">{r.v}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 rounded-2xl bg-gradient-cyber p-6 text-primary-foreground shadow-soft relative overflow-hidden">
              <Zap className="w-6 h-6 mb-3 opacity-80" />
              <div className="text-4xl font-bold font-display mb-1">+340</div>
              <div className="text-xs opacity-80">XP earned this week</div>
            </div>
            <div className="col-span-3 md:col-span-2 rounded-2xl bg-card border border-border p-6 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-[10px] uppercase tracking-wider text-success font-semibold">Live</span>
              </div>
              <div className="text-2xl font-bold mb-1">12 modules</div>
              <div className="text-xs text-muted-foreground">Microlearning library</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">Platform</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Everything your security team needs</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              From simulated attacks to compliance reports — built for modern security leaders.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: Mail, title: "Phishing Simulations", desc: "Launch realistic email, SMS, and QR-code campaigns. Track click-rates by department in real time." },
              { icon: BookOpen, title: "Interactive Modules", desc: "Bite-sized lessons with quizzes, scenarios, and gamified XP to keep employees engaged." },
              { icon: BarChart3, title: "Detailed Analytics", desc: "Executive dashboards, risk scoring, and compliance reports — exportable in one click." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-cyber flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-32 bg-secondary scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-sm uppercase tracking-wider text-primary font-medium mb-3">Process</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How it works</h2>
            <p className="text-base md:text-lg text-muted-foreground">Get your organization protected in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Rocket, step: "01", title: "Deploy to your team", desc: "Invite employees via SSO or CSV upload. No agents, no installations — just a secure login." },
              { icon: GraduationCap, step: "02", title: "Employees complete training", desc: "Engaging micro-lessons, real-world phishing simulations, and gamified XP keep your team learning." },
              { icon: LineChart, step: "03", title: "Admins track progress", desc: "Real-time dashboards, risk heatmaps, and exportable reports give security leaders full visibility." },
            ].map(({ icon: Icon, step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 md:p-8 rounded-2xl bg-card border border-border"
              >
                <div className="text-5xl font-display font-bold text-primary/20 mb-4">{step}</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-cyber flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Admins */}
      <section id="for-admins" className="py-20 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-wider text-primary font-medium mb-3">For Admins</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Total visibility, zero spreadsheets</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Launch campaigns, monitor departmental risk, generate compliance certificates, and export
              executive reports — all from one polished dashboard.
            </p>
            <ul className="space-y-3 mb-8">
              {["Departmental risk heatmaps", "One-click compliance exports", "AI-powered campaign templates"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success" /> {t}</li>
              ))}
            </ul>
            <Link to="/admin" search={{ demo: "1" } as any} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-elegant">
              See Admin Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="aspect-[4/3] rounded-2xl border border-border bg-gradient-to-br from-secondary to-card shadow-elegant flex items-center justify-center">
            <BarChart3 className="w-24 h-24 text-primary/30" />
          </div>
        </div>
      </section>

      {/* For Employees */}
      <section id="for-employees" className="py-20 md:py-32 bg-secondary scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-2xl border border-border bg-gradient-to-br from-card to-background shadow-elegant flex items-center justify-center order-2 md:order-1">
            <GraduationCap className="w-24 h-24 text-primary/30" />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-sm uppercase tracking-wider text-primary font-medium mb-3">For Employees</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Learning that doesn't feel like learning</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Short, engaging modules. Real-world simulations. Leaderboards and badges that turn
              security into a habit, not a chore.
            </p>
            <ul className="space-y-3 mb-8">
              {["5-minute micro-lessons", "Earn XP and badges", "AI Tutor for instant tips"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success" /> {t}</li>
              ))}
            </ul>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-elegant">
              Explore Employee View <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { node: <><CountUp to={92} />%</>, l: "Reduction in click-rate" },
            { node: <><CountUp to={1.2} decimals={1} />M+</>, l: "Employees trained" },
            { node: <><CountUp to={500} />+</>, l: "Enterprise customers" },
            { node: "A+", l: "Average security score" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl md:text-5xl font-bold font-display text-primary mb-2">{s.node}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <Lock className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Your weakest link shouldn't be a person.</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-10">
            Start your 14-day pilot today — no credit card required.
          </p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-elegant">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a3a8f, #0d47e8)" }}>
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold">CyberAware</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">Enterprise cybersecurity awareness training that actually works.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" onClick={(e) => navClick(e, "features")} className="hover:text-foreground">Features</a></li>
                <li><a href="#how-it-works" onClick={(e) => navClick(e, "how-it-works")} className="hover:text-foreground">How it works</a></li>
                <li><Link to="/admin" search={{ demo: "1" } as any} className="hover:text-foreground">Admin Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#privacy" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="mailto:hello@cyberaware.io" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>© 2026 CyberAware. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-foreground">Privacy</a>
              <a href="#terms" className="hover:text-foreground">Terms</a>
              <a href="mailto:hello@cyberaware.io" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
