import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Check, X, Plus, Trash2, FileText, CreditCard } from 'lucide-react';

export default function SettingsAdmin() {
  const { data, updateData, snapshots, saveSnapshot, restoreSnapshot, deleteSnapshot } = usePortfolio();
  const [settings, setSettings] = useState(data.settings);
  const [isSaved, setIsSaved] = useState(false);

  // Sync state if context changes
  useEffect(() => {
    setSettings(data.settings);
  }, [data.settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setSettings(prev => ({
        ...prev,
        socials: { ...prev.socials, [socialKey]: value }
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    updateData({ settings });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Paramètres Globaux</h2>
          <p className="text-gray-500 text-sm mt-1">Gérez les textes principaux, les coordonnées et vos liens sociaux.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C2185B] text-white rounded-xl hover:bg-[#E91E63] transition-colors shadow-md shadow-[#C2185B]/20 font-medium"
        >
          {isSaved ? <Check size={18} /> : <Save size={18} />}
          {isSaved ? 'Enregistré !' : 'Enregistrer'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* HERO SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-heading)' }}>Section Accueil (Hero)</h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Titre (Ligne 1)</label>
            <input type="text" name="heroTitleLine1" value={settings.heroTitleLine1} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Titre (Ligne 2)</label>
            <input type="text" name="heroTitleLine2" value={settings.heroTitleLine2} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Titre (Mot en surbrillance)</label>
            <input type="text" name="heroTitleHighlight" value={settings.heroTitleHighlight} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sous-titre</label>
            <textarea name="heroSubtitle" value={settings.heroSubtitle} onChange={handleChange} rows={3} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] resize-none" />
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-heading)' }}>Section À propos</h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Paragraphe 1</label>
            <textarea name="aboutText1" value={settings.aboutText1} onChange={handleChange} rows={4} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Paragraphe 2</label>
            <textarea name="aboutText2" value={settings.aboutText2} onChange={handleChange} rows={3} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] resize-none" />
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-heading)' }}>Coordonnées de Contact</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Numéro WhatsApp (sans +)</label>
              <input type="text" name="whatsappNumber" value={settings.whatsappNumber} onChange={handleChange} placeholder="221775216245" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone Affiché</label>
              <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleChange} placeholder="+221 77 521 62 45" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Localisation</label>
              <input type="text" name="location" value={settings.location} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
            </div>
          </div>
        </div>

        {/* FILES LINKS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-heading)' }}>Fichiers (CV & Carte de visite)</h3>
          <p className="text-sm text-gray-500 mb-2">Liens vers vos fichiers PDF. Vous pouvez mettre un lien direct vers un fichier Google Drive ou le nom de votre fichier PDF téléchargé.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lien du CV</label>
              <input type="text" name="cvUrl" value={settings.cvUrl || ''} onChange={handleChange} placeholder="/CV.pdf ou https://..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lien de la Carte de Visite</label>
              <input type="text" name="businessCardUrl" value={settings.businessCardUrl || ''} onChange={handleChange} placeholder="/Carte.pdf ou https://..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B]" />
            </div>
          </div>
        </div>

        {/* EXTERNAL SITES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5 lg:col-span-2">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-heading)' }}>Sites Web Réalisés (Bouton Accueil)</h3>
            <button 
              onClick={() => {
                const currentSites = settings.externalSites || [];
                setSettings({ ...settings, externalSites: [...currentSites, { label: '', url: '' }] });
                setIsSaved(false);
              }}
              className="text-xs font-bold bg-pink-50 text-[#C2185B] px-3 py-1.5 rounded-lg hover:bg-pink-100"
            >
              + Ajouter un site
            </button>
          </div>
          
          <div className="space-y-4">
            {(settings.externalSites || []).map((site, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={site.label} 
                    onChange={(e) => {
                      const newSites = [...(settings.externalSites || [])];
                      newSites[index].label = e.target.value;
                      setSettings({ ...settings, externalSites: newSites });
                      setIsSaved(false);
                    }} 
                    placeholder="Nom du site (Ex: Sen Smart Concept)" 
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm mb-2 focus:outline-none focus:border-[#C2185B]" 
                  />
                  <input 
                    type="url" 
                    value={site.url} 
                    onChange={(e) => {
                      const newSites = [...(settings.externalSites || [])];
                      newSites[index].url = e.target.value;
                      setSettings({ ...settings, externalSites: newSites });
                      setIsSaved(false);
                    }} 
                    placeholder="https://..." 
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C2185B]" 
                  />
                </div>
                <button 
                  onClick={() => {
                    const newSites = [...(settings.externalSites || [])];
                    newSites.splice(index, 1);
                    setSettings({ ...settings, externalSites: newSites });
                    setIsSaved(false);
                  }}
                  className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {(!settings.externalSites || settings.externalSites.length === 0) && (
              <p className="text-sm text-gray-400 italic">Aucun site ajouté.</p>
            )}
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-heading)' }}>Réseaux Sociaux (Liens)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(settings?.socials || {}).map((socialKey) => (
              <div key={socialKey}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 capitalize">{socialKey}</label>
                <input 
                  type="url" 
                  name={`social_${socialKey}`} 
                  value={settings?.socials?.[socialKey] || ''} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] text-sm" 
                  placeholder={`Lien ${socialKey}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VERSIONING SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5 mt-8">
        <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-heading)' }}>Historique des Sauvegardes</h3>
        <p className="text-sm text-gray-500">Sauvegardez l'état actuel de tout votre contenu (projets, textes, outils...) pour pouvoir le restaurer en cas d'erreur.</p>
        
        <div className="flex gap-3 items-center">
          <button 
            onClick={() => {
              const name = prompt("Nom de la sauvegarde :");
              if (name) {
                saveSnapshot(name);
                alert("Sauvegarde créée !");
              }
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black text-sm font-medium"
          >
            Créer une sauvegarde
          </button>
        </div>

        <div className="space-y-3 mt-4">
          {(snapshots || []).map((snap) => (
            <div key={snap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <p className="font-bold text-gray-800">{snap.name}</p>
                <p className="text-xs text-gray-500">{new Date(snap.date).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    if (confirm("Êtes-vous sûr de vouloir restaurer cette version ? Toutes les modifications actuelles seront perdues.")) {
                      restoreSnapshot(snap.id);
                      alert("Version restaurée avec succès !");
                    }
                  }} 
                  className="px-3 py-1.5 bg-[#C2185B] text-white rounded text-xs font-medium hover:bg-[#E91E63]"
                >
                  Restaurer
                </button>
                <button 
                  onClick={() => {
                    if (confirm("Supprimer cette sauvegarde ?")) {
                      deleteSnapshot(snap.id);
                    }
                  }} 
                  className="px-3 py-1.5 bg-red-100 text-red-600 rounded text-xs font-medium hover:bg-red-200"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {(!snapshots || snapshots.length === 0) && (
            <p className="text-sm text-gray-400 italic">Aucune sauvegarde pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
