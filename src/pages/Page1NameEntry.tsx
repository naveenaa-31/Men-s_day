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
      setErrorMsg('⚠️ Whoa there! An anonymous bro cannot be verified. Type something!');
      return;
    }
    if (trimmed.length < 2) {
      setErrorMsg('⚠️ That name is too short! Even Elon Musk\'s kid has a longer name.');
      return;
    }
    setErrorMsg('');
    playSuccessDing();
    onNameSubmitted(trimmed);
  };

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Top Floating Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6 animate-bounce-slow shadow-lg shadow-indigo-500/10">
        <Flame className="w-4 h-4 text-orange-400" />
        Official Security Checkpoint #001
      </div>

      {/* Main Glass Card */}
      <div className="w-full glass-card-glow rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden text-center border border-indigo-500/30">
        {/* Decorative corner glows */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          WAIT... WHO ARE YOU? <span className="inline-block animate-wiggle">👀</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 font-medium mb-8 max-w-md mx-auto leading-relaxed">
          Before we celebrate you, we need to verify your identity.
        </p>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-50 group-hover:opacity-80 transition duration-500 group-focus-within:opacity-100" />
            <div className="relative flex items-center bg-slate-900/90 rounded-2xl border border-white/20 px-4 py-3 sm:py-4 shadow-inner">
              <User className="w-6 h-6 text-indigo-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={inputName}
                onChange={(e) => {
                  setInputName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter your name here..."
                maxLength={30}
                className="w-full bg-transparent text-white text-lg sm:text-xl font-bold placeholder-slate-500 focus:outline-none"
                autoFocus
              />
              {inputName && (
                <button
                  type="button"
                  onClick={() => setInputName('')}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-2 animate-wiggle">
              {errorMsg}
            </p>
          )}

          {/* Action Button */}
          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full relative group overflow-hidden rounded-2xl p-0.5 font-black text-lg transition-all duration-300 transform active:scale-95 pulse-glow"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl" />
            <span className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl text-white font-extrabold tracking-wider transition-all duration-300 shadow-xl">
              <span>LET'S GO</span>
              <span className={`text-2xl transition-transform duration-300 ${isHovered ? 'translate-x-1.5' : ''}`}>
                🚀
              </span>
            </span>
          </button>
        </form>
      </div>

      {/* Footer Creator Note */}
      <div className="mt-6 text-center text-xs text-slate-400">
        Initiated by <strong className="text-white">{creatorName}</strong> &amp; <strong className="text-white">don</strong> for International Men's Day 2026.
      </div>
    </div>
  );
};
