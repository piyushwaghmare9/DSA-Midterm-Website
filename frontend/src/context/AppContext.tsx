import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, Language } from '../types';
import confetti from 'canvas-confetti';

interface AppContextType {
  user: UserProfile;
  solvedIds: Set<string>;
  attemptedIds: Set<string>;
  bookmarkedIds: Set<string>;
  notes: Record<string, string>;
  preferredLanguage: Language;
  setPreferredLanguage: (lang: Language) => void;
  toggleBookmark: (questionId: string) => void;
  markSolved: (questionId: string) => void;
  markAttempted: (questionId: string) => void;
  saveNote: (questionId: string, note: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;
}

const defaultUser: UserProfile = {
  id: 'usr_demo_101',
  name: 'Alex Chen',
  email: 'alex.chen@algovision.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  preferredLanguage: 'cpp',
  learningGoal: 'Crack Software Engineering Interviews',
  skillLevel: 'Intermediate',
  role: 'student',
  streak: 12,
  lastActiveDate: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('algovision_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('algovision_solved');
    return saved ? new Set(JSON.parse(saved)) : new Set(['1', '2', '6', '14']); // Demo initial solved
  });

  const [attemptedIds, setAttemptedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('algovision_attempted');
    return saved ? new Set(JSON.parse(saved)) : new Set(['3', '7', '8', '21']);
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('algovision_bookmarks');
    return saved ? new Set(JSON.parse(saved)) : new Set(['1', '7', '20', '21', '28']);
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('algovision_notes');
    return saved
      ? JSON.parse(saved)
      : {
          '1': 'Remember complement = target - nums[i]. Hash map gives O(1) lookup.',
          '7': "Kadane's trick: reset running sum to 0 whenever it drops below 0.",
        };
  });

  const [preferredLanguage, setPreferredLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('algovision_lang');
    return (saved as Language) || 'cpp';
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('algovision_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('algovision_solved', JSON.stringify(Array.from(solvedIds)));
  }, [solvedIds]);

  useEffect(() => {
    localStorage.setItem('algovision_attempted', JSON.stringify(Array.from(attemptedIds)));
  }, [attemptedIds]);

  useEffect(() => {
    localStorage.setItem('algovision_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('algovision_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('algovision_lang', preferredLanguage);
  }, [preferredLanguage]);

  const toggleBookmark = (questionId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const markSolved = (questionId: string) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      next.add(questionId);
      return next;
    });
    setAttemptedIds((prev) => {
      const next = new Set(prev);
      next.delete(questionId);
      return next;
    });

    // Celebratory confetti burst!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#38bdf8', '#10b981', '#a855f7'],
    });
  };

  const markAttempted = (questionId: string) => {
    if (!solvedIds.has(questionId)) {
      setAttemptedIds((prev) => {
        const next = new Set(prev);
        next.add(questionId);
        return next;
      });
    }
  };

  const saveNote = (questionId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [questionId]: note }));
  };

  const loginUser = (name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
    }));
  };

  const logoutUser = () => {
    setUser({
      id: 'usr_guest',
      name: 'Guest Learner',
      email: 'guest@algovision.edu',
      preferredLanguage: 'cpp',
      learningGoal: 'Explore DSA',
      skillLevel: 'Beginner',
      role: 'student',
      streak: 0,
      lastActiveDate: new Date().toISOString(),
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        solvedIds,
        attemptedIds,
        bookmarkedIds,
        notes,
        preferredLanguage,
        setPreferredLanguage,
        toggleBookmark,
        markSolved,
        markAttempted,
        saveNote,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
