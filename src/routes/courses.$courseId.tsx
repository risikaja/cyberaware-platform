import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { CheckCircle2, PlayCircle, Circle, X, Trophy, ArrowRight, ArrowLeft, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { getCourse, type QuizQuestion } from "@/lib/courses";
import { addXP, markQuizDone } from "@/lib/xp";

export const Route = createFileRoute("/courses/$courseId")({
  head: ({ params }) => {
    const c = getCourse(params.courseId);
    return { meta: [{ title: `${c?.title ?? "Course"} — CyberAware` }] };
  },
  component: CourseViewer,
});

function CourseViewer() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const course = getCourse(courseId);
  const [quizOpen, setQuizOpen] = useState(false);

  if (!course || !course.chapters) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Course coming soon</h1>
          <p className="text-muted-foreground mb-6">This course is not yet available.</p>
          <Link to="/courses" className="text-primary hover:underline">← Back to all courses</Link>
        </div>
      </DashboardLayout>
    );
  }

  const active = course.activeChapter ?? 0;

  return (
    <DashboardLayout>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="w-80 border-r border-border bg-sidebar p-6 overflow-y-auto">
          <button onClick={() => navigate({ to: "/courses" })} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-3 h-3" /> All courses
          </button>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{course.category}</p>
          <h2 className="text-xl font-bold mb-6">{course.title}</h2>
          <div className="space-y-1">
            {course.chapters.map((c, i) => {
              const current = i === active;
              return (
                <div
                  key={c.title}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    current ? "bg-primary/15 border border-primary/30" : "hover:bg-secondary"
                  }`}
                >
                  {c.done ? <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" /> :
                   current ? <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" /> :
                   <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${current ? "font-medium" : ""}`}>{c.title}</p>
                    <p className="text-xs text-muted-foreground">Chapter {i + 1} · {c.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8">
            <div className="aspect-video rounded-xl bg-gradient-hero relative overflow-hidden grid-bg flex items-center justify-center mb-6 shadow-elegant">
              <button className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition">
                <PlayCircle className="w-10 h-10 text-white" />
              </button>
              <div className="absolute bottom-4 left-4 text-white/90 text-sm">06:24 / {course.chapters[active].duration}</div>
            </div>

            <p className="text-xs uppercase tracking-wider text-primary mb-2">Chapter {active + 1}</p>
            <h1 className="text-3xl font-bold mb-4">{course.lesson?.heading ?? course.chapters[active].title}</h1>
            {course.lesson?.body.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
            ))}

            {course.quiz && (
              <div className="mt-6 flex items-center justify-between p-6 rounded-xl bg-gradient-cyber shadow-glow">
                <div className="text-primary-foreground">
                  <p className="font-bold text-lg">Ready for the chapter quiz?</p>
                  <p className="text-sm opacity-90">{course.quiz.length} questions · Earn 50 XP</p>
                </div>
                <button
                  onClick={() => setQuizOpen(true)}
                  className="px-5 py-2.5 rounded-lg bg-background text-foreground font-semibold hover:scale-105 transition flex items-center gap-2"
                >
                  Take Quiz <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {quizOpen && course.quiz && (
          <QuizModal questions={course.quiz} courseId={course.id} onClose={() => setQuizOpen(false)} />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

function QuizModal({ questions, courseId, onClose }: { questions: QuizQuestion[]; courseId: string; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const choose = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      const next = [...answers, idx];
      setAnswers(next);
      setSelected(null);
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setDone(true);
        addXP(50);
        markQuizDone(courseId);
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } }), 250);
      }
    }, 900);
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const q = questions[step];

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
            <h3 className="text-xl font-bold mb-6">{q.q}</h3>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correct;
                const isSelected = selected === i;
                let cls = "border-border hover:border-primary hover:bg-primary/5";
                if (selected !== null) {
                  if (isCorrect) cls = "border-success bg-success/10 text-success-foreground";
                  else if (isSelected) cls = "border-destructive bg-destructive/10";
                  else cls = "border-border opacity-60";
                }
                return (
                  <button
                    key={opt}
                    onClick={() => choose(i)}
                    disabled={selected !== null}
                    className={`w-full text-left p-4 rounded-lg border transition flex items-center justify-between ${cls}`}
                  >
                    <span>{opt}</span>
                    {selected !== null && isCorrect && <Check className="w-4 h-4 text-success" />}
                    {selected !== null && isSelected && !isCorrect && <X className="w-4 h-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-cyber flex items-center justify-center shadow-glow">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-muted-foreground mb-2">
              You scored <span className="font-bold text-foreground">{score} / {questions.length}</span>
            </p>
            <p className="text-primary font-bold text-lg mb-6">+50 XP earned</p>
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
