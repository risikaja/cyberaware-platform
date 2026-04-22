import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Mail, AlertTriangle, ShieldCheck, Flag, Eye, Paperclip, ChevronRight, Inbox, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/phishing")({
  head: () => ({
    meta: [
      { title: "Phishing Simulator — CyberAware" },
      { name: "description", content: "Realistic phishing threat gallery — spot, report, and neutralize attacks." },
    ],
  }),
  component: PhishingSimulator,
});

type Threat = {
  id: string;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  category: string;
  severity: "high" | "medium" | "low";
  redFlags: string[];
};

const threats: Threat[] = [
  {
    id: "outlook",
    sender: "Microsoft 365 Security",
    email: "no-reply@m1crosoft-secure.com",
    subject: "⚠ Unusual sign-in activity detected on your account",
    preview: "We blocked a sign-in attempt from Lagos, Nigeria. Verify your identity within 24 hours or your account will be suspended...",
    time: "08:42",
    category: "Outlook Login Alert",
    severity: "high",
    redFlags: ["Misspelled domain (m1crosoft)", "Urgency / 24h deadline", "Generic greeting"],
  },
  {
    id: "hr",
    sender: "HR Payroll Updates",
    email: "payroll@acme-corp.support",
    subject: "Q2 Salary adjustment — action required",
    preview: "Hi team, please review the attached spreadsheet for your updated 2026 compensation. Open the file to confirm receipt...",
    time: "Yesterday",
    category: "HR Payroll Update",
    severity: "high",
    redFlags: ["Unusual sender domain", "Suspicious .xlsm attachment", "Requests immediate action"],
  },
  {
    id: "drive",
    sender: "Marcus Reid",
    email: "marcus.reid@acmе-corp.com",
    subject: "Reviewed contract — please sign today",
    preview: "Hey, can you take a quick look at this contract? I need it signed before EOD. Document is in our shared drive...",
    time: "Mon",
    category: "Spear Phishing",
    severity: "high",
    redFlags: ["Cyrillic 'е' in domain", "Pressure tactics", "Impersonates colleague"],
  },
  {
    id: "delivery",
    sender: "DHL Express",
    email: "tracking@dhl-delivery-status.net",
    subject: "📦 Your package #DHL-892331 is held at customs",
    preview: "A customs fee of $2.99 is required to release your shipment. Pay now or your package will be returned to sender...",
    time: "Mar 18",
    category: "Package Scam",
    severity: "medium",
    redFlags: ["Unfamiliar tracking domain", "Small payment request", "Unexpected delivery"],
  },
  {
    id: "it",
    sender: "IT Helpdesk",
    email: "it-support@acme-helpdesk.io",
    subject: "Your mailbox is full — upgrade required",
    preview: "Your mailbox storage has reached 99%. Click below to verify your credentials and free up additional space immediately...",
    time: "Mar 15",
    category: "Credential Harvest",
    severity: "medium",
    redFlags: ["Asks for credentials", "Threatens loss of service", "External support domain"],
  },
  {
    id: "bank",
    sender: "Chase Online Banking",
    email: "alerts@chase-secure-banking.com",
    subject: "Statement available — verify your identity",
    preview: "We need to confirm a recent transaction of $1,847.23. Please log in via the secure portal below...",
    time: "Mar 12",
    category: "Banking Fraud",
    severity: "low",
    redFlags: ["Fake banking domain", "Specific amount creates panic", "Login link in email"],
  },
];

function PhishingSimulator() {
  const [selected, setSelected] = useState<Threat>(threats[0]);
  const [reported, setReported] = useState<Set<string>>(new Set());

  const reportThreat = (t: Threat) => {
    if (reported.has(t.id)) return;
    setReported((s) => new Set(s).add(t.id));
    toast.success("Great catch! This threat has been neutralized.", {
      description: `+50 XP · ${t.category} reported to security team.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Phishing Simulator</h1>
            <p className="text-muted-foreground">Realistic threats from this week. Report what looks suspicious.</p>
          </div>
          <div className="flex gap-3">
            <Stat label="Threats spotted" value={`${reported.size}/${threats.length}`} />
            <Stat label="Detection rate" value={`${Math.round((reported.size / threats.length) * 100)}%`} accent />
          </div>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          {/* Inbox / Gallery */}
          <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-[640px]">
            <div className="p-4 border-b border-border flex items-center gap-2 font-bold">
              <Inbox className="w-4 h-4 text-primary" /> Recent Threats
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-destructive/15 text-destructive">{threats.length - reported.size} active</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {threats.map((t, i) => {
                const active = selected.id === t.id;
                const done = reported.has(t.id);
                return (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setSelected(t)}
                    className={`w-full text-left p-4 border-b border-border transition relative ${
                      active ? "bg-primary/10 border-l-2 border-l-primary" : "hover:bg-secondary/40"
                    } ${done ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        t.severity === "high" ? "bg-destructive" : t.severity === "medium" ? "bg-warning" : "bg-muted-foreground"
                      }`} />
                      <p className="font-semibold text-sm truncate flex-1">{t.sender}</p>
                      <span className="text-xs text-muted-foreground">{t.time}</span>
                    </div>
                    <p className="text-sm truncate text-foreground/90">{t.subject}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{t.preview}</p>
                    {done && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-success/15 text-success font-medium">
                        <ShieldCheck className="w-3 h-3" /> Neutralized
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Email viewer */}
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-xl overflow-hidden flex flex-col"
          >
            <div className="p-5 border-b border-border">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-lg font-bold leading-tight flex-1">{selected.subject}</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                  selected.severity === "high" ? "bg-destructive/15 text-destructive" :
                  selected.severity === "medium" ? "bg-warning/15 text-warning" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {selected.severity.toUpperCase()} RISK
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-cyber flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0">
                  {selected.sender.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{selected.sender}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">{selected.email}</p>
                </div>
                <div className="text-xs text-muted-foreground">{selected.time}</div>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <p className="text-sm leading-relaxed mb-4">Hello,</p>
              <p className="text-sm leading-relaxed mb-4">{selected.preview}</p>
              <p className="text-sm leading-relaxed mb-6">
                <span className="text-primary underline cursor-not-allowed">Click here to verify →</span>
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground mb-2">Best regards,</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{selected.sender} Team</p>

              {selected.id === "hr" && (
                <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-sm">
                  <Paperclip className="w-4 h-4 text-warning" />
                  <span>Q2_Salary_Adjustment.xlsm</span>
                  <span className="text-xs text-muted-foreground">· 142 KB</span>
                </div>
              )}

              <div className="mt-8 p-4 rounded-lg bg-warning/10 border border-warning/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <p className="text-sm font-bold text-warning">Red flags detected by AI Tutor</p>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {selected.redFlags.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-warning mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-border flex items-center gap-2 flex-wrap">
              <button
                onClick={() => reportThreat(selected)}
                disabled={reported.has(selected.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Flag className="w-4 h-4" />
                {reported.has(selected.id) ? "Reported ✓" : "Report Phishing"}
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-secondary text-sm">
                <Eye className="w-4 h-4" /> Mark as safe
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-secondary text-sm ml-auto">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`px-5 py-3 rounded-xl border border-border ${accent ? "bg-gradient-cyber" : "bg-card"}`}>
      <p className={`text-[10px] uppercase tracking-wider ${accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{label}</p>
      <p className={`text-xl font-bold ${accent ? "text-primary-foreground" : ""}`}>{value}</p>
    </div>
  );
}
