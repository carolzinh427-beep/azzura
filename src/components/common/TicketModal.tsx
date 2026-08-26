import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Ticket, Sparkles, Plus, Minus, ArrowRight } from 'lucide-react';
import { EventItem, TicketTier } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { useToast } from './Toast';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../lib/LanguageContext';
import SpecularButton from './SpecularButton';

interface TicketModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ event, isOpen, onClose }) => {
  const { t } = useLanguage();
  const { success } = useToast();
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-first');
  const [quantity, setQuantity] = useState<number>(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const tiers: TicketTier[] = event?.ticketTiers || [
    {
      id: 'tier-early',
      name: 'EARLY SUNSET ENTRY',
      price: 35.00,
      currency: 'GBP',
      description: 'Entry before 16:30. Includes complimentary signature Azzura Blue cocktail.',
      status: 'AVAILABLE',
      entryTime: 'Before 16:30',
      perks: ['Queue Jump before 16:30', 'Welcome Drink', 'Access to Main Rooftop'],
    },
    {
      id: 'tier-first',
      name: 'FIRST RELEASE — GENERAL ACCESS',
      price: 40.00,
      currency: 'GBP',
      description: 'Full day and night access across both the Skyline Terrace and Underground Mezzanine.',
      status: 'AVAILABLE',
      entryTime: 'Valid all day',
      perks: ['Full Day Access', 'Void Acoustics Audio Experience', '360° London Skyline View'],
    },
    {
      id: 'tier-final',
      name: 'FINAL RELEASE & VIP FAST TRACK',
      price: 45.00,
      currency: 'GBP',
      description: 'Exclusive access to artist mezzanine bar, dedicated cloakroom, and express queue jump.',
      status: 'FEW_LEFT',
      entryTime: 'Valid all day',
      perks: ['Express VIP Fast Track', 'Artist Mezzanine Access', 'Dedicated Restrooms & Bar', 'Complimentary Cloakroom'],
    }
  ];

  const selectedTier = tiers.find((tier) => tier.id === selectedTierId) || tiers[0];
  const totalPrice = (selectedTier?.price || 0) * quantity;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#60A5FA', '#FFFFFF', '#1E40AF'],
        });
      } catch {
        // Fallback
      }

      success(
        t.ticketModal.accessGranted,
        `${quantity}x ${selectedTier.name}`
      );

      setTimeout(() => {
        setIsComplete(false);
        onClose();
      }, 2500);
    }, 1200);
  };

  if (!isOpen || !event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#0C0C0C]/95 backdrop-blur-2xl border border-white/15 text-white rounded-3xl shadow-2xl shadow-black/80 overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between bg-black/40">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#2563EB] uppercase mb-1">
                <Ticket className="w-3.5 h-3.5" />
                <span>{t.ticketModal.title}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-300 font-bold">£35.00 — £45.00</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-display font-black text-white tracking-tight uppercase">
                {event.title}
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                {event.displayDate} — {event.time} // {event.venue}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
              aria-label="Close ticket modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isComplete ? (
            <div className="p-10 sm:p-14 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#2563EB]/20 border border-[#2563EB] flex items-center justify-center text-[#2563EB] shadow-2xl shadow-[#2563EB]/30">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase">{t.ticketModal.accessGranted}</h3>
              <p className="text-sm text-zinc-400 max-w-md font-mono">
                {t.ticketModal.successMessage}
              </p>
              <div className="pt-4 font-mono text-xs text-[#3B82F6] px-4 py-2 bg-[#2563EB]/10 rounded-full border border-[#2563EB]/30">
                {t.ticketModal.walletReady}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                    {t.ticketModal.selectCategory}
                  </label>
                  <span className="text-[11px] font-mono text-[#3B82F6]">
                    OFFICIAL PRICE TIER
                  </span>
                </div>

                <div className="space-y-3">
                  {tiers.map((tier) => {
                    const isSelected = tier.id === selectedTierId;
                    const isSoldOut = tier.status === 'SOLD_OUT';

                    return (
                      <div
                        key={tier.id}
                        onClick={() => !isSoldOut && setSelectedTierId(tier.id)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          isSoldOut
                            ? 'opacity-40 border-white/5 cursor-not-allowed bg-black/20'
                            : isSelected
                            ? 'border-[#2563EB] bg-[#2563EB]/15 shadow-lg shadow-[#2563EB]/10'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-zinc-600'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-white">
                                  {tier.name}
                                </span>
                              </div>
                              <span className="block text-xs text-zinc-400 font-sans mt-0.5">
                                {tier.description}
                              </span>
                            </div>
                          </div>

                          <div className="text-right ml-4">
                            <span className="text-lg sm:text-xl font-bold font-mono text-white block">
                              {formatCurrency(tier.price, tier.currency)}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase">
                              PER GUEST
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div>
                  <span className="text-xs font-mono text-zinc-300 block uppercase font-semibold">{t.ticketModal.quantity}</span>
                  <span className="text-[11px] text-zinc-500 font-mono">{t.ticketModal.maxTickets}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-lg font-bold w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(6, quantity + 1))}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm font-mono border-t border-white/10 pt-4">
                  <span className="text-zinc-400 uppercase">{t.ticketModal.totalDue} ({quantity}x {formatCurrency(selectedTier.price, selectedTier.currency)})</span>
                  <span className="text-2xl sm:text-3xl font-display font-black text-white">
                    {formatCurrency(totalPrice, selectedTier.currency)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                  <span>{t.ticketModal.security}</span>
                </div>
              </div>

              {/* Specular Checkout CTA */}
              <SpecularButton
                size="lg"
                radius={12}
                tint="#2563EB"
                tintOpacity={0.95}
                lineColor="#93C5FD"
                baseColor="#1E40AF"
                intensity={1.3}
                type="submit"
                disabled={isProcessing}
                className="w-full font-mono text-xs font-bold tracking-widest uppercase shadow-xl shadow-[#2563EB]/25"
              >
                {isProcessing ? (
                  <span>{t.ticketModal.authenticating}</span>
                ) : (
                  <>
                    <span>{t.ticketModal.confirmBtn} ({formatCurrency(totalPrice, selectedTier.currency)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </SpecularButton>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
