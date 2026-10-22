import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Compass,
  CheckCircle2,
  BookOpen,
  Zap,
  Play,
  RotateCcw,
} from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questionsData';
import { TOPICS_DATA } from '../data/topicsData';
import { generateBubbleSortTrace } from '../algorithms/traces';
import { AlgorithmPlayer } from '../components/visualizer/AlgorithmPlayer';

export const LandingPage: React.FC = () => {
  const [sampleArr, setSampleArr] = useState<number[]>([45, 12, 85, 32, 89, 39, 69]);
  const sampleTrace = generateBubbleSortTrace(sampleArr);

  const handleRandomizeHero = () => {
    const fresh = Array.from({ length: 7 }, () => Math.floor(Math.random() * 85) + 10);
    setSampleArr(fresh);
  };

  const featuredQuestions = QUESTIONS_DATA.slice(0, 6);
  const featuredTopics = TOPICS_DATA.slice(0, 6);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Hero Section */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Algorithm Visualization Platform</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          Stop Memorizing.{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            Start Visualizing.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
          Most coding platforms focus only on submitting test cases. AlgoVision focuses on helping you{' '}
          <strong className="text-slate-100 font-semibold">understand the solution</strong> through step-by-step
          algorithm dry runs, multi-language code, and interactive visualizers.
        </p>

        {/* Call to action buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/problems"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition duration-150"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/visualizer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-sm transition"
          >
            <Play className="w-4 h-4 text-indigo-400" />
            <span>Interactive Visualizer Lab</span>
          </Link>
        </div>

        {/* Real Metrics Banner */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl pt-6 border-t border-slate-800/80">
          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <span className="text-2xl font-bold font-mono text-indigo-400">41+</span>
            <span className="text-xs text-slate-400 mt-1">Curated Problems</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <span className="text-2xl font-bold font-mono text-sky-400">16</span>
            <span className="text-xs text-slate-400 mt-1">Syllabus Topics</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <span className="text-2xl font-bold font-mono text-purple-400">4</span>
            <span className="text-xs text-slate-400 mt-1">Languages (C++ Default)</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <span className="text-2xl font-bold font-mono text-emerald-400">100%</span>
            <span className="text-xs text-slate-400 mt-1">Deterministic Traces</span>
          </div>
        </div>

        {/* 2. Live Interactive Hero Visualizer */}
        <div className="mt-14 w-full max-w-4xl text-left">
          <div className="flex items-center justify-between mb-3 px-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Live Interactive Demonstration
              </span>
              <h2 className="text-lg font-bold text-slate-100">Bubble Sort In Action</h2>
            </div>
            <button
              onClick={handleRandomizeHero}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Randomize Dataset</span>
            </button>
          </div>

          <AlgorithmPlayer
            events={sampleTrace}
            pseudocode={[
              'for i from 0 to n - 1:',
              '  for j from 0 to n - i - 1:',
              '    if arr[j] > arr[j + 1]:',
              '      swap(arr[j], arr[j + 1])',
              'array is sorted',
            ]}
            title="Real-Time Bubble Sort Step Trace"
          />
        </div>
      </section>

      {/* 3. The 4 Programming Languages Showcase */}
      <section className="w-full py-16 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Multi-Language Equivalence
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">
              Every Solution in 4 Languages
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              C++ is our primary default for speed and interview competitiveness, with matching idiomatic
              implementations in C, Python, and Java.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/40 shadow-lg relative">
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-indigo-500 text-white text-[10px] font-mono font-bold">
                DEFAULT
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
                C++
              </div>
              <h3 className="font-bold text-slate-100 text-base">C++ (STL Standard)</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Optimized with `std::vector`, `unordered_map`, algorithms, and memory-safe references.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-sky-600/20 text-sky-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
                C
              </div>
              <h3 className="font-bold text-slate-100 text-base">Pure C</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Raw pointers, manual dynamic memory allocation with malloc/free, and low-level structures.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
                PY
              </div>
              <h3 className="font-bold text-slate-100 text-base">Python 3</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Clean, idiomatic pythonic code utilizing list comprehensions, collections, and dictionaries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
                JV
              </div>
              <h3 className="font-bold text-slate-100 text-base">Java</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Enterprise OOP structure with Java Collections Framework, HashMap, and Deque.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 8-Step Learning Workflow */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Pedagogical Philosophy
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">
            The AlgoVision Learning Loop
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Choose a topic → Understand the concept → Study a question → Read the approach → Watch the
            visualization → Follow the code → Practice independently → Track progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2">1. Intuition Before Code</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every question breaks down both the brute-force approach and the optimized solution with mathematical
              correctness proofs and Big-O trade-offs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-sky-600/20 text-sky-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2">2. Deterministic Visual Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visualizations are generated by running real algorithm events, not pre-baked unrelated animations.
              Rewind, step forward, and inspect variable states at any millisecond.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2">3. Persistent Mastery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track solved and attempted problems, bookmark difficult questions, take personal notes, and
              monitor your streak on your personal student dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Featured Problems Section */}
      <section className="w-full py-16 bg-slate-950/80 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Hand-Picked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Featured DSA Problems
              </h2>
            </div>
            <Link
              to="/problems"
              className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition"
            >
              <span>View all 41+ problems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredQuestions.map((q) => {
              const diffColor =
                q.difficulty === 'Easy'
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : q.difficulty === 'Medium'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

              return (
                <Link
                  key={q.id}
                  to={`/problems/${q.slug}`}
                  className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 transition group flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-slate-400">#{q.id}</span>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${diffColor}`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-100 group-hover:text-indigo-300 transition text-base">
                      {q.title}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {q.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
                    <span>{q.topic}</span>
                    <span className="text-indigo-400 group-hover:translate-x-1 transition flex items-center gap-1">
                      Visualizer Ready →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Featured Topics Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
              Curriculum Syllabus
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Explore by DSA Topics
            </h2>
          </div>
          <Link
            to="/topics"
            className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition"
          >
            <span>View all 16 topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topics/${topic.slug}`}
              className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                  {topic.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {topic.recommendedQuestions.length} Problems
                </span>
              </div>
              <h3 className="font-bold text-slate-100 group-hover:text-sky-300 transition text-base mt-2">
                {topic.name}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {topic.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="w-full py-16 bg-gradient-to-t from-indigo-950/40 via-slate-900 to-slate-950 border-t border-slate-800 text-center px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Master Data Structures and Algorithms?
          </h2>
          <p className="text-sm text-slate-300 mt-3 max-w-xl">
            Join thousands of college students, interview candidates, and competitive programmers who learn visually with AlgoVision.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link
              to="/problems"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition"
            >
              Start Practicing Now
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition"
            >
              Open Student Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
