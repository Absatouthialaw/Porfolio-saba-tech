import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData, GlobalSettings } from '../types/portfolio';
import { initialData } from '../data/initialData';

export interface Snapshot {
  id: string;
  name: string;
  date: string;
  data: PortfolioData;
}

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: Partial<PortfolioData>) => void;
  resetData: () => void;
  snapshots: Snapshot[];
  saveSnapshot: (name: string) => void;
  restoreSnapshot: (id: string) => void;
  deleteSnapshot: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('portfolioData');
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // --- Clean up oversized data URLs if any were saved ---
        if (parsed.settings?.presentationVideoUrl?.startsWith('data:video')) {
          parsed.settings.presentationVideoUrl = initialData.settings.presentationVideoUrl;
        }

        // --- DATA MIGRATION: Merge missing projects from initialData ---
        if (parsed.projects && Array.isArray(parsed.projects)) {
          const existingIds = new Set(parsed.projects.map((p: any) => String(p.id)));
          const existingTitles = new Set(parsed.projects.map((p: any) => String(p.title).toLowerCase().trim()));
          const missingProjects = initialData.projects.filter(p => 
            !existingIds.has(String(p.id)) && !existingTitles.has(p.title.toLowerCase().trim())
          );
          if (missingProjects.length > 0) {
            parsed.projects = [...parsed.projects, ...missingProjects];
          }
        }
        // --- DATA MIGRATION: Force specific orders and ensure new video FK.mp4 and UX/UI projects are included ---
        if (parsed.projects && Array.isArray(parsed.projects)) {
          parsed.projects.forEach((p: any) => {
            if (p.category === 'Design Produit') p.category = 'Design';
            if (p.title === 'Audilens') p.order = 10;
            if (p.title === 'Poste perso' || p.title === 'Postes Perso') {
              p.order = 12;
              p.image = '/Galerie/poste perso/couverture_perso.png';
              if (Array.isArray(p.images) && !p.images.includes('/Galerie/poste perso/couverture_perso.png')) {
                p.images.unshift('/Galerie/poste perso/couverture_perso.png');
              }
            }
            if (p.title === 'Affiches & Flyers') p.order = 13;
            if (p.title === 'Montage Vidéo' || p.title === 'Montage Vid\u01F8o') {
              p.order = 14;
              if (Array.isArray(p.images) && !p.images.includes('/Galerie/Réalisation video/FK.mp4')) {
                p.images.push('/Galerie/Réalisation video/FK.mp4');
              }
            }
            if (p.title === 'Patisserie Mobile App') {
              p.order = 15;
              p.category = 'UX/UI';
              p.pdfUrl = '/Galerie/Patisserie Mobile App/Patisserie Mobile App.pdf';
            }
            if (p.title === 'Maquette resto' || p.title === 'Maquette Resto') {
              p.order = 16;
              p.category = 'UX/UI';
              p.pdfUrl = '/Galerie/Maquette resto/Food Market- Food.pdf';
            }
            if (p.title === 'Sabatech') p.order = 17;
            if (p.title === 'Terenga vert') p.order = 18;
          });
        }
        // --- DATA MIGRATION: Ensure workProcess is populated ---
        if (!parsed.workProcess || !Array.isArray(parsed.workProcess) || parsed.workProcess.length === 0) {
          parsed.workProcess = initialData.workProcess;
        }

        // --- DATA MIGRATION: Ensure settings has all default keys ---
        const sanitizedSettings: GlobalSettings = {
          ...initialData.settings,
          ...(parsed.settings || {}),
          socials: {
            ...initialData.settings.socials,
            ...(parsed.settings?.socials || {})
          }
        };

        // --- Ensure presentationVideoUrl is clean and default to the original presentation video ---
        sanitizedSettings.presentationVideoUrl = '/Galerie/video_presentation.mp4';

        return {
          ...initialData,
          ...parsed,
          settings: sanitizedSettings,
          projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : initialData.projects,
          services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : initialData.services,
          skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : initialData.skills,
          tools: Array.isArray(parsed.tools) && parsed.tools.length > 0 ? parsed.tools : initialData.tools,
          testimonials: Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0 ? parsed.testimonials : initialData.testimonials,
          faqs: Array.isArray(parsed.faqs) && parsed.faqs.length > 0 ? parsed.faqs : initialData.faqs,
          statistics: Array.isArray(parsed.statistics) && parsed.statistics.length > 0 ? parsed.statistics : initialData.statistics,
          workProcess: Array.isArray(parsed.workProcess) && parsed.workProcess.length > 0 ? parsed.workProcess : initialData.workProcess,
          roadmap: Array.isArray(parsed.roadmap) && parsed.roadmap.length > 0 ? parsed.roadmap : initialData.roadmap,
        };
      }
    } catch (e) {}
    return initialData;
  });

  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => {
    try {
      const saved = localStorage.getItem('portfolioSnapshots');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage quota exceeded (data too large).', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioSnapshots', JSON.stringify(snapshots));
    } catch (e) {
      console.warn('LocalStorage snapshots quota exceeded.', e);
    }
  }, [snapshots]);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData((prev) => {
      const mergedSettings: GlobalSettings = newData.settings
        ? {
            ...initialData.settings,
            ...(prev.settings || {}),
            ...newData.settings,
            socials: {
              ...initialData.settings.socials,
              ...(prev.settings?.socials || {}),
              ...(newData.settings?.socials || {})
            }
          }
        : (prev.settings || initialData.settings);

      return {
        ...prev,
        ...newData,
        settings: mergedSettings
      };
    });
  };

  const resetData = () => {
    setData(initialData);
  };

  const saveSnapshot = (name: string) => {
    const newSnapshot: Snapshot = {
      id: `snap-${Date.now()}`,
      name,
      date: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(data)),
    };
    setSnapshots(prev => [newSnapshot, ...prev]);
  };

  const restoreSnapshot = (id: string) => {
    const snap = snapshots.find(s => s.id === id);
    if (snap) {
      setData(JSON.parse(JSON.stringify(snap.data)));
    }
  };

  const deleteSnapshot = (id: string) => {
    setSnapshots(prev => prev.filter(s => s.id !== id));
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, resetData, snapshots, saveSnapshot, restoreSnapshot, deleteSnapshot }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
