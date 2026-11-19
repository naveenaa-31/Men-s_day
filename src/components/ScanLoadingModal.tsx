import React, { useEffect, useState } from 'react';
import { Terminal, Zap, CheckCircle2 } from 'lucide-react';
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
    
    const stageTimer = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < stages.length - 1) {
          playClick();
          return prev + 1;
        }
        return prev;
      });
    }, stageIntervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(100, prev + 3);
      });
    }, durationMs / 35);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-yellow-300 rounded-3xl p-7 border-4 border-black text-center shadow-[10px_10px_0px_#000] text-black font-['Fredoka',sans-serif]">
        
        {/* Animated Cartoon Radar Icon */}
        <div className="relative mx-auto w-24 h-24 mb-4 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-pink-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] transform -rotate-6 animate-jelly">
            <span className="text-4xl animate-bounce">🤖</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-black tracking-wide uppercase mb-1">
          {title}
        </h3>
        <p className="text-xs uppercase font-black text-slate-800 tracking-wider mb-5 bg-white border-2 border-black inline-block px-3 py-1 rounded-full shadow-[2px_2px_0px_#000]">
          SUBJECT: <span className="text-pink-600 font-black">{userName.toUpperCase()}</span> 🔍
        </p>

        {/* Chunky Cartoon Progress Bar */}
        <div className="w-full bg-white rounded-2xl h-6 mb-5 p-1 border-3 border-black shadow-[4px_4px_0px_#000] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-pink-500 rounded-xl transition-all duration-150 ease-out border-2 border-black"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stage List / Cartoon Console */}
        <div className="bg-white border-3 border-black rounded-2xl p-4 text-left space-y-2 font-black text-xs shadow-[4px_4px_0px_#000]">
          <div className="flex items-center justify-between text-slate-700 pb-2 border-b-2 border-black">
            <span className="flex items-center gap-1.5 text-black uppercase">
              <Terminal className="w-4 h-4 text-black" /> BRAIN_SCANNER.EXE
            </span>
            <span className="text-emerald-600 font-black text-sm">{progress}%</span>
          </div>

          {stages.map((stage, idx) => {
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  isDone
                    ? 'text-emerald-700'
                    : isCurrent
                    ? 'text-pink-600 scale-[1.02] font-black'
                    : 'text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                ) : isCurrent ? (
                  <Zap className="w-4 h-4 flex-shrink-0 text-amber-500 animate-spin" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 flex-shrink-0" />
                )}
                <span className="truncate">{stage}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
