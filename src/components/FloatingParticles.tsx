import React, { useMemo } from 'react';

interface Particle {
  id: number;
  item: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  isSticker?: boolean;
}

interface FloatingParticlesProps {
  theme?: 'cool' | 'princess' | 'party' | 'danger';
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ theme = 'cool' }) => {
  const items = useMemo(() => {
    switch (theme) {
      case 'princess':
        return [
          '👑', '💖', '✨', '💅', '🌸', '🎀', '🪞', '🍓', '💄', '🦄', '👠', '🪄', '🧁', '💎',
          'SLAY! 💅', 'QUEEN! 👑', 'XOXO 💖', 'SPARKLE ✨'
        ];
      case 'party':
        return [
          '🎉', '🏆', '⭐', '🎈', '🥳', '💥', '✨', '🍕', '🕶️', '🔥',
          'LEGEND! 🏆', 'BRO! 🗿', 'BOOM! 💥', 'W! 🥳', 'CHAD 💪'
        ];
      case 'danger':
        return [
          '🚨', '⚠️', '👀', '❌', '🛑', '🔥', '⚡', '🏃‍♂️', '💨',
          'RUN! 💨', 'OOPS! 🙈', 'DODGE! ⚡', 'MISS! 🎯'
        ];
      case 'cool':
      default:
        return [
          '🚀', '⚡', '🕶️', '🔥', '🎮', '👾', '✨', '🍕', '👀', '🧠', '🗿', '💯',
          'BRO! 👊', 'YO! 🤙', 'GAMER 🎮', 'POW! 💥'
        ];
    }
  }, [theme]);

  const particles: Particle[] = useMemo(() => {
    const count = theme === 'princess' ? 30 : 20;
    return Array.from({ length: count }).map((_, i) => {
      const val = items[i % items.length];
      const isSticker = val.includes(' ');
      return {
        id: i,
        item: val,
        left: Math.random() * 92,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 6,
        size: isSticker ? 13 : 24 + Math.random() * 18,
        isSticker,
      };
    });
  }, [items, theme]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`comic-particle select-none ${
            p.isSticker
              ? 'px-2.5 py-1 rounded-full bg-yellow-300 text-black border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000]'
              : ''
          }`}
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: p.isSticker ? '12px' : `${p.size}px`,
          }}
        >
          {p.item}
        </span>
      ))}
      
      {/* Cartoon ambient colorful light blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      {theme === 'princess' && (
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" />
      )}
    </div>
  );
};
