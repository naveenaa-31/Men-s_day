import React, { useState } from 'react';
import { Flame, User } from 'lucide-react';
import { playSuccessDing } from '../utils/audio';

interface Page1NameEntryProps {
  onNameSubmitted: (name: string) => void;
  creatorName: string;
}

export const Page1NameEntry: React.FC<Page1NameEntryProps> = ({ onNameSubmitted, creatorName }) => {
  const [inputName, setInputName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) {
      setErrorMsg('⚠️ WHOA THERE! Type your actual name or bro nickname!');
      return;
    }
    if (trimmed.length < 2) {
      setErrorMsg('⚠️ Too short! Even a baby babble is longer than that!');
      return;
    }
    setErrorMsg('');
    playSuccessDing();
    onNameSubmitted(trimmed);
  };

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Cartoon Top Badge */}
      <div className="cartoon-sticker px-4 py-2 bg-yellow-300 text-black text-xs font-black uppercase mb-6 shadow-[4px_4px_0px_#000] -rotate-2 hover:rotate-2 transition-transform">
        <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
        <span>TOP SECRET BRO CHECKPOINT #001 🔒</span>
      </div>

      {/* Main Cartoon Card */}
      <div className="w-full cartoon-card p-5 sm:p-10 text-center relative overflow-visible transform rotate-0 hover:-rotate-0.5 transition-transform">
        {/* Cartoon Corner Stickers */}
        <div className="absolute -top-4 -right-3 px-3 py-1 bg-pink-400 text-black font-black text-xs rounded-xl border-3 border-black shadow-[3px_3px_0px_#000] transform rotate-12 animate-wiggle">
          BOOM! 💥
        </div>
        <div className="absolute -bottom-4 -left-3 px-3 py-1 bg-cyan-300 text-black font-black text-xs rounded-xl border-3 border-black shadow-[3px_3px_0px_#000] transform -rotate-12">
          CONFIDENTIAL 🕵️
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2 uppercase drop-shadow-[2px_2px_0px_#fff]">
          WAIT... WHO ARE YOU? <span className="inline-block animate-wiggle">👀</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-700 font-extrabold mb-8 max-w-md mx-auto leading-snug">
          Before we celebrate you, we need to verify your identity!
        </p>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="flex items-center bg-amber-50 rounded-2xl border-4 border-black px-4 py-3 sm:py-4 shadow-[5px_5px_0px_#000] focus-within:bg-white focus-within:shadow-[6px_6px_0px_#6366f1] transition-all">
              <User className="w-7 h-7 text-indigo-600 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={inputName}
                onChange={(e) => {
                  setInputName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter your name here..."
                maxLength={30}
                className="w-full bg-transparent text-slate-900 text-xl sm:text-2xl font-black placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              {inputName && (
                <button
                  type="button"
                  onClick={() => setInputName('')}
                  className="cartoon-btn text-xs bg-rose-400 text-black px-3 py-1 rounded-xl"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-sm font-black text-rose-950 bg-rose-300 border-3 border-black rounded-2xl px-4 py-2.5 shadow-[4px_4px_0px_#000] animate-wiggle">
              {errorMsg}
            </p>
          )}

          {/* Tactile Big Cartoon Arcade Button */}
          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cartoon-btn w-full py-4 sm:py-5 px-8 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xl sm:text-2xl tracking-wider uppercase flex items-center justify-center gap-3 shadow-[6px_6px_0px_#000] border-4 border-black"
          >
            <span>LET'S GO</span>
            <span className={`text-3xl transition-transform duration-200 ${isHovered ? 'translate-x-2 -translate-y-1 scale-125' : ''}`}>
              🚀
            </span>
          </button>
        </form>
      </div>

      {/* Footer Creator Note */}
      <div className="mt-8 text-center text-xs font-black text-white bg-black/60 px-4 py-2 rounded-2xl border-2 border-white/20 shadow-md">
        Initiated by <strong className="text-yellow-300 uppercase">{creatorName}</strong> &amp; <strong className="text-pink-300 uppercase">don</strong> for International Men's Day 2026.
      </div>
    </div>
  );
};
