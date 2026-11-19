import React, { useState } from 'react';
import { QUESTIONS, QuestionOption } from '../data/questions';
import { playClick, playSuccessDing } from '../utils/audio';
import { Search, BrainCircuit, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface Page2InvestigationProps {
  userName: string;
  onQuestionsCompleted: (selectedAnswers: QuestionOption[]) => void;
}

export const Page2Investigation: React.FC<Page2InvestigationProps> = ({
  userName,
  onQuestionsCompleted,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<QuestionOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentQIndex];
  const progressPercent = Math.round(((currentQIndex) / QUESTIONS.length) * 100);

  const handleSelectOption = (option: QuestionOption) => {
    playClick();
    setSelectedOptionId(option.id);
  };

  const handleNext = () => {
    if (!selectedOptionId) return;

    const chosenOption = currentQuestion.options.find((o) => o.id === selectedOptionId);
    if (!chosenOption) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQIndex] = chosenOption;
    setSelectedAnswers(newAnswers);
    setSelectedOptionId(null);

    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      playSuccessDing();
      onQuestionsCompleted(newAnswers);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      playClick();
      setCurrentQIndex((prev) => prev - 1);
      const prevAnswer = selectedAnswers[currentQIndex - 1];
      setSelectedOptionId(prevAnswer ? prevAnswer.id : null);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Investigation Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-cyan-500/10 animate-pulse">
        <Search className="w-4 h-4 text-cyan-400" />
        DEEP BRAIN SCAN // LEVEL {currentQIndex + 1} OF {QUESTIONS.length}
      </div>

      {/* Main Glass Card */}
      <div className="w-full glass-card-glow rounded-3xl p-6 sm:p-9 shadow-2xl relative border border-indigo-500/30 overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
            IDENTITY VERIFICATION IN PROGRESS <span className="inline-block animate-bounce">🕵️</span>
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 font-semibold mb-2">
            Are you REALLY who you claim to be, <span className="text-yellow-400 font-bold">{userName}</span>?
          </p>
        </div>

        {/* Progress Bar & Indicators */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <BrainCircuit className="w-3.5 h-3.5" /> Question {currentQIndex + 1} of {QUESTIONS.length}
            </span>
            <span className="text-indigo-400">{progressPercent}% Analyzed</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-300 shadow-[0_0_10px_#6366f1]"
              style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-white/10 mb-6 shadow-inner">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
            Interrogation Query #{currentQIndex + 1}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
            {currentQuestion.question}
          </h3>
          <p className="text-xs text-slate-400 italic">
            "{currentQuestion.subtitle}"
          </p>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.01]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-indigo-400/50 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-125 transition-transform duration-200">
                    {option.emoji}
                  </span>
                  <span className={`text-sm sm:text-base font-semibold leading-relaxed ${
                    isSelected ? 'text-white' : 'text-slate-200'
                  }`}>
                    {option.text}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-cyan-400 border-cyan-400 text-slate-950 font-bold'
                    : 'border-slate-600 bg-slate-800/50 group-hover:border-slate-400'
                }`}>
                  {isSelected && <CheckCircle className="w-4 h-4 fill-current" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentQIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOptionId}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 shadow-lg ${
              selectedOptionId
                ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white pulse-glow scale-100 cursor-pointer'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
            }`}
          >
            <span>{currentQIndex === QUESTIONS.length - 1 ? 'SUBMIT FOR AI ANALYSIS 🤖' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Security notice */}
      <p className="mt-4 text-[11px] text-slate-400 text-center max-w-md">
        ⚠️ Note: Answers are analyzed using 100% fake heuristic neural nets calibrated strictly for comic relief.
      </p>
    </div>
  );
};
