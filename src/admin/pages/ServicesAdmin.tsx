import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Service } from '../../types/portfolio';
import { Plus, Edit2, Trash2, GripVertical, Check, X, Megaphone, PenTool, Layout, Camera, Share2, MousePointerClick } from 'lucide-react';

const iconMap: Record<string, React.FC> = {
  Megaphone,
  PenTool,
  Layout,
  Camera,
  Share2,
  MousePointerClick
};

export default function ServicesAdmin() {
  const { data, updateData } = usePortfolio();
  const [services, setServices] = useState<Service[]>(data.services);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});

  const handleSaveAll = () => {
    updateData({ services });
    alert("Services enregistrés avec succès !");
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditForm(service);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const newServices = services.map(s => s.id === editingId ? { ...s, ...editForm } as Service : s);
    setServices(newServices);
    updateData({ services: newServices });
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      const newServices = services.filter(s => s.id !== id);
      setServices(newServices);
      updateData({ services: newServices });
    }
  };

  const handleAdd = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: 'Nouveau Service',
      description: 'Description du service...',
      iconName: 'PenTool',
      color: '#C2185B',
      details: ['Détail 1', 'Détail 2'],
      enabled: true,
      order: services.length + 1
    };
    const newServices = [newService, ...services];
    newServices.forEach((s, i) => s.order = i + 1);
    setServices(newServices);
    updateData({ services: newServices });
    startEdit(newService);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...services];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    newArr.forEach((s, i) => s.order = i + 1);
    setServices(newArr);
    updateData({ services: newArr });
  };

  const moveDown = (index: number) => {
    if (index === services.length - 1) return;
    const newArr = [...services];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    newArr.forEach((s, i) => s.order = i + 1);
    setServices(newArr);
    updateData({ services: newArr });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Gestion des Services</h2>
          <p className="text-gray-500 text-sm mt-1">Gérez les prestations que vous proposez.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <Plus size={16} />
            Ajouter un service
          </button>
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C2185B] text-white rounded-xl hover:bg-[#E91E63] transition-colors shadow-md shadow-[#C2185B]/20 font-medium text-sm"
          >
            <Check size={18} />
            Enregistrer
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => {
          const Icon = iconMap[service.iconName] || PenTool;
          return (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {editingId === service.id ? (
                <div className="p-6 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900">Modifier le service</h3>
                    <div className="flex gap-2">
                      <button onClick={cancelEdit} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                        <X size={18} />
                      </button>
                      <button onClick={saveEdit} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-medium">
                        <Check size={16} /> Valider
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Titre</label>
                      <input type="text" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Nom de l'icône (Lucide)</label>
                      <input type="text" value={editForm.iconName || ''} onChange={e => setEditForm({...editForm, iconName: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Couleur principale</label>
                      <input type="color" value={editForm.color || '#C2185B'} onChange={e => setEditForm({...editForm, color: e.target.value})} className="w-full h-10 px-1 py-1 bg-white border border-gray-200 rounded-lg cursor-pointer" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Statut</label>
                      <select value={editForm.enabled ? 'true' : 'false'} onChange={e => setEditForm({...editForm, enabled: e.target.value === 'true'})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]">
                        <option value="true">Affiché (Public)</option>
                        <option value="false">Masqué (Brouillon)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Description</label>
                      <textarea rows={3} value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] resize-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Détails (Un par ligne)</label>
                      <textarea 
                        rows={4} 
                        value={(editForm.details || []).join('\n')} 
                        onChange={e => setEditForm({...editForm, details: e.target.value.split('\n').filter(l => l.trim() !== '')})} 
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] resize-none font-mono text-sm" 
                        placeholder="Ex: Analyse de la cible..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 flex items-center gap-4">
                  <div className="flex flex-col gap-1 text-gray-300">
                    <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-gray-600 disabled:opacity-30"><GripVertical size={16} /></button>
                    <button onClick={() => moveDown(index)} disabled={index === services.length - 1} className="hover:text-gray-600 disabled:opacity-30"><GripVertical size={16} /></button>
                  </div>
                  
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                    <Icon size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{service.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className="text-gray-500">{service.details.length} points de détail</span>
                      <span className={`px-2 py-0.5 rounded-md font-medium ${service.enabled ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {service.enabled ? 'Affiché' : 'Masqué'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => startEdit(service)} className="p-2 text-gray-500 hover:text-[#C2185B] hover:bg-pink-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
