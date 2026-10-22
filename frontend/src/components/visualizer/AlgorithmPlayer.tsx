import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Zap,
  Info,
  Sliders,
  Terminal,
} from 'lucide-react';
import { AlgorithmEvent } from '../../types';
import { ArrayBars } from './ArrayBars';
import { LinkedListVisualizer } from './LinkedListVisualizer';
import { StackQueueVisualizer } from './StackQueueVisualizer';
import { DPTableVisualizer } from './DPTableVisualizer';
import { BinaryTreeVisualizer } from './BinaryTreeVisualizer';

interface AlgorithmPlayerProps {
  events: AlgorithmEvent[];
  pseudocode?: string[];
  title?: string;
  onResetCustomInput?: () => void;
}

export const AlgorithmPlayer: React.FC<AlgorithmPlayerProps> = ({
  events,
  pseudocode = [],
  title,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 1x default
  const timerRef = useRef<any>(null);

  const totalSteps = Math.max(events.length, 1);
  const activeEvent: AlgorithmEvent | undefined = events[currentStep];

  // Stop playback when reaching end
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(200, Math.round(1000 / speed));
      timerRef.current = setTimeout(() => {
        if (currentStep < events.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, delay);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, events.length, speed]);

  // Keyboard shortcut handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStep((prev) => Math.min(prev + 1, events.length - 1));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStep(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [events.length]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, events.length - 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    setCurrentStep(Number(e.target.value));
  };

  // Determine which visualizer sub-component to render based on event state
  const renderVisualCanvas = () => {
    if (!activeEvent) {
      return (
        <div className="flex items-center justify-center h-64 text-slate-400">
          No visualization steps generated.
        </div>
      );
    }

    const { state, activeIndices, variables } = activeEvent;

    if (state.dpTable && state.dpTable.length > 0) {
      return <DPTableVisualizer dpTable={state.dpTable} variables={variables} />;
    }

    if (state.linkedList && state.linkedList.length > 0) {
      return <LinkedListVisualizer nodes={state.linkedList} variables={variables} />;
    }

    if (state.stack !== undefined) {
      return <StackQueueVisualizer mode="stack" stack={state.stack} variables={variables} />;
    }

    if (state.queue !== undefined) {
      return <StackQueueVisualizer mode="queue" queue={state.queue} variables={variables} />;
    }

    if (state.treeNodes && state.treeNodes.length > 0) {
      return (
        <BinaryTreeVisualizer
          nodes={state.treeNodes.map((t) => t.val)}
          activeIndex={activeIndices?.[0]}
          variables={variables}
        />
      );
    }

    // Default: Array Bars
    const arr = state.array ?? [1, 2, 3, 4, 5];
    return (
      <ArrayBars
        array={arr}
        activeIndices={activeEvent.activeIndices ?? state.indices}
        secondaryIndices={state.secondaryIndices}
        sortedIndices={state.sortedIndices}
        pointers={state.pointers}
      />
    );
  };

  const getEventBadgeColor = (type?: string) => {
    switch (type) {
      case 'compare':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'swap':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'found':
      case 'complete':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'not-found':
        return 'bg-slate-700 text-slate-300 border-slate-600';
      case 'insert':
      case 'push':
      case 'update':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    }
  };

  return (
    <div className="flex flex-col w-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Bar: Title & Step Tracker */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-800/60 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <h3 className="font-semibold text-slate-100 text-sm tracking-wide">
            {title || 'Algorithm Execution Visualizer'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {activeEvent && (
            <span
              className={`px-2.5 py-1 text-xs font-mono font-semibold uppercase rounded-full border ${getEventBadgeColor(
                activeEvent.type
              )}`}
            >
              {activeEvent.type}
            </span>
          )}
          <span className="px-3 py-1 text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/80 rounded-full font-medium">
            Step {currentStep + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="p-4 bg-gradient-to-b from-slate-950/60 to-slate-900/90 min-h-[260px] flex items-center justify-center">
        {renderVisualCanvas()}
      </div>

      {/* Explanation Banner */}
      <div className="px-5 py-3 bg-slate-800/40 border-t border-slate-800 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-slate-200 font-normal leading-relaxed">
          {activeEvent?.description || 'Click Play or Step Forward to begin the visual dry run.'}
        </p>
      </div>

      {/* Synchronized Variables & Pseudocode Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-slate-800 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 bg-slate-950/50">
        {/* Variables Inspector */}
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Active Variables</span>
          </div>
          {activeEvent?.variables && Object.keys(activeEvent.variables).length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeEvent.variables).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-xs font-mono"
                >
                  <span className="text-indigo-400 font-semibold">{k}:</span>
                  <span className="text-slate-200 font-bold">{String(v)}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-mono italic">No local variables active</span>
          )}
        </div>

        {/* Synchronized Pseudocode */}
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Algorithm Line Trace</span>
          </div>
          {pseudocode.length > 0 ? (
            <div className="space-y-1 font-mono text-xs max-h-28 overflow-y-auto pr-2">
              {pseudocode.map((line, idx) => {
                const lineNum = idx + 1;
                const isLineActive = activeEvent?.codeLine === lineNum;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors ${
                      isLineActive
                        ? 'bg-indigo-600/25 border-l-2 border-indigo-400 text-indigo-200 font-semibold'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 w-4 text-right select-none">{lineNum}</span>
                    <span>{line}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-mono italic">Pseudocode synchronized with active step</span>
          )}
        </div>
      </div>

      {/* Playback Controls Footer */}
      <div className="px-5 py-4 bg-slate-900 border-t border-slate-800 flex flex-col gap-3">
        {/* Timeline Slider */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-[11px] font-mono text-slate-400 select-none">Start</span>
          <input
            type="range"
            min={0}
            max={events.length - 1}
            value={currentStep}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
          />
          <span className="text-[11px] font-mono text-slate-400 select-none">End</span>
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Main Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              title="Reset (Hotkey: R)"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              title="Step Backward (Hotkey: Left Arrow)"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-slate-700 transition"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition shadow-lg ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/40'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep >= events.length - 1}
              title="Step Forward (Hotkey: Right Arrow)"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-slate-700 transition"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Speed & Hotkey Tips */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Speed:</span>
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded text-xs font-mono transition ${
                    speed === s
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 border-l border-slate-800 pl-3">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Space</span>
              <span>Play</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">←/→</span>
              <span>Step</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
