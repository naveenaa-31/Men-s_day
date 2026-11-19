import { QuestionOption } from '../data/questions';

export interface AnalysisResult {
  predictedGender: 'man' | 'woman';
  confidenceScore: string;
  broScore: number;
  princessScore: number;
  funnyObservations: string[];
  techLogs: string[];
}

export const analyzePersonality = (
  answers: QuestionOption[],
  forcedOutcome?: 'man' | 'woman'
): AnalysisResult => {
  let broScore = 0;
  let princessScore = 0;

  answers.forEach((ans) => {
    if (ans.points > 0) {
      broScore += ans.points;
    } else {
      princessScore += Math.abs(ans.points);
    }
  });

  const predictedGender: 'man' | 'woman' =
    forcedOutcome || (princessScore > broScore ? 'woman' : 'man');

  // Random hilarious confidence score around 98.4% - 99.9%
  const randomConfidence = (97.5 + Math.random() * 2.4).toFixed(1) + '%';

  const manObservations = [
    "Detected 99.4% likelihood of possessing at least one mysterious tangled black cable that doesn't fit any current device.",
    "Internal brain scans show 84% thoughts occupied by the Roman Empire, random gym PRs, or sleeping.",
    "Reflex analysis shows instinctive urge to smack bags of soil at hardware stores.",
    "Speech pattern analysis confirms using 'Yo', 'Bro', and 'Bet' in 68% of daily conversations."
  ];

  const womanObservations = [
    "Aesthetic radar detected: Critical levels of cute stationery and 40-step skincare routines.",
    "Emotional intelligence registers dangerously high on our radar (incompatible with bro-system v1.0).",
    "Thermal sensors indicate freezing cold hands despite ambient temperature being 32°C.",
    "Our AI detected 4,821 screenshots in camera roll with zero intention of ever deleting them."
  ];

  const techLogs = [
    "INITIALIZING QUANTUM BRAIN PROBE v9.42...",
    "SCANNING CEREBRAL MEME CACHE...",
    "CROSS-REFERENCING NASA & BRO-CODE REPOSITORIES...",
    "MEASURING TESTOSTERONE / MATCHA LATTE RATIO...",
    "CALCULATING STATISTICAL IMPOSSIBILITY OF SITTING STILL...",
    "SYNTHESIZING FINAL SCIENTIFIC VERDICT..."
  ];

  return {
    predictedGender,
    confidenceScore: randomConfidence,
    broScore,
    princessScore,
    funnyObservations: predictedGender === 'man' ? manObservations : womanObservations,
    techLogs
  };
};
