import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FolderKanban, Briefcase, Award, MessageSquare, Wrench, Target, FileText } from 'lucide-react';
import { Link } from 'react-router';

export default function DashboardHome() {
  const { data } = usePortfolio();

  const stats = [
    { label: 'Projets Publics', value: data.projects.filter(p => p.enabled).length, icon: FolderKanban, color: 'bg-blue-500', link: '/admin/projects' },
    { label: 'Services', value: data.services.filter(s => s.enabled).length, icon: Briefcase, color: 'bg-[#C2185B]', link: '/admin/services' },
    { label: 'Méthode de travail', value: (data.workProcess || []).filter(p => p.enabled).length, icon: Target, color: 'bg-rose-600', link: '/admin/process' },
    { label: 'CV & Sites Web', value: (data.settings?.externalSites || []).length + (data.settings?.cvUrl ? 1 : 0), icon: FileText, color: 'bg-indigo-500', link: '/admin/downloads' },
    { label: 'Compétences', value: data.skills.filter(s => s.enabled).length, icon: Award, color: 'bg-purple-500', link: '/admin/skills' },
    { label: 'Outils', value: data.tools.reduce((acc, cat) => acc + cat.items.length, 0), icon: Wrench, color: 'bg-orange-500', link: '/admin/tools' },
    { label: 'Témoignages', value: data.testimonials.filter(t => t.enabled).length, icon: MessageSquare, color: 'bg-green-500', link: '/admin/testimonials' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Tableau de bord</h2>
        <p className="text-gray-500 text-sm mt-1">Bienvenue dans l'interface d'administration de votre portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.link} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon size={24} />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-[#0A0A0A] p-8 rounded-3xl text-white relative overflow-hidden mt-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#C2185B]/30 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Prêt à mettre à jour votre contenu ?</h3>
          <p className="text-gray-400 text-sm max-w-lg">
            Utilisez le menu latéral pour naviguer dans les différentes sections de votre portfolio. Toute modification enregistrée sera automatiquement appliquée sur le site public.
          </p>
        </div>
      </div>
    </div>
  );
}
