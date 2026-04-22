import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Mail, BookOpen, BarChart3, Lock, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">CyberAware</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <Link to="/admin" className="hover:text-foreground transition-colors">For Admins</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">For Employees</Link>
          </nav>
          <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-elegant">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" /> Trusted by 500+ enterprises
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              Strengthen Your<br />
              <span className="bg-gradient-to-r from-cyber to-cyber-glow bg-clip-text text-transparent">
                Human Firewall
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl">
              Train every employee to spot phishing, defend against social engineering, and stay
              ahead of evolving threats — through immersive, gamified learning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition shadow-elegant">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/admin" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/30 text-primary-foreground font-medium hover:bg-white/10 transition">
                See Admin Demo
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-primary-foreground/70">
              {["SOC 2 Compliant", "ISO 27001", "GDPR Ready"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyber" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-sm uppercase tracking-wider text-primary font-medium mb-3">Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything your security team needs
            </h2>
            <p className="text-lg text-muted-foreground">
              From simulated attacks to compliance reports — built for modern security leaders.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-elegant transition-all"
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

      {/* Stats band */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: "92%", l: "Reduction in click-rate" },
            { v: "1.2M+", l: "Employees trained" },
            { v: "500+", l: "Enterprise customers" },
            { v: "A+", l: "Average security score" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl md:text-5xl font-bold font-display text-primary mb-2">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Lock className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your weakest link shouldn't be a person.
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Start your 14-day pilot today — no credit card required.
          </p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-elegant">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>© 2026 CyberAware. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
