import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Mail, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/phishing")({
  head: () => ({ meta: [{ title: "Phishing Tests — CyberAware" }, { name: "description", content: "Your phishing simulation history and results." }] }),
  component: Phishing,
});

const tests = [
  { subject: "Urgent: Verify your account", date: "Mar 12, 2026", result: "Reported", safe: true },
  { subject: "You won a $500 gift card!", date: "Feb 28, 2026", result: "Reported", safe: true },
  { subject: "IT: Password expires today", date: "Feb 14, 2026", result: "Clicked", safe: false },
  { subject: "Invoice #4823 from vendor", date: "Jan 22, 2026", result: "Reported", safe: true },
];

function Phishing() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Phishing Tests</h1>
        <p className="text-muted-foreground mb-8">Your simulated phishing history and results.</p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tests received</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Reported correctly</p>
            <p className="text-3xl font-bold text-success">11</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Click-rate</p>
            <p className="text-3xl font-bold text-warning">8.3%</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border font-bold">Recent simulations</div>
          {tests.map((t) => (
            <div key={t.subject} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
              <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{t.subject}</p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
              <div className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${t.safe ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                {t.safe ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {t.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
