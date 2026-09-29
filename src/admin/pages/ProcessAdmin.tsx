import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { WorkProcessStep } from '../../types/portfolio';
import { Plus, Edit2, Trash2, Check, X, GripVertical, Target, Lightbulb, Brush, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const ICON_OPTIONS = [
  { value: 'Target', label: 'Cible (Objectif)' },
  { value: 'Lightbulb', label: 'Ampoule (Idée)' },
  { value: 'Brush', label: 'Pinceau (Création)' },
  { value: 'TrendingUp', label: 'Flèche (Croissance)' },
];

const iconMap: Record<string, any> = {
  Target, Lightbulb, Brush, Paintbrush: Brush, TrendingUp
};

import { initialData } from '../../data/initialData';

export default function ProcessAdmin() {
  const { data, updateData } = usePortfolio();
  
  const getInitialSteps = () => {
    if (data.workProcess && data.workProcess.length > 0) {
      return [...data.workProcess].sort((a, b) => a.order - b.order);
    }
    return [...(initialData.workProcess || [])].sort((a, b) => a.order - b.order);
  };
  
  const [process, setProcess] = useState<WorkProcessStep[]>(getInitialSteps());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WorkProcessStep>>({});

  // Sync state if context changes externally
  useEffect(() => {
    if (data.workProcess && data.workProcess.length > 0) {
      setProcess([...data.workProcess].sort((a, b) => a.order - b.order));
    }
  }, [data.workProcess]);

  const handleAdd = () => {
    const newProcess: WorkProcessStep = {
      id: Date.now().toString(),
      num: String(process.length + 1).padStart(2, '0'),
      title: 'Nouvelle étape',
      desc: 'Description...',
      iconName: 'Target',
      enabled: true,
      order: process.length,
    };
    const updated = [...process, newProcess];
    setProcess(updated);
    updateData({ workProcess: updated });
    setEditingId(newProcess.id);
    setEditForm(newProcess);
  };

  const handleEdit = (step: WorkProcessStep) => {
    setEditingId(step.id);
    setEditForm(step);
  };

  const handleSave = () => {
    const updated = process.map(p => p.id === editingId ? { ...p, ...editForm } as WorkProcessStep : p);
    setProcess(updated);
    updateData({ workProcess: updated });
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if(window.confirm('Supprimer cette étape ?')) {
      const newProcess = process.filter(p => p.id !== id);
      newProcess.forEach((p, idx) => {
        p.order = idx;
        p.num = String(idx + 1).padStart(2, '0');
      });
      setProcess(newProcess);
      updateData({ workProcess: newProcess });
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newProcess = [...process];
    const temp = newProcess[index];
    newProcess[index] = newProcess[index - 1];
    newProcess[index - 1] = temp;
    newProcess.forEach((p, idx) => {
      p.order = idx;
      p.num = String(idx + 1).padStart(2, '0');
    });
    setProcess(newProcess);
    updateData({ workProcess: newProcess });
  };

  const moveDown = (index: number) => {
    if (index === process.length - 1) return;
    const newProcess = [...process];
    const temp = newProcess[index];
    newProcess[index] = newProcess[index + 1];
    newProcess[index + 1] = temp;
    newProcess.forEach((p, idx) => {
      p.order = idx;
      p.num = String(idx + 1).padStart(2, '0');
    });
    setProcess(newProcess);
    updateData({ workProcess: newProcess });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Méthode de travail</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les étapes de votre processus (01, 02, etc.)</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#C2185B] text-white rounded-xl hover:bg-[#E91E63] transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span className="font-semibold text-sm">Ajouter</span>
        </button>
      </div>

      <div className="grid gap-4">
        {process.map((step, index) => {
          const isEditing = editingId === step.id;
          const SelectedIcon = iconMap[isEditing ? editForm.iconName || step.iconName : step.iconName] || Target;

          return (
            <motion.div
              layout
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-2xl border ${isEditing ? 'border-[#C2185B] shadow-md' : 'border-gray-200 shadow-sm'} overflow-hidden transition-all`}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-start">
                <div className="flex sm:flex-col gap-1 items-center justify-center shrink-0">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 text-gray-400 hover:text-[#C2185B] disabled:opacity-30"><GripVertical size={16} /></button>
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">{step.num}</span>
                  <button onClick={() => moveDown(index)} disabled={index === process.length - 1} className="p-1 text-gray-400 hover:text-[#C2185B] disabled:opacity-30"><GripVertical size={16} /></button>
                </div>
                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Titre</label>
                          <input type="text" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C2185B]" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Icône</label>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#C2185B] flex items-center justify-center shrink-0">
                              <SelectedIcon size={18} />
                            </div>
                            <select value={editForm.iconName || ''} onChange={e => setEditForm({...editForm, iconName: e.target.value})} className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C2185B]">
                              {ICON_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                        <textarea value={editForm.desc || ''} onChange={e => setEditForm({...editForm, desc: e.target.value})} rows={3} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C2185B] resize-none" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#C2185B] flex items-center justify-center">
                          <SelectedIcon size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{step.desc}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center sm:flex-col gap-2 shrink-0 justify-end sm:justify-start">
                  <div className="flex items-center gap-2 mb-0 sm:mb-2 mr-auto sm:mr-0">
                    <button onClick={() => {
                        const updated = [...process];
                        updated[index].enabled = !updated[index].enabled;
                        setProcess(updated);
                      }}
                      className={`w-10 h-5 rounded-full relative transition-colors ${step.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full transition-all ${step.enabled ? 'left-[22px]' : 'left-1'}`} />
                    </button>
                  </div>
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} className="flex gap-2 px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-semibold"><Check size={16} /></button>
                      <button onClick={() => setEditingId(null)} className="flex gap-2 px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-semibold"><X size={16} /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(step)} className="flex gap-2 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(step.id)} className="flex gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold"><Trash2 size={16} /></button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
