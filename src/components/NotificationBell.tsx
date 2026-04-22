import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, AlertTriangle, ShieldAlert } from "lucide-react";

const alerts = [
  {
    icon: AlertTriangle,
    title: "Suspicious login attempt blocked",
    desc: "From IP 185.220.101.7 (Tor exit node) · 2 min ago",
    color: "text-warning",
    bg: "bg-warning/15",
  },
  {
    icon: ShieldAlert,
    title: "New phishing campaign detected",
    desc: "3 employees received fake Microsoft 365 alerts · 18 min ago",
    color: "text-destructive",
    bg: "bg-destructive/15",
  },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-lg hover:bg-secondary transition"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
          2
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 rounded-xl bg-popover border border-border shadow-elegant z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-border flex items-center justify-between">
                <p className="font-bold text-sm">Security Alerts</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/15 text-destructive font-medium">2 unread</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {alerts.map((a, i) => (
                  <div key={i} className="p-3 border-b border-border last:border-0 hover:bg-secondary/40 transition flex gap-3">
                    <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}>
                      <a.icon className={`w-4 h-4 ${a.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full p-2.5 text-xs text-primary hover:bg-secondary/40 font-medium border-t border-border">
                View all alerts →
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
