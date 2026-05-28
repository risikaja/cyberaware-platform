const KEY = "cyberaware.xp.bonus";
const COMPLETED_KEY = "cyberaware.completed.quizzes";

export function getBonusXP(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(KEY) || 0);
}

export function addXP(amount: number): number {
  const next = getBonusXP() + amount;
  try { localStorage.setItem(KEY, String(next)); } catch {}
  window.dispatchEvent(new Event("cyberaware-xp-changed"));
  return next;
}

export function markQuizDone(id: string) {
  const list = getCompletedQuizzes();
  if (!list.includes(id)) {
    list.push(id);
    try { localStorage.setItem(COMPLETED_KEY, JSON.stringify(list)); } catch {}
  }
}

export function getCompletedQuizzes(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]"); } catch { return []; }
}
