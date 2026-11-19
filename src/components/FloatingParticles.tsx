import React, { useMemo } from 'react';

interface Particle {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

interface FloatingParticlesProps {
  theme?: 'cool' | 'princess' | 'party' | 'danger';
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ theme = 'cool' }) => {
  const emojiSet = useMemo(() => {
    switch (theme) {
      case 'princess':
        return ['👑', '💖', '✨', '💅', '🌸', '🎀', '🪞', '🍓', '💄', '🦄', '👠', '🪄', '🧁', '💎', '🩰', '🌷', '👛', '👸'];
      case 'party':
        return ['🎉', '🚀', '🔥', '🏆', '⭐', '🎈', '🥳', '💥', '✨'];
      case 'danger':
        return ['🚨', '⚠️', '👀', '❌', '🛑', '🔥', '⚡'];
      case 'cool':
      default:
        return ['🚀', '⚡', '🕶️', '🔥', '🎮', '👾', '✨', '🍕', '👀', '🧠'];
    }
  }, [theme]);

  const particles: Particle[] = useMemo(() => {
    const count = theme === 'princess' ? 36 : 18;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      emoji: emojiSet[i % emojiSet.length],
      left: Math.random() * 95,
      duration: theme === 'princess' ? 7 + Math.random() * 8 : 10 + Math.random() * 12,
      delay: Math.random() * 6,
      size: theme === 'princess' ? 22 + Math.random() * 26 : 18 + Math.random() * 22,
    }));
  }, [emojiSet, theme]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="floating-particle select-none opacity-40 hover:opacity-80 transition-opacity"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      {/* Dynamic ambient background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-fast" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-fast" style={{ animationDelay: '1.5s' }} />
      {theme === 'princess' && (
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-pink-500/25 rounded-full blur-3xl pointer-events-none animate-pulse-fast" />
      )}
    </div>
  );
};
