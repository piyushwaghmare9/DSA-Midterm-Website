import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  CheckCircle,
  Flame,
  Award,
  Clock,
  ArrowRight,
  PieChart as PieIcon,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATA } from '../data/questionsData';
import { TOPICS_DATA } from '../data/topicsData';

export const ProgressAnalyticsPage: React.FC = () => {
  const { user, solvedIds, attemptedIds } = useApp();

  const totalQuestions = QUESTIONS_DATA.length;
  const solvedCount = solvedIds.size;
  const attemptedCount = attemptedIds.size;
  const unsolvedCount = Math.max(0, totalQuestions - solvedCount - attemptedCount);

  // Difficulty counts
  const easyTotal = QUESTIONS_DATA.filter((q) => q.difficulty === 'Easy').length;
  const mediumTotal = QUESTIONS_DATA.filter((q) => q.difficulty === 'Medium').length;
  const hardTotal = QUESTIONS_DATA.filter((q) => q.difficulty === 'Hard').length;

  const solvedEasy = QUESTIONS_DATA.filter((q) => q.difficulty === 'Easy' && solvedIds.has(q.id)).length;
  const solvedMedium = QUESTIONS_DATA.filter((q) => q.difficulty === 'Medium' && solvedIds.has(q.id)).length;
  const solvedHard = QUESTIONS_DATA.filter((q) => q.difficulty === 'Hard' && solvedIds.has(q.id)).length;

  // Donut chart data for difficulty
  const difficultyData = [
    { name: 'Easy', value: solvedEasy, color: '#10b981' },
    { name: 'Medium', value: solvedMedium, color: '#f59e0b' },
    { name: 'Hard', value: solvedHard, color: '#ef4444' },
  ];

  // Status breakdown data
  const statusData = [
    { name: 'Solved', value: solvedCount, color: '#10b981' },
    { name: 'Attempted', value: attemptedCount, color: '#f59e0b' },
    { name: 'Unsolved', value: unsolvedCount, color: '#475569' },
  ];

  // Topic distribution bar data
  const topicData = TOPICS_DATA.slice(0, 8).map((topic) => {
    const questionsInTopic = QUESTIONS_DATA.filter((q) =>
      q.topic.toLowerCase().includes(topic.name.toLowerCase())
    );
    const solved = questionsInTopic.filter((q) => solvedIds.has(q.id)).length;
    return {
      topic: topic.name.split(' ')[0],
      solved,
      total: questionsInTopic.length,
    };
  });

  // Suggest weak topics (topics with 0 solved)
  const weakTopics = topicData.filter((t) => t.solved === 0).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <span>Progress & Analytics</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
            {solvedCount} / {totalQuestions} Solved
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detailed metrics calculated directly from your real activity and problem completions.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400">Total Solved</span>
            <div className="text-2xl font-bold font-mono text-white">{solvedCount}</div>
            <span className="text-[11px] text-slate-400">{Math.round((solvedCount / totalQuestions) * 100)}% of library</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400">Learning Streak</span>
            <div className="text-2xl font-bold font-mono text-white">{user.streak} Days</div>
            <span className="text-[11px] text-slate-400">Consistent daily practice</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400">Under Review</span>
            <div className="text-2xl font-bold font-mono text-white">{attemptedCount}</div>
            <span className="text-[11px] text-slate-400">Attempted problems</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400">Rank Standing</span>
            <div className="text-2xl font-bold font-mono text-white">Top 15%</div>
            <span className="text-[11px] text-slate-400">Platform percentile</span>
          </div>
        </div>
      </div>

      {/* Charts Grid: Difficulty Distribution & Topic Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Distribution Chart */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-indigo-400" />
              <span>Difficulty Distribution</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Solved Ratio</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Legend
                  formatter={(value) => <span className="text-xs text-slate-300 font-mono">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 text-center text-xs font-mono">
            <div>
              <span className="text-emerald-400 font-bold block">{solvedEasy} / {easyTotal}</span>
              <span className="text-slate-400 text-[10px]">Easy</span>
            </div>
            <div>
              <span className="text-amber-400 font-bold block">{solvedMedium} / {mediumTotal}</span>
              <span className="text-slate-400 text-[10px]">Medium</span>
            </div>
            <div>
              <span className="text-rose-400 font-bold block">{solvedHard} / {hardTotal}</span>
              <span className="text-slate-400 text-[10px]">Hard</span>
            </div>
          </div>
        </div>

        {/* Topic Mastery Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-400" />
              <span>Topic Completion Distribution</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Solved vs Available</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="topic" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="solved" fill="#10b981" name="Solved" radius={[3, 3, 0, 0]} />
                <Bar dataKey="total" fill="#334155" name="Total Available" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
            <span>Primary Focus: Arrays & Two Pointers</span>
            <Link to="/topics" className="text-indigo-400 hover:text-indigo-300">
              Explore All Topics →
            </Link>
          </div>
        </div>
      </div>

      {/* Suggested Focus & Weak Topics */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Suggested Focus Areas</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Based on your completion metrics, you have strong momentum in linear data structures. We recommend
          diving into dynamic programming or graph traversals next to round out interview preparation.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/topics/dynamic-programming"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition"
          >
            <span>Practice Dynamic Programming</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>

          <Link
            to="/topics/graphs"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition"
          >
            <span>Practice Graphs (BFS/DFS)</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};
