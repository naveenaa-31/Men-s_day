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
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        PRELIMINARY TEST PASSED // CONFIDENCE {confidenceScore}
      </div>

      {/* Main Glass Card */}
      <div className="w-full glass-card-glow rounded-3xl p-8 sm:p-10 shadow-2xl relative border border-indigo-500/40 text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />

        {/* Big Celebration Icon */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-emerald-500/30 border border-white/30 transform hover:scale-105 transition-transform duration-300">
            <PartyPopper className="w-10 h-10 text-white animate-bounce-slow" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          CONGRATULATIONS! <span className="inline-block animate-wiggle">🎉</span>
        </h1>

        <p className="text-lg sm:text-xl font-bold text-indigo-200 mb-6">
          Your first verification is complete, <span className="text-yellow-400">{userName}</span>.
        </p>

        {/* Dramatic Suspense Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-8 animate-pulse-fast">
          <div className="flex items-center justify-center gap-2 text-amber-300 font-extrabold text-sm uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            But wait...
          </div>
          <p className="text-lg sm:text-xl font-black text-white tracking-tight">
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
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:to-pink-500 text-white font-extrabold text-lg shadow-xl shadow-indigo-500/30 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 pulse-glow"
        >
          <span>FACE THE FINAL TEST</span>
          <ArrowRight className="w-5 h-5 animate-pulse" />
        </button>
      </div>
    </div>
  );
};
