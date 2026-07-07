"use client";

import { useEffect, useState } from "react";
// import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

// const techLogos = [
//   { node: <SiReact />, title: "React", href: "https://react.dev" },
//   { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
//   { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
//   { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
// ];

// // Alternative with image sources
// const imageLogos = [
//   { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
//   { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
//   { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
// ];

const stages = [
  { id: "commit", label: "commit", icon: "◆" },
  { id: "build", label: "build", icon: "▲" },
  { id: "test", label: "test", icon: "●" },
  { id: "scan", label: "scan", icon: "▼" },
  { id: "deploy", label: "deploy", icon: "★" },
];

type Status = "idle" | "running" | "success";

export function PipelineViz() {
  const [active, setActive] = useState(0);
  const [statuses, setStatuses] = useState<Status[]>(stages.map(() => "idle"));
  const [runId, setRunId] = useState(1247);

  useEffect(() => {
    const tick = setInterval(() => {
      setActive((prev) => {
        const next = prev + 1;
        setStatuses((s) => {
          const copy = [...s];
          if (prev < stages.length) copy[prev] = "success";
          if (next < stages.length) copy[next] = "running";
          return copy;
        });
        if (next >= stages.length) {
          setTimeout(() => {
            setStatuses(stages.map(() => "idle"));
            setActive(0);
            setStatuses((s) => {
              const c = [...s];
              c[0] = "running";
              return c;
            });
            setRunId((r) => r + 1);
          }, 1000);
        }
        return next;
      });
    }, 1100);

    // kick off first stage
    setStatuses((s) => {
      const c = [...s];
      c[0] = "running";
      return c;
    });

    return () => clearInterval(tick);
  }, []);

  return (
    <div
      className="rounded-xl border border-slate-800 bg-slate-900 p-6"
      style={{
        boxShadow:
          "0 0 0 1px rgba(52,211,153,0.3), 0 0 40px -8px rgba(52,211,153,0.4)",
      }}
    >
      {/* Self-contained keyframes so no global CSS is needed */}
      <style>{`
        @keyframes pipelineviz-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .pipelineviz-pulse-dot { animation: pipelineviz-pulse-dot 2s ease-in-out infinite; }
      `}</style>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-400 pipelineviz-pulse-dot" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
            pipeline · run #{runId}
          </span>
        </div>
        <span className="font-mono text-xs text-emerald-400">main → prod</span>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          {stages.map((stage, i) => {
            const status = statuses[i];
            return (
              <div key={stage.id} className="flex flex-col items-center gap-2 flex-1 z-10">
                <div
                  className={[
                    "h-12 w-12 rounded-lg border flex items-center justify-center font-mono text-lg transition-all duration-300",
                    status === "success"
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                      : status === "running"
                      ? "border-amber-400 bg-amber-400/10 text-amber-400 animate-pulse"
                      : "border-slate-800 bg-slate-800 text-slate-400",
                  ].join(" ")}
                >
                  {stage.icon}
                </div>
                <span
                  className={[
                    "font-mono text-[10px] uppercase tracking-wider",
                    status === "idle" ? "text-slate-400" : "text-slate-100",
                  ].join(" ")}
                >
                  {stage.label}
                </span>
                <span className="font-mono text-[9px] text-slate-400">
                  {status === "success" ? "✓ ok" : status === "running" ? "…" : "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* connecting line */}
        <div className="absolute top-6 left-6 right-6 h-px bg-slate-800 -z-0" />
        <div
          className="absolute top-6 left-6 h-px bg-emerald-400 transition-all duration-700 ease-out -z-0"
          style={{
            width: `calc(${(Math.min(active, stages.length - 1) / (stages.length - 1)) * 100}% - 3rem)`,
          }}
        />
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-3 gap-4 font-mono text-xs">
        <div>
          <div className="text-slate-400">uptime</div>
          <div className="text-emerald-400 text-sm">99.98%</div>
        </div>
        <div>
          <div className="text-slate-400">deploys/wk</div>
          <div className="text-emerald-400 text-sm">42</div>
        </div>
        <div>
          <div className="text-slate-400">mttr</div>
          <div className="text-emerald-400 text-sm">7m 12s</div>
        </div>
      </div>
    </div>
  );
}


export default PipelineViz;
