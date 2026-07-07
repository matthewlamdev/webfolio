"use client";

import { useEffect, useState } from "react";
const stages = [
  { id: "build", label: "build", cmd: "docker build -t app:$SHA ." },
  { id: "test", label: "test", cmd: "go test ./... -race -cover" },
  { id: "scan", label: "scan", cmd: "trivy image app:$SHA" },
  { id: "stage", label: "stage", cmd: "kubectl -n stage rollout status" },
  { id: "canary", label: "canary", cmd: "argo rollouts promote app" },
  { id: "prod", label: "prod", cmd: "✓ live · 100% traffic" },
];
export function ScrollDeployTracker() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const activeIdx = Math.min(
    stages.length - 1,
    Math.floor(progress * stages.length),
  );
  const pct = Math.round(progress * 100);
  const current = stages[activeIdx];
  return (
    <div
      className="fixed bottom-4 right-4 z-40 hidden md:block w-[320px] rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-3 font-mono text-xs shadow-2xl"
      style={{
        boxShadow:
          "0 0 0 1px rgba(52,211,153,0.3), 0 0 40px -8px rgba(52,211,153,0.4), 0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
    >
      <style>{`
        @keyframes sdt-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .sdt-pulse-dot { animation: sdt-pulse-dot 2s ease-in-out infinite; }
      `}</style>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 sdt-pulse-dot" />
          <span className="text-slate-400 uppercase tracking-widest text-[10px]">
            deploy · scroll to advance
          </span>
        </div>
        <span className="text-emerald-400 tabular-nums">{pct}%</span>
      </div>
      {/* progress bar */}
      <div className="h-1 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {/* stage dots */}
      <div className="flex items-center justify-between mb-3">
        {stages.map((s, i) => {
          const done = i < activeIdx;
          const active = i === activeIdx;
          return (
            <div key={s.id} className="flex flex-col items-center gap-1 flex-1">
              <div
                className={[
                  "h-2 w-2 rounded-full transition-all duration-300",
                  done && "bg-emerald-400",
                  active &&
                    "bg-amber-400 scale-150 shadow-[0_0_12px_currentColor] text-amber-400",
                  !done && !active && "bg-slate-700",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
              <span
                className={[
                  "text-[9px] uppercase tracking-wider transition-colors",
                  active
                    ? "text-amber-400"
                    : done
                      ? "text-emerald-400"
                      : "text-slate-400",
                ].join(" ")}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* current cmd */}
      <div className="rounded-md bg-slate-950/60 border border-slate-800 px-2 py-1.5 text-[11px] truncate">
        <span className="text-emerald-400">$ </span>
        <span className="text-slate-100">{current.cmd}</span>
      </div>
    </div>
  );
}

export default ScrollDeployTracker;