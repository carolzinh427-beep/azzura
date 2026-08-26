import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight, Heart, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

const INSTA_POSTS = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    likes: '2.4k',
    comments: '184',
    caption: 'Sunset over St. Paul’s. The atmosphere is everything. #AzzuraLDN',
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop',
    likes: '1.9k',
    comments: '92',
    caption: 'Subterranean acoustics at full throttle. 30.08 tickets live.',
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    likes: '3.1k',
    comments: '240',
    caption: 'SÖREN navigating the midnight hour. Pure electric frequency.',
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    likes: '2.8k',
    comments: '155',
    caption: 'Energy in motion. Thank you London.',
  }
];

export const InstagramSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-32 bg-[#000000] border-t border-white/10 overflow-hidden w-full max-w-full select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Clean Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#A855F7] tracking-[0.2em] uppercase font-bold block mb-1.5">
              {t.instagram.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight break-words">
              {t.instagram.title}
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 hover:bg-[#9333EA] border border-white/15 rounded-full text-white transition-all duration-300 group shadow-md"
          >
            <div className="flex items-center gap-1 font-mono text-[11px] sm:text-xs font-bold tracking-wider">
              <span>{t.instagram.handle}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C084FC] group-hover:text-white" />
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-5">
          {INSTA_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative aspect-square bg-[#111111] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden block shadow-xl"
            >
              <img
                src={post.image}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4" />

              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300" />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <p className="text-[10px] sm:text-[11px] font-sans text-zinc-200 line-clamp-2 leading-snug">
                    {post.caption}
                  </p>

                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-white/90">
                    <span className="flex items-center gap-1 text-[#C084FC]">
                      <Heart className="w-3 h-3 fill-[#9333EA] text-[#9333EA]" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
