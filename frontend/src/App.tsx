import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExploreProblemsPage } from './pages/ExploreProblemsPage';
import { ProblemWorkspacePage } from './pages/ProblemWorkspacePage';
import { VisualizerLabPage } from './pages/VisualizerLabPage';
import { TopicsExplorerPage } from './pages/TopicsExplorerPage';
import { LearningPathsPage } from './pages/LearningPathsPage';
import { ProgressAnalyticsPage } from './pages/ProgressAnalyticsPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
          {/* Top Sticky Navbar */}
          <Navbar />

          {/* Global Search Command Palette (Ctrl+K) */}
          <CommandPalette />

          {/* Main Application Routes */}
          <main className="flex-1 flex flex-col">
            <Routes>
              {/* Page 1: Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Page 2: Student Dashboard */}
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Page 3: Explore Problems */}
              <Route path="/problems" element={<ExploreProblemsPage />} />

              {/* Page 4: Individual Problem Workspace */}
              <Route path="/problems/:slug" element={<ProblemWorkspacePage />} />

              {/* Page 5: Standalone Visualizer Laboratory */}
              <Route path="/visualizer" element={<VisualizerLabPage />} />

              {/* Page 6: Topics Explorer */}
              <Route path="/topics" element={<TopicsExplorerPage />} />
              <Route path="/topics/:slug" element={<TopicsExplorerPage />} />

              {/* Page 7: Learning Paths */}
              <Route path="/learning-paths" element={<LearningPathsPage />} />
              <Route path="/learning-paths/:slug" element={<LearningPathsPage />} />

              {/* Page 8: Progress & Analytics */}
              <Route path="/progress" element={<ProgressAnalyticsPage />} />

              {/* Page 9: Profile & Settings */}
              <Route path="/profile" element={<ProfileSettingsPage />} />

              {/* Page 10: Admin Management */}
              <Route path="/admin" element={<AdminPage />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<ExploreProblemsPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
