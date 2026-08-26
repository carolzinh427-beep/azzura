import React, { useEffect, useState } from 'react';
import { calculateTimeLeft, TimeLeft } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
  variant?: 'minimal' | 'cards' | 'hero';
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  className = '',
  variant = 'hero',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-400 ${className}`}>
        {units.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2">
            <span className="text-white font-bold">{String(unit.value).padStart(2, '0')}</span>
            <span className="text-[10px] text-zinc-500">{unit.label[0]}</span>
            {index < units.length - 1 && <span className="text-zinc-600">:</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 ${className}`}>
      {units.map((unit) => (
        <div
          key={unit.label}
          className="group relative flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 rounded-none bg-[#0D0D0D]/80 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-[#2563EB]/50"
        >
          {/* Subtle Corner Accent */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-white/20 group-hover:bg-[#2563EB] transition-colors" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-white/20 group-hover:bg-[#2563EB] transition-colors" />

          {/* Number with flip/stagger effect */}
          <div className="relative overflow-hidden font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.value}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="inline-block"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Unit Label */}
          <span className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-widest text-zinc-400 group-hover:text-[#3B82F6] transition-colors uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
