import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-6 text-center text-white">
      <div className="space-y-6 max-w-md">
        <div className="w-16 h-16 mx-auto rounded-none bg-[#2563EB]/10 border border-[#2563EB] flex items-center justify-center text-[#2563EB]">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-[#2563EB] tracking-widest uppercase block">
            404 // FREQUENCY LOST
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight">
            PAGE NOT FOUND
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            The coordinates you requested do not exist within the Azzura London sonic space.
          </p>
        </div>

        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-[#2563EB] hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO AZZURA</span>
          </a>
        </div>
      </div>
    </div>
  );
};
