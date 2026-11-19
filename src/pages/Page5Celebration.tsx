import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Heart, Sparkles, Award, RefreshCw, Share2, FileText, CheckCircle2, MessageCircleHeart, HelpCircle } from 'lucide-react';
import { playVictoryFanfare, playClick, playSuccessDing } from '../utils/audio';
import { AnalysisResult } from '../utils/aiAnalysis';
import { QuestionOption } from '../data/questions';

interface Page5CelebrationProps {
  userName: string;
  creatorName: string;
  analysisResult: AnalysisResult | null;
  answers: QuestionOption[];
  onRestart: () => void;
}

export const Page5Celebration: React.FC<Page5CelebrationProps> = ({
  userName,
  creatorName,
  analysisResult,
  answers,
  onRestart,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    playVictoryFanfare();

    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffe600', '#ff2a85', '#00f0ff', '#10b981', '#a855f7'],
    });

    const end = Date.now() + 3.5 * 1000;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ['#ffe600', '#ff2a85', '#00f0ff', '#10b981', '#ffffff'],
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const triggerMoreConfetti = () => {
    playSuccessDing();
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#fde047', '#f472b6', '#38bdf8', '#4ade80'],
    });
  };

  const handleShare = () => {
    playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[85vh]">
      {/* Top Cartoon Trophy Banner */}
      <div className="cartoon-sticker px-6 py-2.5 bg-yellow-300 text-black text-sm font-black uppercase mb-6 shadow-[5px_5px_0px_#000] transform -rotate-1 animate-bounce-slow">
        <Trophy className="w-5 h-5 text-black stroke-[3]" />
        <span>MISSION ACCOMPLISHED! 🏆</span>
      </div>

      {/* Main Congratulations Header */}
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight mb-2 drop-shadow-[4px_4px_0px_#000] uppercase">
          CONGRATULATIONS, <span className="text-yellow-300 underline decoration-pink-500 decoration-wavy">{userName.toUpperCase()}</span>!
        </h1>
        <p className="text-xl sm:text-3xl font-black text-cyan-300 mb-2 drop-shadow-[2px_2px_0px_#000] uppercase">
          YOU OFFICIALLY SURVIVED OUR INVESTIGATION! 🕵️‍♂️⚡
        </p>
        <div className="inline-flex items-center justify-center gap-2 text-2xl sm:text-4xl font-black text-pink-400 mt-2 bg-white px-5 py-2 rounded-2xl border-4 border-black shadow-[5px_5px_0px_#000] transform rotate-1">
          <span>HAPPY INTERNATIONAL MEN'S DAY!</span>
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 inline-block animate-pulse" />
        </div>
        <p className="text-xs sm:text-sm text-yellow-300 font-black uppercase mt-3 tracking-widest">
          NOVEMBER 19, 2026 // CELEBRATING THE ABSOLUTE LEGENDS 🥂
        </p>
      </div>

      {/* Official 100% Certified Human Badge */}
      <div className="w-full max-w-lg mb-8 cartoon-card p-4 sm:p-5 bg-emerald-300 border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white border-3 border-black flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000] transform -rotate-6">
            🎖️
          </div>
          <div>
            <span className="text-[10px] font-black text-emerald-950 uppercase tracking-wider block">
              OFFICIAL SYSTEM CERTIFICATION
            </span>
            <h4 className="text-sm sm:text-lg font-black text-black uppercase">
              STATUS: 100% CERTIFIED HUMAN BRO
            </h4>
          </div>
        </div>
        <div className="flex items-center text-black font-black text-xs gap-1.5 bg-white px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
          <span>VERIFIED</span>
        </div>
      </div>

      {/* Two Personalized Message Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: From Creator (Dwarf) */}
        <div className="cartoon-card p-6 sm:p-7 bg-white relative flex flex-col justify-between shadow-[8px_8px_0px_#000] transform hover:-translate-y-1 transition-transform">
          <div className="absolute -top-4 left-6 px-3.5 py-1 rounded-xl bg-cyan-300 text-black border-3 border-black text-xs font-black uppercase tracking-wide flex items-center gap-1.5 shadow-[3px_3px_0px_#000] transform -rotate-2">
            <MessageCircleHeart className="w-4 h-4 text-black" />
            FROM {creatorName.toUpperCase()} 💌
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-black text-slate-900 mb-3">
              Dear <span className="bg-yellow-300 px-2 py-0.5 rounded-lg border-2 border-black text-black">{userName}</span>,
            </h3>
            <div className="text-sm text-slate-800 font-extrabold space-y-3 leading-relaxed">
              <p>
                Jokes apart, you're one of those people who make our days genuinely more interesting (sometimes unnecessarily chaotic and interesting 😂).
              </p>
              <p>
                Whether it's the random late-night conversations, the shared memes, or just surviving the daily grind, having you in the circle is a pure blessing.
              </p>
              <p className="text-black font-black">
                Keep being your authentic self, keep growing, and never lose that genuine smile.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-3 border-black flex items-center justify-between text-xs text-black font-black uppercase">
            <span>Happy Men's Day, brother! ❤️</span>
            <span className="italic">— {creatorName}</span>
          </div>
        </div>

        {/* Card 2: From Don */}
        <div className="cartoon-card p-6 sm:p-7 bg-white relative flex flex-col justify-between shadow-[8px_8px_0px_#000] transform hover:-translate-y-1 transition-transform">
          <div className="absolute -top-4 left-6 px-3.5 py-1 rounded-xl bg-pink-400 text-black border-3 border-black text-xs font-black uppercase tracking-wide flex items-center gap-1.5 shadow-[3px_3px_0px_#000] transform rotate-2">
            <MessageCircleHeart className="w-4 h-4 text-black" />
            FROM DON 💌
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-black text-slate-900 mb-3">
              Hey <span className="bg-pink-300 px-2 py-0.5 rounded-lg border-2 border-black text-black">{userName}</span>!
            </h3>
            <div className="text-sm text-slate-800 font-extrabold space-y-3 leading-relaxed">
              <p>
                Don here! If you survived our insane impossible button challenge, your patience alone deserves a Nobel Peace Prize! 🏆
              </p>
              <p>
                Thank you for the endless laughs, the memories, and all the madness. Life wouldn't be half as fun without your presence.
              </p>
              <p className="text-black font-black">
                Always remember: men's health, peace of mind, and genuine friendships matter more than anything. Take care of yourself!
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-3 border-black flex items-center justify-between text-xs text-black font-black uppercase">
            <span>With all love and respect! 🥂</span>
            <span className="italic">— don</span>
          </div>
        </div>
      </div>

      {/* Combined Sign-off Quote */}
      <div className="w-full cartoon-card p-5 mb-8 text-center bg-yellow-200 border-4 border-black max-w-2xl shadow-[6px_6px_0px_#000] transform -rotate-0.5">
        <p className="text-sm sm:text-base font-black text-black italic mb-2">
          "Thank you for the laughs, random conversations, memories and all the madness.
          Keep being yourself, keep growing, and never lose that smile."
        </p>
        <p className="text-xs text-black font-black uppercase tracking-widest">
          — With love, {creatorName} &amp; don ❤️
        </p>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-xl">
        <button
          type="button"
          onClick={() => {
            playClick();
            setShowReportModal(true);
          }}
          className="cartoon-btn flex-1 min-w-[200px] py-4 px-6 bg-cyan-400 hover:bg-cyan-300 text-black text-sm uppercase shadow-[5px_5px_0px_#000] flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5 text-black stroke-[2.5]" />
          <span>REVEAL MY REPORT AGAIN 😂</span>
        </button>

        <button
          type="button"
          onClick={triggerMoreConfetti}
          className="cartoon-btn py-4 px-5 bg-yellow-400 hover:bg-yellow-300 text-black text-sm uppercase shadow-[5px_5px_0px_#000] flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-black" />
          <span>More Confetti! 🎉</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="cartoon-btn py-4 px-5 bg-white hover:bg-slate-100 text-black text-sm uppercase shadow-[5px_5px_0px_#000] flex items-center justify-center gap-2"
          title="Copy link to send to friends"
        >
          <Share2 className="w-5 h-5 text-black" />
          <span>{copiedLink ? 'Link Copied! 📋' : 'Share with Bros'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            onRestart();
          }}
          className="cartoon-btn w-full sm:w-auto py-4 px-6 bg-rose-400 hover:bg-rose-300 text-black text-sm uppercase shadow-[5px_5px_0px_#000] flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5 text-black" />
          <span>Prank Another Friend 🔄</span>
        </button>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[10px_10px_0px_#000] relative max-h-[85vh] overflow-y-auto font-['Fredoka',sans-serif] text-black">
            <div className="flex items-center justify-between pb-3 border-b-3 border-black mb-4">
              <h3 className="text-xl font-black text-black flex items-center gap-2 uppercase">
                <FileText className="w-6 h-6 text-black" />
                Dossier: {userName.toUpperCase()}
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-9 h-9 rounded-xl bg-rose-400 border-2 border-black flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#000] hover:bg-rose-300 active:translate-x-0.5 active:translate-y-0.5"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-bold">
              <div className="p-3 bg-yellow-300 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] uppercase font-black text-black block mb-0.5">
                  AI Confidence Level
                </span>
                <p className="text-lg font-black text-emerald-900">
                  {analysisResult?.confidenceScore || '99.4%'} HIGH FIDELITY BRO CALIBRATION
                </p>
              </div>

              <div>
                <h4 className="font-black text-black mb-2 flex items-center gap-1.5 uppercase text-sm">
                  <Award className="w-5 h-5 text-amber-500" /> Heuristic Findings:
                </h4>
                <ul className="space-y-2">
                  {(analysisResult?.funnyObservations || [
                    "Detected 99.4% likelihood of possessing at least one mysterious tangled black cable that doesn't fit any current device.",
                    "Internal brain scans show 84% thoughts occupied by the Roman Empire, random gym PRs, or sleeping.",
                    "Reflex analysis shows instinctive urge to smack bags of soil at hardware stores.",
                    "Speech pattern analysis confirms using 'Yo', 'Bro', and 'Bet' in 68% of daily conversations."
                  ]).map((obs, i) => (
                    <li key={i} className="p-2.5 bg-slate-50 rounded-xl border-2 border-black text-slate-800 flex items-start gap-2 shadow-[2px_2px_0px_#000]">
                      <span className="text-pink-600 font-black">#{i + 1}</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {answers.length > 0 && (
                <div>
                  <h4 className="font-black text-black mb-2 flex items-center gap-1.5 uppercase text-sm">
                    <HelpCircle className="w-5 h-5 text-cyan-600" /> Logged Answers:
                  </h4>
                  <div className="space-y-1.5">
                    {answers.map((ans, idx) => (
                      <div key={idx} className="p-2 bg-amber-50 rounded-xl border-2 border-black text-xs text-slate-900 flex items-center gap-2">
                        <span className="text-lg">{ans.emoji}</span>
                        <span className="truncate">{ans.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-cyan-100 rounded-2xl border-3 border-black text-black shadow-[3px_3px_0px_#000]">
                <p className="font-black uppercase mb-1">Conclusion:</p>
                <p>
                  Officially verified for infinite brotherhood privileges, unconditional respect, and complimentary pizza rights! 🍕
                </p>
              </div>

              <button
                onClick={() => setShowReportModal(false)}
                className="cartoon-btn w-full py-3 bg-black text-white hover:bg-slate-900 text-sm uppercase mt-2"
              >
                Close Report 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
