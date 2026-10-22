import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Plus,
  Trash2,
  Edit3,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Eye,
  FileCode,
  Layers,
  Search,
} from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questionsData';
import { Question, Difficulty } from '../types';

export const AdminPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(QUESTIONS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [jsonSuccess, setJsonSuccess] = useState('');

  // New question form state
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formTopic, setFormTopic] = useState('Arrays');
  const [formDifficulty, setFormDifficulty] = useState<Difficulty>('Easy');
  const [formDesc, setFormDesc] = useState('');

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm(`Delete question #${id}?`)) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newQ: Question = {
      id: String(questions.length + 1),
      slug: formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: formTitle,
      difficulty: formDifficulty,
      topic: formTopic,
      tags: [formTopic, 'Admin Added'],
      description: formDesc || 'Custom admin question statement.',
      inputDescription: 'Standard input description.',
      outputDescription: 'Expected output result.',
      constraints: ['1 <= n <= 10^4'],
      examples: [
        {
          input: 'nums = [1, 2, 3]',
          output: 'true',
          explanation: 'Standard sample explanation.',
        },
      ],
      hints: ['Consider space-time trade-offs.'],
      optimizedApproach: {
        title: 'Optimized Linear Approach',
        description: 'Detailed algorithmic strategy for solving the problem.',
        intuition: 'Optimal substructure reasoning.',
        algorithmSteps: ['Initialize pointers', 'Iterate and update', 'Return final state'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      solutions: {
        cpp: {
          language: 'cpp',
          code: `// C++ reference solution\nclass Solution {\npublic:\n    bool solve() {\n        return true;\n    }\n};`,
          explanation: 'Standard C++ implementation.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
        },
        c: {
          language: 'c',
          code: `// C reference solution\nbool solve() {\n    return true;\n}`,
          explanation: 'C implementation.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
        },
        python: {
          language: 'python',
          code: `class Solution:\n    def solve(self) -> bool:\n        return True`,
          explanation: 'Python implementation.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
        },
        java: {
          language: 'java',
          code: `class Solution {\n    public boolean solve() {\n        return true;\n    }\n}`,
          explanation: 'Java implementation.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
        },
      },
      visualizationType: 'array-sort',
      supportedVisualizer: true,
      defaultInput: { array: [1, 2, 3] },
    };

    setQuestions((prev) => [newQ, ...prev]);
    setIsModalOpen(false);
    setFormTitle('');
    setFormSlug('');
    setFormDesc('');
  };

  const handleJsonImport = () => {
    try {
      setJsonError('');
      setJsonSuccess('');
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) {
        setQuestions((prev) => [...parsed, ...prev]);
        setJsonSuccess(`Successfully imported ${parsed.length} questions!`);
      } else if (parsed && parsed.title) {
        setQuestions((prev) => [parsed, ...prev]);
        setJsonSuccess(`Successfully imported "${parsed.title}"!`);
      } else {
        throw new Error('JSON must contain a question object or array of question objects.');
      }
      setJsonInput('');
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax.');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'algovision_questions_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-medium mb-2">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span>Admin Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Curriculum & Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Author new questions, configure visualization traces, import validated JSON, and manage metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Problem</span>
          </button>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition"
            title="Export all questions as JSON"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>
        </div>
      </div>

      {/* JSON Importer Drawer Card */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
          <Upload className="w-4 h-4 text-indigo-400" />
          <span>Batch Question Import (JSON Schema)</span>
        </h3>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Paste valid Question JSON or array of Question objects here e.g. [{"id":"99","title":"Graph Valid Tree", ...}]'
          rows={3}
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleJsonImport}
              disabled={!jsonInput.trim()}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 disabled:opacity-40 text-white text-xs font-mono transition"
            >
              Validate & Import
            </button>
            {jsonError && (
              <span className="text-xs text-rose-400 font-mono flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{jsonError}</span>
              </span>
            )}
            {jsonSuccess && (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{jsonSuccess}</span>
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-400">Strict schema validation</span>
        </div>
      </div>

      {/* Questions Management Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs max-w-sm w-full">
            <Search className="w-3.5 h-3.5 text-indigo-400 mr-2" />
            <input
              type="text"
              placeholder="Search managed questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none w-full"
            />
          </div>
          <span className="text-xs font-mono text-slate-400">{filteredQuestions.length} Questions</span>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-800/60 font-mono text-slate-400 uppercase text-[11px]">
              <th className="py-3 px-4 w-16">ID</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Topic</th>
              <th className="py-3 px-4">Difficulty</th>
              <th className="py-3 px-4">Visualizer Type</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredQuestions.map((q) => (
              <tr key={q.id} className="hover:bg-slate-800/50 transition">
                <td className="py-3 px-4 font-mono text-slate-400">#{q.id}</td>
                <td className="py-3 px-4 font-medium text-slate-100">
                  <Link to={`/problems/${q.slug}`} className="hover:text-indigo-300 transition">
                    {q.title}
                  </Link>
                </td>
                <td className="py-3 px-4 font-mono text-slate-300">{q.topic}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] border ${
                      q.difficulty === 'Easy'
                        ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                        : q.difficulty === 'Medium'
                        ? 'text-amber-400 border-amber-500/20 bg-amber-500/10'
                        : 'text-rose-400 border-rose-500/20 bg-rose-500/10'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-400">
                  {q.visualizationType || 'array-sort'}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/problems/${q.slug}`}
                      className="p-1 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                      title="Preview Problem"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Create Educational Question</h3>
            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Problem Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Invert Binary Tree"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Topic</label>
                  <select
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100"
                  >
                    <option value="Arrays">Arrays</option>
                    <option value="Strings">Strings</option>
                    <option value="Searching">Searching</option>
                    <option value="Sorting">Sorting</option>
                    <option value="Two Pointers">Two Pointers</option>
                    <option value="Linked Lists">Linked Lists</option>
                    <option value="Stacks & Queues">Stacks & Queues</option>
                    <option value="Trees & BST">Trees & BST</option>
                    <option value="Graphs">Graphs</option>
                    <option value="Dynamic Programming">Dynamic Programming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as Difficulty)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Problem Statement</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Clear description of the problem..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-mono font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
                >
                  Create Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
