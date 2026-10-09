"use client";
import Marquee from "react-fast-marquee";

export default function Ticker({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-gray-900 text-white py-2 border-b border-gray-800 flex items-center">
      <div className="max-w-6xl mx-auto w-full flex">
        <div className="px-4 py-1 bg-red-600 text-xs font-bold whitespace-nowrap z-10 hidden md:block">
          লাইভ আপডেট
        </div>
        <Marquee pauseOnHover speed={40} className="overflow-hidden">
          {products.map((p, i) => {
             const isUp = p.change?.dir === "up";
             const isDown = p.change?.dir === "down";
             const arrow = isUp ? "▲" : isDown ? "▼" : "";
             const color = isUp ? "text-red-400" : isDown ? "text-green-400" : "text-gray-400";
             const pct = p.change?.pct || 0;
             
             return (
              <span key={i} className="mx-6 text-sm flex items-center gap-2">
                <span>{p.image || p.categoryIcon}</span>
                <span className="font-medium">{p.nameBn}</span>
                <span>{p.today} টাকা</span>
                <span className={`${color} font-bold`}>{arrow} {pct}%</span>
                <span className="text-gray-500 ml-4">•</span>
              </span>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}