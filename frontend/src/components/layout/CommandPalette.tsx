import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Layers, Terminal, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QUESTIONS_DATA } from '../../data/questionsData';
import { TOPICS_DATA } from '../../data/topicsData';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Listen for global Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredQuestions = QUESTIONS_DATA.filter(
    (q) =>
      q.title.toLowerCase().includes(query.toLowerCase()) ||
      q.topic.toLowerCase().includes(query.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6);

  const filteredTopics = TOPICS_DATA.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const handleSelectQuestion = (slug: string) => {
    setIsCommandPaletteOpen(false);
    setQuery('');
    navigate(`/problems/${slug}`);
  };

  const handleSelectTopic = (slug: string) => {
    setIsCommandPaletteOpen(false);
    setQuery('');
    navigate(`/topics/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900">
          <Search className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search problems, topics, tags (e.g. 'Two Sum', 'Binary Search', 'DP')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none font-sans"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
          {/* Questions Section */}
          {filteredQuestions.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>DSA Problems ({filteredQuestions.length})</span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredQuestions.map((q) => {
                  const diffColor =
                    q.difficulty === 'Easy'
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                      : q.difficulty === 'Medium'
                      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                      : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuestion(q.slug)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-left transition group border border-transparent hover:border-slate-700/60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400 w-6">#{q.id}</span>
                        <div>
                          <p className="text-sm font-medium text-slate-100 group-hover:text-indigo-300 transition">
                            {q.title}
                          </p>
                          <span className="text-xs text-slate-400">{q.topic}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${diffColor}`}>
                          {q.difficulty}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Topics Section */}
          {filteredTopics.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Syllabus Topics ({filteredTopics.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {filteredTopics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTopic(t.slug)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 text-left transition group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-sky-300">
                        {t.name}
                      </p>
                      <span className="text-[10px] text-slate-400">{t.category}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-0.5 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {filteredQuestions.length === 0 && filteredTopics.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">
              No matching problems or topics found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts tip */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">↑↓</span>
            <span>Navigate</span>
            <span className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Enter</span>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-indigo-400" />
            <span>AlgoVision Quick Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
