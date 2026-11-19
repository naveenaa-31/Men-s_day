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
  const [isFrozen, setIsFrozen] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [currentTaunt, setCurrentTaunt] = useState('Try clicking the cool sunglasses button if you dare!');
  const [showHonestModal, setShowHonestModal] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

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

    const now = Date.now();
    if (now - lastDodgeTimeRef.current < 280) return;
    lastDodgeTimeRef.current = now;

    playBoing();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 300);

    setDodgeCount((prev) => {
      const next = prev + 1;
      if (next >= 25) {
        setIsFrozen(true);
      }
      const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
      setCurrentTaunt(randomTaunt);
      return next;
    });

    if (!arenaRef.current) return;

    let newLeftPercent: number;
    let newTopPercent: number;

    if (cursorClientX !== undefined && cursorClientY !== undefined && buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const deltaX = btnCenterX - cursorClientX;
      const deltaY = btnCenterY - cursorClientY;

      if (deltaX >= 0) {
        newLeftPercent = 55 + Math.random() * 25;
      } else {
        newLeftPercent = 15 + Math.random() * 25;
      }

      if (deltaY >= 0) {
        newTopPercent = 65 + Math.random() * 18;
      } else {
        newTopPercent = 40 + Math.random() * 18;
      }
    } else {
      newLeftPercent = 15 + Math.random() * 65;
      newTopPercent = 40 + Math.random() * 42;
    }

    setCoords({
      leftPercent: Math.max(15, Math.min(85, newLeftPercent)),
      topPercent: Math.max(40, Math.min(85, newTopPercent)),
    });
  }, [isFrozen, taunts]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isFrozen || !buttonRef.current) return;

    const btnRect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    if (distance < 90) {
      dodge(e.clientX, e.clientY);
    }
  };

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
      {/* Top Cartoon Badge */}
      <div className="cartoon-sticker px-4 py-2 bg-purple-400 text-black text-xs font-black uppercase mb-4 shadow-[4px_4px_0px_#000] transform -rotate-1">
        <ShieldCheck className="w-5 h-5 text-black stroke-[3]" />
        <span>STAGE 4: ULTIMATE AGILITY TEST ⚡</span>
      </div>

      {/* Main Cartoon Challenge Box */}
      <div className="w-full cartoon-card p-6 sm:p-9 text-center shadow-[8px_8px_0px_#000]">
        {/* Headings */}
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight mb-2 uppercase drop-shadow-[2px_2px_0px_#fde047]">
          ONE LAST QUESTION... <span className="inline-block animate-wiggle">👀</span>
        </h1>

        <p className="text-base sm:text-xl font-black text-indigo-950 mb-5">
          Prove that you're not gay, <span className="bg-yellow-300 px-2.5 py-0.5 rounded-lg border-2 border-black text-black">{userName}</span>!
        </p>

        {/* Live Status: Cartoon Scoreboard */}
        <div className="inline-flex items-center justify-center gap-2 bg-yellow-300 border-3 border-black rounded-2xl px-5 py-2 mb-4 shadow-[4px_4px_0px_#000] transform rotate-1">
          <Zap className="w-5 h-5 text-black stroke-[3] animate-bounce" />
          <span className="text-xs uppercase font-black text-black">
            TIMES DODGED: <strong className="text-pink-600 text-base font-black">{dodgeCount}</strong>
          </span>
        </div>

        {/* Live Comic Speech Bubble */}
        <div className="h-12 mb-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-white border-3 border-black text-xs sm:text-sm font-black text-black shadow-[4px_4px_0px_#000] animate-bounce-slow">
            <span>🗣️</span>
            <span>{isFrozen ? "Okay okay! We believe you! 😂 Click it now!" : currentTaunt}</span>
          </div>
        </div>

        {/* Interactive Dodge Arena */}
        <div
          ref={arenaRef}
          onTouchMove={handleTouch}
          className="relative w-full h-80 sm:h-96 rounded-3xl bg-cyan-100 border-4 border-black overflow-hidden p-4 shadow-[6px_6px_0px_#000] select-none"
        >
          {/* Subtle Cartoon Polka Dots Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#0284c7_2px,transparent_2px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          {/* Static Normal Button: YES, I AM GAY */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-xs">
            <button
              type="button"
              onClick={handleGayClick}
              className="cartoon-btn w-full py-3.5 px-6 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 text-black font-black text-base uppercase shadow-[5px_5px_0px_#000] border-3 border-black flex items-center justify-center gap-2"
            >
              <span>YES, I AM GAY</span>
              <span className="text-2xl">🏳️‍🌈</span>
            </button>
            <p className="text-[11px] font-black text-slate-800 text-center mt-1 uppercase">
              (Honest, direct &amp; 100% valid choice)
            </p>
          </div>

          {/* Elusive Dodging Button: NO, I AM NOT GAY */}
          <div
            className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 ${
              isJumping ? 'scale-110 rotate-6' : ''
            }`}
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
              className={`cartoon-btn py-3.5 px-7 sm:px-9 font-black text-base uppercase shadow-[6px_6px_0px_#000] border-4 border-black whitespace-nowrap cursor-pointer select-none flex items-center justify-center gap-2 ${
                isFrozen
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-black animate-bounce shadow-[6px_6px_0px_#000] scale-110'
                  : 'bg-yellow-300 hover:bg-yellow-200 text-black'
              }`}
            >
              <span>NO, I AM NOT GAY</span>
              <span className="text-2xl">{isFrozen ? '🤝' : '😎'}</span>
            </button>
          </div>

          {/* Arena Watermark */}
          <div className="absolute bottom-2 inset-x-0 text-center text-[11px] text-slate-800 font-black uppercase tracking-widest pointer-events-none">
            {isFrozen ? '🎯 TARGET CAPTURED & CALMED DOWN' : '⚡ REPULSION ENGINE: ACTIVE 💨'}
          </div>
        </div>

        {/* Frozen Success Message (Only appears when frozen) */}
        {isFrozen && (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-200 border-3 border-black text-center shadow-[5px_5px_0px_#000] animate-jelly">
            <h4 className="text-xl font-black text-black flex items-center justify-center gap-2 mb-1 uppercase">
              <Smile className="w-6 h-6 text-black stroke-[3]" />
              Okay okay! We believe you! 😂
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 font-bold mb-3">
              The repulsion field has dissipated! Click the bouncy green button above to claim your victory!
            </p>
            <button
              onClick={handleFrozenNoGayClick}
              className="cartoon-btn py-3 px-8 bg-black text-emerald-300 hover:bg-slate-900 font-black text-sm uppercase shadow-[4px_4px_0px_#000]"
            >
              Proceed to Grand Finale 🚀
            </button>
          </div>
        )}

        {/* Footer info */}
        <p className="mt-5 text-xs text-slate-700 font-black text-center max-w-lg mx-auto uppercase">
          Both answers grant full Men's Day celebration access. We celebrate every bro! ❤️
        </p>
      </div>

      {/* Funny Modal for Option 1: "YES, I AM GAY" */}
      {showHonestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-yellow-300 border-4 border-black rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[10px_10px_0px_#000] text-center relative overflow-hidden font-['Fredoka',sans-serif]">
            <div className="w-16 h-16 rounded-2xl bg-pink-400 border-3 border-black flex items-center justify-center mx-auto mb-4 text-3xl shadow-[4px_4px_0px_#000] transform -rotate-6">
              🌈
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-black mb-2 uppercase">
              Well, thanks for your honesty! 😂
            </h3>
            <p className="text-lg font-black text-indigo-950 mb-3">
              Your Men's Day eligibility is 100% valid!
            </p>
            <p className="text-sm font-bold text-slate-800 mb-6 bg-white p-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
              No dodging, no games, pure authenticity. A true legend among men!
            </p>
            <button
              type="button"
              onClick={() => {
                playSuccessDing();
                setShowHonestModal(false);
                onVerificationComplete('honest');
              }}
              className="cartoon-btn w-full py-4 px-6 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-base uppercase shadow-[5px_5px_0px_#000] flex items-center justify-center gap-2"
            >
              <span>CLAIM YOUR MEN'S DAY REWARD! 🏆</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
