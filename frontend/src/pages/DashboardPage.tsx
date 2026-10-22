import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  CheckCircle,
  Clock,
  Bookmark,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATA } from '../data/questionsData';
import { TOPICS_DATA } from '../data/topicsData';

export const DashboardPage: React.FC = () => {
  const { user, solvedIds, attemptedIds, bookmarkedIds } = useApp();

  const totalQuestions = QUESTIONS_DATA.length;
  const solvedCount = solvedIds.size;
  const attemptedCount = attemptedIds.size;
  const completionPercent = Math.round((solvedCount / totalQuestions) * 100);

  // Difficulty stats
  const easyQuestions = QUESTIONS_DATA.filter((q) => q.difficulty === 'Easy');
  const mediumQuestions = QUESTIONS_DATA.filter((q) => q.difficulty === 'Medium');
  const hardQuestions = QUESTIONS_DATA.filter((q) => q.difficulty === 'Hard');

  const solvedEasy = easyQuestions.filter((q) => solvedIds.has(q.id)).length;
  const solvedMedium = mediumQuestions.filter((q) => solvedIds.has(q.id)).length;
  const solvedHard = hardQuestions.filter((q) => solvedIds.has(q.id)).length;

  // Bookmarked list
  const bookmarkedQuestions = QUESTIONS_DATA.filter((q) => bookmarkedIds.has(q.id));

  // Recently attempted / continue learning
  const attemptedQuestions = QUESTIONS_DATA.filter(
    (q) => attemptedIds.has(q.id) || solvedIds.has(q.id)
  ).slice(0, 4);

  // Recommended next problems (unsolved)
  const recommendedProblems = QUESTIONS_DATA.filter((q) => !solvedIds.has(q.id)).slice(0, 3);

  // Daily Challenge Problem (e.g. #2 Best Time to Buy and Sell Stock)
  const dailyChallenge = QUESTIONS_DATA.find((q) => q.id === '2') || QUESTIONS_DATA[0];

  // Weekly activity mock dataset
  const activityData = [
    { day: 'Mon', problems: 2 },
    { day: 'Tue', problems: 3 },
    { day: 'Wed', problems: 1 },
    { day: 'Thu', problems: 4 },
    { day: 'Fri', problems: 2 },
    { day: 'Sat', problems: 5 },
    { day: 'Sun', problems: 3 },
  ];

  // Topic mastery stats
  const topicStats = TOPICS_DATA.slice(0, 5).map((topic) => {
    const topicProblems = QUESTIONS_DATA.filter((q) => q.topic.toLowerCase().includes(topic.name.toLowerCase()));
    const solvedInTopic = topicProblems.filter((q) => solvedIds.has(q.id)).length;
    const count = Math.max(topicProblems.length, 1);
    const percent = Math.min(100, Math.round((solvedInTopic / count) * 100));
    return {
      name: topic.name,
      slug: topic.slug,
      solved: solvedInTopic,
      total: count,
      percent,
    };
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header & Welcome Goal Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Learning Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>Target Goal: <strong className="text-white">{user.learningGoal}</strong></span>
          </p>
        </div>

        {/* Top streak and level pill */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold leading-none">{user.streak} Days</span>
              <span className="text-[10px] text-amber-400/80">Active Streak</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            <Award className="w-5 h-5 text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold leading-none">{user.skillLevel}</span>
              <span className="text-[10px] text-indigo-300/80">Rank: Level 4</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Solved Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Solved Problems</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-mono text-white">
              {solvedCount} <span className="text-sm font-normal text-slate-400">/ {totalQuestions}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block">
              {completionPercent}% overall completion
            </span>
          </div>
        </div>

        {/* Easy Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">Easy</span>
            <span className="text-xs font-mono text-slate-400">{solvedEasy} / {easyQuestions.length}</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-mono text-emerald-400">{solvedEasy}</div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${Math.round((solvedEasy / Math.max(easyQuestions.length, 1)) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block">
              Foundation algorithms mastered
            </span>
          </div>
        </div>

        {/* Medium Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">Medium</span>
            <span className="text-xs font-mono text-slate-400">{solvedMedium} / {mediumQuestions.length}</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-mono text-amber-400">{solvedMedium}</div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{ width: `${Math.round((solvedMedium / Math.max(mediumQuestions.length, 1)) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block">
              Interview standard questions
            </span>
          </div>
        </div>

        {/* Hard Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold">Hard</span>
            <span className="text-xs font-mono text-slate-400">{solvedHard} / {Math.max(hardQuestions.length, 1)}</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold font-mono text-rose-400">{solvedHard}</div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-rose-400 h-full rounded-full"
                style={{ width: `${Math.round((solvedHard / Math.max(hardQuestions.length, 1)) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block">
              Advanced competitive problems
            </span>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Daily Challenge & Weekly Activity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Challenge Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Daily Challenge</span>
              </span>
              <span className="text-xs font-mono text-slate-400">Oct 22, 2026</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{dailyChallenge.title}</h3>
            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
              {dailyChallenge.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {dailyChallenge.topic}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {dailyChallenge.difficulty}
              </span>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-slate-800/80">
            <Link
              to={`/problems/${dailyChallenge.slug}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/30"
            >
              <span>Solve Daily Problem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Weekly Activity Recharts Chart */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Weekly Practice Activity</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Problems solved & dry runs completed this week</p>
            </div>
            <span className="text-xs font-mono text-indigo-400 font-bold">20 Sessions</span>
          </div>

          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                />
                <Bar dataKey="problems" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Topic Mastery Progress Bars */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-white">Topic Mastery Breakdown</h3>
            <p className="text-xs text-slate-400 mt-0.5">Track your progress across core DSA syllabi</p>
          </div>
          <Link to="/topics" className="text-xs font-mono text-indigo-400 hover:text-indigo-300">
            View All Topics →
          </Link>
        </div>

        <div className="space-y-4">
          {topicStats.map((topic) => (
            <div key={topic.slug} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-200">{topic.name}</span>
                <span className="font-mono text-slate-400">
                  {topic.solved} / {topic.total} ({topic.percent}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(topic.percent, 4)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recommended Problems & Bookmarked Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Next Questions */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Recommended Next Problems</span>
              </h3>
              <Link to="/problems" className="text-xs font-mono text-indigo-400">
                Explore →
              </Link>
            </div>

            <div className="space-y-2.5">
              {recommendedProblems.map((q) => (
                <Link
                  key={q.id}
                  to={`/problems/${q.slug}`}
                  className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">#{q.id}</span>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-100 group-hover:text-indigo-300 transition">
                        {q.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{q.topic}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      q.difficulty === 'Easy'
                        ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                        : 'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bookmarked Questions */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span>Saved Bookmarks ({bookmarkedQuestions.length})</span>
              </h3>
              <Link to="/problems?filter=bookmarked" className="text-xs font-mono text-amber-400">
                Filter All →
              </Link>
            </div>

            {bookmarkedQuestions.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 font-mono">
                No bookmarked questions yet. Click the bookmark icon on any problem to save it here!
              </div>
            ) : (
              <div className="space-y-2.5">
                {bookmarkedQuestions.slice(0, 3).map((q) => (
                  <Link
                    key={q.id}
                    to={`/problems/${q.slug}`}
                    className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">#{q.id}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-100 group-hover:text-amber-300 transition">
                          {q.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">{q.topic}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
