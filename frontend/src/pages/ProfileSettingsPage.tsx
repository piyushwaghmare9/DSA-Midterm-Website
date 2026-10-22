import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Settings,
  Bookmark,
  CheckCircle,
  Flame,
  Save,
  Trash2,
  Lock,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATA } from '../data/questionsData';
import { Language } from '../types';

export const ProfileSettingsPage: React.FC = () => {
  const {
    user,
    solvedIds,
    bookmarkedIds,
    preferredLanguage,
    setPreferredLanguage,
    loginUser,
    logoutUser,
  } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [learningGoal, setLearningGoal] = useState(user.learningGoal);
  const [skillLevel, setSkillLevel] = useState(user.skillLevel);
  const [isSaved, setIsSaved] = useState(false);

  const bookmarkedQuestions = QUESTIONS_DATA.filter((q) => bookmarkedIds.has(q.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(name, email);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all solved problems and bookmarks?')) {
      localStorage.removeItem('algovision_solved');
      localStorage.removeItem('algovision_attempted');
      localStorage.removeItem('algovision_bookmarks');
      window.location.reload();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <span>Student Profile & Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal study goals, language preferences, and learning progress.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-indigo-600/40">
          {name.charAt(0)}
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-xs text-slate-400 font-mono">{email}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold">
              Goal: {learningGoal}
            </span>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
              🔥 {user.streak} Days Streak
            </span>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
              ⚡ {solvedIds.size} Solved
            </span>
          </div>
        </div>
      </div>

      {/* Profile Settings Form */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-indigo-400" />
          <span>Account Preferences</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Preferred Programming Language
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value as Language)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="cpp">C++ (Default)</option>
                <option value="c">C</option>
                <option value="python">Python 3</option>
                <option value="java">Java</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Skill Level
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              Learning Goal
            </label>
            <input
              type="text"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              placeholder="e.g. FAANG Interview Prep, College DSAL Coursework"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/30"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>

            {isSaved && (
              <span className="text-xs font-mono text-emerald-400">
                Preferences saved successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Bookmarked Questions Quick-List */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-amber-400" />
          <span>Your Bookmarks ({bookmarkedQuestions.length})</span>
        </h3>

        {bookmarkedQuestions.length === 0 ? (
          <p className="text-xs text-slate-400 font-mono">No bookmarked questions saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookmarkedQuestions.map((q) => (
              <Link
                key={q.id}
                to={`/problems/${q.slug}`}
                className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono text-slate-400">#{q.id}</span>
                  <span className="text-xs font-medium text-slate-200 group-hover:text-amber-300">
                    {q.title}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Danger Zone: Reset Local Data */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-rose-300">Reset Local Learning Progress</h4>
          <p className="text-xs text-slate-400 mt-1">
            Clears your solved question history, bookmark list, and local notes stored in browser storage.
          </p>
        </div>

        <button
          onClick={handleResetProgress}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Reset All Progress</span>
        </button>
      </div>
    </div>
  );
};
