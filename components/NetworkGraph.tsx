"use client";

import { useMemo, useRef, useState } from "react";
import { LuArrowDown, LuArrowLeft, LuArrowRight, LuArrowUp, LuMinus, LuPlus } from "react-icons/lu";
import { useLang } from "@/lib/i18n";

/**
 * Grafik jaringan sosial (DUMMY, dibuat otomatis dari seed).
 * (apply api) ganti `hubs` + node/edge dengan data graph dari API dashboard.
 */
const hubs = [
  { label: "Xlsatu", x: 250, y: 26, c: "#12A150", r: 3.2, n: 7, lab: [6, -6] as const },
  { label: "Xlhome", x: 192, y: 64, c: "#22B24C", r: 3.4, n: 9, lab: [-8, -8] as const },
  { label: "XLaxiata", x: 128, y: 124, c: "#3B82F6", r: 5.5, n: 30, lab: [-10, 16] as const },
  { label: "Ixylcare", x: 300, y: 134, c: "#F59E0B", r: 6.5, n: 40, lab: [-6, 16] as const },
  { label: "Myxl", x: 410, y: 84, c: "#E0212F", r: 5.5, n: 36, lab: [4, -9] as const },
  { label: "Rizkyarum92", x: 570, y: 112, c: "#8B5CF6", r: 4.6, n: 24, lab: [-12, -9] as const },
  { label: "Prioritas", x: 526, y: 152, c: "#7C3AED", r: 5, n: 26, lab: [-8, 16] as const },
  { label: "Smartlifencare", x: 468, y: 214, c: "#E0212F", r: 4, n: 14, lab: [-30, 14] as const },
  { label: "Gugelpixel", x: 360, y: 222, c: "#22B24C", r: 3.4, n: 8, lab: [-14, 14] as const },
];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function NetworkGraph({ seed }: { seed: string }) {
  const { t } = useLang();
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const g = useMemo(() => {
    let h = 7;
    for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const rand = rng(h);
    const nodes: { x: number; y: number; c: string; r: number; hub: number }[] = [];
    const edges: { a: number; b: number; c: string }[] = [];
    hubs.forEach((hb, hi) => {
      nodes.push({ x: hb.x, y: hb.y, c: hb.c, r: hb.r, hub: hi });
    });
    hubs.forEach((hb, hi) => {
      for (let i = 0; i < hb.n; i++) {
        const ang = rand() * Math.PI * 2;
        const dist = (0.25 + rand() * 0.75) * (20 + hb.n * 1.5);
        const idx = nodes.length;
        nodes.push({ x: hb.x + Math.cos(ang) * dist, y: hb.y + Math.sin(ang) * dist * 0.85, c: hb.c, r: 1 + rand() * 1.1, hub: hi });
        edges.push({ a: hi, b: idx, c: hb.c });
      }
    });
    // hubungan antar-hub & beberapa silang
    const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [4, 6], [3, 6], [1, 3], [2, 4]];
    links.forEach(([a, b]) => edges.push({ a, b, c: hubs[a].c }));
    for (let i = 0; i < 40; i++) {
      const a = hubs.length + Math.floor(rand() * (nodes.length - hubs.length));
      const b = Math.floor(rand() * hubs.length);
      if (nodes[a].hub !== b) edges.push({ a, b, c: nodes[a].c });
    }
    return { nodes, edges };
  }, [seed]);

  const pan = (dx: number, dy: number) => setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
  const zoom = (f: number) => setView((v) => ({ ...v, k: Math.min(2.2, Math.max(0.7, v.k * f)) }));

  const btn = "grid h-7 w-7 place-items-center rounded-full border-[1.5px] border-[#22B24C] bg-white/90 text-[#22B24C] shadow-sm transition hover:bg-[#22B24C] hover:text-white dark:bg-[#1C2438]/80";

  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-2xl sm:h-[260px]">
      <svg
        ref={svgRef}
        viewBox="0 0 680 250"
        className="h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
        role="img"
        aria-label={t("Social Network")}
        onPointerDown={(e) => { drag.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => {
          if (!drag.current || !svgRef.current) return;
          const r = svgRef.current.getBoundingClientRect();
          const u = Math.max(680 / r.width, 250 / r.height); // satuan viewBox per piksel
          const dx = (e.clientX - drag.current.x) * u, dy = (e.clientY - drag.current.y) * u;
          drag.current = { x: e.clientX, y: e.clientY };
          setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
      >
        <g transform={`translate(${340 + view.x} ${125 + view.y}) scale(${view.k}) translate(-340 -125)`}>
          {g.edges.map((e, i) => (
            <line key={i} x1={g.nodes[e.a].x} y1={g.nodes[e.a].y} x2={g.nodes[e.b].x} y2={g.nodes[e.b].y} stroke={e.c} strokeOpacity={0.32} strokeWidth={0.6} />
          ))}
          {g.nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.c} fillOpacity={i < hubs.length ? 1 : 0.85} />
          ))}
          {hubs.map((hb) =>
            hb.label ? (
              <text key={hb.label} x={hb.x + hb.lab[0]} y={hb.y + hb.lab[1]} fontSize="7.5" fontWeight="600" className="fill-navy-ink dark:fill-white" style={{ paintOrder: "stroke" }}>
                {hb.label}
              </text>
            ) : null,
          )}
        </g>
      </svg>

      {/* kontrol pan (kiri-bawah) & zoom (kanan-bawah) */}
      <div className="absolute bottom-2 left-2 grid grid-cols-3 gap-1.5">
        <span />
        <button type="button" aria-label="Pan up" onClick={() => pan(0, 18)} className={btn}><LuArrowUp size={14} /></button>
        <span />
        <button type="button" aria-label="Pan left" onClick={() => pan(18, 0)} className={btn}><LuArrowLeft size={14} /></button>
        <button type="button" aria-label="Pan down" onClick={() => pan(0, -18)} className={btn}><LuArrowDown size={14} /></button>
        <button type="button" aria-label="Pan right" onClick={() => pan(-18, 0)} className={btn}><LuArrowRight size={14} /></button>
      </div>
      <div className="absolute bottom-2 right-2 flex flex-col gap-1.5">
        <button type="button" aria-label="Zoom out" onClick={() => zoom(0.85)} className={btn}><LuMinus size={14} /></button>
        <button type="button" aria-label="Zoom in" onClick={() => zoom(1.15)} className={btn}><LuPlus size={14} /></button>
      </div>
    </div>
  );
}

/** Ringkasan akun teratas (tab "Stats") — DUMMY. (apply api) ganti dengan data API */
export const topAccounts = [
  { name: "Ixylcare", mentions: 4820, c: "#F59E0B" },
  { name: "Myxl", mentions: 4310, c: "#E0212F" },
  { name: "Prioritas", mentions: 3175, c: "#7C3AED" },
  { name: "Rizkyarum92", mentions: 2240, c: "#8B5CF6" },
  { name: "Xlhome", mentions: 1530, c: "#22B24C" },
  { name: "Smartlifencare", mentions: 980, c: "#E0212F" },
];