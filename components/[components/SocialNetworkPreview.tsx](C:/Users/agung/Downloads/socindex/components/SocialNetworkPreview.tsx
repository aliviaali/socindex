"use client";

import { useRef, useState } from "react";
import { LuArrowDown, LuArrowLeft, LuArrowRight, LuArrowUp, LuMinus, LuPlus, LuShare2 } from "react-icons/lu";
import { useLang } from "@/lib/i18n";

// Illustrative network, matching the existing demo data (not live accounts).
type Hub = { x: number; y: number; color: string; name: string; count: number };
const networks: Record<string, Hub[]> = {
  bbm: [
  { x: 65, y: 120, color: "#499FFF", name: "XLaxiata", count: 40 },
  { x: 125, y: 132, color: "#FFAF26", name: "IxyIcare", count: 35 },
  { x: 205, y: 80, color: "#FF6177", name: "Myxl", count: 55 },
  { x: 294, y: 130, color: "#A578FF", name: "Rizkyarum92", count: 50 },
  { x: 252, y: 258, color: "#69CF89", name: "Gugelpixel", count: 12 },
  { x: 90, y: 48, color: "#69CF89", name: "XIsatu", count: 10 },
  ],
  ihsg: [
    { x: 72, y: 85, color: "#499FFF", name: "MarketWatch", count: 52 },
    { x: 180, y: 145, color: "#FF6177", name: "InvestorTalk", count: 62 },
    { x: 276, y: 72, color: "#A578FF", name: "StockDaily", count: 32 },
    { x: 280, y: 220, color: "#FFAF26", name: "TradingHub", count: 28 },
    { x: 88, y: 225, color: "#69CF89", name: "FinanceNews", count: 18 },
  ],
  greenpeace: [
    { x: 185, y: 125, color: "#69CF89", name: "ClimateAction", count: 65 },
    { x: 65, y: 75, color: "#499FFF", name: "EcoCommunity", count: 28 },
    { x: 280, y: 75, color: "#FFAF26", name: "GreenVoices", count: 34 },
    { x: 275, y: 210, color: "#A578FF", name: "EarthWatch", count: 22 },
    { x: 90, y: 215, color: "#FF6177", name: "CityActivists", count: 38 },
    { x: 185, y: 255, color: "#69CF89", name: "CleanFuture", count: 12 },
  ],
};
const clampZoom = (value: number) => Math.min(3, Math.max(0.6, value));

export function SocialNetworkPreview({ topicId, onUnlock }: { topicId: string; onUnlock: () => void }) {
  const { t } = useLang();
  const hubs = networks[topicId] ?? networks.ihsg;
  const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });
  const gesture = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const zoom = (factor: number) => setView((v) => ({ ...v, zoom: clampZoom(v.zoom * factor) }));
  const pan = (x: number, y: number) => setView((v) => ({ ...v, x: v.x + x, y: v.y + y }));
  const control = "grid h-11 w-11 place-items-center rounded-full border border-green-500 text-green-600 transition hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-500 dark:border-green-400/70 dark:text-green-400 dark:hover:bg-green-400/10";

  return (
    <div className="glass shrink-0 overflow-hidden rounded-[26px] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-navy-ink dark:text-white">
        <h3 className="flex items-center gap-2 text-base font-semibold"><LuShare2 />{t("Social Network")}</h3>
        <div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold dark:bg-white/10">
          <button type="button" onClick={onUnlock} className="rounded-full bg-[#18223B] px-4 py-2.5 text-white dark:bg-slate-200 dark:text-slate-900">{t("Network")}</button>
          <button type="button" onClick={onUnlock} className="rounded-full px-4 py-2.5">{t("Stats")}</button>
        </div>
      </div>
      <svg
        viewBox="0 0 380 285"
        role="button"
        tabIndex={0}
        aria-label={t("Social Network") + ": " + t("Subscribe to Socindex")}
        className="mt-3 h-[285px] w-full touch-none select-none overflow-hidden rounded-xl text-navy-ink outline-offset-2 dark:text-slate-100 cursor-grab active:cursor-grabbing"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onUnlock(); }
          else if (event.key === "+" || event.key === "=") { event.preventDefault(); zoom(1.2); }
          else if (event.key === "-") { event.preventDefault(); zoom(1 / 1.2); }
          else if (event.key.startsWith("Arrow")) {
            event.preventDefault();
            pan(event.key === "ArrowLeft" ? -20 : event.key === "ArrowRight" ? 20 : 0, event.key === "ArrowUp" ? -20 : event.key === "ArrowDown" ? 20 : 0);
          }
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
        }}
        onPointerMove={(event) => {
          const drag = gesture.current;
          if (!drag || drag.id !== event.pointerId) return;
          const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
          if (!drag.moved && Math.hypot(dx, dy) < 5) return;
          drag.moved = true;
          const bounds = event.currentTarget.getBoundingClientRect();
          const ratio = Math.min(bounds.width / 380, bounds.height / 285);
          pan(dx / ratio, dy / ratio);
          drag.x = event.clientX; drag.y = event.clientY;
        }}
        onPointerUp={(event) => {
          const drag = gesture.current;
          if (!drag || drag.id !== event.pointerId) return;
          gesture.current = null;
          event.currentTarget.releasePointerCapture(event.pointerId);
          if (!drag.moved) onUnlock();
        }}
        onPointerCancel={() => { gesture.current = null; }}
        onLostPointerCapture={() => { gesture.current = null; }}
      >
        <g transform={`translate(${190 + view.x} ${142.5 + view.y}) scale(${view.zoom}) translate(-190 -142.5)`}>
          {hubs.slice(1).map((hub, i) => <line key={hub.name} x1={hubs[i].x} y1={hubs[i].y} x2={hub.x} y2={hub.y} stroke="#94A3B8" strokeWidth="0.6" opacity="0.65" />)}
          {hubs.map((hub, index) => (
            <g key={hub.name}>
              {Array.from({ length: hub.count }, (_, i) => {
                const angle = i * 2.39996 + index;
                const radius = 12 + ((i * 17 + index * 11) % (hub.count > 20 ? 48 : 12));
                const x = hub.x + Math.cos(angle) * radius;
                const y = hub.y + Math.sin(angle) * radius;
                return <g key={i}><path d={`M${hub.x} ${hub.y} L${x} ${y} l${Math.sin(i) * 13} ${Math.cos(i) * 11}`} fill="none" stroke={hub.color} strokeWidth="0.55" opacity="0.65" /><circle cx={x} cy={y} r="0.8" fill={hub.color} /></g>;
              })}
              <circle cx={hub.x} cy={hub.y} r={hub.count > 20 ? 5 : 3} fill={hub.color} />
              <text x={hub.x + (index === 2 || index === 3 ? 9 : 0)} y={hub.y + (index === 2 || index === 3 ? 4 : 19)} textAnchor={index === 2 || index === 3 ? "start" : "middle"} fill="currentColor" fontSize="10" fontWeight="600">{hub.name}</text>
            </g>
          ))}
        </g>
      </svg>
      <div className="flex items-end justify-between px-2 pb-2">
        <div className="grid grid-cols-3 gap-2">
          <button type="button" aria-label={t("Pan up")} className={`${control} col-start-2`} onClick={() => pan(0, -24)}><LuArrowUp /></button>
          <button type="button" aria-label={t("Pan left")} className={`${control} col-start-1`} onClick={() => pan(-24, 0)}><LuArrowLeft /></button>
          <button type="button" aria-label={t("Pan down")} className={control} onClick={() => pan(0, 24)}><LuArrowDown /></button>
          <button type="button" aria-label={t("Pan right")} className={control} onClick={() => pan(24, 0)}><LuArrowRight /></button>
        </div>
        <div className="space-y-2">
          <button type="button" aria-label={t("Zoom out")} className={control} onClick={() => zoom(1 / 1.2)} disabled={view.zoom <= 0.6}><LuMinus /></button>
          <button type="button" aria-label={t("Zoom in")} className={control} onClick={() => zoom(1.2)} disabled={view.zoom >= 3}><LuPlus /></button>
        </div>
      </div>
    </div>
  );
}
