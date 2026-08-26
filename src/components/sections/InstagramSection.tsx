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
    <section className="relative py-24 sm:py-32 bg-[#000000] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] tracking-widest uppercase mb-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>{t.instagram.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
              {t.instagram.title}
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-[#2563EB] border border-white/15 text-white transition-all duration-300 group"
          >
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider">
              <span>{t.instagram.handle}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] group-hover:text-white" />
            </div>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
              className="group relative aspect-square bg-[#111111] border border-white/10 overflow-hidden block"
            >
              <img
                src={post.image}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

              <div className="absolute inset-0 p-3.5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-zinc-300" />
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-sans text-zinc-200 line-clamp-2 leading-snug">
                    {post.caption}
                  </p>

                  <div className="flex items-center gap-3 text-xs font-mono text-white/90">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-[#2563EB] text-[#2563EB]" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
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
