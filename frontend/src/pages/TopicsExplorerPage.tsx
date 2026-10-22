import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Clock,
  HardDrive,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  BookOpen,
  Compass,
} from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { useApp } from '../context/AppContext';

export const TopicsExplorerPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { solvedIds } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // If slug is provided, view single topic detail
  const activeTopic = slug ? TOPICS_DATA.find((t) => t.slug === slug) : null;

  // Filter topics
  const filteredTopics = TOPICS_DATA.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  if (activeTopic) {
    const recommendedQuestionsList = QUESTIONS_DATA.filter((q) =>
      activeTopic.recommendedQuestions.includes(q.slug)
    );
    const solvedInTopic = recommendedQuestionsList.filter((q) => solvedIds.has(q.id)).length;

    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/topics" className="hover:text-indigo-400 transition">
            Topics
          </Link>
          <span>/</span>
          <span className="text-slate-200">{activeTopic.name}</span>
        </div>

        {/* Topic Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-semibold">
              {activeTopic.category}
            </span>
            <span className="text-xs font-mono text-emerald-400">
              {solvedInTopic} / {recommendedQuestionsList.length} Solved
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{activeTopic.name}</h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{activeTopic.description}</p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Time Complexity: <strong className="text-white">{activeTopic.complexityRef.time}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <HardDrive className="w-4 h-4 text-sky-400" />
              <span>Space Complexity: <strong className="text-white">{activeTopic.complexityRef.space}</strong></span>
            </div>
          </div>
        </div>

        {/* Prerequisites & Key Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Prerequisites</span>
            </h3>
            <ul className="space-y-2">
              {activeTopic.prerequisites.map((prereq, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Key Algorithmic Patterns</span>
            </h3>
            <ul className="space-y-2">
              {activeTopic.keyPatterns.map((pattern, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{pattern}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Pitfalls & Mistakes */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
          <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Common Pitfalls & Bugs to Avoid</span>
          </h3>
          <ul className="space-y-2">
            {activeTopic.commonMistakes.map((mistake, i) => (
              <li key={i} className="text-xs text-rose-200/90 flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Questions Section */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Recommended Problems in {activeTopic.name}</span>
          </h3>

          <div className="space-y-3">
            {recommendedQuestionsList.map((q) => {
              const isSolved = solvedIds.has(q.id);
              const diffColor =
                q.difficulty === 'Easy'
                  ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                  : 'text-amber-400 border-amber-500/20 bg-amber-500/10';

              return (
                <Link
                  key={q.id}
                  to={`/problems/${q.slug}`}
                  className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    {isSolved ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    )}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-100 group-hover:text-indigo-300">
                        {q.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{q.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${diffColor}`}>
                      {q.difficulty}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // All topics directory view
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <span>Syllabus Topics Explorer</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
            {TOPICS_DATA.length} Topics
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore comprehensive topic breakdowns with prerequisites, algorithmic patterns, and complexity benchmarks.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', 'Foundations', 'Core Data Structures', 'Algorithms'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.slug}`}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                  {topic.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {topic.recommendedQuestions.length} Problems
                </span>
              </div>
              <h3 className="font-bold text-slate-100 group-hover:text-indigo-300 transition text-base mt-2">
                {topic.name}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {topic.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Time: {topic.complexityRef.time}</span>
              <span className="text-indigo-400 group-hover:translate-x-1 transition flex items-center gap-1">
                Explore Topic →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
