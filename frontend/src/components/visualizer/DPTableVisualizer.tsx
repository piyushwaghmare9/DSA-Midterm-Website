import React from 'react';
import { motion } from 'framer-motion';

interface DPTableRow {
  rowLabel?: string;
  values: (number | string)[];
  activeCol?: number;
}

interface DPTableVisualizerProps {
  dpTable?: DPTableRow[];
  variables?: Record<string, string | number | boolean>;
}

export const DPTableVisualizer: React.FC<DPTableVisualizerProps> = ({
  dpTable = [],
  variables = {},
}) => {
  if (!dpTable || dpTable.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-slate-400">
        No DP table data available.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 select-none overflow-x-auto">
      {/* Recurrence summary */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300 mb-6 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700/60">
        {Object.entries(variables).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5">
            <span className="text-indigo-400 font-semibold">{k}:</span>
            <span className="text-slate-100">{String(v)}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="border border-slate-700 rounded-xl overflow-hidden shadow-xl bg-slate-900/90">
        <table className="border-collapse">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700">
              <th className="px-4 py-2.5 text-left text-xs font-mono text-slate-400 font-semibold">
                State / Index (i)
              </th>
              {dpTable[0]?.values.map((_, colIdx) => (
                <th
                  key={colIdx}
                  className="px-4 py-2.5 text-center text-xs font-mono text-indigo-400 font-bold border-l border-slate-700/60"
                >
                  [{colIdx}]
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dpTable.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-slate-800/80 last:border-b-0 hover:bg-slate-800/30">
                <td className="px-4 py-3 text-xs font-mono font-medium text-slate-300 bg-slate-800/40">
                  {row.rowLabel || `Row ${rowIdx}`}
                </td>
                {row.values.map((cellValue, colIdx) => {
                  const isActive = row.activeCol === colIdx;

                  return (
                    <td
                      key={colIdx}
                      className="px-3 py-2 text-center border-l border-slate-700/60 min-w-[56px]"
                    >
                      <motion.div
                        layout
                        animate={{
                          scale: isActive ? [1, 1.15, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`py-1.5 px-2 rounded-md font-mono text-xs font-bold transition-colors ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 ring-2 ring-indigo-400'
                            : Number(cellValue) > 0 || cellValue !== '0'
                            ? 'bg-slate-800 text-slate-200 border border-slate-700'
                            : 'text-slate-400 bg-slate-900/40'
                        }`}
                      >
                        {cellValue}
                      </motion.div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
