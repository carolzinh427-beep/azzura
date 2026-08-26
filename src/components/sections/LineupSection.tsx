import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Music2, Disc, Play, Pause, Radio } from 'lucide-react';
import { Artist } from '../../types';
import { useLanguage } from '../../lib/LanguageContext';
import ProfileCard from '../common/ProfileCard';

interface LineupSectionProps {
  artists: Artist[];
}

export const LineupSection: React.FC<LineupSectionProps> = ({ artists }) => {
  const { t } = useLanguage();
  const [playingArtistId, setPlayingArtistId] = useState<string | null>(null);

  const toggleArtistAudio = (id: string) => {
    setPlayingArtistId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="lineup" className="relative py-20 sm:py-32 bg-[#000000] border-t border-white/10 select-none overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Clean Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#A855F7] tracking-[0.2em] uppercase font-bold block mb-1.5">
              {t.lineup.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight break-words">
              {t.lineup.title}
            </h2>
          </div>

          <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
            {t.lineup.subtitle}
          </p>
        </div>

        {/* 3D Kinetic Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {artists.map((artist, idx) => {
            const isPlaying = playingArtistId === artist.id;
            const handle = artist.name.toLowerCase().replace(/[^a-z0-9]/g, '');

            const topBadge = (
              <div className="flex items-center justify-between w-full">
                <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-black/85 border border-white/20 text-white rounded-full">
                  {artist.role || 'HEADLINER'}
                </span>

                <span className="px-2 py-0.5 text-[9px] font-mono text-[#C084FC] bg-black/85 border border-white/15 rounded-full">
                  {artist.genre}
                </span>
              </div>
            );

            return (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex flex-col space-y-3"
              >
                {/* 3D Holographic Card */}
                <ProfileCard
                  avatarUrl={artist.image}
                  name={artist.name}
                  handle={handle}
                  status={artist.genre}
                  contactText={isPlaying ? 'PAUSE' : 'PREVIEW'}
                  onContactClick={() => toggleArtistAudio(artist.id)}
                  behindGlowEnabled={true}
                  behindGlowColor="rgba(147, 51, 234, 0.65)"
                  enableTilt={true}
                  enableMobileTilt={false}
                  topBadge={topBadge}
                />

                {/* Compact Artist Footer & Channels */}
                <div className="px-2 py-2 flex items-center justify-between border-t border-white/10 text-xs font-mono">
                  {isPlaying ? (
                    <div className="flex items-center gap-1.5 text-[#C084FC] animate-pulse">
                      <Radio className="w-3.5 h-3.5" />
                      <span className="text-[10px] tracking-wider">{t.lineup.audioStreaming}</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-zinc-500 tracking-wider uppercase">
                      {artist.role || 'RESIDENT SELECTOR'}
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleArtistAudio(artist.id)}
                      className="p-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-[#9333EA] rounded-full transition-colors cursor-pointer"
                      aria-label="Play audio snippet"
                    >
                      {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    </button>

                    {artist.instagram && (
                      <a
                        href={artist.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-[#9333EA] rounded-full transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                    )}
                    {artist.spotify && (
                      <a
                        href={artist.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-[#9333EA] rounded-full transition-colors"
                        aria-label="Spotify"
                      >
                        <Music2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                    )}
                    {artist.soundcloud && (
                      <a
                        href={artist.soundcloud}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-[#9333EA] rounded-full transition-colors"
                        aria-label="SoundCloud"
                      >
                        <Disc className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                    )}
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

export default LineupSection;
