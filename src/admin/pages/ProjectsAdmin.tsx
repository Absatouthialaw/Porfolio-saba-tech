import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';
import { Plus, Edit2, Trash2, GripVertical, Check, X, Image as ImageIcon, FileText } from 'lucide-react';

export default function ProjectsAdmin() {
  const { data, updateData } = usePortfolio();
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [selectedFilter, setSelectedFilter] = useState<string>('Tout');

  useEffect(() => {
    setProjects(data.projects);
  }, [data.projects]);

  const handleSaveAll = () => {
    updateData({ projects });
    alert("Projets enregistrés avec succès !");
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm(project);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const newProjects = projects.map(p => p.id === editingId ? { ...p, ...editForm } as Project : p);
    setProjects(newProjects);
    updateData({ projects: newProjects });
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string | number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      const newProjects = projects.filter(p => p.id !== id);
      setProjects(newProjects);
      updateData({ projects: newProjects });
    }
  };

  const handleAdd = () => {
    const newProject: Project = {
      id: Date.now(),
      title: 'Nouveau Projet',
      category: 'UX/UI',
      year: new Date().getFullYear().toString(),
      image: '',
      description: 'Description du projet',
      results: 'Résultats obtenus',
      images: [],
      pdfUrl: '',
      enabled: true,
      order: projects.length + 1
    };
    // Add at the beginning so it's immediately visible
    const newProjects = [newProject, ...projects];
    // Update order values
    newProjects.forEach((p, i) => p.order = i + 1);
    setProjects(newProjects);
    updateData({ projects: newProjects });
    startEdit(newProject);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...projects];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    newArr.forEach((p, i) => p.order = i + 1);
    setProjects(newArr);
    updateData({ projects: newArr });
  };

  const moveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const newArr = [...projects];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    newArr.forEach((p, i) => p.order = i + 1);
    setProjects(newArr);
    updateData({ projects: newArr });
  };

  const categories = ['Tout', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  const filteredProjects = selectedFilter === 'Tout' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Gestion des Projets & Maquettes</h2>
          <p className="text-gray-500 text-sm mt-1">Gérez vos réalisations, maquettes UX/UI, vidéos et dossiers complets.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <Plus size={16} />
            Ajouter un projet
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

      {/* Category filter tabs inside CMS */}
      <div className="flex flex-wrap gap-2 pt-2 border-b border-gray-200 pb-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedFilter === cat
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat} {cat === 'Tout' ? `(${projects.length})` : `(${projects.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {editingId === project.id ? (
              <div className="p-6 bg-gray-50/50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">Modifier le projet / maquette</h3>
                  <div className="flex gap-2">
                    <button onClick={cancelEdit} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      <X size={18} />
                    </button>
                    <button onClick={saveEdit} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-medium">
                      <Check size={16} />
                      Valider
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Titre</label>
                    <input type="text" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Catégorie</label>
                    <input 
                      type="text" 
                      list="categories-list" 
                      value={editForm.category || ''} 
                      onChange={e => setEditForm({...editForm, category: e.target.value})} 
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" 
                    />
                    <datalist id="categories-list">
                      <option value="UX/UI" />
                      <option value="Identité Visuelle" />
                      <option value="Branding" />
                      <option value="Design" />
                      <option value="Design & Social Media" />
                      <option value="Social Media" />
                      <option value="Vidéo" />
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Année</label>
                    <input type="text" value={editForm.year || ''} onChange={e => setEditForm({...editForm, year: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Statut</label>
                    <select value={editForm.enabled ? 'true' : 'false'} onChange={e => setEditForm({...editForm, enabled: e.target.value === 'true'})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]">
                      <option value="true">Affiché (Public)</option>
                      <option value="false">Masqué (Brouillon)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Image de couverture (URL ou chemin local)</label>
                    <input type="text" value={editForm.image || ''} onChange={e => setEditForm({...editForm, image: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5 flex items-center gap-1.5 text-pink-700">
                      <FileText size={14} /> Dossier Maquette / Document PDF (Optionnel)
                    </label>
                    <input 
                      type="text" 
                      value={editForm.pdfUrl || ''} 
                      onChange={e => setEditForm({...editForm, pdfUrl: e.target.value})} 
                      placeholder="/Galerie/Patisserie Mobile App/Patisserie Mobile App.pdf" 
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" 
                    />
                    <p className="text-[11px] text-gray-500 mt-1">Lien vers le fichier PDF de la maquette, affiché directement sous forme de bouton interactif dans la modale.</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Description (contexte / méthodologie)</label>
                    <textarea rows={3} value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Résultats / Impact</label>
                    <textarea rows={2} value={editForm.results || ''} onChange={e => setEditForm({...editForm, results: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Images de la galerie (Une URL par ligne)</label>
                    <textarea 
                      rows={4} 
                      value={(editForm.images || []).join('\n')} 
                      onChange={e => setEditForm({...editForm, images: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)})} 
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] resize-none font-mono text-xs"
                      placeholder="/Galerie/mon_projet/img1.png&#10;/Galerie/mon_projet/img2.png" 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 flex items-center gap-4">
                <div className="flex flex-col gap-1 text-gray-300">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-gray-600 disabled:opacity-30"><GripVertical size={16} /></button>
                  <button onClick={() => moveDown(index)} disabled={index === projects.length - 1} className="hover:text-gray-600 disabled:opacity-30"><GripVertical size={16} /></button>
                </div>
                
                <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
                  {project.image ? (
                    <img src={project.image} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300?text=Image')} />
                  ) : (
                    <ImageIcon className="text-gray-300" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 truncate">{project.title}</h4>
                    {project.pdfUrl && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-md border border-gray-200">
                        <FileText size={11} className="text-pink-600" /> PDF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="text-[#C2185B] font-medium px-2 py-0.5 bg-pink-50 rounded-md">{project.category}</span>
                    <span className="text-gray-500">{project.year}</span>
                    <span className={`px-2 py-0.5 rounded-md font-medium ${project.enabled ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {project.enabled ? 'Affiché' : 'Masqué'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => startEdit(project)} className="p-2 text-gray-500 hover:text-[#C2185B] hover:bg-pink-50 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="p-10 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-500">Aucun projet dans cette catégorie. Cliquez sur "Ajouter un projet" pour commencer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
