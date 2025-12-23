
import React, { useState, useEffect } from 'react';
import { FamilyMember, Marriage } from './types';
import { MEMBERS, MARRIAGES } from './constants';
import FamilyTree from './components/FamilyTree';
import LandingPage from './components/LandingPage';
import { uploadMemberPhoto, subscribeToPhotos } from './services/photoService';
import { isFirebaseEnabled } from './firebaseConfig';

type ViewMode = 'landing' | 'full' | 'branch';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [branchRootId, setBranchRootId] = useState<string>('helga');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [selectedMarriage, setSelectedMarriage] = useState<Marriage | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);

  const childrenOfRoot = MEMBERS.filter(m => m.parentId === 'U0');

  useEffect(() => {
    const unsubscribe = subscribeToPhotos((photos) => {
      setCustomPhotos(photos);
    });
    return () => unsubscribe();
  }, []);

  const closeModals = () => {
    setSelectedMember(null);
    setSelectedMarriage(null);
  };

  const getParentText = (member: FamilyMember) => {
    if (!member.parentId) return null;
    const prefix = member.gender === 'male' ? 'Søn af' : (member.gender === 'female' ? 'Datter af' : 'Barn af');
    const marriage = MARRIAGES.find(m => m.id === member.parentId);
    if (marriage) {
      const h = MEMBERS.find(m => m.id === marriage.husbandId);
      const w = MEMBERS.find(m => m.id === marriage.wifeId);
      return `${prefix} ${h?.name || '?'} & ${w?.name || '?'}`;
    }
    const soloParent = MEMBERS.find(m => m.id === member.parentId);
    return soloParent ? `${prefix} ${soloParent.name}` : null;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isFirebaseEnabled) {
      alert("Sky-synkronisering er ikke aktiv. Tjek venligst dine Firebase-indstillinger.");
      return;
    }

    try {
      setIsUploading(true);
      await uploadMemberPhoto(id, file);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Fejl ved upload: " + (error instanceof Error ? error.message : "Ukendt fejl"));
    } finally {
      setIsUploading(false);
    }
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage 
        branches={childrenOfRoot}
        onSelectFullTree={() => {
          setBranchRootId('helga');
          setViewMode('full');
        }}
        onSelectBranch={(id) => {
          setBranchRootId(id);
          setViewMode('branch');
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-[#f5f1e8] flex flex-col overflow-hidden">
      <header className="absolute top-0 left-0 right-0 p-6 z-10 pointer-events-none flex justify-between items-start">
        <button 
          onClick={() => setViewMode('landing')}
          className="pointer-events-auto bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-[#d4c5b0] shadow-lg flex items-center gap-3 group hover:border-[#d4af37] transition-all"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-[10px] font-black text-[#8b7355] uppercase tracking-widest">Tilbage</span>
        </button>

        <div className="pointer-events-auto flex flex-col items-end gap-2">
            <div className="bg-[#2d2416]/10 px-4 py-1.5 rounded-full border border-[#d4c5b0]/30 backdrop-blur-sm">
                <span className="text-[9px] font-bold text-[#2d2416] uppercase">
                    {viewMode === 'full' ? 'Hele Slægten' : `Gren: ${MEMBERS.find(m => m.id === branchRootId)?.name.split(' ')[0]}`}
                </span>
            </div>
        </div>
      </header>

      <main className="flex-1 w-full h-full">
        <FamilyTree 
          rootId={branchRootId}
          members={MEMBERS} 
          marriages={MARRIAGES} 
          customPhotos={customPhotos}
          onSelectMember={setSelectedMember}
          onSelectMarriage={setSelectedMarriage}
        />
      </main>

      {(selectedMember || selectedMarriage) && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#2d2416]/40 backdrop-blur-md animate-in fade-in duration-300"
          onClick={closeModals}
        >
          <div 
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-[#d4af37] relative transform animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button 
                onClick={closeModals}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all z-10"
            >
                ✕
            </button>

            {selectedMember && (
              <div className="p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="group relative w-32 h-32 rounded-full border-[5px] border-[#d4af37] p-1.5 mb-6 shadow-2xl bg-[#fdfdfd] overflow-hidden">
                    {customPhotos[selectedMember.id] ? (
                        <img 
                          src={customPhotos[selectedMember.id]} 
                          className={`w-full h-full object-cover rounded-full ${selectedMember.deathDate ? 'grayscale opacity-60' : ''}`}
                          alt={selectedMember.name}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-full">
                            {isUploading ? (
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div>
                            ) : (
                              <span className="text-4xl opacity-20">👤</span>
                            )}
                        </div>
                    )}
                    <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-full">
                        <span className="text-[10px] font-bold uppercase">{isUploading ? 'Uploader...' : 'Skift Foto'}</span>
                        <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, selectedMember.id)} />
                    </label>
                  </div>
                  
                  <h2 className="text-4xl font-bold serif text-[#2d2416] mb-1 leading-tight">{selectedMember.name}</h2>
                  <p className="text-[#8b7355] text-xs italic font-medium mb-4">
                    {getParentText(selectedMember)}
                  </p>
                  
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#f5f1e8] rounded-full text-[10px] font-black text-[#8b7355] border border-[#d4c5b0] uppercase tracking-tighter">
                      {selectedMember.birthDate || '????'} — {selectedMember.deathDate || 'nu'}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 gap-4 text-left">
                  <div>
                    <h3 className="text-[9px] font-black text-[#8b7355] uppercase tracking-widest mb-1">Fødested</h3>
                    <p className="text-[#2d2416] text-sm font-medium italic">
                      {selectedMember.birthPlace || "Ikke angivet"}
                    </p>
                  </div>
                  {selectedMember.deathDate && (
                    <div>
                      <h3 className="text-[9px] font-black text-[#8b7355] uppercase tracking-widest mb-1">Hvilested</h3>
                      <p className="text-[#2d2416] text-sm font-medium italic">
                        {selectedMember.burialPlace || "Ikke angivet"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedMarriage && (
              <div className="p-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#fdfbf7] rounded-full flex items-center justify-center mx-auto border border-[#d4af37] shadow-sm mb-4">
                    <span className="text-2xl">💍</span>
                  </div>
                  <h2 className="text-3xl font-bold serif text-[#2d2416]">Slægtens Forening</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[#fcfaf7] p-6 rounded-[2rem] border border-[#d4c5b0]">
                    <div className="flex flex-col items-center text-[#2d2416] font-bold serif text-lg gap-2 text-center">
                      <div>{MEMBERS.find(m => m.id === selectedMarriage.husbandId)?.name}</div>
                      <div className="text-[#d4af37] text-sm italic">&</div>
                      <div>{MEMBERS.find(m => m.id === selectedMarriage.wifeId)?.name}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[8px] font-black text-[#8b7355] uppercase tracking-widest mb-1 text-center">Dato</p>
                      <p className="text-xs font-bold text-[#2d2416] text-center">{selectedMarriage.date || 'Ukendt'}</p>
                    </div>
                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[8px] font-black text-[#8b7355] uppercase tracking-widest mb-1 text-center">Sted</p>
                      <p className="text-xs font-bold text-[#2d2416] text-center truncate">{selectedMarriage.location || 'Ukendt'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="absolute bottom-8 left-0 right-0 pointer-events-none flex justify-center">
        <div className="bg-[#2d2416]/80 text-white px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md shadow-2xl border border-white/10">
            Træk for at panorere • Scroll for at zoome
        </div>
      </footer>
    </div>
  );
};

export default App;
