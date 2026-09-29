import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Testimonial } from '../../types/portfolio';
import { Plus, Edit2, Trash2, GripVertical, Check, X } from 'lucide-react';

export default function TestimonialsAdmin() {
  const { data, updateData } = usePortfolio();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(data.testimonials || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Testimonial>>({});

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setEditForm(t);
  };

  const saveEdit = () => {
    const newArr = testimonials.map(t => t.id === editingId ? { ...t, ...editForm } as Testimonial : t);
    setTestimonials(newArr);
    updateData({ testimonials: newArr });
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Supprimer ce témoignage ?")) {
      const newArr = testimonials.filter(t => t.id !== id);
      setTestimonials(newArr);
      updateData({ testimonials: newArr });
    }
  };

  const handleAdd = () => {
    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name: 'Nouveau Client',
      role: 'Poste / Entreprise',
      content: 'Le contenu du témoignage...',
      image: '',
      enabled: true,
      order: testimonials.length + 1
    };
    const newArr = [newTestimonial, ...testimonials];
    newArr.forEach((t, i) => t.order = i + 1);
    setTestimonials(newArr);
    updateData({ testimonials: newArr });
    startEdit(newTestimonial);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...testimonials];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    newArr.forEach((t, i) => t.order = i + 1);
    setTestimonials(newArr);
    updateData({ testimonials: newArr });
  };

  const moveDown = (index: number) => {
    if (index === testimonials.length - 1) return;
    const newArr = [...testimonials];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    newArr.forEach((t, i) => t.order = i + 1);
    setTestimonials(newArr);
    updateData({ testimonials: newArr });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Témoignages</h2>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#C2185B] text-white rounded-lg hover:bg-[#E91E63]">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t, index) => (
          <div key={t.id} className="bg-white rounded-xl border p-4">
            {editingId === t.id ? (
              <div className="space-y-4">
                <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full p-2 border rounded" placeholder="Nom" />
                <input type="text" value={editForm.role || ''} onChange={e => setEditForm({...editForm, role: e.target.value})} className="w-full p-2 border rounded" placeholder="Poste" />
                <textarea value={editForm.content || ''} onChange={e => setEditForm({...editForm, content: e.target.value})} className="w-full p-2 border rounded" placeholder="Message" rows={3} />
                <input type="text" value={editForm.image || ''} onChange={e => setEditForm({...editForm, image: e.target.value})} className="w-full p-2 border rounded" placeholder="Photo (URL)" />
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
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveUp(index)}><GripVertical size={14}/></button>
                    <button onClick={() => moveDown(index)}><GripVertical size={14}/></button>
                  </div>
                  {t.image && <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />}
                  <div>
                    <h4 className="font-bold">{t.name} <span className="font-normal text-gray-500 text-sm">- {t.role}</span></h4>
                    <p className="text-sm text-gray-600 mt-1">"{t.content}"</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(t)}><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
