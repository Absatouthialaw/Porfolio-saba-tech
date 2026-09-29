import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ToolCategory, ToolItem } from '../../types/portfolio';
import { Plus, Edit2, Trash2, GripVertical, Check, X } from 'lucide-react';

export default function ToolsAdmin() {
  const { data, updateData } = usePortfolio();
  const [categories, setCategories] = useState<ToolCategory[]>(data.tools || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ToolCategory>>({});

  const startEdit = (cat: ToolCategory) => {
    setEditingId(cat.id);
    setEditForm(cat);
  };

  const saveEdit = () => {
    const newArr = categories.map(c => c.id === editingId ? { ...c, ...editForm } as ToolCategory : c);
    setCategories(newArr);
    updateData({ tools: newArr });
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Supprimer cette catégorie et tous ses outils ?")) {
      const newArr = categories.filter(c => c.id !== id);
      setCategories(newArr);
      updateData({ tools: newArr });
    }
  };

  const handleAdd = () => {
    const newCat: ToolCategory = {
      id: `cat-${Date.now()}`,
      category: 'Nouvelle Catégorie',
      items: [],
      enabled: true,
      order: categories.length + 1
    };
    const newArr = [...categories, newCat];
    newArr.forEach((c, i) => c.order = i + 1);
    setCategories(newArr);
    updateData({ tools: newArr });
    startEdit(newCat);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...categories];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    newArr.forEach((c, i) => c.order = i + 1);
    setCategories(newArr);
    updateData({ tools: newArr });
  };

  const moveDown = (index: number) => {
    if (index === categories.length - 1) return;
    const newArr = [...categories];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    newArr.forEach((c, i) => c.order = i + 1);
    setCategories(newArr);
    updateData({ tools: newArr });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Outils & Logiciels</h2>
          <p className="text-sm text-gray-500">Pour ajouter de nouveaux icônes, il faut les lier dans le code (customIconsMap).</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#C2185B] text-white rounded-lg hover:bg-[#E91E63]">
          <Plus size={16} /> Ajouter une catégorie
        </button>
      </div>

      <div className="space-y-6">
        {categories.map((cat, index) => (
          <div key={cat.id} className="bg-white rounded-xl border p-4 shadow-sm">
            {editingId === cat.id ? (
              <div className="space-y-4">
                <input type="text" value={editForm.category || ''} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full p-2 border rounded font-bold" placeholder="Nom de la catégorie" />
                <textarea 
                  value={(editForm.items || []).map(i => `${i.name}|${i.iconPath}`).join('\n')} 
                  onChange={e => {
                    const lines = e.target.value.split('\n').filter(Boolean);
                    const newItems = lines.map(l => {
                      const [name, iconPath] = l.split('|');
                      return { name: name?.trim() || '', iconPath: iconPath?.trim() || '' };
                    });
                    setEditForm({...editForm, items: newItems});
                  }} 
                  className="w-full p-2 border rounded font-mono text-xs" 
                  placeholder="NomOutil|identifiant_icone&#10;Photoshop|photoshop" 
                  rows={6} 
                />
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
              <div>
                <div className="flex items-start justify-between border-b pb-3 mb-3">
                  <div className="flex gap-3 items-center">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveUp(index)}><GripVertical size={14}/></button>
                      <button onClick={() => moveDown(index)}><GripVertical size={14}/></button>
                    </div>
                    <h3 className="font-bold text-lg">{cat.category}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(cat)}><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-xs rounded-full font-medium">{item.name} ({item.iconPath})</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
