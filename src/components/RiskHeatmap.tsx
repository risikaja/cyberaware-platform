const cells = [
  { dept: "IT", values: [{ k: "Phishing", v: 4 }, { k: "Passwords", v: 6 }, { k: "Social Eng", v: 8 }, { k: "Data Loss", v: 5 }] },
  { dept: "HR", values: [{ k: "Phishing", v: 22 }, { k: "Passwords", v: 18 }, { k: "Social Eng", v: 35 }, { k: "Data Loss", v: 28 }] },
  { dept: "Sales", values: [{ k: "Phishing", v: 48 }, { k: "Passwords", v: 32 }, { k: "Social Eng", v: 56 }, { k: "Data Loss", v: 24 }] },
  { dept: "Finance", values: [{ k: "Phishing", v: 18 }, { k: "Passwords", v: 14 }, { k: "Social Eng", v: 22 }, { k: "Data Loss", v: 38 }] },
  { dept: "Marketing", values: [{ k: "Phishing", v: 38 }, { k: "Passwords", v: 42 }, { k: "Social Eng", v: 45 }, { k: "Data Loss", v: 18 }] },
  { dept: "Operations", values: [{ k: "Phishing", v: 12 }, { k: "Passwords", v: 24 }, { k: "Social Eng", v: 28 }, { k: "Data Loss", v: 16 }] },
];

function colorFor(v: number) {
  // 0-100 → green → yellow → red (oklch lightness/chroma stays consistent)
  if (v < 15) return "oklch(0.85 0.13 155)";
  if (v < 30) return "oklch(0.85 0.15 110)";
  if (v < 45) return "oklch(0.82 0.16 75)";
  if (v < 55) return "oklch(0.78 0.18 50)";
  return "oklch(0.7 0.22 25)";
}

export function RiskHeatmap() {
  const categories = cells[0].values.map((v) => v.k);
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-lg">Department Risk Heatmap</h3>
          <p className="text-sm text-muted-foreground">Risk score by department & threat category</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Low</span>
          <div className="flex h-2 rounded-full overflow-hidden">
            {[155, 110, 75, 50, 25].map((h) => (
              <div key={h} className="w-5" style={{ background: `oklch(0.78 0.18 ${h})` }} />
            ))}
          </div>
          <span className="text-muted-foreground">High</span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[480px]">
          <div className="grid" style={{ gridTemplateColumns: `120px repeat(${categories.length}, 1fr)` }}>
            <div />
            {categories.map((c) => (
              <div key={c} className="text-xs text-muted-foreground font-medium pb-2 text-center">{c}</div>
            ))}
            {cells.map((row) => (
              <div key={row.dept} className="contents">
                <div className="text-sm font-medium pr-3 py-1.5 flex items-center">{row.dept}</div>
                {row.values.map((v) => (
                  <div key={v.k} className="p-1">
                    <div
                      className="rounded-md aspect-[2/1] flex items-center justify-center text-sm font-bold transition-transform hover:scale-105 cursor-default"
                      style={{ background: colorFor(v.v), color: "oklch(0.18 0.04 260)" }}
                      title={`${row.dept} · ${v.k}: risk score ${v.v}`}
                    >
                      {v.v}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
