import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Users, TrendingDown, MousePointerClick, Award, Plus, Search, Download, FileText } from "lucide-react";
import { CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { NotificationBell } from "@/components/NotificationBell";
import { RiskHeatmap } from "@/components/RiskHeatmap";
import { CertificateModal } from "@/components/CertificateModal";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — CyberAware" },
      { name: "description", content: "Enterprise security analytics, compliance, and phishing campaigns." },
    ],
  }),
  component: Admin,
});

const phishingData = [
  { month: "Oct", rate: 18.4 },
  { month: "Nov", rate: 14.2 },
  { month: "Dec", rate: 11.8 },
  { month: "Jan", rate: 8.6 },
  { month: "Feb", rate: 6.1 },
  { month: "Mar", rate: 4.2 },
];

const departments = [
  { name: "IT", users: 84, completion: 98, score: "A+", risk: "Low" },
  { name: "HR", users: 42, completion: 92, score: "A", risk: "Low" },
  { name: "Sales", users: 218, completion: 78, score: "B+", risk: "Medium" },
  { name: "Finance", users: 96, completion: 88, score: "A-", risk: "Low" },
  { name: "Marketing", users: 64, completion: 71, score: "B", risk: "Medium" },
  { name: "Operations", users: 156, completion: 84, score: "A-", risk: "Low" },
];

function Admin() {
  const [certOpen, setCertOpen] = useState(false);

  const downloadReport = () => {
    toast.success("Report queued for download", { description: "Q1 2026 Compliance Report (PDF, 4.2 MB)" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">CyberAware</span>
            </Link>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border w-72">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input className="bg-transparent outline-none text-sm flex-1" placeholder="Search users, campaigns..." />
            </div>
            <NotificationBell />
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Employee view</Link>
            <div className="w-9 h-9 rounded-full bg-gradient-cyber flex items-center justify-center text-sm font-bold text-primary-foreground">JD</div>
          </div>
        </div>
      </header>

      <PageTransition>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Security Overview</h1>
            <p className="text-muted-foreground">Acme Corp · last 6 months</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={downloadReport} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-secondary text-sm font-medium transition">
              <Download className="w-4 h-4" /> Download Report
            </button>
            <button onClick={() => setCertOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 text-sm font-medium transition">
              <FileText className="w-4 h-4" /> Compliance Certificate
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-elegant">
              <Plus className="w-4 h-4" /> Create Phishing Campaign
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Kpi icon={Users} label="Total Users" value="1,200" trend="+48 this month" trendUp />
          <Kpi icon={TrendingDown} label="Avg Completion" value="85%" trend="+6.2% vs last month" trendUp />
          <Kpi icon={MousePointerClick} label="Phishing Click Rate" value="4.2%" trend="-2.0% vs last month" trendUp />
          <Kpi icon={Award} label="Security Score" value="A+" trend="Top 5% of orgs" trendUp accent />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">Phishing Click Rate Trend</h3>
                <p className="text-sm text-muted-foreground">Lower is better — last 6 months</p>
              </div>
              <span className="text-sm px-3 py-1 rounded-full bg-success/15 text-success font-medium">↓ 77% reduction</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={phishingData}>
                  <defs>
                    <linearGradient id="rate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.42 0.18 258)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="oklch(0.42 0.18 258)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                  <XAxis dataKey="month" stroke="oklch(0.5 0.03 258)" fontSize={12} />
                  <YAxis stroke="oklch(0.5 0.03 258)" fontSize={12} unit="%" />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(1 0 0)",
                      border: "1px solid oklch(0.92 0.01 250)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="rate" stroke="oklch(0.42 0.18 258)" strokeWidth={2.5} fill="url(#rate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk overview */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-bold text-lg mb-1">Risk Distribution</h3>
            <p className="text-sm text-muted-foreground mb-6">Across all employees</p>
            {[
              { label: "Low risk", value: 78, color: "bg-success" },
              { label: "Medium risk", value: 18, color: "bg-warning" },
              { label: "High risk", value: 4, color: "bg-destructive" },
            ].map((r) => (
              <div key={r.label} className="mb-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{r.label}</span>
                  <span className="font-medium">{r.value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${r.color}`} style={{ width: `${r.value}%` }} />
                </div>
              </div>
            ))}
            <button className="w-full mt-4 text-sm text-primary font-medium hover:underline">View detailed report →</button>
          </div>
        </div>

        {/* Risk Heatmap */}
        <div className="mb-8">
          <RiskHeatmap />
        </div>

        {/* Department table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Departmental Compliance</h3>
              <p className="text-sm text-muted-foreground">Training completion by team</p>
            </div>
            <button onClick={downloadReport} className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-medium">Department</th>
                  <th className="p-4 font-medium">Users</th>
                  <th className="p-4 font-medium">Completion</th>
                  <th className="p-4 font-medium">Score</th>
                  <th className="p-4 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d.name} className="border-t border-border hover:bg-secondary/30 transition">
                    <td className="p-4 font-medium">{d.name}</td>
                    <td className="p-4 text-muted-foreground">{d.users}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-cyber" style={{ width: `${d.completion}%` }} />
                        </div>
                        <span className="text-xs font-mono">{d.completion}%</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-primary">{d.score}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        d.risk === "Low" ? "bg-success/15 text-success" :
                        d.risk === "Medium" ? "bg-warning/15 text-warning" :
                        "bg-destructive/15 text-destructive"
                      }`}>{d.risk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      </PageTransition>

      <CertificateModal open={certOpen} onClose={() => setCertOpen(false)} />
    </div>
  );
}

function Kpi({ icon: Icon, label, value, trend, trendUp, accent }: { icon: any; label: string; value: string; trend: string; trendUp?: boolean; accent?: boolean }) {
  return (
    <div className={`p-6 rounded-xl border border-border bg-card ${accent ? "shadow-elegant" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent ? "bg-gradient-cyber" : "bg-secondary"}`}>
          <Icon className={`w-5 h-5 ${accent ? "text-primary-foreground" : "text-primary"}`} />
        </div>
      </div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className={`text-xs ${trendUp ? "text-success" : "text-muted-foreground"}`}>{trend}</p>
    </div>
  );
}
