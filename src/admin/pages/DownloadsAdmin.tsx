import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Check, FileText, CreditCard, Globe, Plus, Trash2, ExternalLink, Play } from 'lucide-react';

export default function DownloadsAdmin() {
  const { data, updateData } = usePortfolio();
  const [settings, setSettings] = useState(data.settings);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setSettings(data.settings);
  }, [data.settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateData({ settings });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddSite = () => {
    const currentSites = settings.externalSites || [];
    setSettings({
      ...settings,
      externalSites: [...currentSites, { label: '', url: '' }]
    });
  };

  const handleUpdateSite = (index: number, field: 'label' | 'url', value: string) => {
    const newSites = [...(settings.externalSites || [])];
    newSites[index][field] = value;
    setSettings({ ...settings, externalSites: newSites });
  };

  const handleDeleteSite = (index: number) => {
    const newSites = [...(settings.externalSites || [])];
    newSites.splice(index, 1);
    setSettings({ ...settings, externalSites: newSites });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>CV & Sites Réalisés</h2>
          <p className="text-gray-500 text-sm mt-1">Gérez facilement vos fichiers de téléchargement (CV, Carte de visite) et vos liens de sites externes.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C2185B] text-white rounded-xl hover:bg-[#E91E63] transition-colors shadow-md shadow-[#C2185B]/20 font-medium cursor-pointer"
        >
          {isSaved ? <Check size={18} /> : <Save size={18} />}
          {isSaved ? 'Enregistré !' : 'Enregistrer les modifications'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CV & CARTE DE VISITE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#C2185B] flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-heading)' }}>Fichiers (CV & Carte)</h3>
              <p className="text-xs text-gray-500">Boutons de téléchargement de l'accueil</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* CV Input & Upload */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                  <FileText size={17} className="text-[#C2185B]" />
                  Curriculum Vitae (CV)
                </label>
                {settings.cvUrl && (
                  <a
                    href={settings.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#C2185B] hover:underline flex items-center gap-1 bg-pink-50 px-2.5 py-1 rounded-md"
                  >
                    <ExternalLink size={12} />
                    Tester / Ouvrir
                  </a>
                )}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  name="cvUrl"
                  value={settings.cvUrl || ''}
                  onChange={handleChange}
                  placeholder="/CV_Absatou_Thialaw.pdf ou lien URL..."
                  className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] text-sm"
                />

                <div className="flex items-center gap-2 pt-1">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-[#C2185B]/40 hover:border-[#C2185B] text-[#C2185B] rounded-lg text-xs font-bold cursor-pointer transition-all hover:bg-pink-50/50 shadow-sm">
                    <FileText size={14} />
                    <span>📂 Mettre à jour mon CV (Choisir un PDF)</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            setSettings(prev => ({ ...prev, cvUrl: result }));
                            setIsSaved(false);
                            alert(`Fichier "${file.name}" sélectionné ! N'oubliez pas de cliquer sur "Enregistrer les modifications".`);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <p className="text-[11px] text-gray-400">
                Vous pouvez choisir un fichier PDF depuis votre ordinateur, ou coller un lien direct (Google Drive / URL).
              </p>
            </div>

            {/* Carte de visite Input & Upload */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                  <CreditCard size={17} className="text-[#C2185B]" />
                  Carte de Visite
                </label>
                {settings.businessCardUrl && (
                  <a
                    href={settings.businessCardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#C2185B] hover:underline flex items-center gap-1 bg-pink-50 px-2.5 py-1 rounded-md"
                  >
                    <ExternalLink size={12} />
                    Tester / Ouvrir
                  </a>
                )}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  name="businessCardUrl"
                  value={settings.businessCardUrl || ''}
                  onChange={handleChange}
                  placeholder="/Carte_Visite_Absatou_Thialaw.pdf ou lien..."
                  className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] text-sm"
                />

                <div className="flex items-center gap-2 pt-1">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-[#C2185B]/40 hover:border-[#C2185B] text-[#C2185B] rounded-lg text-xs font-bold cursor-pointer transition-all hover:bg-pink-50/50 shadow-sm">
                    <CreditCard size={14} />
                    <span>📂 Mettre à jour la Carte de Visite (PDF)</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            setSettings(prev => ({ ...prev, businessCardUrl: result }));
                            setIsSaved(false);
                            alert(`Fichier "${file.name}" sélectionné ! N'oubliez pas de cliquer sur "Enregistrer les modifications".`);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SITES WEB RÉALISÉS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Globe size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-heading)' }}>Sites Web Réalisés</h3>
                <p className="text-xs text-gray-500">Liste des sites ouverts via la fenêtre popup</p>
              </div>
            </div>
            <button
              onClick={handleAddSite}
              className="text-xs font-bold bg-pink-50 text-[#C2185B] px-3 py-1.5 rounded-lg hover:bg-pink-100 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus size={14} />
              Ajouter un site
            </button>
          </div>

          <div className="space-y-3">
            {(settings.externalSites || []).map((site, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 group">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={site.label}
                    onChange={(e) => handleUpdateSite(index, 'label', e.target.value)}
                    placeholder="Nom du site (ex: Sen Smart Concept)"
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#C2185B]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={site.url}
                      onChange={(e) => handleUpdateSite(index, 'url', e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:border-[#C2185B]"
                    />
                    {site.url && (
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-[#C2185B]">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSite(index)}
                  className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 shrink-0 mt-1 cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            {(!settings.externalSites || settings.externalSites.length === 0) && (
              <p className="text-sm text-gray-400 italic py-4 text-center">Aucun site ajouté pour l'instant.</p>
            )}
          </div>
        </div>

        {/* VIDÉO DE PRÉSENTATION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5 lg:col-span-2">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#C2185B] flex items-center justify-center">
                <Play size={20} className="ml-0.5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-heading)' }}>Vidéo de Présentation (Bouton Accueil)</h3>
                <p className="text-xs text-gray-500">Vidéo lancée lors du clic sur « Ma vidéo de présentation »</p>
              </div>
            </div>
            {settings.presentationVideoUrl && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Vidéo configurée
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Sélectionner parmi les vidéos du dossier Galerie
                </label>
                <select
                  value={settings.presentationVideoUrl || '/Galerie/video_presentation.mp4'}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, presentationVideoUrl: e.target.value }));
                    setIsSaved(false);
                  }}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#C2185B]"
                >
                  <option value="/Galerie/video_presentation.mp4">🎬 Vidéo de présentation (Video de présentation.mp4)</option>
                  <option value="/Galerie/Réalisation video/FK.mp4">🎬 Réalisation : FK.mp4</option>
                  <option value="/Galerie/Réalisation video/Couverture.mp4">🎬 Réalisation : Couverture.mp4</option>
                  <option value="/Galerie/Réalisation video/8 mars.mp4">🎬 Réalisation : 8 mars.mp4</option>
                  <option value="/Galerie/Réalisation video/Audit.mp4">🎬 Réalisation : Audit.mp4</option>
                  <option value="/Galerie/Réalisation video/senconn.mp4">🎬 Réalisation : senconn.mp4</option>
                  <option value="/Galerie/Réalisation video/PUULMAN.mp4">🎬 Réalisation : PUULMAN.mp4</option>
                  <option value="/Galerie/Réalisation video/Maguette(1).mp4">🎬 Réalisation : Maguette(1).mp4</option>
                  <option value="/Galerie/Réalisation video/Formation Secourisme.mp4">🎬 Réalisation : Formation Secourisme.mp4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Ou saisir un chemin / lien URL personnalisé (.mp4)
                </label>
                <input
                  type="text"
                  name="presentationVideoUrl"
                  value={settings.presentationVideoUrl || ''}
                  onChange={handleChange}
                  placeholder="/Galerie/nom_de_votre_video.mp4 ou https://..."
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2185B] text-sm"
                />
              </div>

              <div className="pt-1">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-dashed border-[#C2185B]/40 hover:border-[#C2185B] text-[#C2185B] rounded-lg text-xs font-bold cursor-pointer transition-all hover:bg-pink-50/50 shadow-sm">
                  <Play size={14} />
                  <span>📂 Choisir un fichier vidéo depuis l'ordinateur</span>
                  <input
                    type="file"
                    accept="video/mp4,video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const localPath = `/Galerie/${file.name}`;
                        setSettings(prev => ({ ...prev, presentationVideoUrl: localPath }));
                        setIsSaved(false);
                        alert(`Vidéo "${file.name}" sélectionnée (Chemin : ${localPath}) ! N'oubliez pas de cliquer sur "Enregistrer les modifications".`);
                      }
                    }}
                  />
                </label>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Astuce : Pour changer de vidéo, placez votre fichier vidéo dans le dossier <strong className="text-gray-600">Galerie</strong> ou choisissez l'une de vos vidéos de réalisations dans la liste ci-dessus !
              </p>
            </div>

            {/* Video Preview */}
            <div className="bg-black rounded-2xl overflow-hidden aspect-video border border-gray-200 flex items-center justify-center relative shadow-inner">
              {settings.presentationVideoUrl ? (
                <video
                  key={settings.presentationVideoUrl}
                  src={settings.presentationVideoUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-gray-500 text-xs">Aucune vidéo sélectionnée</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
