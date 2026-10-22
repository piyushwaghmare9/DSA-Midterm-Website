import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  GraduationCap,
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { LEARNING_PATHS_DATA } from '../data/learningPathsData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { useApp } from '../context/AppContext';

export const LearningPathsPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { solvedIds } = useApp();

  const activePath = slug ? LEARNING_PATHS_DATA.find((p) => p.slug === slug) : null;

  if (activePath) {
    // Calculate total questions in this path and how many are solved
    const allQuestionIds = activePath.modules.flatMap((m) => m.questionIds);
    const solvedInPath = allQuestionIds.filter((id) => {
      // Find question by slug
      const q = QUESTIONS_DATA.find((item) => item.slug === id);
      return q ? solvedIds.has(q.id) : false;
    }).length;

    const percent = Math.round((solvedInPath / Math.max(allQuestionIds.length, 1)) * 100);

    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/learning-paths" className="hover:text-indigo-400 transition">
            Learning Paths
          </Link>
          <span>/</span>
          <span className="text-slate-200">{activePath.title}</span>
        </div>

        {/* Path Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-semibold">
              {activePath.badge}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Suggested Schedule: {activePath.suggestedDuration}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{activePath.title}</h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{activePath.description}</p>

          {/* Progress Bar */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Track Progress</span>
              <span className="text-emerald-400 font-bold">
                {solvedInPath} / {allQuestionIds.length} Solved ({percent}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Ordered Modules</span>
          </h2>

          <div className="space-y-4">
            {activePath.modules.map((mod, idx) => (
              <div
                key={mod.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm">{mod.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">~{mod.estimatedHours} hrs</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pl-10">{mod.description}</p>

                {/* Question links */}
                <div className="pl-10 space-y-2 pt-2">
                  {mod.questionIds.map((qSlug) => {
                    const q = QUESTIONS_DATA.find((item) => item.slug === qSlug);
                    if (!q) return null;
                    const isSolved = solvedIds.has(q.id);

                    return (
                      <Link
                        key={q.id}
                        to={`/problems/${q.slug}`}
                        className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 flex items-center justify-between transition group"
                      >
                        <div className="flex items-center gap-3">
                          {isSolved ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                          )}
                          <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300">
                            {q.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                          Start Problem →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // All learning paths directory view
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <span>Guided Learning Paths</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
            {LEARNING_PATHS_DATA.length} Tracks
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Structured curricula designed to take you from foundational basics to interview-level algorithm problem solving.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEARNING_PATHS_DATA.map((path) => (
          <div
            key={path.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between hover:border-indigo-500/40 transition group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold">
                  {path.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">{path.difficulty}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition">
                {path.title}
              </h2>
              <p className="text-xs text-indigo-400 font-mono mt-1 font-semibold">{path.tagline}</p>

              <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                {path.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{path.suggestedDuration}</span>
                </span>
                <span>{path.modules.length} Modules</span>
              </div>

              <Link
                to={`/learning-paths/${path.slug}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-medium text-xs transition"
              >
                <span>View Syllabus Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
