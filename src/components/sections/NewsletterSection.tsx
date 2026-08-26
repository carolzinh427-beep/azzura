import React, { useState } from 'react';
import { Mail, CheckCircle2, Shield } from 'lucide-react';
import { store } from '../../lib/store';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../lib/LanguageContext';
import SpecularButton from '../common/SpecularButton';

export const NewsletterSection: React.FC = () => {
  const { t } = useLanguage();
  const { success, error } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      error('INVALID EMAIL', 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await store.addSubscriber(email.trim(), 'Newsletter Section');
      if (res.success) {
        setIsSuccess(true);
        success('WELCOME TO AZZURA', res.message);
        setEmail('');
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        error('SUBSCRIPTION NOTICE', res.message);
      }
    } catch {
      error('ERROR', 'Unable to complete your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 sm:py-32 bg-[#050505] border-t border-white/10 select-none overflow-hidden w-full max-w-full">
      {/* Background Radial Glow (Strictly Contained) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#9333EA]/12 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        <span className="text-[10px] sm:text-[11px] font-mono text-[#A855F7] tracking-[0.2em] uppercase font-bold block mb-2">
          {t.newsletter.badge}
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight mb-4 break-words">
          {t.newsletter.title}
        </h2>

        <p className="text-xs sm:text-base text-zinc-300 font-sans max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
          {t.newsletter.subtitle}
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#0E0E0E] p-1.5 sm:p-2 rounded-2xl sm:rounded-full border border-white/15 focus-within:border-[#9333EA] shadow-xl transition-all">
            <div className="flex-1 flex items-center gap-2 px-3.5 py-2 sm:py-0">
              <Mail className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                required
                className="w-full bg-transparent text-white placeholder-zinc-500 font-mono text-xs focus:outline-none"
              />
            </div>

            <SpecularButton
              type="submit"
              disabled={isSubmitting}
              size="md"
              tint="#9333EA"
              lineColor="#C084FC"
              baseColor="#7E22CE"
              intensity={1.3}
              radius={999}
              className="font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-md py-2.5 sm:py-2"
            >
              {isSuccess ? (
                <div className="flex items-center gap-1.5 px-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.newsletter.joined}</span>
                </div>
              ) : isSubmitting ? (
                <span className="px-3">{t.newsletter.joining}</span>
              ) : (
                <span className="px-3">{t.newsletter.join}</span>
              )}
            </SpecularButton>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] sm:text-[11px] font-mono text-zinc-500">
            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9333EA]" />
            <span>{t.newsletter.privacy}</span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
