import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LinkedListNode {
  value: number | string;
  next?: number;
  isHead?: boolean;
}

interface LinkedListVisualizerProps {
  nodes?: LinkedListNode[];
  variables?: Record<string, string | number | boolean>;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({
  nodes = [],
  variables = {},
}) => {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-slate-400">
        Linked list is empty.
      </div>
    );
  }

  const prevVal = String(variables['prev'] ?? '');
  const currVal = String(variables['curr'] ?? '');

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[220px] p-6 overflow-x-auto">
      <div className="flex items-center gap-3">
        {nodes.map((node, idx) => {
          const valStr = String(node.value);
          const isCurr = currVal === valStr;
          const isPrev = prevVal === valStr;

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center relative">
                {/* Pointer tags */}
                <div className="absolute -top-7 flex items-center gap-1">
                  {node.isHead && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500/90 text-amber-950 rounded">
                      HEAD
                    </span>
                  )}
                  {isCurr && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-indigo-500 text-white rounded animate-bounce">
                      CURR
                    </span>
                  )}
                  {isPrev && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-600 text-slate-200 rounded">
                      PREV
                    </span>
                  )}
                </div>

                {/* Node Box */}
                <motion.div
                  layout
                  className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 font-mono font-bold text-lg shadow-lg ${
                    isCurr
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-indigo-600/50 ring-2 ring-indigo-400'
                      : isPrev
                      ? 'bg-slate-700 border-slate-500 text-slate-100'
                      : 'bg-slate-800/90 border-slate-700 text-slate-200'
                  }`}
                >
                  {node.value}
                </motion.div>

                {/* Index / address marker */}
                <span className="text-[10px] font-mono text-slate-400 mt-2">node[{idx}]</span>
              </div>

              {/* Arrow link */}
              <div className="flex items-center text-indigo-400 font-mono">
                <ArrowRight className="w-6 h-6 stroke-[2.5]" />
              </div>
            </React.Fragment>
          );
        })}

        {/* Null Terminator */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center border-2 border-dashed border-rose-500/60 bg-rose-950/20 text-rose-400 font-mono font-bold text-sm">
            NULL
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-2">tail</span>
        </div>
      </div>
    </div>
  );
};
