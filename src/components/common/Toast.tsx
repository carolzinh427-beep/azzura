import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  toast: (title: string, message?: string, type?: ToastType) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((title: string, message?: string, type: ToastType = 'info') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  const value: ToastContextValue = {
    toast: addToast,
    success: (title, message) => addToast(title, message, 'success'),
    error: (title, message) => addToast(title, message, 'error'),
    info: (title, message) => addToast(title, message, 'info'),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-3 max-w-md w-full px-4 sm:px-0 pointer-events-none">
        <AnimatePresence mode="sync">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-start gap-3.5 p-4 rounded-none bg-[#0E0E0E]/95 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80"
              style={{
                borderLeft: t.type === 'success' 
                  ? '3px solid #2563EB' 
                  : t.type === 'error' 
                  ? '3px solid #EF4444' 
                  : '3px solid #FFFFFF'
              }}
            >
              <div className="mt-0.5 shrink-0">
                {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />}
                {t.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                {t.type === 'info' && <Info className="w-5 h-5 text-zinc-300" />}
              </div>

              <div className="flex-1 pr-2">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-white font-mono">{t.title}</h4>
                {t.message && <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{t.message}</p>}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 p-1 text-zinc-500 hover:text-white transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
