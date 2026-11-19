export interface QuestionOption {
  id: string;
  text: string;
  emoji: string;
  vibe: 'dude' | 'bro' | 'princess' | 'chaos';
  points: number; // positive = bro/man vibe, negative = princess vibe
}

export interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "When your phone battery reaches 1%, what do you do?",
    subtitle: "A crucial test of your survival instincts and thrill-seeking tendencies.",
    options: [
      {
        id: "1a",
        text: "Keep watching Reels/YouTube until the screen dies in my hands like a warrior",
        emoji: "⚔️",
        vibe: "bro",
        points: 2
      },
      {
        id: "1b",
        text: "Panic, sprint across the room knocking down furniture to find a charger",
        emoji: "🏃‍♂️",
        vibe: "dude",
        points: 1
      },
      {
        id: "1c",
        text: "Calmly plug it into my pre-planned 20,000mAh aesthetic power bank",
        emoji: "💅",
        vibe: "princess",
        points: -2
      },
      {
        id: "1d",
        text: "Turn brightness to 0%, close 97 open tabs, and pray to battery gods",
        emoji: "🔋",
        vibe: "chaos",
        points: 1
      }
    ]
  },
  {
    id: 2,
    question: "How often do you look in the mirror?",
    subtitle: "Let's measure your vanity metrics and hair-fixing frequency.",
    options: [
      {
        id: "2a",
        text: "Only to check if my imaginary gym pump is finally visible from a 45° angle",
        emoji: "💪",
        vibe: "bro",
        points: 2
      },
      {
        id: "2b",
        text: "Quick 2-second glance in the morning, comb hair with fingers, good to go",
        emoji: "🦁",
        vibe: "dude",
        points: 2
      },
      {
        id: "2c",
        text: "Every 15 minutes, with a 12-step skincare check and lip balm touchup",
        emoji: "🪞",
        vibe: "princess",
        points: -2
      },
      {
        id: "2d",
        text: "Only when brushing teeth, mostly avoiding eye contact with my reflection",
        emoji: "🪥",
        vibe: "chaos",
        points: 1
      }
    ]
  },
  {
    id: 3,
    question: "What's your reaction when someone says, 'We need to talk'?",
    subtitle: "Cardiovascular endurance test initiated.",
    options: [
      {
        id: "3a",
        text: 'Immediately ask, "Am I in trouble?" despite doing absolutely nothing.',
        emoji: "💀",
        vibe: "dude",
        points: 2
      },
      {
        id: "3b",
        text: "Reconstruct every conversation from the past 6 months to find the crime.",
        emoji: "🕵️",
        vibe: "bro",
        points: 2
      },
      {
        id: "3c",
        text: "Start drafting a resignation letter from this friendship and pretend we never met.",
        emoji: "✈️",
        vibe: "chaos",
        points: 1
      },
      {
        id: "3d",
        text: 'Reply "Okay" and pretend to be mentally prepared for whatever comes next.',
        emoji: "🗿",
        vibe: "dude",
        points: 2
      }
    ]
  },
  {
    id: 4,
    question: "What is your ideal weekend?",
    subtitle: "Honesty is required. The AI algorithms are scanning your subconscious.",
    options: [
      {
        id: "4a",
        text: "Gaming until 4 AM with the homies, eating pizza, zero responsibilities",
        emoji: "🎮",
        vibe: "bro",
        points: 2
      },
      {
        id: "4b",
        text: "Sitting in absolute silence staring at a blank wall for 6 undisturbed hours",
        emoji: "🧘‍♂️",
        vibe: "dude",
        points: 2
      },
      {
        id: "4c",
        text: "Brunch at an aesthetic café taking 400 photos of avocado toast from different lighting angles",
        emoji: "🥑",
        vibe: "princess",
        points: -2
      },
      {
        id: "4d",
        text: "Researching random historical events or fixing a random squeaky door for 8 hours",
        emoji: "🔧",
        vibe: "chaos",
        points: 2
      }
    ]
  },
  {
    id: 5,
    question: "How do you react when your friends cancel plans?",
    subtitle: "The ultimate psychological litmus test.",
    options: [
      {
        id: "5a",
        text: "Reply 'Ah that sucks man' while internally throwing the biggest celebration party of my life",
        emoji: "🥳",
        vibe: "bro",
        points: 2
      },
      {
        id: "5b",
        text: "Immediately put on sweatpants and dive onto the bed like an Olympic champion",
        emoji: "🛏️",
        vibe: "dude",
        points: 2
      },
      {
        id: "5c",
        text: "Cry in a pastel cardigan, call my bestie for 2 hours, and analyze our horoscope compatibilities",
        emoji: "🌸",
        vibe: "princess",
        points: -2
      },
      {
        id: "5d",
        text: "'Cancel? What plans?' (I forgot we had plans in the first place)",
        emoji: "🤷‍♂️",
        vibe: "chaos",
        points: 2
      }
    ]
  }
];
