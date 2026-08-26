import React, { useState } from 'react';
import { ArrowRight, Check, Shield } from 'lucide-react';
import { store } from '../../lib/store';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../lib/LanguageContext';
import SpecularButton from '../common/SpecularButton';

export const NewsletterSection: React.FC = () => {
  const { t } = useLanguage();
  const { success, error } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      error('INVALID EMAIL', 'Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await store.addSubscriber(email.trim(), 'Newsletter Footer');
      if (res.success) {
        setIsJoined(true);
        success('VIP ATMOSPHERE ACCESS', res.message);
        setEmail('');
      } else {
        error('ERROR', res.message);
      }
    } catch {
      error('ERROR', 'Unable to subscribe at this moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#080808] border-t border-white/10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9333EA]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8 bg-[#0C0C0C]/80 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-white/10 shadow-2xl">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tight">
            {t.newsletter.title}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {t.newsletter.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#0E0E0E] p-2 rounded-full border border-white/15 focus-within:border-[#9333EA] shadow-xl transition-all">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="flex-1 px-5 py-3 bg-transparent text-white placeholder-zinc-600 font-mono text-xs focus:outline-none"
            />

            <SpecularButton
              size="md"
              radius={24}
              tint="#9333EA"
              tintOpacity={0.95}
              lineColor="#93C5FD"
              baseColor="#581C87"
              intensity={1.3}
              type="submit"
              disabled={isSubmitting || isJoined}
              className="font-mono text-xs font-bold tracking-widest uppercase shadow-lg shadow-[#9333EA]/25"
            >
              {isSubmitting ? (
                <span>{t.newsletter.joining}</span>
              ) : isJoined ? (
                <>
                  <span>{t.newsletter.joined}</span>
                  <Check className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>{t.newsletter.join}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </SpecularButton>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
            <Shield className="w-3.5 h-3.5 text-[#9333EA]" />
            <span>{t.newsletter.privacy}</span>
          </div>
        </form>
      </div>
    </section>
  );
};
