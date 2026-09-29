import React from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  LogOut, 
  Briefcase, 
  Wrench, 
  HelpCircle,
  MessageSquare,
  Award,
  BarChart,
  ChevronLeft,
  Target,
  FileText
} from 'lucide-react';

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projets', path: '/admin/projects', icon: FolderKanban },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Outils & Logiciels', path: '/admin/tools', icon: Wrench },
    { name: 'Compétences', path: '/admin/skills', icon: Award },
    { name: 'Méthode de travail', path: '/admin/process', icon: Target },
    { name: 'CV, Vidéo & Sites', path: '/admin/downloads', icon: FileText },
    { name: 'Statistiques', path: '/admin/statistics', icon: BarChart },
    { name: 'Témoignages', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'FAQ', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Paramètres Globaux', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0A0A] text-white flex flex-col h-full shrink-0 shadow-xl z-20">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C2185B] flex items-center justify-center">
            <span className="font-bold text-lg leading-none">A</span>
          </div>
          <div>
            <h1 className="font-bold tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>Portfolio CMS</h1>
            <p className="text-[10px] text-gray-400">Mode Administration</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-[#C2185B] text-white shadow-md shadow-[#C2185B]/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={18} />
            Retour au site
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto bg-[#F9FAFB]">
        <div className="p-8 lg:p-10 max-w-6xl mx-auto min-h-full flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
