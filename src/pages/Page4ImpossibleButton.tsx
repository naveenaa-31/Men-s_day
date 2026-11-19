import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldCheck, Zap, Smile } from 'lucide-react';
import { playBoing, playSuccessDing } from '../utils/audio';

interface Page4ImpossibleButtonProps {
  userName: string;
  onVerificationComplete: (userChoice: 'honest' | 'dodger') => void;
}

export const Page4ImpossibleButton: React.FC<Page4ImpossibleButtonProps> = ({
  userName,
  onVerificationComplete,
}) => {
  // Timer state - 40 seconds duration before freezing as requested (30-60s)
  const [isFrozen, setIsFrozen] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [currentTaunt, setCurrentTaunt] = useState('Try clicking the cool sunglasses button if you dare!');
  const [showHonestModal, setShowHonestModal] = useState(false);

  // Position within the arena (percentages: left 15%..80%, top 40%..85%)
  const [coords, setCoords] = useState<{ leftPercent: number; topPercent: number }>({
    leftPercent: 50,
    topPercent: 65,
  });

  const arenaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastDodgeTimeRef = useRef<number>(0);

  const taunts = [
    "Too slow, bro! 🐢",
    "Nice try, but my dodge engine is 120 FPS! ⚡",
    "Reflexes of a sleepy sloth! 🦥",
    "Bro, are you using a trackball from 1998? 🖱️",
    "Catch me if you can! 💨",
    "Gym biceps: 100%, Finger speed: 0% 😂",
    "Almost had it... NOT! 🤣",
    "Why not just click the rainbow button? It's right there! 🏳️‍🌈",
    "Matrix dodge initiated! 🕶️",
    "Bro missed by a mile! 🚀"
  ];

  // Freeze after 40 seconds of actual play
  useEffect(() => {
    const freezeTimer = setTimeout(() => {
      setIsFrozen(true);
    }, 40000);

    return () => clearTimeout(freezeTimer);
  }, []);

  // Jump function to dodge away from cursor / touch
  const dodge = useCallback((cursorClientX?: number, cursorClientY?: number) => {
    if (isFrozen) return;

    // Throttle dodges so mousemove doesn't fire 50 times in 100ms
    const now = Date.now();
    if (now - lastDodgeTimeRef.current < 280) return;
    lastDodgeTimeRef.current = now;

    playBoing();

    setDodgeCount((prev) => {
      const next = prev + 1;
      // Freeze after 25 genuine attempts if they try really hard
      if (next >= 25) {
        setIsFrozen(true);
      }
      const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
      setCurrentTaunt(randomTaunt);
      return next;
    });

    if (!arenaRef.current) return;

    // Available landing zone:
    // left: 15% to 85%
    // top: 38% to 85% (keeping top 0-35% free for the rainbow button)
    let newLeftPercent: number;
    let newTopPercent: number;

    if (cursorClientX !== undefined && cursorClientY !== undefined && buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      // Vector from cursor to button
      const deltaX = btnCenterX - cursorClientX;
      const deltaY = btnCenterY - cursorClientY;

      // If mouse is to the left, jump towards the right; if mouse is to the right, jump left
      if (deltaX >= 0) {
        // Move towards right side
        newLeftPercent = 55 + Math.random() * 25; // 55% - 80%
      } else {
        // Move towards left side
        newLeftPercent = 15 + Math.random() * 25; // 15% - 40%
      }

      // If mouse is above, jump downwards; if mouse is below, jump upwards
      if (deltaY >= 0) {
        newTopPercent = 65 + Math.random() * 18; // 65% - 83%
      } else {
        newTopPercent = 40 + Math.random() * 18; // 40% - 58%
      }
    } else {
      // Random far jump
      newLeftPercent = 15 + Math.random() * 65;
      newTopPercent = 40 + Math.random() * 42;
    }

    setCoords({
      leftPercent: Math.max(15, Math.min(85, newLeftPercent)),
      topPercent: Math.max(40, Math.min(85, newTopPercent)),
    });
  }, [isFrozen, taunts]);

  // Proximity detection for desktop cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isFrozen || !buttonRef.current) return;

    const btnRect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    // If mouse gets within 90 pixels of button center, dodge away!
    if (distance < 90) {
      dodge(e.clientX, e.clientY);
    }
  };

  // Touch handlers for mobile
  const handleTouch = (e: React.TouchEvent) => {
    if (isFrozen) return;
    const touch = e.touches[0];
    if (touch) {
      dodge(touch.clientX, touch.clientY);
    } else {
      dodge();
    }
  };

  const handleGayClick = () => {
    playSuccessDing();
    setShowHonestModal(true);
  };

  const handleFrozenNoGayClick = () => {
    playSuccessDing();
    onVerificationComplete('dodger');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative z-10 w-full max-w-2xl mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[75vh]"
    >
      {/* Top Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-purple-500/10">
        <ShieldCheck className="w-4 h-4 text-purple-400" />
        FINAL REFLEX VERIFICATION PROTOCOL
      </div>

      {/* Main Glass Challenge Box */}
      <div className="w-full glass-card-glow rounded-3xl p-6 sm:p-9 shadow-2xl relative border border-indigo-500/30 text-center">
        {/* Headings */}
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
          ONE LAST QUESTION... <span className="inline-block animate-wiggle">👀</span>
        </h1>

        <p className="text-base sm:text-lg text-indigo-200 font-semibold mb-5">
          Prove that you're not gay, <span className="text-yellow-400">{userName}</span>.
        </p>

        {/* Live Status: Dodge count */}
        <div className="flex items-center justify-center gap-3 bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-2 mb-4 max-w-xs mx-auto">
          <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
          <span className="text-xs text-slate-300 font-semibold">
            Dodges: <strong className="text-yellow-400 text-sm font-black">{dodgeCount}</strong>
          </span>
        </div>

        {/* Live Taunt speech bubble */}
        <div className="h-10 mb-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-xs sm:text-sm text-yellow-300 font-bold animate-pulse shadow-md">
            <span>🗣️</span>
            <span>{isFrozen ? "Okay okay! We believe you! 😂 Click it now!" : currentTaunt}</span>
          </div>
        </div>

        {/* Interactive Dodge Arena */}
        <div
          ref={arenaRef}
          onTouchMove={handleTouch}
          className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-950/80 border-2 border-dashed border-indigo-500/30 overflow-hidden p-4 shadow-inner select-none"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

          {/* Static Normal Button: YES, I AM GAY */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-xs">
            <button
              type="button"
              onClick={handleGayClick}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white font-black text-sm sm:text-base shadow-lg shadow-purple-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-white/20"
            >
              <span>YES, I AM GAY</span>
              <span className="text-xl">🏳️‍🌈</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-1">
              (Honest, direct &amp; 100% valid choice)
            </p>
          </div>

          {/* Elusive Dodging Button: NO, I AM NOT GAY */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
            style={{
              left: `${coords.leftPercent}%`,
              top: `${coords.topPercent}%`,
              transition: isFrozen
                ? 'all 0.5s ease-in-out'
                : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <button
              ref={buttonRef}
              type="button"
              onMouseEnter={(e) => dodge(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (!isFrozen) {
                  e.preventDefault();
                  const touch = e.touches[0];
                  dodge(touch ? touch.clientX : undefined, touch ? touch.clientY : undefined);
                }
              }}
              onClick={() => {
                if (isFrozen) {
                  handleFrozenNoGayClick();
                } else {
                  dodge();
                }
              }}
              className={`py-3.5 px-6 sm:px-8 rounded-2xl font-black text-sm sm:text-base shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 border whitespace-nowrap cursor-pointer select-none ${
                isFrozen
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white border-emerald-300 animate-bounce shadow-emerald-500/50 ring-4 ring-emerald-400/50 scale-105'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white border-cyan-300 shadow-indigo-500/50 active:scale-90 hover:scale-105'
              }`}
            >
              <span>NO, I AM NOT GAY</span>
              <span className="text-xl">{isFrozen ? '🤝' : '😎'}</span>
            </button>
          </div>

          {/* Arena Watermark */}
          <div className="absolute bottom-2 inset-x-0 text-center text-[10px] text-slate-600 font-mono uppercase tracking-widest pointer-events-none">
            {isFrozen ? 'STATUS: TARGET CAPTURED & PACIFIED' : 'ACTIVE REPULSION FIELD: 100%'}
          </div>
        </div>

        {/* Frozen Success Message (Only appears when frozen) */}
        {isFrozen && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center animate-fadeIn">
            <h4 className="text-base sm:text-lg font-black text-emerald-300 flex items-center justify-center gap-2 mb-1">
              <Smile className="w-5 h-5 text-emerald-400" />
              Okay okay! We believe you! 😂
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mb-3">
              The repulsion field has dissipated. Click the glowing green button above to claim your crown!
            </p>
            <button
              onClick={handleFrozenNoGayClick}
              className="py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              Proceed to Grand Men's Day Finale 🚀
            </button>
          </div>
        )}

        {/* Footer info */}
        <p className="mt-5 text-[11px] text-slate-400 text-center max-w-lg mx-auto">
          Both answers grant full Men's Day celebration access. We celebrate every bro regardless of orientation! ❤️
        </p>
      </div>

      {/* Funny Modal for Option 1: "YES, I AM GAY" */}
      {showHonestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
              🌈
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Well, thanks for your honesty! 😂
            </h3>
            <p className="text-lg font-bold text-indigo-300 mb-3">
              Your Men's Day eligibility is 100% valid!
            </p>
            <p className="text-sm text-slate-300 mb-6 bg-slate-800/80 p-3 rounded-xl border border-white/10">
              No dodging, no games, pure authenticity. A true legend among men!
            </p>
            <button
              type="button"
              onClick={() => {
                playSuccessDing();
                setShowHonestModal(false);
                onVerificationComplete('honest');
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-base shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>CLAIM YOUR MEN'S DAY REWARD! 🏆</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
