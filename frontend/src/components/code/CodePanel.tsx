import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Clock, HardDrive, Terminal } from 'lucide-react';
import { Language, CodeSolution } from '../../types';

interface CodePanelProps {
  solutions: Record<Language, CodeSolution>;
  defaultLanguage?: Language;
  activeLine?: number;
}

export const CodePanel: React.FC<CodePanelProps> = ({
  solutions,
  defaultLanguage = 'cpp',
  activeLine,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);
  const [copied, setCopied] = useState<boolean>(false);

  const activeSolution = solutions[selectedLanguage] || solutions['cpp'];

  const handleCopy = () => {
    if (!activeSolution) return;
    navigator.clipboard.writeText(activeSolution.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = (activeSolution?.code || '').split('\n');

  const languageLabels: Record<Language, string> = {
    cpp: 'C++',
    c: 'C',
    python: 'Python 3',
    java: 'Java',
  };

  return (
    <div className="flex flex-col w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header: Language Switcher Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-800 gap-2">
        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          {(['cpp', 'c', 'python', 'java'] as Language[]).map((lang) => {
            const isSelected = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1 text-xs font-mono font-medium rounded-lg transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {languageLabels[lang]}
                {lang === 'cpp' && (
                  <span className="ml-1.5 px-1 py-0.2 text-[9px] bg-indigo-900/80 text-indigo-300 rounded">
                    Default
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Copy & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Viewer with Line Numbers */}
      <div className="p-4 bg-slate-950 overflow-x-auto max-h-[460px] font-mono text-xs leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {codeLines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = activeLine === lineNum;

              return (
                <tr
                  key={idx}
                  className={`group transition-colors ${
                    isHighlighted ? 'bg-indigo-600/20 border-l-2 border-indigo-500' : 'hover:bg-slate-900/50'
                  }`}
                >
                  {/* Line Number */}
                  <td className="w-10 pr-4 text-right select-none text-slate-400 group-hover:text-slate-400">
                    {lineNum}
                  </td>
                  {/* Code Line Content */}
                  <td className="text-slate-200 whitespace-pre font-mono">
                    {line || ' '}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Complexity Breakdown & Explanation Card */}
      <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex flex-col gap-3">
        {/* Complexity badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Time Complexity:</span>
            <span className="font-bold text-slate-100">{activeSolution?.timeComplexity}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono">
            <HardDrive className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-400">Auxiliary Space:</span>
            <span className="font-bold text-slate-100">{activeSolution?.spaceComplexity}</span>
          </div>
        </div>

        {/* Short approach summary */}
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {activeSolution?.explanation}
        </p>

        {/* Key variables if any */}
        {activeSolution?.keyVariables && activeSolution.keyVariables.length > 0 && (
          <div className="pt-2 border-t border-slate-800/60">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-indigo-400" />
              <span>Key Variables & State</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {activeSolution.keyVariables.map((v, i) => (
                <div
                  key={i}
                  className="text-xs font-mono bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800 flex items-baseline gap-2"
                >
                  <span className="text-indigo-400 font-bold">{v.name}:</span>
                  <span className="text-slate-300 font-sans text-[11px]">{v.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
