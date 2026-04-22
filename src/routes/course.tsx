import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { CheckCircle2, PlayCircle, Circle, X, Trophy, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/course")({
  head: () => ({ meta: [{ title: "Social Engineering — CyberAware" }, { name: "description", content: "Interactive lesson on social engineering defense." }] }),
  component: Course,
});

const chapters = [
  { title: "Introduction", duration: "3 min", done: true },
  { title: "Common Tactics", duration: "8 min", done: true },
  { title: "Pretexting & Baiting", duration: "6 min", done: true, current: true },
  { title: "Real-World Examples", duration: "10 min", done: false },
  { title: "Defense Strategies", duration: "7 min", done: false },
  { title: "Final Quiz", duration: "5 min", done: false },
];

const questions = [
  {
    q: "An attacker calls pretending to be IT and asks for your password. What is this?",
    options: ["Pretexting", "Phishing", "Tailgating", "Smishing"],
    correct: 0,
  },
  {
    q: "Which of the following is a red flag in an email?",
    options: ["Familiar sender name", "Personalized greeting", "Urgent demand for action", "Company logo"],
    correct: 2,
  },
  {
    q: "Best response to an unexpected USB drive in the parking lot?",
    options: ["Plug it in to find owner", "Leave it & report to IT", "Throw it away", "Take it home"],
    correct: 1,
  },
];

function Course() {
  const [quizOpen, setQuizOpen] = useState(false);
  return (
    <DashboardLayout>
      <div className="flex h-screen">
        {/* Syllabus */}
        <div className="w-80 border-r border-border bg-sidebar p-6 overflow-y-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Course</p>
          <h2 className="text-xl font-bold mb-6">Social Engineering</h2>
          <div className="space-y-1">
            {chapters.map((c, i) => (
              <div
                key={c.title}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                  c.current ? "bg-primary/15 border border-primary/30" : "hover:bg-secondary"
                }`}
              >
                {c.done ? <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" /> :
                 c.current ? <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" /> :
                 <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${c.current ? "font-medium" : ""}`}>{c.title}</p>
                  <p className="text-xs text-muted-foreground">Chapter {i + 1} · {c.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8">
            <div className="aspect-video rounded-xl bg-gradient-hero relative overflow-hidden grid-bg flex items-center justify-center mb-6 shadow-elegant">
              <button className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition">
                <PlayCircle className="w-10 h-10 text-white" />
              </button>
              <div className="absolute bottom-4 left-4 text-white/90 text-sm">06:24 / 06:00</div>
            </div>

            <p className="text-xs uppercase tracking-wider text-primary mb-2">Chapter 3</p>
            <h1 className="text-3xl font-bold mb-4">Pretexting & Baiting</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pretexting is the art of inventing a scenario to extract information. Attackers
              impersonate trusted figures — IT staff, executives, vendors — to bypass your
              skepticism. Baiting hooks you with curiosity: a free download, a found USB drive,
              an enticing offer.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The strongest defense is verification. Always confirm requests through a second
              channel before acting. When something feels off, pause and report.
            </p>

            <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-cyber shadow-glow">
              <div className="text-primary-foreground">
                <p className="font-bold text-lg">Ready for the chapter quiz?</p>
                <p className="text-sm opacity-90">3 questions · Earn 50 XP</p>
              </div>
              <button
                onClick={() => setQuizOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-background text-foreground font-semibold hover:scale-105 transition flex items-center gap-2"
              >
                Take Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}
      </AnimatePresence>
    </DashboardLayout>
  );
}

function QuizModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const submit = (idx: number) => {
    const next = [...answers, idx];
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } }), 250);
    }
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-elegant overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <p className="text-sm text-muted-foreground">
            {done ? "Quiz Complete" : `Question ${step + 1} of ${questions.length}`}
          </p>
          <button onClick={onClose} className="p-1 rounded hover:bg-secondary"><X className="w-4 h-4" /></button>
        </div>

        {!done ? (
          <div className="p-6">
            <h3 className="text-xl font-bold mb-6">{questions[step].q}</h3>
            <div className="space-y-2">
              {questions[step].options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => submit(i)}
                  className="w-full text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-cyber flex items-center justify-center shadow-glow">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Excellent work!</h3>
            <p className="text-muted-foreground mb-6">
              You scored {score} / {questions.length} and earned <span className="text-primary font-bold">+50 XP</span>
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              Continue learning
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
