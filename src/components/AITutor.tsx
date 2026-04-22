import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";

const tips = [
  "Always check the sender's full email address — attackers spoof display names.",
  "Hover over links before clicking to preview the real destination URL.",
  "Use a password manager: long, unique passphrases beat complex ones.",
  "Enable MFA on every account — it blocks 99.9% of automated attacks.",
  "If an email creates urgency or fear, slow down — that's a classic phishing trigger.",
];

type Msg = { role: "user" | "ai"; text: string };

export function AITutor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi Alex 👋 I'm your AI Security Tutor. Ask me anything, or tap a tip below." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      const reply = tips[Math.floor(Math.random() * tips.length)];
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 dark">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-96 h-[480px] rounded-2xl bg-card border border-border shadow-glow flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-border bg-gradient-cyber flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-background/20 backdrop-blur flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-primary-foreground text-sm">AI Security Tutor</p>
                <p className="text-xs text-primary-foreground/80">Online · Powered by CyberAware</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {["Phishing tips", "Password help", "Report email"].map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border hover:border-primary/50 transition"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="p-3 border-t border-border flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a security question..."
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm outline-none border border-transparent focus:border-primary/50"
              />
              <button type="submit" className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-gradient-cyber shadow-glow flex items-center justify-center relative"
        aria-label="Open AI Tutor"
      >
        {open ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <>
            <Bot className="w-6 h-6 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success border-2 border-background animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-warning" />
          </>
        )}
      </motion.button>
    </div>
  );
}
