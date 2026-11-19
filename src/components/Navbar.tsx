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
    1: '1. Identification',
    2: '2. Gender Investigation',
    3: '3. AI Verdict',
    4: '4. Agility Test',
    5: '5. Grand Finale 🏆',
  };

  return (
    <header className="relative z-30 w-full px-4 py-3 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Creators */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-extrabold text-lg">
            ♂️
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm tracking-wide text-white">MEN'S DAY 2026</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Nov 19
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              Crafted by{' '}
              <button
                onClick={() => setShowSettings(true)}
                className="text-indigo-400 hover:text-indigo-300 underline font-semibold transition-colors"
                title="Click to customize creator name"
              >
                {creatorName}
              </button>{' '}
              &amp; <span className="text-purple-400 font-semibold">don</span>
            </p>
          </div>
        </div>

        {/* Current Stage Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin-slow" />
          <span>Stage:</span>
          <span className="font-bold text-white bg-indigo-500/30 px-2 py-0.5 rounded-full border border-indigo-500/30">
            {stepLabels[currentStep] || 'Verification Protocol'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl transition-all border ${
              muted
                ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                : 'bg-indigo-600/30 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/50 shadow-sm shadow-indigo-500/20'
            }`}
            title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Settings / Mode Switcher */}
          <button
            onClick={() => {
              playClick();
              setShowSettings(!showSettings);
            }}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
            title="Prank Settings & Storyline Switcher"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Reset button */}
          <button
            onClick={() => {
              playClick();
              if (confirm('Start the prank verification over from the beginning?')) {
                onReset();
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            title="Reset verification process"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" />
                Prank Settings & Testing Mode
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Co-Creator Name (Along with don):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempCreator}
                    onChange={(e) => setTempCreator(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. dwarf"
                  />
                  <button
                    onClick={() => {
                      onUpdateCreatorName(tempCreator || 'dwarf');
                      playClick();
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  AI Verdict Simulation Mode:
                </label>
                <p className="text-xs text-slate-400 mb-2">
                  Easily preview both hilarious branches (Page 3A vs Page 3B):
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onSetTestModeGender('auto');
                      playClick();
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      testModeGender === 'auto'
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    🤖 Auto (Answers)
                  </button>
                  <button
                    onClick={() => {
                      onSetTestModeGender('woman');
                      playClick();
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      testModeGender === 'woman'
                        ? 'bg-pink-600 border-pink-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    👑 Force Princess (3A)
                  </button>
                  <button
                    onClick={() => {
                      onSetTestModeGender('man');
                      playClick();
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      testModeGender === 'man'
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    😎 Force Bro (3B)
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-xs text-slate-400">
                <p>💡 Tip: You can test the Princess Rejection screen and jump back anytime!</p>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors mt-2"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
