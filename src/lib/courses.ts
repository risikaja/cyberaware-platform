export interface Chapter {
  title: string;
  duration: string;
  done: boolean;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface CourseData {
  id: string;
  title: string;
  category: string;
  duration: string;
  status: "completed" | "in-progress" | "locked";
  chapters?: Chapter[];
  activeChapter?: number;
  lesson?: { heading: string; body: string[] };
  quiz?: QuizQuestion[];
}

export const COURSES: CourseData[] = [
  {
    id: "phishing-101",
    title: "Phishing 101",
    category: "Email Security",
    duration: "20 min",
    status: "completed",
  },
  {
    id: "social-engineering",
    title: "Social Engineering",
    category: "Human Risk",
    duration: "35 min",
    status: "in-progress",
    activeChapter: 2,
    chapters: [
      { title: "Introduction", duration: "3 min", done: true },
      { title: "Common Tactics", duration: "8 min", done: true },
      { title: "Pretexting & Baiting", duration: "6 min", done: true },
      { title: "Real-World Examples", duration: "10 min", done: false },
      { title: "Defense Strategies", duration: "7 min", done: false },
      { title: "Final Quiz", duration: "5 min", done: false },
    ],
    lesson: {
      heading: "Pretexting & Baiting",
      body: [
        "Pretexting is the art of inventing a scenario to extract information. Attackers impersonate trusted figures — IT staff, executives, vendors — to bypass your skepticism. Baiting hooks you with curiosity: a free download, a found USB drive, an enticing offer.",
        "The strongest defense is verification. Always confirm requests through a second channel before acting. When something feels off, pause and report.",
      ],
    },
    quiz: [
      {
        q: "An attacker calls pretending to be IT and asks for your password. What is this?",
        options: ["Phishing", "Pretexting", "Tailgating", "Smishing"],
        correct: 1,
      },
      {
        q: "What is baiting?",
        options: [
          "Sending urgent emails to executives",
          "Following someone through a secure door",
          "Leaving a malware-infected USB drive to be found",
          "Calling and pretending to be a vendor",
        ],
        correct: 2,
      },
      {
        q: "Best defense against pretexting?",
        options: [
          "Trust caller ID",
          "Verify through a second channel",
          "Reply quickly to avoid delays",
          "Forward the request to a coworker",
        ],
        correct: 1,
      },
    ],
  },
  { id: "password-safety", title: "Password Safety", category: "Credentials", duration: "15 min", status: "locked" },
  { id: "ransomware-defense", title: "Ransomware Defense", category: "Malware", duration: "40 min", status: "locked" },
  { id: "safe-remote-work", title: "Safe Remote Work", category: "Best Practices", duration: "25 min", status: "locked" },
  { id: "data-privacy-gdpr", title: "Data Privacy & GDPR", category: "Compliance", duration: "30 min", status: "locked" },
];

export function getCourse(id: string) {
  return COURSES.find((c) => c.id === id);
}
