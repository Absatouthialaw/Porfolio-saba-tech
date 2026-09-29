import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Skill } from '../../types/portfolio';
import { Plus, Edit2, Trash2, GripVertical, Check, X } from 'lucide-react';

export default function SkillsAdmin() {
  const { data, updateData } = usePortfolio();
  const [skills, setSkills] = useState<Skill[]>(data.skills);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Skill>>({});

  const handleSaveAll = () => {
    updateData({ skills });
    alert("Compétences enregistrées avec succès !");
  };

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditForm(skill);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const newSkills = skills.map(s => s.id === editingId ? { ...s, ...editForm } as Skill : s);
    setSkills(newSkills);
    updateData({ skills: newSkills });
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) {
      const newSkills = skills.filter(s => s.id !== id);
      setSkills(newSkills);
      updateData({ skills: newSkills });
    }
  };

  const handleAdd = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: 'Nouvelle Compétence',
      percentage: 80,
      enabled: true,
      order: skills.length + 1
    };
    const newSkills = [newSkill, ...skills];
    newSkills.forEach((s, i) => s.order = i + 1);
    setSkills(newSkills);
    updateData({ skills: newSkills });
    startEdit(newSkill);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...skills];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    newArr.forEach((s, i) => s.order = i + 1);
    setSkills(newArr);
    updateData({ skills: newArr });
  };

  const moveDown = (index: number) => {
    if (index === skills.length - 1) return;
    const newArr = [...skills];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    newArr.forEach((s, i) => s.order = i + 1);
    setSkills(newArr);
    updateData({ skills: newArr });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Gestion des Compétences</h2>
          <p className="text-gray-500 text-sm mt-1">Gérez vos compétences et leur niveau de maîtrise.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <Plus size={16} />
            Ajouter une compétence
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={skill.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {editingId === skill.id ? (
              <div className="p-5 bg-gray-50/50 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900 text-sm">Modifier</h3>
                  <div className="flex gap-2">
                    <button onClick={cancelEdit} className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-lg">
                      <X size={16} />
                    </button>
                    <button onClick={saveEdit} className="p-1.5 bg-gray-900 text-white hover:bg-black rounded-lg">
                      <Check size={16} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Nom</label>
                  <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Pourcentage ({editForm.percentage}%)</label>
                  <input type="range" min="0" max="100" value={editForm.percentage || 0} onChange={e => setEditForm({...editForm, percentage: parseInt(e.target.value)})} className="w-full" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Statut</label>
                  <select value={editForm.enabled ? 'true' : 'false'} onChange={e => setEditForm({...editForm, enabled: e.target.value === 'true'})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]">
                    <option value="true">Affiché</option>
                    <option value="false">Masqué</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-0.5 text-gray-300">
                      <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-gray-600 disabled:opacity-30 p-0.5"><GripVertical size={14} /></button>
                      <button onClick={() => moveDown(index)} disabled={index === skills.length - 1} className="hover:text-gray-600 disabled:opacity-30 p-0.5"><GripVertical size={14} /></button>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-none">{skill.name}</h4>
                      <span className={`text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded-sm ${skill.enabled ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {skill.enabled ? 'Affiché' : 'Masqué'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(skill)} className="p-1.5 text-gray-400 hover:text-[#C2185B] rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-end mb-1">
                    <span className="text-xs font-bold text-[#C2185B]">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C2185B] rounded-full" style={{ width: `${skill.percentage}%` }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
