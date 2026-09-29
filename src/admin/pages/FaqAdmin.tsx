import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FAQItem } from '../../types/portfolio';
import { Plus, Edit2, Trash2, GripVertical, Check, X } from 'lucide-react';

export default function FAQAdmin() {
  const { data, updateData } = usePortfolio();
  const [faqs, setFaqs] = useState<FAQItem[]>(data.faqs || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<FAQItem>>({});

  const startEdit = (faq: FAQItem) => {
    setEditingId(faq.id);
    setEditForm(faq);
  };

  const saveEdit = () => {
    const newFaqs = faqs.map(f => f.id === editingId ? { ...f, ...editForm } as FAQItem : f);
    setFaqs(newFaqs);
    updateData({ faqs: newFaqs });
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Supprimer cette question ?")) {
      const newFaqs = faqs.filter(f => f.id !== id);
      setFaqs(newFaqs);
      updateData({ faqs: newFaqs });
    }
  };

  const handleAdd = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      question: 'Nouvelle Question ?',
      answer: 'Réponse à la question...',
      enabled: true,
      order: faqs.length + 1
    };
    const newFaqs = [newFaq, ...faqs];
    newFaqs.forEach((f, i) => f.order = i + 1);
    setFaqs(newFaqs);
    updateData({ faqs: newFaqs });
    startEdit(newFaq);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...faqs];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    newArr.forEach((f, i) => f.order = i + 1);
    setFaqs(newArr);
    updateData({ faqs: newArr });
  };

  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    const newArr = [...faqs];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    newArr.forEach((f, i) => f.order = i + 1);
    setFaqs(newArr);
    updateData({ faqs: newArr });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion de la FAQ</h2>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#C2185B] text-white rounded-lg hover:bg-[#E91E63]">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="bg-white rounded-xl border p-4">
            {editingId === faq.id ? (
              <div className="space-y-4">
                <input type="text" value={editForm.question || ''} onChange={e => setEditForm({...editForm, question: e.target.value})} className="w-full p-2 border rounded" placeholder="Question" />
                <textarea value={editForm.answer || ''} onChange={e => setEditForm({...editForm, answer: e.target.value})} className="w-full p-2 border rounded" placeholder="Réponse" rows={3} />
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
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveUp(index)}><GripVertical size={14}/></button>
                    <button onClick={() => moveDown(index)}><GripVertical size={14}/></button>
                  </div>
                  <div>
                    <h4 className="font-bold">{faq.question}</h4>
                    <p className="text-sm text-gray-500 mt-1">{faq.answer}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(faq)}><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(faq.id)} className="text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
