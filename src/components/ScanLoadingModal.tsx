import React, { useEffect, useState } from 'react';
import { Cpu, Terminal, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { playClick, playSuccessDing } from '../utils/audio';

interface ScanLoadingModalProps {
  title: string;
  stages: string[];
  durationMs?: number;
  onComplete: () => void;
  userName?: string;
}

export const ScanLoadingModal: React.FC<ScanLoadingModalProps> = ({
  title,
  stages,
  durationMs = 3200,
  onComplete,
  userName = 'Subject',
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const stageIntervalTime = durationMs / stages.length;
    
    // Interval for stages
    const stageTimer = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < stages.length - 1) {
          playClick();
          return prev + 1;
        }
        return prev;
      });
    }, stageIntervalTime);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(100, prev + 3);
      });
    }, durationMs / 35);

    // Completion timeout
    const completeTimer = setTimeout(() => {
      playSuccessDing();
      onComplete();
    }, durationMs);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [durationMs, onComplete, stages.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-lg glass-card-glow rounded-3xl p-8 border border-indigo-500/40 text-center shadow-2xl overflow-hidden">
        {/* Animated Scanner Ray */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce pointer-events-none top-0" />

        {/* Central glowing icon */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-xl shadow-indigo-500/40 border border-white/20">
            <Cpu className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase mb-1">
          {title}
        </h3>
        <p className="text-xs text-indigo-300 font-mono tracking-wider mb-6">
          TARGET: <span className="text-white font-bold">{userName.toUpperCase()}</span> // BIOMETRIC LOCK ACTIVE
        </p>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-3 mb-6 p-0.5 border border-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(99,102,241,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stage List / Current Activity */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 text-left space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <Terminal className="w-3.5 h-3.5" /> NEURAL_CONSOLE.SYS
            </span>
            <span className="text-emerald-400 font-bold">{progress}% DONE</span>
          </div>

          {stages.map((stage, idx) => {
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isDone
                    ? 'text-emerald-400 opacity-70'
                    : isCurrent
                    ? 'text-white font-bold scale-[1.02]'
                    : 'text-slate-600 opacity-40'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                ) : isCurrent ? (
                  <Zap className="w-3.5 h-3.5 flex-shrink-0 text-yellow-400 animate-spin" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-600 flex-shrink-0" />
                )}
                <span className="truncate">{stage}</span>
              </div>
            );
          })}
        </div>

        {/* Footer warning */}
        <p className="mt-6 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          Please do not blink or look away from the screen during neural calibration.
        </p>
      </div>
    </div>
  );
};
