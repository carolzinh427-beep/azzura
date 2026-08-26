import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cookie, X, Lock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

export const LGPDBanner: React.FC = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('azzura_lgpd_consent');
      if (!consent) {
        // Show after a brief graceful delay
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage fallback
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('azzura_lgpd_consent', 'accepted_all');
    } catch {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('azzura_lgpd_consent', 'essential_only');
    } catch {}
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg md:max-w-xl z-[9990] select-none"
            role="region"
            aria-label="LGPD Privacy Banner"
          >
            <div className="relative p-5 sm:p-6 bg-[#0C0C0C]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden group">
              {/* Subtle top purple neon rim light */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent opacity-80" />

              <div className="flex items-start gap-4">
                {/* Icon with glow */}
                <div className="w-10 h-10 rounded-2xl bg-[#9333EA]/15 border border-[#9333EA]/40 flex items-center justify-center text-[#C084FC] flex-shrink-0 shadow-lg shadow-[#9333EA]/20">
                  <Cookie className="w-5 h-5" />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#C084FC] uppercase font-bold">
                        {t.lgpd.badge}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#A855F7]" />
                    </div>

                    <button
                      onClick={handleEssentialOnly}
                      className="text-zinc-500 hover:text-white transition-colors p-1"
                      aria-label="Dismiss banner"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-tight">
                    {t.lgpd.title}
                  </h4>

                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {t.lgpd.desc}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-2.5">
                    {/* Accept All */}
                    <button
                      onClick={handleAcceptAll}
                      className="px-4 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white text-xs font-mono font-bold tracking-wider rounded-full uppercase transition-all shadow-lg shadow-[#9333EA]/35 cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.lgpd.acceptAll}</span>
                    </button>

                    {/* Essential Only */}
                    <button
                      onClick={handleEssentialOnly}
                      className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/15 text-xs font-mono font-medium tracking-wider rounded-full uppercase transition-all cursor-pointer"
                    >
                      {t.lgpd.essentialOnly}
                    </button>

                    {/* Privacy Policy Modal Trigger */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-2 py-1 text-[11px] font-mono text-zinc-400 hover:text-[#C084FC] transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      {t.lgpd.privacyPolicy}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* In-depth LGPD / Privacy Policy Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-[#0E0E0E] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col overflow-hidden text-zinc-300 font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#9333EA]/20 flex items-center justify-center text-[#C084FC]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">
                      {language === 'pt' ? 'DIRETRIZES DE PRIVACIDADE & LGPD' : 'DATA PRIVACY & LGPD COMPLIANCE'}
                    </h3>
                    <span className="text-[10px] font-mono text-[#A855F7] tracking-widest uppercase">
                      AZZURA EVENTS LDN // LEI Nº 13.709/2018 & GDPR
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4 overflow-y-auto text-xs sm:text-sm leading-relaxed pr-2 font-mono">
                {language === 'pt' ? (
                  <>
                    <section className="space-y-1">
                      <h4 className="text-white font-bold uppercase text-xs">1. Compromisso com a Privacidade</h4>
                      <p className="text-zinc-400">
                        A Azzura Events valoriza a sua privacidade e garante total transparência no tratamento de dados pessoais coletados durante a navegação e aquisição de ingressos para nossas experiências exclusivas.
                      </p>
                    </section>

                    <section className="space-y-1">
                      <h4 className="text-white font-bold uppercase text-xs">2. Quais Dados Coletamos</h4>
                      <p className="text-zinc-400">
                        • Dados cadastrais para emissão de ingressos (Nome, E-mail, Documento/Telefone).<br />
                        • Cookies estritamente necessários para autenticação de sessão e prevenção de fraudes.<br />
                        • Preferências sonoras e de idioma selecionadas pelo usuário.
                      </p>
                    </section>

                    <section className="space-y-1">
                      <h4 className="text-white font-bold uppercase text-xs">3. Seus Direitos (Art. 18 da LGPD)</h4>
                      <p className="text-zinc-400">
                        Você tem o direito de solicitar a qualquer momento a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou a eliminação dos dados tratados através do e-mail: <strong className="text-white">privacy@azzura.events</strong>.
                      </p>
                    </section>

                    <section className="space-y-1">
                      <h4 className="text-white font-bold uppercase text-xs">4. Segurança da Informação</h4>
                      <p className="text-zinc-400">
                        Todas as transações e reservas são criptografadas de ponta a ponta com certificados SSL/TLS 256-Bit e processadas em conformidade com os mais altos padrões internacionais de segurança.
                      </p>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="space-y-1">
                      <h4 className="text-white font-bold uppercase text-xs">1. Privacy Commitment</h4>
                      <p className="text-zinc-400">
                        Azzura Events is dedicated to protecting your personal data and ensuring complete transparency regarding the collection and processing of information across our digital portal and ticketing operations.
                      </p>
                    </section>

                    <section className="space-y-1">
                      <h4 className="text-white font-bold uppercase text-xs">2. Collected Information</h4>
                      <p className="text-zinc-400">
                        • Guest verification data for digital ticket passes (Full Name, Email, Contact).<br />
                        • Essential session cookies for security, anti-fraud, and audio engine preferences.<br />
                        • Anonymized telemetry for spatial atmosphere optimization.
                      </p>
                    </section>

                    <section className="space-y-1">
                      <h4 className="text-white font-bold uppercase text-xs">3. Your Data Rights</h4>
                      <p className="text-zinc-400">
                        In accordance with LGPD and GDPR regulations, you may at any time request access, rectification, or complete deletion of your records by contacting our data protection officer at: <strong className="text-white">privacy@azzura.events</strong>.
                      </p>
                    </section>

                    <section className="space-y-1">
                      <h4 className="text-white font-bold uppercase text-xs">4. Security Standards</h4>
                      <p className="text-zinc-400">
                        All reservation transmissions are secured with 256-bit encryption protocols and verified against international payment security standards.
                      </p>
                    </section>
                  </>
                )}
              </div>

              {/* Footer CTA */}
              <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#9333EA]/30"
                >
                  {t.lgpd.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LGPDBanner;
