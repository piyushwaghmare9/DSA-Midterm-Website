import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  CheckCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  FileText,
  Save,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATA } from '../data/questionsData';
import { getAlgorithmTrace } from '../algorithms/traces';
import { AlgorithmPlayer } from '../components/visualizer/AlgorithmPlayer';
import { CodePanel } from '../components/code/CodePanel';

export const ProblemWorkspacePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const {
    solvedIds,
    attemptedIds,
    bookmarkedIds,
    notes,
    toggleBookmark,
    markSolved,
    markAttempted,
    saveNote,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'statement' | 'approach' | 'practice' | 'notes'>('statement');
  const [personalNote, setPersonalNote] = useState<string>('');
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  // Find question by slug
  const question = QUESTIONS_DATA.find((q) => q.slug === slug) || QUESTIONS_DATA[0];
  const questionIndex = QUESTIONS_DATA.findIndex((q) => q.id === question.id);
  const prevQuestion = questionIndex > 0 ? QUESTIONS_DATA[questionIndex - 1] : null;
  const nextQuestion = questionIndex < QUESTIONS_DATA.length - 1 ? QUESTIONS_DATA[questionIndex + 1] : null;

  const isSolved = solvedIds.has(question.id);
  const isAttempted = attemptedIds.has(question.id);
  const isBookmarked = bookmarkedIds.has(question.id);

  // Initialize personal note when question changes
  React.useEffect(() => {
    setPersonalNote(notes[question.id] || '');
    setRevealedHints([]);
    markAttempted(question.id);
  }, [question.id]);

  const handleSaveNote = () => {
    saveNote(question.id, personalNote);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const handleToggleHint = (index: number) => {
    setRevealedHints((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Generate deterministic trace based on question visualizationType & defaultInput
  const trace = getAlgorithmTrace(question.visualizationType || 'array-sort', question.defaultInput || {});

  const diffColor =
    question.difficulty === 'Easy'
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      : question.difficulty === 'Medium'
      ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
      : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 py-4 flex flex-col gap-4">
      {/* Top Header Bar: Back, Title, Solved Toggle, Next/Prev */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Back to all problems"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">#{question.id}</span>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {question.title}
              </h1>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${diffColor}`}>
                {question.difficulty}
              </span>
            </div>
            <span className="text-xs text-indigo-400 font-mono">{question.topic}</span>
          </div>
        </div>

        {/* Actions: Mark Solved, Bookmark, Prev/Next navigation */}
        <div className="flex items-center gap-2">
          {/* Mark as Solved Button */}
          <button
            onClick={() => markSolved(question.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-medium text-xs transition shadow-sm ${
              isSolved
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isSolved ? 'Solved' : 'Mark as Solved'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(question.id)}
            className={`p-2 rounded-xl border transition ${
              isBookmarked
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Prev/Next buttons */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={() => prevQuestion && navigate(`/problems/${prevQuestion.slug}`)}
              disabled={!prevQuestion}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
              title="Previous Problem"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nextQuestion && navigate(`/problems/${nextQuestion.slug}`)}
              disabled={!nextQuestion}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
              title="Next Problem"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Panel Workspace: Left Details / Right Visualizer & Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Problem Tabs (Statement, Approach, Practice, Notes) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-h-[640px]">
          {/* Tab Headers */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1">
            <button
              onClick={() => setActiveTab('statement')}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'statement'
                  ? 'bg-slate-800 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Statement</span>
            </button>

            <button
              onClick={() => setActiveTab('approach')}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'approach'
                  ? 'bg-slate-800 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Approach</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'practice'
                  ? 'bg-slate-800 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Practice</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'bg-slate-800 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notes</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-5 overflow-y-auto max-h-[700px] space-y-5 text-sm leading-relaxed">
            {/* TAB 1: Problem Statement */}
            {activeTab === 'statement' && (
              <div className="space-y-5">
                {/* Description */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Description</h3>
                  <p className="text-slate-200 leading-relaxed font-sans">{question.description}</p>
                </div>

                {/* Input & Output Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-indigo-400 font-semibold block mb-1">Input:</span>
                    <span className="text-slate-300">{question.inputDescription}</span>
                  </div>
                  <div>
                    <span className="text-sky-400 font-semibold block mb-1">Output:</span>
                    <span className="text-slate-300">{question.outputDescription}</span>
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Examples</h3>
                  {question.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-1.5"
                    >
                      <div className="text-slate-400 font-semibold text-[11px]">Example {i + 1}:</div>
                      <div className="text-slate-200">
                        <span className="text-indigo-400 font-bold">Input: </span>
                        {ex.input}
                      </div>
                      <div className="text-slate-200">
                        <span className="text-emerald-400 font-bold">Output: </span>
                        {ex.output}
                      </div>
                      {ex.explanation && (
                        <div className="text-slate-400 font-sans text-xs pt-1 border-t border-slate-900">
                          <span className="text-slate-300 font-semibold">Explanation: </span>
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs font-mono text-slate-300">
                    {question.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Progressive Hints */}
                {question.hints && question.hints.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Progressive Hints</span>
                    </h3>
                    <div className="space-y-2">
                      {question.hints.map((hint, i) => {
                        const isRevealed = revealedHints.includes(i);
                        return (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-slate-400">Hint {i + 1}</span>
                              <button
                                onClick={() => handleToggleHint(i)}
                                className="text-indigo-400 hover:text-indigo-300 font-mono text-[11px]"
                              >
                                {isRevealed ? 'Hide' : 'Reveal'}
                              </button>
                            </div>
                            {isRevealed && (
                              <p className="mt-2 text-slate-200 font-sans leading-relaxed">{hint}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Approach & Complexity Breakdown */}
            {activeTab === 'approach' && (
              <div className="space-y-6">
                {/* Brute Force (if present) */}
                {question.bruteForceApproach && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Brute-Force Baseline
                    </span>
                    <h4 className="font-bold text-slate-100 text-sm">{question.bruteForceApproach.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {question.bruteForceApproach.description}
                    </p>
                    <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-slate-400 border-t border-slate-900">
                      <span>Time: <strong className="text-rose-400">{question.bruteForceApproach.timeComplexity}</strong></span>
                      <span>Space: <strong className="text-sky-400">{question.bruteForceApproach.spaceComplexity}</strong></span>
                    </div>
                  </div>
                )}

                {/* Optimized Solution */}
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold">
                    Optimized Approach
                  </span>
                  <h4 className="font-bold text-white text-base">{question.optimizedApproach.title}</h4>
                  
                  <div>
                    <h5 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">Intuition</h5>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {question.optimizedApproach.intuition}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1.5">Algorithm Steps</h5>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 font-sans">
                      {question.optimizedApproach.algorithmSteps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-indigo-900/60 text-xs font-mono">
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      Time: <strong className="text-emerald-400">{question.optimizedApproach.timeComplexity}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      Space: <strong className="text-sky-400">{question.optimizedApproach.spaceComplexity}</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Practice & Related Questions */}
            {activeTab === 'practice' && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Similar & Follow-Up Problems
                </h3>
                {question.relatedQuestions && question.relatedQuestions.length > 0 ? (
                  <div className="space-y-2">
                    {question.relatedQuestions.map((relSlug) => {
                      const relQ = QUESTIONS_DATA.find((q) => q.slug === relSlug);
                      if (!relQ) return null;
                      return (
                        <Link
                          key={relQ.id}
                          to={`/problems/${relQ.slug}`}
                          className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between transition group"
                        >
                          <div>
                            <h4 className="text-xs font-semibold text-slate-100 group-hover:text-indigo-300">
                              {relQ.title}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400">{relQ.topic}</span>
                          </div>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                              relQ.difficulty === 'Easy'
                                ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                                : 'text-amber-400 border-amber-500/20 bg-amber-500/10'
                            }`}
                          >
                            {relQ.difficulty}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-mono">No direct related problems listed.</p>
                )}

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mt-4">
                  <h4 className="text-xs font-bold text-slate-200">Self-Practice Challenge</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Try writing the code in your preferred IDE from scratch before checking the multi-language
                    reference code panel on the right!
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: Personal Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Your Personal Notes
                  </h3>
                  {isNoteSaved && (
                    <span className="text-xs font-mono text-emerald-400">Saved to LocalStorage!</span>
                  )}
                </div>

                <textarea
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="Record your personal notes, edge cases you missed, or interview reminders for this problem..."
                  rows={8}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                />

                <button
                  onClick={handleSaveNote}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Note</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visualizer Player + Code Panel */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top: Interactive Visualizer Player */}
          <AlgorithmPlayer
            events={trace}
            pseudocode={question.pseudocode}
            title={`${question.title} — Step-by-Step Visualization`}
          />

          {/* Bottom: Multi-Language Code Panel */}
          <CodePanel
            solutions={question.solutions}
            defaultLanguage="cpp"
          />
        </div>
      </div>
    </div>
  );
};
