import React, { useEffect, useState } from 'react';
import { calculateTimeLeft, TimeLeft } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../lib/LanguageContext';

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
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: t.nextEvent.days, value: timeLeft.days },
    { label: t.nextEvent.hours, value: timeLeft.hours },
    { label: t.nextEvent.minutes, value: timeLeft.minutes },
    { label: t.nextEvent.seconds, value: timeLeft.seconds },
  ];

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 sm:gap-4 text-xs font-mono tracking-widest text-zinc-400 ${className}`}>
        {units.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-white font-bold">{String(unit.value).padStart(2, '0')}</span>
            <span className="text-[10px] text-zinc-500">{unit.label[0]}</span>
            {index < units.length - 1 && <span className="text-zinc-600">:</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 ${className}`}>
      {units.map((unit) => (
        <div
          key={unit.label}
          className="group relative flex flex-col items-center justify-center p-2.5 sm:p-4 md:p-5 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-[#9333EA]/50 shadow-lg shadow-black/40"
        >
          {/* Number with flip/stagger effect */}
          <div className="relative overflow-hidden font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white group-hover:text-white transition-colors leading-none">
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
          <span className="mt-1 sm:mt-1.5 text-[8px] sm:text-[10px] md:text-xs font-mono tracking-widest text-zinc-400 group-hover:text-[#C084FC] transition-colors uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
