import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Heart, XCircle, ArrowRight, RotateCcw, Wand2, Flower2 } from 'lucide-react';
import { playErrorBuzzer, playPrincessSparkle, playClick } from '../utils/audio';

interface Page3AWomanRejectionProps {
  userName: string;
  confidenceScore: string;
  onContinueAsBro: () => void;
  onReset: () => void;
}

export const Page3AWomanRejection: React.FC<Page3AWomanRejectionProps> = ({
  userName,
  confidenceScore,
  onContinueAsBro,
  onReset,
}) => {
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [lipGlossLevel, setLipGlossLevel] = useState(0);
  const [carriageDispatched, setCarriageDispatched] = useState(false);
  const [funnyPopups, setFunnyPopups] = useState<string[]>([
    "👑 ROYAL DECREE: Handbag contains 47 lip products and ZERO 10mm wrenches!",
    "💅 CRITICAL SLAY ALERT: Radiance quotient exceeds maximum permitted bro capacity!",
    "✨ DIAGNOSTIC: Zero beard cells found. 100% Strawberry Shortcake aura detected!",
    "🎀 EMOTIONAL INTELLIGENCE: Dangerously high! Server cooling fans are overheating!",
    "🌸 BIO-RADAR: Smells like French vanilla, rose water & main character energy!"
  ]);

  // Live countdown to Women's Day March 8, 2027
  const [timeLeft, setTimeLeft] = useState({
    days: 109,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    playErrorBuzzer();
    const timer1 = setTimeout(() => playPrincessSparkle(), 600);
    const timer2 = setTimeout(() => playPrincessSparkle(), 1400);

    // Pink glitter rain burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.3 },
      colors: ['#f472b6', '#ec4899', '#fbcfe8', '#fb7185', '#fbbf24'],
    });

    const countdownInterval = setInterval(() => {
      const targetDate = new Date('2027-03-08T00:00:00');
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(countdownInterval);
    };
  }, []);

  const triggerPinkGlitter = () => {
    playPrincessSparkle();
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#ec4899', '#f43f5e', '#ffd1dc', '#fef08a'],
    });
  };

  const handleApplyLipGloss = () => {
    playPrincessSparkle();
    setLipGlossLevel((prev) => prev + 1);
    triggerPinkGlitter();
  };

  const dismissPopup = (index: number) => {
    playClick();
    setFunnyPopups((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Princess Floating Ribbon Notifications */}
      <div className="w-full space-y-2 mb-4">
        {funnyPopups.map((popupText, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500/25 via-rose-500/20 to-purple-500/25 border border-pink-400/50 text-pink-100 text-xs font-bold shadow-lg backdrop-blur-md animate-bounce-slow"
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🎀</span>
              <span>{popupText}</span>
            </div>
            <button
              onClick={() => dismissPopup(index)}
              className="text-pink-300 hover:text-white p-1 rounded-full hover:bg-pink-500/30 transition-colors"
              title="Dismiss royal alert"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Dramatic Princess Palace Card */}
      <div className="w-full bg-gradient-to-b from-pink-950/90 via-purple-950/85 to-rose-950/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative border-2 border-pink-400/60 text-center overflow-hidden shadow-[0_0_60px_rgba(244,63,94,0.35)]">
        {/* Glamour Background Orbs */}
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-pink-500/40 rounded-full blur-3xl pointer-events-none animate-pulse-fast" />
        <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-rose-500/40 rounded-full blur-3xl pointer-events-none animate-pulse-fast" style={{ animationDelay: '1s' }} />

        {/* Royal Crest / Floating Tiara */}
        <div className="relative mx-auto w-28 h-28 mb-3 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-amber-300 opacity-40 blur-xl animate-ping" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-300 flex items-center justify-center shadow-2xl shadow-pink-500/60 border-2 border-white/60 transform hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer" onClick={triggerPinkGlitter}>
            <Crown className="w-14 h-14 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] animate-bounce-slow" />
          </div>
          <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-amber-200 animate-spin-slow" />
          <Heart className="absolute -bottom-2 -left-2 w-7 h-7 text-pink-300 fill-pink-300 animate-pulse" />
          <Wand2 className="absolute -top-1 -left-3 w-6 h-6 text-yellow-300 -rotate-45" />
        </div>

        {/* Royal Decree Banner */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/30 border border-pink-400/60 text-pink-200 font-black text-xs sm:text-sm uppercase tracking-widest mb-4 shadow-lg shadow-pink-500/20">
          <span className="text-xl">👑</span>
          <span>ROYAL COURT OF FABULOUSNESS</span>
          <span className="text-xl">✨</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-md">
          WAIT A MINUTE!!! <span className="inline-block animate-wiggle">😱👑</span>
        </h1>

        <div className="text-sm sm:text-base text-pink-200 font-bold mb-4 bg-pink-900/40 py-2 px-4 rounded-2xl border border-pink-500/30 inline-block">
          Our investigation suggests that this website might not be meant for you!
        </div>

        {/* Humorous Royal Rejection Verdict */}
        <div className="bg-slate-950/80 border-2 border-pink-400/40 rounded-2xl p-5 sm:p-6 mb-6 text-slate-200 space-y-3 relative shadow-inner">
          <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200">
            <span>Sorry, Princess</span>
            <span className="underline decoration-pink-400 decoration-wavy text-white">{userName}</span>!
            <span>👑💅</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-pink-300">
            You have arrived at the wrong celebration!
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            This server is strictly calibrated for video game rage, tangled cables, and scratching beards. Our AI detected <strong className="text-pink-300 font-black">{confidenceScore}</strong> celestial princess radiance, impeccable aesthetic taste, and dangerous amounts of emotional intelligence!
          </p>

          {lipGlossLevel > 0 && (
            <div className="p-2 rounded-xl bg-pink-500/30 border border-pink-400 text-xs font-black text-pink-200 animate-pulse flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Royal Gloss Level: {lipGlossLevel * 999}% Sparkle Slay Factor! ✨💄</span>
            </div>
          )}
        </div>

        {/* Glitzy Countdown to Women's Day March 8, 2027 */}
        <div className="bg-gradient-to-r from-pink-900/60 via-purple-900/70 to-pink-900/60 border-2 border-pink-400/50 rounded-3xl p-5 sm:p-6 mb-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-pink-200 mb-1">
            <Flower2 className="w-4 h-4 text-pink-400 animate-spin-slow" />
            <span>PRINCESS DAY AND ADVANCED WOMEN'S DAY ARE COMING! 🌸</span>
            <Flower2 className="w-4 h-4 text-pink-400 animate-spin-slow" />
          </div>

          <p className="text-sm sm:text-base font-extrabold text-white mb-4">
            Women's Day: <span className="text-amber-300 underline font-black decoration-pink-400">March 8, 2027</span>
            <br />
            <span className="text-xs text-pink-300 font-semibold">
              Only a few months left! Around 3½ months to go! ✨
            </span>
          </p>

          {/* Glitzy Countdown Clock */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
            <div className="bg-slate-900/90 border-2 border-pink-400/60 rounded-2xl p-2.5 sm:p-3 shadow-lg">
              <span className="block text-2xl sm:text-3xl font-black text-white">{timeLeft.days}</span>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-pink-300 tracking-wider">Days</span>
            </div>
            <div className="bg-slate-900/90 border-2 border-pink-400/60 rounded-2xl p-2.5 sm:p-3 shadow-lg">
              <span className="block text-2xl sm:text-3xl font-black text-white">{timeLeft.hours}</span>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-pink-300 tracking-wider">Hours</span>
            </div>
            <div className="bg-slate-900/90 border-2 border-pink-400/60 rounded-2xl p-2.5 sm:p-3 shadow-lg">
              <span className="block text-2xl sm:text-3xl font-black text-white">{timeLeft.minutes}</span>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-pink-300 tracking-wider">Mins</span>
            </div>
            <div className="bg-slate-900/90 border-2 border-pink-400/60 rounded-2xl p-2.5 sm:p-3 shadow-lg">
              <span className="block text-2xl sm:text-3xl font-black text-pink-400 animate-pulse">{timeLeft.seconds}</span>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-pink-300 tracking-wider">Secs</span>
            </div>
          </div>
        </div>

        {/* Fun Princess Interactive Buttons */}
        <div className="space-y-3 mb-4">
          <button
            type="button"
            onClick={() => {
              playPrincessSparkle();
              triggerPinkGlitter();
              setHasAcknowledged(true);
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-base sm:text-lg shadow-2xl shadow-pink-500/50 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 border-2 border-white/30"
          >
            <span>OKAY, I'LL WAIT</span>
            <span className="text-2xl animate-wiggle">💅</span>
          </button>

          {hasAcknowledged && (
            <div className="p-3 bg-pink-500/25 border border-pink-400 rounded-2xl text-xs sm:text-sm text-pink-100 font-bold animate-fadeIn">
              💖 Your VIP throne has been reserved for March 8, 2027! Complimentary strawberry iced matcha and tiara cleaning included! 👑🍓
            </div>
          )}

          {/* Princess mini activities */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleApplyLipGloss}
              className="py-2.5 px-3 rounded-xl bg-pink-900/50 hover:bg-pink-800/60 border border-pink-500/40 text-pink-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>💄 Reapply Lip Gloss</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playPrincessSparkle();
                setCarriageDispatched(true);
                triggerPinkGlitter();
              }}
              className="py-2.5 px-3 rounded-xl bg-pink-900/50 hover:bg-pink-800/60 border border-pink-500/40 text-pink-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>🎠 Call Royal Carriage</span>
            </button>
          </div>

          {carriageDispatched && (
            <p className="text-[11px] text-pink-300 font-medium italic animate-fadeIn">
              🦄 The pink pumpkin carriage with 4 white horses has been dispatched for March 8, 2027!
            </p>
          )}

          {/* Override & retry options */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-pink-500/20">
            <button
              type="button"
              onClick={() => {
                playClick();
                onContinueAsBro();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-bold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span>Wait! I'm actually a Bro! Override AI 🧔‍♂️</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                playClick();
                onReset();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Questions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
