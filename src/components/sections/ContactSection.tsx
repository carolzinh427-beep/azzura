import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { store } from '../../lib/store';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../lib/LanguageContext';
import SpecularButton from '../common/SpecularButton';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { success, error } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('GENERAL ENQUIRIES');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const categories = [
    { id: 'GENERAL ENQUIRIES', label: t.contact.categories.general },
    { id: 'EVENT PARTNERSHIPS', label: t.contact.categories.partnerships },
    { id: 'ARTISTS', label: t.contact.categories.artists },
    { id: 'PRIVATE EVENTS', label: t.contact.categories.private },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      error('VALIDATION REQUIRED', 'Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await store.addContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        category: selectedCategory as any,
        subject: formData.subject.trim() || `${selectedCategory} Inquiry`,
        message: formData.message.trim(),
      });

      if (res.success) {
        setIsSent(true);
        success('MESSAGE DISPATCHED', res.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      }
    } catch {
      error('ERROR', 'Unable to submit your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-[#000000] border-t border-white/10 select-none overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#A855F7] tracking-[0.2em] uppercase font-bold block mb-1.5">
              {t.contact.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight break-words">
              {t.contact.title}
            </h2>
          </div>

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 bg-[#0C0C0C] rounded-2xl sm:rounded-3xl border border-white/10 space-y-5 sm:space-y-6 shadow-xl">
              <span className="text-xs font-mono text-[#9333EA] tracking-widest uppercase block font-semibold">
                HEADQUARTERS
              </span>
              <div>
                <p className="font-display text-lg sm:text-xl font-bold text-white uppercase">{t.contact.hqTitle}</p>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400 mt-1">{t.contact.hqCity}</p>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] sm:text-xs">{t.contact.generalDesk}</span>
                  <a href="mailto:contact@azzura.events" className="text-white hover:text-[#A855F7] transition-colors">
                    contact@azzura.events
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] sm:text-xs">{t.contact.vipDesk}</span>
                  <a href="mailto:vip@azzura.events" className="text-white hover:text-[#A855F7] transition-colors">
                    vip@azzura.events
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] sm:text-xs">{t.contact.pressDesk}</span>
                  <a href="mailto:press@azzura.events" className="text-white hover:text-[#A855F7] transition-colors">
                    press@azzura.events
                  </a>
                </div>
              </div>

              <p className="text-[10px] font-mono text-zinc-500 pt-3 border-t border-white/5 leading-relaxed">
                {t.contact.notice}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-[#0C0C0C] rounded-2xl sm:rounded-3xl border border-white/10 space-y-6 shadow-xl">
              {/* Category Pills */}
              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  {t.contact.selectCat}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2 sm:p-2.5 rounded-xl border text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer text-center truncate ${
                        selectedCategory === cat.id
                          ? 'bg-[#9333EA]/20 border-[#9333EA] text-white font-bold shadow-md'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    {t.contact.yourName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    required
                    className="w-full px-3.5 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#9333EA] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailPlaceholder}
                    required
                    className="w-full px-3.5 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#9333EA] transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  {t.contact.subject}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.contact.subjectPlaceholder}
                  className="w-full px-3.5 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#9333EA] transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  {t.contact.message}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  className="w-full px-3.5 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#9333EA] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <SpecularButton
                type="submit"
                disabled={isSubmitting}
                size="lg"
                tint="#9333EA"
                lineColor="#C084FC"
                baseColor="#7E22CE"
                intensity={1.3}
                radius={12}
                className="w-full font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-xl"
              >
                <div className="flex items-center justify-center gap-2 py-1">
                  {isSent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{t.contact.sent}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? t.contact.sending : t.contact.send}</span>
                    </>
                  )}
                </div>
              </SpecularButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
