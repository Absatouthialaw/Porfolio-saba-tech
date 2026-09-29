import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Statistic } from '../../types/portfolio';
import { Plus, Edit2, Trash2, GripVertical, Check, X } from 'lucide-react';

export default function StatisticsAdmin() {
  const { data, updateData } = usePortfolio();
  const [stats, setStats] = useState<Statistic[]>(data.statistics || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Statistic>>({});

  const startEdit = (s: Statistic) => {
    setEditingId(s.id);
    setEditForm(s);
  };

  const saveEdit = () => {
    const newArr = stats.map(s => s.id === editingId ? { ...s, ...editForm } as Statistic : s);
    setStats(newArr);
    updateData({ statistics: newArr });
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Supprimer cette stat ?")) {
      const newArr = stats.filter(s => s.id !== id);
      setStats(newArr);
      updateData({ statistics: newArr });
    }
  };

  const handleAdd = () => {
    const newStat: Statistic = {
      id: `stat-${Date.now()}`,
      label: 'Nouveau',
      value: 100,
      suffix: '+',
      enabled: true,
      order: stats.length + 1
    };
    const newArr = [newStat, ...stats];
    newArr.forEach((s, i) => s.order = i + 1);
    setStats(newArr);
    updateData({ statistics: newArr });
    startEdit(newStat);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...stats];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    newArr.forEach((s, i) => s.order = i + 1);
    setStats(newArr);
    updateData({ statistics: newArr });
  };

  const moveDown = (index: number) => {
    if (index === stats.length - 1) return;
    const newArr = [...stats];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    newArr.forEach((s, i) => s.order = i + 1);
    setStats(newArr);
    updateData({ statistics: newArr });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Statistiques</h2>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#C2185B] text-white rounded-lg hover:bg-[#E91E63]">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-4">
        {stats.map((s, index) => (
          <div key={s.id} className="bg-white rounded-xl border p-4">
            {editingId === s.id ? (
              <div className="space-y-4">
                <input type="text" value={editForm.label || ''} onChange={e => setEditForm({...editForm, label: e.target.value})} className="w-full p-2 border rounded" placeholder="Label (Ex: Projets réalisés)" />
                <div className="flex gap-4">
                  <input type="number" value={editForm.value || 0} onChange={e => setEditForm({...editForm, value: Number(e.target.value)})} className="w-full p-2 border rounded" placeholder="Valeur (Ex: 50)" />
                  <input type="text" value={editForm.suffix || ''} onChange={e => setEditForm({...editForm, suffix: e.target.value})} className="w-full p-2 border rounded" placeholder="Suffixe (Ex: + ou %)" />
                </div>
                <select value={editForm.enabled ? 'true' : 'false'} onChange={e => setEditForm({...editForm, enabled: e.target.value === 'true'})} className="p-2 border rounded">
                  <option value="true">Affiché</option>
                  <option value="false">Masqué</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 bg-gray-900 text-white rounded">Valider</button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-200 rounded">Annuler</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveUp(index)}><GripVertical size={14}/></button>
                    <button onClick={() => moveDown(index)}><GripVertical size={14}/></button>
                  </div>
                  <div>
                    <h4 className="font-black text-2xl text-[#C2185B]">{s.value}{s.suffix}</h4>
                    <p className="text-sm font-bold mt-1 uppercase text-gray-700">{s.label}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(s)}><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(s.id)} className="text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
