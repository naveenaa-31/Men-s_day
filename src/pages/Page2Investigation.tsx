import React, { useState } from 'react';
import { QUESTIONS, QuestionOption } from '../data/questions';
import { playClick, playSuccessDing } from '../utils/audio';
import { Search, BrainCircuit, ArrowRight, ArrowLeft, Check } from 'lucide-react';

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
      {/* Cartoon Investigation Badge */}
      <div className="cartoon-sticker px-4 py-1.5 bg-cyan-300 text-black text-xs font-black uppercase mb-4 shadow-[4px_4px_0px_#000] -rotate-1">
        <Search className="w-4 h-4 text-black" />
        QUESTION {currentQIndex + 1} OF {QUESTIONS.length} // DETECTIVE MODE 🔍
      </div>

      {/* Main Cartoon Question Card */}
      <div className="w-full cartoon-card p-6 sm:p-9 text-slate-900 shadow-[8px_8px_0px_#000]">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-2 uppercase drop-shadow-[1px_1px_0px_#fff]">
            IDENTITY VERIFICATION IN PROGRESS <span className="inline-block animate-bounce">🕵️</span>
          </h2>
          <p className="text-base sm:text-lg text-indigo-900 font-extrabold mb-1">
            Are you REALLY who you claim to be, <span className="bg-yellow-300 px-2 py-0.5 rounded-lg border-2 border-black text-black font-black">{userName}</span>?
          </p>
        </div>

        {/* Progress Bar & Indicators */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-black font-black mb-1.5 uppercase">
            <span className="flex items-center gap-1.5 text-black">
              <BrainCircuit className="w-4 h-4 text-pink-500" /> Query #{currentQIndex + 1}
            </span>
            <span className="bg-pink-300 px-2 py-0.5 rounded-full border-2 border-black text-black">{progressPercent}% Analyzed</span>
          </div>
          <div className="w-full bg-slate-100 rounded-2xl h-4 overflow-hidden border-3 border-black shadow-[3px_3px_0px_#000]">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 rounded-xl transition-all duration-300"
              style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-amber-100 rounded-2xl p-5 border-3 border-black mb-6 shadow-[4px_4px_0px_#000]">
          <span className="text-[11px] font-black uppercase tracking-wider text-pink-600 block mb-1">
            Interrogation Question #{currentQIndex + 1}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-1 leading-snug">
            {currentQuestion.question}
          </h3>
          <p className="text-xs text-slate-600 font-bold italic">
            "{currentQuestion.subtitle}"
          </p>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-3.5 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`cartoon-btn w-full text-left p-4 rounded-2xl transition-all duration-150 flex items-center justify-between gap-3 text-black ${
                  isSelected
                    ? 'bg-yellow-300 border-4 border-black shadow-[6px_6px_0px_#000] scale-[1.01]'
                    : 'bg-white hover:bg-yellow-50 border-3 border-black shadow-[4px_4px_0px_#000]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl sm:text-4xl flex-shrink-0 transform hover:scale-125 transition-transform duration-150">
                    {option.emoji}
                  </span>
                  <span className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                    {option.text}
                  </span>
                </div>

                <div className={`w-8 h-8 rounded-xl border-3 border-black flex items-center justify-center flex-shrink-0 transition-colors shadow-[2px_2px_0px_#000] ${
                  isSelected
                    ? 'bg-emerald-400 text-black font-black'
                    : 'bg-white'
                }`}>
                  {isSelected && <Check className="w-5 h-5 stroke-[3.5]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t-3 border-black">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQIndex === 0}
            className={`cartoon-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase ${
              currentQIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 shadow-none'
                : 'bg-white text-black hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOptionId}
            className={`cartoon-btn flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-black uppercase transition-all duration-150 ${
              selectedOptionId
                ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[5px_5px_0px_#000] cursor-pointer animate-jelly'
                : 'bg-slate-200 text-slate-400 border-2 border-slate-400 shadow-none cursor-not-allowed'
            }`}
          >
            <span>{currentQIndex === QUESTIONS.length - 1 ? 'SUBMIT ANSWERS 🚀' : 'Next Question'}</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
