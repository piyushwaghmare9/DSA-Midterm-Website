import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-100">AlgoVision</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              See the logic. Master the algorithm. An interactive learning and visualization platform
              for mastering Data Structures and Algorithms with multi-language code solutions and deterministic traces.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-400">
                C++ Default
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">
                4 Languages
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/problems" className="hover:text-indigo-400 transition">
                  Explore 40+ Questions
                </Link>
              </li>
              <li>
                <Link to="/visualizer" className="hover:text-indigo-400 transition">
                  Visualizer Laboratory
                </Link>
              </li>
              <li>
                <Link to="/topics" className="hover:text-indigo-400 transition">
                  Syllabus & Topics
                </Link>
              </li>
              <li>
                <Link to="/learning-paths" className="hover:text-indigo-400 transition">
                  Guided Learning Tracks
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Topics */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Core Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/topics/arrays" className="hover:text-indigo-400 transition">
                  Arrays & Matrices
                </Link>
              </li>
              <li>
                <Link to="/topics/two-pointers" className="hover:text-indigo-400 transition">
                  Two Pointers & Sliding Window
                </Link>
              </li>
              <li>
                <Link to="/topics/linked-lists" className="hover:text-indigo-400 transition">
                  Linked Lists
                </Link>
              </li>
              <li>
                <Link to="/topics/trees" className="hover:text-indigo-400 transition">
                  Binary Trees & BST
                </Link>
              </li>
              <li>
                <Link to="/topics/dynamic-programming" className="hover:text-indigo-400 transition">
                  Dynamic Programming
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages & Admin */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Supported Stacks
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Every single algorithm provides matching idiomatic solutions in C++, C, Python, and Java.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Admin & Content Portal →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} AlgoVision. Built for Computer Science students & competitive programmers.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for better algorithmic intuition.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
