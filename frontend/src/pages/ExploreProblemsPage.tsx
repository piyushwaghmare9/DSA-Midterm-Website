import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Bookmark,
  CheckCircle,
  Clock,
  Sparkles,
  RotateCcw,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATA } from '../data/questionsData';
import { Difficulty } from '../types';

export const ExploreProblemsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter');

  const { solvedIds, attemptedIds, bookmarkedIds, toggleBookmark } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialFilter === 'bookmarked' ? 'Bookmarked' : 'All'
  );
  const [sortBy, setSortBy] = useState<'id' | 'title' | 'difficulty'>('id');

  const topicsList = useMemo(() => {
    const set = new Set<string>();
    QUESTIONS_DATA.forEach((q) => set.add(q.topic));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredQuestions = useMemo(() => {
    return QUESTIONS_DATA.filter((q) => {
      // Search match
      const matchesSearch =
        searchTerm === '' ||
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      // Topic match
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;

      // Difficulty match
      const matchesDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

      // Status match
      let matchesStatus = true;
      if (selectedStatus === 'Solved') matchesStatus = solvedIds.has(q.id);
      else if (selectedStatus === 'Attempted') matchesStatus = attemptedIds.has(q.id);
      else if (selectedStatus === 'Unsolved') matchesStatus = !solvedIds.has(q.id) && !attemptedIds.has(q.id);
      else if (selectedStatus === 'Bookmarked') matchesStatus = bookmarkedIds.has(q.id);

      return matchesSearch && matchesTopic && matchesDiff && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'id') return Number(a.id) - Number(b.id);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'difficulty') {
        const order: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };
        return order[a.difficulty] - order[b.difficulty];
      }
      return 0;
    });
  }, [searchTerm, selectedTopic, selectedDifficulty, selectedStatus, sortBy, solvedIds, attemptedIds, bookmarkedIds]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTopic('All');
    setSelectedDifficulty('All');
    setSelectedStatus('All');
    setSortBy('id');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <span>Explore DSA Problems</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
              {filteredQuestions.length} Problems
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse our curated 40+ problems across all core data structures with interactive step visualizers.
          </p>
        </div>

        {/* Progress summary pill */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-300 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{solvedIds.size} Solved</span>
          </span>
          <span className="text-slate-400">|</span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{attemptedIds.size} Attempted</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        {/* Search input */}
        <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm">
          <Search className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by problem title, keyword, ID, or company tag (e.g. 'Two Sum', 'Array', 'Meta')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-xs sm:text-sm font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* Topic Filter */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none cursor-pointer"
            >
              {topicsList.map((t) => (
                <option key={t} value={t}>
                  Topic: {t}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All">Difficulty: All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="Solved">Solved</option>
              <option value="Attempted">Attempted</option>
              <option value="Unsolved">Unsolved</option>
              <option value="Bookmarked">Bookmarked</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'id' | 'title' | 'difficulty')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="id">Sort by: Problem ID</option>
              <option value="title">Sort by: Title (A-Z)</option>
              <option value="difficulty">Sort by: Difficulty</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {(searchTerm || selectedTopic !== 'All' || selectedDifficulty !== 'All' || selectedStatus !== 'All' || sortBy !== 'id') && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Problems Table (Desktop) & Cards (Mobile) */}
      {filteredQuestions.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-slate-900 border border-slate-800 p-8">
          <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No matching questions found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query, topic filter, or difficulty settings.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/60 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">Status</th>
                <th className="py-3 px-4 w-16">ID</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 hidden md:table-cell">Languages</th>
                <th className="py-3 px-4 hidden lg:table-cell">Visualizer</th>
                <th className="py-3 px-4 text-right w-16">Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs font-sans">
              {filteredQuestions.map((q) => {
                const isSolved = solvedIds.has(q.id);
                const isAttempted = attemptedIds.has(q.id);
                const isBookmarked = bookmarkedIds.has(q.id);

                const diffColor =
                  q.difficulty === 'Easy'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    : q.difficulty === 'Medium'
                    ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

                return (
                  <tr
                    key={q.id}
                    className="hover:bg-slate-800/50 transition group cursor-pointer"
                  >
                    {/* Status icon */}
                    <td className="py-3 px-4 text-center">
                      {isSolved ? (
                        <span title="Solved" className="inline-block"><CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /></span>
                      ) : isAttempted ? (
                        <span title="Attempted" className="inline-block"><Clock className="w-4 h-4 text-amber-400 mx-auto" /></span>
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mx-auto" title="Unsolved" />
                      )}
                    </td>

                    {/* ID */}
                    <td className="py-3 px-4 font-mono text-slate-400 text-xs">
                      #{q.id}
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4 font-medium text-slate-100 group-hover:text-indigo-300 transition">
                      <Link to={`/problems/${q.slug}`} className="block">
                        {q.title}
                      </Link>
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[11px] border ${diffColor}`}>
                        {q.difficulty}
                      </span>
                    </td>

                    {/* Topic */}
                    <td className="py-3 px-4 font-mono text-xs text-slate-300">
                      {q.topic}
                    </td>

                    {/* Languages */}
                    <td className="py-3 px-4 hidden md:table-cell font-mono text-[10px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                          C++
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">C</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">PY</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">JV</span>
                      </div>
                    </td>

                    {/* Visualizer Badge */}
                    <td className="py-3 px-4 hidden lg:table-cell">
                      {q.supportedVisualizer ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-indigo-400">
                          <Eye className="w-3 h-3" />
                          <span>Interactive</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400">—</span>
                      )}
                    </td>

                    {/* Bookmark action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(q.id);
                        }}
                        className={`p-1.5 rounded-lg transition ${
                          isBookmarked
                            ? 'text-amber-400 hover:text-amber-300'
                            : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
