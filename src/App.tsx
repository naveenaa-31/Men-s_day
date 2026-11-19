import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingParticles } from './components/FloatingParticles';
import { Page1NameEntry } from './pages/Page1NameEntry';
import { Page2Investigation } from './pages/Page2Investigation';
import { Page3AWomanRejection } from './pages/Page3AWomanRejection';
import { Page3BManSuccess } from './pages/Page3BManSuccess';
import { Page4ImpossibleButton } from './pages/Page4ImpossibleButton';
import { Page5Celebration } from './pages/Page5Celebration';
import { ScanLoadingModal } from './components/ScanLoadingModal';
import { QuestionOption } from './data/questions';
import { analyzePersonality, AnalysisResult } from './utils/aiAnalysis';

export const App: React.FC = () => {
  // Main app state
  const [userName, setUserName] = useState<string>('');
  const [creatorName, setCreatorName] = useState<string>('dwarf');
  const [testModeGender, setTestModeGender] = useState<'auto' | 'man' | 'woman'>('auto');

  // Steps:
  // 1: Name Entry
  // 1.5: Name Scanning Loading
  // 2: Investigation (5 questions)
  // 2.5: AI Personality Analysis Loading
  // 3: 3A (Woman rejection) OR 3B (Man success)
  // 4: Impossible Dodge Button Challenge
  // 5: Final Men's Day Celebration
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuestionOption[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Loading modal state
  const [isScanning, setIsScanning] = useState(false);
  const [scanTitle, setScanTitle] = useState('');
  const [scanStages, setScanStages] = useState<string[]>([]);
  const [onScanFinish, setOnScanFinish] = useState<() => void>(() => () => {});

  // Handlers
  const handleNameSubmitted = (name: string) => {
    setUserName(name);
    // Transition to Page 2 with animated loading screen
    setScanTitle('SCANNING FACIAL BIOMETRICS...');
    setScanStages([
      'Accessing quantum camera lens...',
      'Measuring jawline sharpness coefficient...',
      'Cross-referencing with Interpol bro-archives...',
      'Verifying identity profile...'
    ]);
    setOnScanFinish(() => () => {
      setIsScanning(false);
      setCurrentStep(2);
    });
    setIsScanning(true);
  };

  const handleQuestionsCompleted = (selectedAnswers: QuestionOption[]) => {
    setAnswers(selectedAnswers);

    // Calculate simulated personality
    const forced = testModeGender === 'auto' ? undefined : testModeGender;
    const result = analyzePersonality(selectedAnswers, forced);
    setAnalysisResult(result);

    // Animated loading screen as required:
    // "AI IS ANALYSING YOUR ANSWERS..."
    // "CALCULATING PERSONALITY..."
    // "VERIFYING YOUR ELIGIBILITY..."
    // "FINAL VERDICT READY!"
    setScanTitle('NEURAL PERSONALITY ANALYSIS');
    setScanStages([
      'AI IS ANALYSING YOUR ANSWERS...',
      'CALCULATING PERSONALITY...',
      'VERIFYING YOUR ELIGIBILITY...',
      'FINAL VERDICT READY!'
    ]);
    setOnScanFinish(() => () => {
      setIsScanning(false);
      setCurrentStep(3);
    });
    setIsScanning(true);
  };

  const handleReset = () => {
    setUserName('');
    setAnswers([]);
    setAnalysisResult(null);
    setCurrentStep(1);
    setIsScanning(false);
  };

  // Determine current theme for background floating particles
  const currentTheme =
    currentStep === 3 && analysisResult?.predictedGender === 'woman'
      ? 'princess'
      : currentStep === 5
      ? 'party'
      : currentStep === 4
      ? 'danger'
      : 'cool';

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-slate-950 text-white">
      {/* Dynamic Animated Background Particles */}
      <FloatingParticles theme={currentTheme} />

      {/* Persistent Navigation Bar */}
      <Navbar
        currentStep={Math.floor(currentStep)}
        onReset={handleReset}
        creatorName={creatorName}
        onUpdateCreatorName={(name) => setCreatorName(name)}
        testModeGender={testModeGender}
        onSetTestModeGender={(g) => setTestModeGender(g)}
      />

      {/* Animated Loading Transition Modal */}
      {isScanning && (
        <ScanLoadingModal
          title={scanTitle}
          stages={scanStages}
          userName={userName || 'Subject'}
          durationMs={3000}
          onComplete={onScanFinish}
        />
      )}

      {/* Main Multi-Step Content Area */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-2 py-4">
        {/* Step 1: Name Entry */}
        {currentStep === 1 && (
          <Page1NameEntry
            onNameSubmitted={handleNameSubmitted}
            creatorName={creatorName}
          />
        )}

        {/* Step 2: The Gender Investigation (5 Questions) */}
        {currentStep === 2 && (
          <Page2Investigation
            userName={userName}
            onQuestionsCompleted={handleQuestionsCompleted}
          />
        )}

        {/* Step 3: Branching Results (3A or 3B) */}
        {currentStep === 3 && (
          <>
            {analysisResult?.predictedGender === 'woman' ? (
              <Page3AWomanRejection
                userName={userName}
                confidenceScore={analysisResult.confidenceScore}
                onContinueAsBro={() => setCurrentStep(4)}
                onReset={() => setCurrentStep(2)}
              />
            ) : (
              <Page3BManSuccess
                userName={userName}
                confidenceScore={analysisResult?.confidenceScore || '98.7%'}
                onProceedToAgilityTest={() => setCurrentStep(4)}
              />
            )}
          </>
        )}

        {/* Step 4: The Impossible Button Challenge */}
        {currentStep === 4 && (
          <Page4ImpossibleButton
            userName={userName}
            onVerificationComplete={() => setCurrentStep(5)}
          />
        )}

        {/* Step 5: The Final Men's Day Surprise */}
        {currentStep === 5 && (
          <Page5Celebration
            userName={userName}
            creatorName={creatorName}
            analysisResult={analysisResult}
            answers={answers}
            onRestart={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-3 text-center text-xs text-slate-500 border-t border-white/5 bg-slate-950/40 backdrop-blur-sm">
        <p>
          International Men's Day • November 19, 2026 • Dedicated to laughter, bromance, and brotherhood.
        </p>
      </footer>
    </div>
  );
};

export default App;
