import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { store } from '../../lib/store';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../lib/LanguageContext';

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
    <section id="contact" className="relative py-28 sm:py-36 bg-[#000000] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight">
              {t.contact.title}
            </h2>
          </div>

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-[#0C0C0C] border border-white/10 space-y-6">
              <span className="text-xs font-mono text-[#2563EB] tracking-widest uppercase block">
                HEADQUARTERS
              </span>
              <div>
                <p className="font-display text-xl font-bold text-white uppercase">{t.contact.hqTitle}</p>
                <p className="text-xs font-mono text-zinc-400 mt-1">{t.contact.hqCity}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block uppercase">{t.contact.generalDesk}</span>
                  <a href="mailto:contact@azzura.events" className="text-white hover:text-[#3B82F6] transition-colors">
                    contact@azzura.events
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block uppercase">{t.contact.vipDesk}</span>
                  <a href="mailto:vip@azzura.events" className="text-white hover:text-[#3B82F6] transition-colors">
                    vip@azzura.events
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block uppercase">{t.contact.pressDesk}</span>
                  <a href="mailto:press@azzura.events" className="text-white hover:text-[#3B82F6] transition-colors">
                    press@azzura.events
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 text-xs font-mono text-zinc-400 leading-relaxed">
              {t.contact.notice}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-[#0C0C0C] border border-white/10 p-6 sm:p-10 space-y-8">
              <div className="space-y-3">
                <label className="block text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  {t.contact.selectCat}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3.5 text-xs font-mono tracking-wider uppercase text-left border transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-[#2563EB]/15 border-[#2563EB] text-white font-bold'
                          : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono tracking-widest text-zinc-400 uppercase">
                    {t.contact.yourName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-3.5 bg-black/60 border border-white/10 text-white placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#2563EB] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono tracking-widest text-zinc-400 uppercase">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full px-4 py-3.5 bg-black/60 border border-white/10 text-white placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#2563EB] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  {t.contact.subject}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.contact.subjectPlaceholder}
                  className="w-full px-4 py-3.5 bg-black/60 border border-white/10 text-white placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#2563EB] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  {t.contact.message}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-3.5 bg-black/60 border border-white/10 text-white placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t.contact.sending}</span>
                ) : isSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{t.contact.sent}</span>
                  </>
                ) : (
                  <>
                    <span>{t.contact.send}</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
