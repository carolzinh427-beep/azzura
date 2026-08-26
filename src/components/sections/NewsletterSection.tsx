import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Shield } from 'lucide-react';
import { store } from '../../lib/store';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../lib/LanguageContext';

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#2563EB] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.newsletter.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tight">
            {t.newsletter.title}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {t.newsletter.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#0E0E0E] p-1.5 border border-white/15 focus-within:border-[#2563EB] transition-colors">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-zinc-600 font-mono text-xs focus:outline-none"
            />

            <button
              type="submit"
              disabled={isSubmitting || isJoined}
              className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
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
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
            <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{t.newsletter.privacy}</span>
          </div>
        </form>
      </div>
    </section>
  );
};
