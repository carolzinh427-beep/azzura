import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Ticket, Sparkles, Plus, Minus, ArrowRight } from 'lucide-react';
import { EventItem, TicketTier } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { useToast } from './Toast';
import confetti from 'canvas-confetti';

interface TicketModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ event, isOpen, onClose }) => {
  const { success } = useToast();
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-first');
  const [quantity, setQuantity] = useState<number>(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Fallback tiers if event doesn't specify
  const tiers: TicketTier[] = event?.ticketTiers || [
    {
      id: 'tier-first',
      name: 'GENERAL ACCESS RELEASE',
      price: 38.00,
      currency: 'GBP',
      description: 'Full day and night access to Skyline Terrace & Subterranean Vaults.',
      status: 'AVAILABLE',
      entryTime: 'Valid all day',
      perks: ['Full Event Entry', 'Void Acoustics Audio Experience', '360° London Skyline View'],
    },
    {
      id: 'tier-backstage',
      name: 'BACKSTAGE & VIP ACCESS PASS',
      price: 75.00,
      currency: 'GBP',
      description: 'Express entry, artist lounge access, dedicated cocktail bar and fast-track cloakroom.',
      status: 'FEW_LEFT',
      entryTime: 'Valid all day',
      perks: ['VIP Fast Track', 'Artist Lounge Access', 'Private Restrooms & Bar', 'Complimentary Cloakroom'],
    }
  ];

  const selectedTier = tiers.find((t) => t.id === selectedTierId) || tiers[0];
  const totalPrice = (selectedTier?.price || 0) * quantity;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);

      // Trigger Celebration Confetti with Azzura colors (blue, silver, white)
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#3B82F6', '#FFFFFF', '#151515'],
        });
      } catch {
        // Confetti fallback
      }

      success(
        'RESERVATION CONFIRMED',
        `Your reservation for ${quantity}x ${selectedTier.name} has been processed.`
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
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#0C0C0C] border border-white/15 text-white shadow-2xl shadow-black overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between bg-black/40">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#2563EB] uppercase mb-1">
                <Ticket className="w-3.5 h-3.5" />
                <span>OFFICIAL TICKET RESERVATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {event.title}
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                {event.displayDate} — {event.time} // {event.venue}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="Close ticket modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isComplete ? (
            <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#2563EB]/20 border border-[#2563EB] flex items-center justify-center text-[#2563EB]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold">ACCESS GRANTED</h3>
              <p className="text-sm text-zinc-400 max-w-md">
                Your entry passes for <span className="text-white font-medium">{event.title}</span> have been sent to your email. The atmosphere is everything.
              </p>
              <div className="pt-4 font-mono text-xs text-[#3B82F6]">
                QR PASSES READY IN DIGITAL WALLET
              </div>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="p-6 space-y-6">
              {/* Ticket Tier Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  SELECT TICKET CATEGORY
                </label>
                <div className="space-y-2.5">
                  {tiers.map((tier) => {
                    const isSelected = tier.id === selectedTierId;
                    const isSoldOut = tier.status === 'SOLD_OUT';

                    return (
                      <div
                        key={tier.id}
                        onClick={() => !isSoldOut && setSelectedTierId(tier.id)}
                        className={`p-4 border transition-all cursor-pointer ${
                          isSoldOut
                            ? 'opacity-40 border-white/5 cursor-not-allowed bg-black/20'
                            : isSelected
                            ? 'border-[#2563EB] bg-[#2563EB]/10'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-zinc-600'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white">
                                {tier.name}
                              </span>
                              {tier.entryTime && (
                                <span className="block text-[11px] text-zinc-400 font-mono">
                                  {tier.entryTime}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-base sm:text-lg font-bold font-mono text-white">
                              {formatCurrency(tier.price, tier.currency)}
                            </span>
                            {tier.status === 'FEW_LEFT' && (
                              <span className="block text-[10px] font-mono text-amber-400">
                                FINAL ALLOCATION
                              </span>
                            )}
                            {tier.status === 'SOLD_OUT' && (
                              <span className="block text-[10px] font-mono text-red-400">
                                SOLD OUT
                              </span>
                            )}
                          </div>
                        </div>

                        {isSelected && tier.perks && (
                          <div className="mt-3 pt-3 border-t border-[#2563EB]/20 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300">
                            {tier.perks.map((perk, i) => (
                              <div key={i} className="flex items-center gap-1.5 font-mono text-[11px]">
                                <span className="text-[#2563EB]">•</span>
                                <span>{perk}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10">
                <div>
                  <span className="text-xs font-mono text-zinc-400 block uppercase">QUANTITY</span>
                  <span className="text-xs text-zinc-500">Max 6 tickets per guest</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-lg font-bold w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(6, quantity + 1))}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Summary & Guarantee */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm font-mono border-t border-white/10 pt-4">
                  <span className="text-zinc-400">TOTAL DUE</span>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {formatCurrency(totalPrice, selectedTier.currency)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                  <span>Secure 256-Bit Encrypted Checkout // Instant Digital Pass Delivery</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>AUTHENTICATING RESERVATION...</span>
                ) : (
                  <>
                    <span>CONFIRM & GET TICKETS ({formatCurrency(totalPrice, selectedTier.currency)})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
