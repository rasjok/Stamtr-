
import React from 'react';
import { FamilyMember } from '../types';

interface LandingPageProps {
  onSelectFullTree: () => void;
  onSelectBranch: (rootId: string) => void;
  branches: FamilyMember[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectFullTree, onSelectBranch, branches }) => {
  return (
    <div className="fixed inset-0 w-full bg-[#f5f1e8] overflow-y-auto">
      <div className="min-h-full w-full flex flex-col items-center p-8">
        <div className="max-w-5xl w-full flex flex-col items-center text-center space-y-12 py-12 md:py-24">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold serif text-[#2d2416] tracking-tight">Slægten Christensen</h1>
            <p className="text-xl md:text-2xl text-[#8b7355] italic font-medium serif border-t border-b border-[#d4c5b0] py-4 px-8 inline-block">
              En rejse gennem generationer fra Binderup
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <button 
              onClick={onSelectFullTree}
              className="w-full group relative bg-white/80 backdrop-blur-sm border-2 border-[#d4af37] p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex w-20 h-20 bg-[#f5f1e8] rounded-full items-center justify-center text-4xl group-hover:scale-110 transition-transform">🌳</div>
              <h2 className="text-4xl font-bold serif text-[#2d2416] mb-3">Det Fulde Stamtræ</h2>
              <p className="text-base text-[#8b7355] font-medium leading-relaxed">
                Udforsk hele slægten fra Helga og Martin frem til i dag
              </p>
            </button>
          </div>

          <div className="w-full space-y-8 pt-8">
            <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-[#d4c5b0]"></div>
              <h3 className="text-sm font-black text-[#8b7355] uppercase tracking-[0.4em]">Udforsk Grene</h3>
              <div className="h-px flex-1 bg-[#d4c5b0]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {branches.map((member) => (
                <button
                  key={member.id}
                  onClick={() => onSelectBranch(member.id)}
                  className="flex flex-col items-center p-6 rounded-[2.5rem] bg-white/50 border border-[#d4c5b0]/50 hover:bg-white hover:border-[#d4af37] hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#fdfdfd] border-2 border-[#d4c5b0] mb-4 flex items-center justify-center text-xl group-hover:border-[#d4af37] transition-colors">
                    🌿
                  </div>
                  <span className="text-sm font-bold text-[#2d2416] serif leading-tight px-2">
                    {member.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-[#8b7355] font-bold uppercase tracking-widest pt-12 border-t border-[#d4c5b0] w-full max-w-md opacity-40">
             Digitalt Slægtsarkiv • Binderup • {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
