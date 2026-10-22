import React from 'react';
import { motion } from 'framer-motion';

interface BinaryTreeVisualizerProps {
  nodes?: number[];
  activeIndex?: number;
  variables?: Record<string, string | number | boolean>;
}

export const BinaryTreeVisualizer: React.FC<BinaryTreeVisualizerProps> = ({
  nodes = [4, 2, 7, 1, 3, 6, 9],
  activeIndex,
  variables = {},
}) => {
  // Simple hierarchical binary tree representation for 1-3 levels (up to 7 nodes)
  const rootVal = nodes[0] ?? 4;
  const leftChild = nodes[1] ?? 2;
  const rightChild = nodes[2] ?? 7;
  const leftLeft = nodes[3] ?? 1;
  const leftRight = nodes[4] ?? 3;
  const rightLeft = nodes[5] ?? 6;
  const rightRight = nodes[6] ?? 9;

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 select-none">
      <div className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-3">
        <span>Binary Tree Hierarchy</span>
        {Object.entries(variables).map(([k, v]) => (
          <span key={k} className="text-indigo-400">
            {k}: {String(v)}
          </span>
        ))}
      </div>

      <div className="relative w-full max-w-md h-56 flex flex-col items-center justify-between">
        {/* SVG connecting branch lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700 stroke-2">
          {/* Level 0 to Level 1 */}
          <line x1="50%" y1="24" x2="25%" y2="84" />
          <line x1="50%" y1="24" x2="75%" y2="84" />
          {/* Level 1 to Level 2 */}
          <line x1="25%" y1="96" x2="12%" y2="168" />
          <line x1="25%" y1="96" x2="38%" y2="168" />
          <line x1="75%" y1="96" x2="62%" y2="168" />
          <line x1="75%" y1="96" x2="88%" y2="168" />
        </svg>

        {/* Level 0: Root */}
        <div className="z-10">
          <motion.div
            layout
            className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 shadow-lg ${
              activeIndex === 0
                ? 'bg-indigo-600 border-indigo-300 text-white shadow-indigo-600/50 ring-2 ring-indigo-400'
                : 'bg-slate-800 border-slate-600 text-slate-100'
            }`}
          >
            {rootVal}
          </motion.div>
        </div>

        {/* Level 1: Left & Right */}
        <div className="w-full flex justify-around px-8 z-10">
          <motion.div
            layout
            className={`w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 shadow-md ${
              activeIndex === 1
                ? 'bg-indigo-600 border-indigo-300 text-white shadow-indigo-600/50 ring-2 ring-indigo-400'
                : 'bg-slate-800 border-slate-600 text-slate-100'
            }`}
          >
            {leftChild}
          </motion.div>
          <motion.div
            layout
            className={`w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 shadow-md ${
              activeIndex === 2
                ? 'bg-indigo-600 border-indigo-300 text-white shadow-indigo-600/50 ring-2 ring-indigo-400'
                : 'bg-slate-800 border-slate-600 text-slate-100'
            }`}
          >
            {rightChild}
          </motion.div>
        </div>

        {/* Level 2: Leaves */}
        <div className="w-full flex justify-between px-2 z-10">
          {[leftLeft, leftRight, rightLeft, rightRight].map((leafVal, i) => {
            const leafIdx = i + 3;
            const isLeafActive = activeIndex === leafIdx;
            return (
              <motion.div
                key={leafIdx}
                layout
                className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs border-2 shadow-sm ${
                  isLeafActive
                    ? 'bg-indigo-600 border-indigo-300 text-white shadow-indigo-600/50 ring-2 ring-indigo-400'
                    : 'bg-slate-800/90 border-slate-700 text-slate-200'
                }`}
              >
                {leafVal}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
