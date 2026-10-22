import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface StackQueueVisualizerProps {
  mode: 'stack' | 'queue';
  stack?: (number | string)[];
  queue?: (number | string)[];
  variables?: Record<string, string | number | boolean>;
}

export const StackQueueVisualizer: React.FC<StackQueueVisualizerProps> = ({
  mode,
  stack = [],
  queue = [],
  variables = {},
}) => {
  if (mode === 'stack') {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[260px] p-4 select-none">
        <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-2">
          <span>Stack (LIFO - Last In, First Out)</span>
          <span className="text-slate-400">|</span>
          <span>Size: {stack.length}</span>
          <span className="text-slate-400">|</span>
          <span>Top: {variables['top'] !== undefined ? String(variables['top']) : 'null'}</span>
        </div>

        {/* Stack Container */}
        <div className="w-48 min-h-[180px] max-h-[220px] border-x-4 border-b-4 border-indigo-500/80 rounded-b-xl flex flex-col-reverse items-center p-2 gap-2 bg-slate-900/40 relative overflow-y-auto">
          <AnimatePresence>
            {stack.length === 0 ? (
              <div className="text-xs font-mono text-slate-400 my-auto">Stack is Empty</div>
            ) : (
              stack.map((item, idx) => {
                const isTop = idx === stack.length - 1;
                return (
                  <motion.div
                    key={`${idx}-${item}`}
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-between font-mono font-bold text-sm border ${
                      isTop
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/40 ring-1 ring-indigo-300'
                        : 'bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{item}</span>
                    {isTop && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-900 text-indigo-200 border border-indigo-500">
                        TOP
                      </span>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mt-2">
          <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />
          <span>Base of Stack</span>
        </div>
      </div>
    );
  }

  // Queue Mode
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[260px] p-4 select-none">
      <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-2">
        <span>Queue (FIFO - First In, First Out)</span>
        <span className="text-slate-400">|</span>
        <span>Size: {queue.length}</span>
        <span className="text-slate-400">|</span>
        <span>Front: {variables['front'] !== undefined ? String(variables['front']) : 'null'}</span>
      </div>

      <div className="w-full max-w-xl flex items-center justify-center gap-3 overflow-x-auto py-4">
        {/* Outgoing indicator */}
        <div className="flex flex-col items-center text-rose-400">
          <span className="text-[10px] font-mono uppercase font-semibold">Dequeue (Front)</span>
          <ArrowRight className="w-5 h-5 animate-pulse" />
        </div>

        {/* Pipeline */}
        <div className="flex items-center gap-2 border-y-2 border-slate-700 bg-slate-900/60 p-3 min-w-[260px] min-h-[72px] rounded-lg">
          <AnimatePresence>
            {queue.length === 0 ? (
              <span className="text-xs font-mono text-slate-400 mx-auto">Queue is Empty</span>
            ) : (
              queue.map((item, idx) => {
                const isFront = idx === 0;
                const isRear = idx === queue.length - 1;

                return (
                  <motion.div
                    key={`${idx}-${item}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className={`min-w-[50px] h-12 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-sm border ${
                      isFront
                        ? 'bg-emerald-600/90 border-emerald-400 text-white shadow-md'
                        : isRear
                        ? 'bg-indigo-600/90 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{item}</span>
                    <span className="text-[9px] text-slate-300">
                      {isFront ? 'FRONT' : isRear ? 'REAR' : `[${idx}]`}
                    </span>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Incoming indicator */}
        <div className="flex flex-col items-center text-indigo-400">
          <span className="text-[10px] font-mono uppercase font-semibold">Enqueue (Rear)</span>
          <ArrowRight className="w-5 h-5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
