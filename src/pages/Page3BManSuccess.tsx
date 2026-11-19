import React, { useEffect } from 'react';
import { PartyPopper, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { playSuccessDing, playClick } from '../utils/audio';

interface Page3BManSuccessProps {
  userName: string;
  confidenceScore: string;
  onProceedToAgilityTest: () => void;
}

export const Page3BManSuccess: React.FC<Page3BManSuccessProps> = ({
  userName,
  confidenceScore,
  onProceedToAgilityTest,
}) => {
  useEffect(() => {
    playSuccessDing();
  }, []);

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Top Cartoon Badge */}
      <div className="cartoon-sticker px-4 py-2 bg-emerald-400 text-black text-xs font-black uppercase mb-6 shadow-[4px_4px_0px_#000] transform rotate-1">
        <ShieldCheck className="w-5 h-5 text-black stroke-[3]" />
        <span>PRELIMINARY TEST PASSED // CONFIDENCE {confidenceScore} ✅</span>
      </div>

      {/* Main Cartoon Card */}
      <div className="w-full cartoon-card p-8 sm:p-10 text-center relative overflow-hidden shadow-[8px_8px_0px_#000]">
        {/* Big Celebration Icon */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-yellow-300 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] transform hover:rotate-12 transition-transform duration-200 animate-jelly">
            <PartyPopper className="w-11 h-11 text-black stroke-[2.5]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-2 uppercase drop-shadow-[2px_2px_0px_#fde047]">
          CONGRATULATIONS! <span className="inline-block animate-wiggle">🎉</span>
        </h1>

        <p className="text-lg sm:text-xl font-black text-indigo-950 mb-6">
          Your first verification is complete, <span className="bg-cyan-300 px-2 py-0.5 rounded-lg border-2 border-black text-black">{userName}</span>!
        </p>

        {/* Dramatic Suspense Box */}
        <div className="p-5 rounded-2xl bg-amber-200 border-3 border-black mb-8 shadow-[5px_5px_0px_#000] transform -rotate-1">
          <div className="flex items-center justify-center gap-2 text-rose-600 font-black text-sm uppercase tracking-wider mb-1">
            <AlertTriangle className="w-5 h-5 text-rose-600 stroke-[3]" />
            WAIT A SECOND...
          </div>
          <p className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase">
            THERE IS ONE LAST THING WE NEED TO VERIFY. 👀
          </p>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={() => {
            playClick();
            onProceedToAgilityTest();
          }}
          className="cartoon-btn w-full py-4 sm:py-5 px-8 bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 text-white font-black text-xl tracking-wider uppercase shadow-[6px_6px_0px_#000] border-4 border-black flex items-center justify-center gap-3"
        >
          <span>FACE THE FINAL TEST</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
