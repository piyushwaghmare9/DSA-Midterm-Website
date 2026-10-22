import React from 'react';
import { motion } from 'framer-motion';

interface ArrayBarsProps {
  array: number[];
  activeIndices?: number[];
  secondaryIndices?: number[];
  sortedIndices?: number[];
  pointers?: Record<string, number>;
}

export const ArrayBars: React.FC<ArrayBarsProps> = ({
  array,
  activeIndices = [],
  secondaryIndices = [],
  sortedIndices = [],
  pointers = {},
}) => {
  if (!array || array.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        No array data available.
      </div>
    );
  }

  const maxVal = Math.max(...array.map((v) => Math.abs(v)), 1);

  return (
    <div className="w-full flex flex-col items-center justify-end h-64 px-4 pb-4 select-none">
      <div className="w-full flex items-end justify-center gap-2 sm:gap-3 h-48 border-b border-slate-700/60 pb-1">
        {array.map((value, idx) => {
          const isActive = activeIndices.includes(idx);
          const isSecondary = secondaryIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);

          // Height percentage between 18% and 92%
          const heightPercent = Math.max(18, Math.round((Math.abs(value) / maxVal) * 88));

          let bgClass = 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600';
          if (isSorted) {
            bgClass = 'bg-emerald-600/80 border-emerald-400 text-emerald-100 shadow-sm shadow-emerald-900/50';
          } else if (isActive) {
            bgClass = 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/50 ring-2 ring-indigo-400';
          } else if (isSecondary) {
            bgClass = 'bg-amber-500 border-amber-300 text-amber-950 font-bold shadow-md shadow-amber-500/40 ring-1 ring-amber-300';
          }

          // Check if any pointer is pointing to this index
          const activePointerNames = Object.entries(pointers)
            .filter(([_, ptrIdx]) => ptrIdx === idx)
            .map(([name]) => name);

          return (
            <div key={idx} className="flex flex-col items-center flex-1 max-w-[54px] min-w-[28px] relative">
              {/* Pointer Labels above bar */}
              <div className="absolute -top-7 flex items-center justify-center gap-1 z-10">
                {activePointerNames.map((ptrName) => (
                  <span
                    key={ptrName}
                    className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-indigo-500 text-white shadow-sm ring-1 ring-white/20 animate-bounce"
                  >
                    {ptrName}
                  </span>
                ))}
              </div>

              {/* Bar */}
              <motion.div
                layout
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-md flex items-center justify-center text-xs font-mono font-semibold border ${bgClass} transition-colors duration-200`}
              >
                <span>{value}</span>
              </motion.div>

              {/* Index Number below */}
              <span className="text-[11px] font-mono text-slate-400 mt-2">[{idx}]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
