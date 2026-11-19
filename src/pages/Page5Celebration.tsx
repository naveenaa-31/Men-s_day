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

  // Trigger grand fireworks confetti show
  useEffect(() => {
    playVictoryFanfare();

    // Initial cannon burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#ec4899', '#3b82f6', '#eab308', '#10b981'],
    });

    // Multi-stage fireworks duration
    const end = Date.now() + 3.5 * 1000;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#f59e0b'],
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const triggerMoreConfetti = () => {
    playSuccessDing();
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.5 },
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
      {/* Top Trophy Banner */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 border border-yellow-500/40 text-yellow-300 text-xs sm:text-sm font-black uppercase tracking-widest mb-6 shadow-xl shadow-yellow-500/10 animate-bounce-slow">
        <Trophy className="w-4 h-4 text-yellow-400" />
        MISSION SUCCESSFUL! 🏆
      </div>

      {/* Main Congratulations Header */}
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-2 leading-none">
          CONGRATULATIONS, <span className="text-gradient-electric">{userName.toUpperCase()}</span>!
        </h1>
        <p className="text-lg sm:text-2xl font-bold text-slate-300 mb-2">
          YOU HAVE OFFICIALLY SURVIVED OUR INVESTIGATION. 🕵️‍♂️⚡
        </p>
        <p className="text-2xl sm:text-4xl font-black text-gradient-gold flex items-center justify-center gap-2 mt-4">
          HAPPY INTERNATIONAL MEN'S DAY! <Heart className="w-8 h-8 text-rose-500 fill-rose-500 inline-block animate-pulse" />
        </p>
        <p className="text-xs sm:text-sm text-indigo-300 font-semibold mt-1">
          November 19, 2026 // A Day to Celebrate the Real Ones 🥂
        </p>
      </div>

      {/* Official 100% Certified Human Badge */}
      <div className="w-full max-w-lg mb-8 glass-card rounded-2xl p-4 border border-emerald-500/40 bg-emerald-950/20 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-2xl">
            🎖️
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              OFFICIAL SYSTEM STAMP
            </span>
            <h4 className="text-sm sm:text-base font-extrabold text-white">
              VERIFICATION STATUS: 100% CERTIFIED HUMAN
            </h4>
          </div>
        </div>
        <div className="flex items-center text-emerald-400 font-bold text-xs gap-1 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4" />
          <span>APPROVED</span>
        </div>
      </div>

      {/* Two Personalized Message Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: From Creator */}
        <div className="glass-card-glow rounded-3xl p-6 sm:p-7 border border-indigo-500/30 relative flex flex-col justify-between shadow-2xl group hover:border-indigo-400/60 transition-all duration-300">
          <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-black tracking-wide flex items-center gap-1.5 shadow-md">
            <MessageCircleHeart className="w-3.5 h-3.5 text-pink-300" />
            FROM {creatorName.toUpperCase()} 💌
          </div>

          <div className="mt-3">
            <h3 className="text-lg font-black text-white mb-3">
              Dear <span className="text-indigo-400 font-bold">{userName}</span>,
            </h3>
            <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                Jokes apart, you're one of those people who make our days genuinely more interesting (sometimes unnecessarily chaotic and interesting 😂).
              </p>
              <p>
                Whether it's the random late-night conversations, the shared memes, or just surviving the daily grind, having you in the circle is a pure blessing.
              </p>
              <p className="font-semibold text-slate-200">
                Keep being your authentic self, keep growing, and never lose that genuine smile.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300 font-semibold">
            <span>Happy Men's Day, brother! ❤️</span>
            <span className="italic">— {creatorName}</span>
          </div>
        </div>

        {/* Card 2: From Don */}
        <div className="glass-card-glow rounded-3xl p-6 sm:p-7 border border-purple-500/30 relative flex flex-col justify-between shadow-2xl group hover:border-purple-400/60 transition-all duration-300">
          <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black tracking-wide flex items-center gap-1.5 shadow-md">
            <MessageCircleHeart className="w-3.5 h-3.5 text-amber-300" />
            FROM DON 💌
          </div>

          <div className="mt-3">
            <h3 className="text-lg font-black text-white mb-3">
              Hey <span className="text-purple-400 font-bold">{userName}</span>!
            </h3>
            <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                Don here! If you survived our insane impossible button challenge, your patience alone deserves a Nobel Peace Prize! 🏆
              </p>
              <p>
                Thank you for the endless laughs, the memories, and all the madness. Life wouldn't be half as fun without your presence.
              </p>
              <p className="font-semibold text-slate-200">
                Always remember: men's health, peace of mind, and genuine friendships matter more than anything. Take care of yourself!
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-purple-300 font-semibold">
            <span>With all love and respect! 🥂</span>
            <span className="italic">— don</span>
          </div>
        </div>
      </div>

      {/* Combined Sign-off Quote */}
      <div className="w-full glass-card rounded-2xl p-5 mb-8 text-center border border-white/10 max-w-2xl bg-slate-900/40">
        <p className="text-sm sm:text-base font-semibold text-slate-200 italic mb-2">
          "Thank you for the laughs, random conversations, memories and all the madness.
          Keep being yourself, keep growing, and never lose that smile."
        </p>
        <p className="text-xs text-indigo-400 font-extrabold uppercase tracking-widest">
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
          className="flex-1 min-w-[200px] py-3.5 px-6 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-white font-extrabold text-sm transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>REVEAL MY REPORT AGAIN 😂</span>
        </button>

        <button
          type="button"
          onClick={triggerMoreConfetti}
          className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>More Confetti! 🎉</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          title="Copy link to send to friends"
        >
          <Share2 className="w-4 h-4" />
          <span>{copiedLink ? 'Link Copied! 📋' : 'Share with Bros'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            onRestart();
          }}
          className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Prank Another Friend 🔄</span>
        </button>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Dossier: {userName.toUpperCase()}
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-white font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-white/10">
                <span className="text-[10px] uppercase font-mono text-indigo-400 block mb-1">
                  AI Confidence Level
                </span>
                <p className="text-lg font-black text-emerald-400">
                  {analysisResult?.confidenceScore || '99.4%'} High Fidelity Bro Calibration
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" /> Heuristic Behavioral Findings:
                </h4>
                <ul className="space-y-2">
                  {(analysisResult?.funnyObservations || [
                    "Detected 99.4% likelihood of possessing at least one mysterious tangled black cable that doesn't fit any current device.",
                    "Internal brain scans show 84% thoughts occupied by the Roman Empire, random gym PRs, or sleeping.",
                    "Reflex analysis shows instinctive urge to smack bags of soil at hardware stores.",
                    "Speech pattern analysis confirms using 'Yo', 'Bro', and 'Bet' in 68% of daily conversations."
                  ]).map((obs, i) => (
                    <li key={i} className="p-2.5 bg-slate-800/50 rounded-lg border border-white/5 text-slate-300 flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">#{i + 1}</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {answers.length > 0 && (
                <div>
                  <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-cyan-400" /> Recorded Interrogation Answers:
                  </h4>
                  <div className="space-y-1.5">
                    {answers.map((ans, idx) => (
                      <div key={idx} className="p-2 bg-slate-800/40 rounded-lg text-xs text-slate-300 flex items-center gap-2">
                        <span>{ans.emoji}</span>
                        <span className="truncate">{ans.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-500/20 text-slate-300">
                <p className="font-bold text-indigo-300 mb-1">Conclusion:</p>
                <p>
                  Officially verified for infinite brotherhood privileges, unconditional respect, and complimentary pizza rights.
                </p>
              </div>

              <button
                onClick={() => setShowReportModal(false)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors mt-2"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
