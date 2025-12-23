
import React, { useState, useEffect } from 'react';
import { FamilyMember, Marriage } from './types';
import { MEMBERS, MARRIAGES } from './constants';
import FamilyTree from './components/FamilyTree';
import LandingPage from './components/LandingPage';

type ViewMode = 'landing' | 'full' | 'branch';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [branchRootId, setBranchRootId] = useState<string>('helga');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [selectedMarriage, setSelectedMarriage] = useState<Marriage | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});

  // Helga and Martin's children are the main branches
  // Root marriage is U0
  const childrenOfRoot = MEMBERS.filter(m => m.parentId === 'U0');

  useEffect(() => {
    const saved = localStorage.getItem('christensen_photos');
    if (saved) setCustomPhotos(JSON.parse(saved));
  }, []);

  const savePhoto = (id: string, base64: string) => {
    const newPhotos = { ...customPhotos, [id]: base64 };
    setCustomPhotos(newPhotos);
    localStorage.setItem('christensen_photos', JSON.stringify(newPhotos));
  };

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
    if (soloParent) return `${prefix} ${soloParent.name}`;
    return null;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => savePhoto(id, reader.result as string);
      reader.readAsDataURL(file);
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
          className="pointer-events-auto bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#d4c5b0] shadow-lg flex items-center gap-3 group hover:border-[#d4af37] transition-all"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-[10px] font-black text-[#8b7355] uppercase tracking-widest">Tilbage til start</span>
        </button>

        <div className="pointer-events-auto bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-[#d4c5b0] shadow-lg flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span className="text-[10px] font-black text-[#8b7355] uppercase tracking-tighter">
                {viewMode === 'full' ? 'Hele Slægten' : `Gren: ${MEMBERS.find(m => m.id === branchRootId)?.name.split(' ')[0]}`}
            </span>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-md animate-in fade-in duration-300"
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
                            <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                    )}
                    <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-full">
                        <span className="text-[10px] font-bold uppercase">Upload Foto</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, selectedMember.id)} />
                    </label>
                  </div>
                  
                  <h2 className="text-4xl font-bold serif text-[#2d2416] mb-1 leading-tight">{selectedMember.name}</h2>
                  <p className="text-[#8b7355] text-sm italic font-medium mb-4">
                    {getParentText(selectedMember)}
                  </p>
                  
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#f5f1e8] rounded-full text-[11px] font-bold text-[#8b7355] border border-[#d4c5b0]">
                      {selectedMember.birthDate || '????'} — {selectedMember.deathDate || 'nu'}
                  </div>
                </div>
                
                <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-1 gap-4 text-left">
                  <div>
                    <h3 className="text-[9px] font-black text-[#8b7355] uppercase tracking-[0.2em] mb-1">Fødested</h3>
                    <p className="text-[#2d2416] text-sm font-medium italic">
                      {selectedMember.birthPlace || "Ukendt"}
                    </p>
                  </div>
                  {selectedMember.deathDate && (
                    <div>
                      <h3 className="text-[9px] font-black text-[#8b7355] uppercase tracking-[0.2em] mb-1">Begravet</h3>
                      <p className="text-[#2d2416] text-sm font-medium italic">
                        {selectedMember.burialPlace || "Ukendt"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedMarriage && (
              <div className="p-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#fffcf5] rounded-full flex items-center justify-center mx-auto border border-[#d4af37] shadow-sm mb-4">
                    <span className="text-3xl">💍</span>
                  </div>
                  <h2 className="text-3xl font-bold serif text-[#2d2416]">Vielse</h2>
                  {selectedMarriage.divorced && (
                    <span className="inline-block mt-2 px-3 py-1 bg-red-50 text-red-600 text-[11px] font-semibold rounded-full tracking-tight">Skilt</span>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[#fcfaf7] p-6 rounded-[2rem] border border-[#d4c5b0]">
                    <div className="flex flex-col items-center text-[#2d2416] font-bold serif text-lg gap-2">
                      <div className="text-center">{MEMBERS.find(m => m.id === selectedMarriage.husbandId)?.name}</div>
                      <div className="text-[#d4af37] text-sm">&</div>
                      <div className="text-center">{MEMBERS.find(m => m.id === selectedMarriage.wifeId)?.name}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-5 rounded-2xl">
                      <p className="text-[9px] font-black text-[#8b7355] uppercase tracking-widest mb-1 text-center">Dato</p>
                      <p className="text-sm font-bold text-[#2d2416] text-center">{selectedMarriage.date || 'Ukendt'}</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-2xl">
                      <p className="text-[9px] font-black text-[#8b7355] uppercase tracking-widest mb-1 text-center">Sted</p>
                      <p className="text-sm font-bold text-[#2d2416] text-center truncate" title={selectedMarriage.location}>{selectedMarriage.location || 'Ikke angivet'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-3">
        <div className="bg-[#2d2416]/90 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-2xl border border-white/10">
            Navigér ved at trække & zoome • Tryk på navne for arkiv
        </div>
      </footer>
    </div>
  );
};

export default App;
