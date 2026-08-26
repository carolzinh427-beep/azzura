import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Music2, Disc, Play, Pause } from 'lucide-react';
import { Artist } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';

interface LineupSectionProps {
  artists: Artist[];
}

export const LineupSection: React.FC<LineupSectionProps> = ({ artists }) => {
  const { t } = useLanguage();
  const [playingArtistId, setPlayingArtistId] = useState<string | null>(null);

  const toggleArtistAudio = (id: string) => {
    setPlayingArtistId(prev => (prev === id ? null : id));
  };

  return (
    <section id="lineup" className="relative py-28 sm:py-36 bg-[#000000] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Section Header without overhead tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tight">
              {t.lineup.title}
            </h2>
          </div>

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            {t.lineup.subtitle}
          </p>
        </div>

        {/* Editorial Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, idx) => {
            const isPlaying = playingArtistId === artist.id;

            return (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-[#0C0C0C] border border-white/10 hover:border-[#2563EB]/60 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Large Portrait */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#151515]">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-black/30" />

                  {/* Role Chip */}
                  {artist.role && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-black/80 border border-white/20 text-white">
                        {artist.role}
                      </span>
                    </div>
                  )}

                  {/* Audio Preview Control */}
                  <button
                    onClick={() => toggleArtistAudio(artist.id)}
                    className={`absolute bottom-4 right-4 p-3 rounded-none border transition-all ${
                      isPlaying
                        ? 'bg-[#2563EB] border-[#2563EB] text-white'
                        : 'bg-black/70 border-white/20 text-zinc-300 hover:text-white hover:border-white'
                    }`}
                    aria-label={`Toggle sample preview for ${artist.name}`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  {/* Soundwave Animation */}
                  {isPlaying && (
                    <div className="absolute bottom-4 left-4 flex items-end gap-1 h-5 px-2 py-1 bg-black/80 border border-[#2563EB]">
                      <span className="w-1 h-3 bg-[#2563EB] animate-pulse" />
                      <span className="w-1 h-4 bg-[#3B82F6] animate-bounce" />
                      <span className="w-1 h-2 bg-white animate-pulse" />
                      <span className="text-[9px] font-mono text-white ml-1">{t.lineup.audioStreaming}</span>
                    </div>
                  )}
                </div>

                {/* Artist Info Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-[#3B82F6] tracking-widest uppercase block mb-1">
                      {artist.genre}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                      {artist.name}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                    {artist.bio}
                  </p>

                  {/* Channels */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                      {t.lineup.channels}
                    </span>

                    <div className="flex items-center gap-3">
                      {artist.instagram && (
                        <a
                          href={artist.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                          aria-label={`${artist.name} Instagram`}
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {artist.spotify && (
                        <a
                          href={artist.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                          aria-label={`${artist.name} Spotify`}
                        >
                          <Music2 className="w-4 h-4" />
                        </a>
                      )}
                      {artist.soundcloud && (
                        <a
                          href={artist.soundcloud}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                          aria-label={`${artist.name} SoundCloud`}
                        >
                          <Disc className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
