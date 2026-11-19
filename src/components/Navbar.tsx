import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, RefreshCw, Settings } from 'lucide-react';
import { isSoundEnabled, toggleSound, playClick } from '../utils/audio';

interface NavbarProps {
  currentStep: number;
  onReset: () => void;
  creatorName: string;
  onUpdateCreatorName: (name: string) => void;
  testModeGender: 'auto' | 'man' | 'woman';
  onSetTestModeGender: (gender: 'auto' | 'man' | 'woman') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onReset,
  creatorName,
  onUpdateCreatorName,
  testModeGender,
  onSetTestModeGender,
}) => {
  const [muted, setMuted] = useState(!isSoundEnabled());
  const [showSettings, setShowSettings] = useState(false);
  const [tempCreator, setTempCreator] = useState(creatorName);

  const handleToggleSound = () => {
    const enabled = toggleSound();
    setMuted(!enabled);
    if (enabled) playClick();
  };

  const stepLabels: { [key: number]: string } = {
    1: 'Stage 1: Identification 🕵️',
    2: 'Stage 2: Interrogation 🧠',
    3: 'Stage 3: AI Verdict ⚖️',
    4: 'Stage 4: Dodge Challenge ⚡',
    5: 'Stage 5: Grand Finale 🏆',
  };

  return (
    <header className="relative z-30 w-full px-4 py-3 bg-yellow-400 border-b-4 border-black shadow-[0_4px_0_#000]">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Creators */}
        <div className="flex items-center space-x-2.5">
          <div className="w-11 h-11 rounded-2xl bg-cyan-400 border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] text-black font-black text-2xl transform -rotate-3 hover:rotate-6 transition-transform">
            ♂️
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-base tracking-wide text-black uppercase">
                MEN'S DAY 2026
              </span>
              <span className="text-[11px] uppercase font-black px-2 py-0.5 rounded-full bg-pink-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                NOV 19 🔥
              </span>
            </div>
            <p className="text-xs text-slate-900 font-extrabold flex items-center gap-1">
              By{' '}
              <button
                onClick={() => setShowSettings(true)}
                className="text-indigo-900 hover:text-indigo-700 underline font-black transition-colors"
                title="Click to customize creator name"
              >
                {creatorName}
              </button>{' '}
              &amp; <span className="text-purple-900 font-black">don</span>
            </p>
          </div>
        </div>

        {/* Current Stage Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-white border-3 border-black px-4 py-1.5 rounded-2xl text-xs font-black text-black shadow-[3px_3px_0px_#000] transform rotate-1">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
          <span>MISSION:</span>
          <span className="bg-cyan-300 px-2.5 py-0.5 rounded-xl border-2 border-black">
            {stepLabels[currentStep] || 'Verification Protocol'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2.5 rounded-2xl transition-all border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none font-black ${
              muted
                ? 'bg-slate-200 text-slate-600'
                : 'bg-emerald-400 text-black animate-pulse'
            }`}
            title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Settings / Mode Switcher */}
          <button
            onClick={() => {
              playClick();
              setShowSettings(!showSettings);
            }}
            className="p-2.5 rounded-2xl bg-white border-3 border-black text-black shadow-[3px_3px_0px_#000] hover:bg-slate-100 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            title="Prank Settings & Storyline Switcher"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Reset button */}
          <button
            onClick={() => {
              playClick();
              if (confirm('Restart the prank from beginning?')) {
                onReset();
              }
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-pink-400 border-3 border-black text-xs font-black text-black shadow-[3px_3px_0px_#000] hover:bg-pink-300 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            title="Reset verification process"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">RESTART</span>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-yellow-300 border-4 border-black rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[10px_10px_0px_#000] relative text-black font-['Fredoka',sans-serif]">
            <div className="flex items-center justify-between pb-3 border-b-3 border-black mb-4">
              <h3 className="text-xl font-black text-black flex items-center gap-2">
                <Settings className="w-6 h-6 text-black" />
                PRANK SECRET CONTROLS 🕹️
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="w-9 h-9 rounded-xl bg-rose-400 border-2 border-black flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#000] hover:bg-rose-300 active:translate-x-0.5 active:translate-y-0.5"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm font-bold">
              <div>
                <label className="block text-xs uppercase font-black text-black mb-1">
                  Creator Name (Along with don):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempCreator}
                    onChange={(e) => setTempCreator(e.target.value)}
                    className="flex-1 bg-white border-3 border-black rounded-xl px-3 py-2 text-black text-sm font-black focus:outline-none shadow-[2px_2px_0px_#000]"
                    placeholder="e.g. dwarf"
                  />
                  <button
                    onClick={() => {
                      onUpdateCreatorName(tempCreator || 'dwarf');
                      playClick();
                    }}
                    className="cartoon-btn px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-black text-xs uppercase"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-black text-black mb-1">
                  Force Storyline Outcome:
                </label>
                <p className="text-xs text-slate-800 mb-2 font-medium">
                  Test the Princess Rejection screen or the Bro Agility flow:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onSetTestModeGender('auto');
                      playClick();
                    }}
                    className={`cartoon-btn py-2 px-1 text-xs uppercase ${
                      testModeGender === 'auto'
                        ? 'bg-cyan-400 text-black'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    🤖 Auto
                  </button>
                  <button
                    onClick={() => {
                      onSetTestModeGender('woman');
                      playClick();
                    }}
                    className={`cartoon-btn py-2 px-1 text-xs uppercase ${
                      testModeGender === 'woman'
                        ? 'bg-pink-400 text-black'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    👑 Princess (3A)
                  </button>
                  <button
                    onClick={() => {
                      onSetTestModeGender('man');
                      playClick();
                    }}
                    className={`cartoon-btn py-2 px-1 text-xs uppercase ${
                      testModeGender === 'man'
                        ? 'bg-emerald-400 text-black'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    😎 Bro (3B)
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="cartoon-btn w-full py-3 bg-black text-yellow-300 hover:bg-slate-900 text-sm uppercase mt-4"
              >
                Close Controls 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
