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

  const [timeLeft, setTimeLeft] = useState({
    days: 109,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    playErrorBuzzer();
    const timer1 = setTimeout(() => playPrincessSparkle(), 500);

    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.3 },
      colors: ['#ff2a85', '#f472b6', '#fbcfe8', '#ffe600'],
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
      clearInterval(countdownInterval);
    };
  }, []);

  const triggerPinkGlitter = () => {
    playPrincessSparkle();
    confetti({
      particleCount: 110,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#ff2a85', '#f472b6', '#f43f5e', '#ffd1dc', '#ffe600'],
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
      {/* Cartoon Princess Floating Ribbon Notifications */}
      <div className="w-full space-y-2 mb-4">
        {funnyPopups.map((popupText, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-pink-300 border-3 border-black text-black text-xs font-black shadow-[4px_4px_0px_#000] animate-bounce-slow"
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🎀</span>
              <span>{popupText}</span>
            </div>
            <button
              onClick={() => dismissPopup(index)}
              className="text-black hover:text-rose-700 p-1 rounded-full font-black text-sm"
              title="Dismiss royal alert"
            >
              <XCircle className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Cartoon Princess Palace Card */}
      <div className="w-full cartoon-card p-6 sm:p-10 text-center bg-pink-100 shadow-[10px_10px_0px_#ff2a85] border-4 border-black">
        {/* Royal Crest / Floating Tiara */}
        <div className="relative mx-auto w-28 h-28 mb-3 flex items-center justify-center">
          <div
            onClick={triggerPinkGlitter}
            className="w-24 h-24 rounded-3xl bg-yellow-300 border-4 border-black flex items-center justify-center shadow-[5px_5px_0px_#000] transform hover:scale-110 hover:rotate-6 transition-all duration-200 cursor-pointer animate-jelly"
          >
            <Crown className="w-14 h-14 text-pink-600 stroke-[2.5]" />
          </div>
          <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-amber-500 animate-spin-slow" />
          <Heart className="absolute -bottom-2 -left-2 w-7 h-7 text-pink-500 fill-pink-500 animate-pulse" />
          <Wand2 className="absolute -top-1 -left-3 w-7 h-7 text-yellow-500 -rotate-45" />
        </div>

        {/* Royal Decree Banner */}
        <div className="cartoon-sticker px-5 py-2 bg-pink-400 text-black font-black text-xs sm:text-sm uppercase mb-4 shadow-[4px_4px_0px_#000] transform -rotate-1">
          <span className="text-xl">👑</span>
          <span>ROYAL COURT OF FABULOUSNESS</span>
          <span className="text-xl">✨</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-black tracking-tight mb-2 uppercase drop-shadow-[2px_2px_0px_#ff2a85]">
          WAIT A MINUTE!!! <span className="inline-block animate-wiggle">😱👑</span>
        </h1>

        <div className="text-sm sm:text-base text-pink-900 font-black mb-4 bg-white py-2 px-4 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] inline-block uppercase">
          Our investigation suggests that this website might not be meant for you!
        </div>

        {/* Humorous Royal Rejection Verdict */}
        <div className="bg-white border-3 border-black rounded-3xl p-5 sm:p-6 mb-6 text-slate-900 space-y-3 shadow-[5px_5px_0px_#000]">
          <div className="flex items-center justify-center gap-2 text-2xl sm:text-4xl font-black text-pink-600 uppercase">
            <span>Sorry, Princess</span>
            <span className="underline decoration-yellow-400 decoration-wavy text-black">{userName}</span>!
            <span>👑💅</span>
          </div>

          <p className="text-base sm:text-lg font-black text-purple-950 uppercase">
            You have arrived at the wrong celebration!
          </p>

          <p className="text-xs sm:text-sm text-slate-800 font-extrabold leading-relaxed max-w-lg mx-auto">
            This server is strictly calibrated for video game rage, tangled cables, and scratching beards. Our AI detected <strong className="text-pink-600 font-black">{confidenceScore}</strong> celestial princess radiance, impeccable aesthetic taste, and dangerous amounts of emotional intelligence!
          </p>

          {lipGlossLevel > 0 && (
            <div className="p-2.5 rounded-2xl bg-yellow-300 border-2 border-black text-xs font-black text-black animate-jelly flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Royal Gloss Level: {lipGlossLevel * 999}% Sparkle Slay Factor! ✨💄</span>
            </div>
          )}
        </div>

        {/* Glitzy Countdown to Women's Day March 8, 2027 */}
        <div className="bg-pink-300 border-4 border-black rounded-3xl p-5 sm:p-6 mb-6 shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-black mb-1">
            <Flower2 className="w-5 h-5 text-pink-700 animate-spin-slow stroke-[3]" />
            <span>PRINCESS DAY AND ADVANCED WOMEN'S DAY ARE COMING! 🌸</span>
            <Flower2 className="w-5 h-5 text-pink-700 animate-spin-slow stroke-[3]" />
          </div>

          <p className="text-base sm:text-lg font-black text-black mb-4 uppercase">
            Women's Day: <span className="bg-yellow-300 px-2 py-0.5 rounded-lg border-2 border-black">March 8, 2027</span>
            <br />
            <span className="text-xs text-pink-900 font-extrabold">
              Only a few months left! Around 3½ months to go! ✨
            </span>
          </p>

          {/* Glitzy Countdown Clock */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
            <div className="bg-white border-3 border-black rounded-2xl p-2.5 sm:p-3 shadow-[3px_3px_0px_#000]">
              <span className="block text-2xl sm:text-4xl font-black text-black">{timeLeft.days}</span>
              <span className="text-[10px] sm:text-xs uppercase font-black text-pink-600 tracking-wider">Days</span>
            </div>
            <div className="bg-white border-3 border-black rounded-2xl p-2.5 sm:p-3 shadow-[3px_3px_0px_#000]">
              <span className="block text-2xl sm:text-4xl font-black text-black">{timeLeft.hours}</span>
              <span className="text-[10px] sm:text-xs uppercase font-black text-pink-600 tracking-wider">Hours</span>
            </div>
            <div className="bg-white border-3 border-black rounded-2xl p-2.5 sm:p-3 shadow-[3px_3px_0px_#000]">
              <span className="block text-2xl sm:text-4xl font-black text-black">{timeLeft.minutes}</span>
              <span className="text-[10px] sm:text-xs uppercase font-black text-pink-600 tracking-wider">Mins</span>
            </div>
            <div className="bg-white border-3 border-black rounded-2xl p-2.5 sm:p-3 shadow-[3px_3px_0px_#000]">
              <span className="block text-2xl sm:text-4xl font-black text-pink-500 animate-pulse">{timeLeft.seconds}</span>
              <span className="text-[10px] sm:text-xs uppercase font-black text-pink-600 tracking-wider">Secs</span>
            </div>
          </div>
        </div>

        {/* Fun Princess Interactive Buttons */}
        <div className="space-y-3 mb-2">
          <button
            type="button"
            onClick={() => {
              playPrincessSparkle();
              triggerPinkGlitter();
              setHasAcknowledged(true);
            }}
            className="cartoon-btn w-full py-4 px-6 bg-pink-500 hover:bg-pink-400 text-white font-black text-lg uppercase shadow-[6px_6px_0px_#000] border-4 border-black flex items-center justify-center gap-3"
          >
            <span>OKAY, I'LL WAIT LIKE A QUEEN</span>
            <span className="text-2xl animate-wiggle">💅</span>
          </button>

          {hasAcknowledged && (
            <div className="p-3 bg-white border-3 border-black rounded-2xl text-xs sm:text-sm text-pink-900 font-black shadow-[3px_3px_0px_#000] animate-jelly">
              💖 Your VIP throne has been reserved for March 8, 2027! Complimentary strawberry iced matcha and tiara cleaning included! 👑🍓
            </div>
          )}

          {/* Princess mini activities */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleApplyLipGloss}
              className="cartoon-btn py-3 px-3 bg-yellow-300 hover:bg-yellow-200 text-black text-xs uppercase shadow-[3px_3px_0px_#000] flex items-center justify-center gap-1.5"
            >
              <span>💄 Apply Lip Gloss</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playPrincessSparkle();
                setCarriageDispatched(true);
                triggerPinkGlitter();
              }}
              className="cartoon-btn py-3 px-3 bg-cyan-300 hover:bg-cyan-200 text-black text-xs uppercase shadow-[3px_3px_0px_#000] flex items-center justify-center gap-1.5"
            >
              <span>🎠 Call Carriage</span>
            </button>
          </div>

          {carriageDispatched && (
            <p className="text-xs text-pink-900 font-black italic bg-white p-2 rounded-xl border-2 border-black animate-fadeIn">
              🦄 The pink pumpkin carriage with 4 white horses has been dispatched for March 8, 2027!
            </p>
          )}

          {/* Override & retry options */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t-3 border-black">
            <button
              type="button"
              onClick={() => {
                playClick();
                onContinueAsBro();
              }}
              className="cartoon-btn w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-black text-xs sm:text-sm uppercase shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2"
            >
              <span>Wait! I'm a Bro! Override AI 🧔‍♂️</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={() => {
                playClick();
                onReset();
              }}
              className="cartoon-btn w-full sm:w-auto px-4 py-2.5 bg-slate-200 hover:bg-slate-100 text-black text-xs sm:text-sm uppercase shadow-[3px_3px_0px_#000] flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 stroke-[3]" />
              <span>Retake Questions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
