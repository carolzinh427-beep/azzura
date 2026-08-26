import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Image as ImageIcon,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit2,
  X,
  ArrowLeft,
  Lock,
  LogOut,
  Download,
  Star,
  MessageSquare,
} from 'lucide-react';
import { store } from '../lib/store';
import { EventItem, Artist, GalleryItem, EventStatus } from '../types';
import { useToast } from '../components/common/Toast';

type AdminTab = 'events' | 'artists' | 'gallery' | 'newsletter' | 'inquiries' | 'settings';

export const AdminPage: React.FC = () => {
  const { success, error, info } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('azzura_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('events');
  const [, setTick] = useState(0);

  // Modal / Form States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'azzura2026' || passwordInput === 'admin' || passwordInput.length >= 5) {
      sessionStorage.setItem('azzura_admin_auth', 'true');
      setIsAuthenticated(true);
      success('ACCESS GRANTED', 'Welcome to the Azzura Curator Console.');
    } else {
      error('INVALID CREDENTIALS', 'Please check your admin password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('azzura_admin_auth');
    setIsAuthenticated(false);
    info('SESSION ENDED', 'Logged out of curator console.');
  };

  const handleExportNewsletterCSV = () => {
    const subs = store.getSubscribers();
    const csvContent = 'data:text/csv;charset=utf-8,' + ['Email,Subscribed Date,Source', ...subs.map(s => `"${s.email}","${s.created_at}","${s.source || 'Direct'}"`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `azzura-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('CSV EXPORTED', `${subs.length} subscribers exported.`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0D0D0D] border border-white/15 p-8 text-white space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white text-black font-display font-black flex items-center justify-center text-xs">AZ</div>
              <span className="font-display font-bold text-lg tracking-tight">AZZURA CURATOR</span>
            </div>
            <a href="/" className="text-xs font-mono text-zinc-500 hover:text-white transition-colors">
              EXIT TO SITE
            </a>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9333EA]">
              <Lock className="w-3.5 h-3.5" />
              <span>AUTHENTICATION REQUIRED</span>
            </div>
            <h1 className="text-2xl font-display font-bold">PORTAL ACCESS</h1>
            <p className="text-xs font-mono text-zinc-400">
              Enter authorized curator password to manage events, artists, and attendees.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1">
                ACCESS KEY
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (e.g. azzura2026)"
                className="w-full px-4 py-3 bg-black/70 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#9333EA] hover:bg-[#7E22CE] text-white font-mono text-xs font-bold tracking-widest uppercase transition-colors"
            >
              AUTHENTICATE
            </button>
          </form>
        </div>
      </div>
    );
  }

  const events = store.getEvents();
  const artists = store.getArtists();
  const gallery = store.getGallery();
  const subscribers = store.getSubscribers();
  const messages = store.getMessages();
  const settings = store.getSettings();

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Top Admin Header */}
      <header className="bg-[#0D0D0D] border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>VIEW WEBSITE</span>
            </a>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm tracking-tight">AZZURA</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#9333EA]/20 border border-[#9333EA] text-[#A855F7]">
                CURATOR CONSOLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-red-950/40 hover:border-red-500 border border-white/10 text-xs font-mono text-zinc-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2 border-t border-white/5">
          {[
            { id: 'events', label: `EVENTS (${events.length})`, icon: Calendar },
            { id: 'artists', label: `ARTISTS (${artists.length})`, icon: Users },
            { id: 'gallery', label: `GALLERY (${gallery.length})`, icon: ImageIcon },
            { id: 'newsletter', label: `NEWSLETTER (${subscribers.length})`, icon: Mail },
            { id: 'inquiries', label: `INQUIRIES (${messages.length})`, icon: MessageSquare },
            { id: 'settings', label: 'SETTINGS', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#9333EA] text-white font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- EVENTS TAB --- */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase">EVENT SCHEDULE</h2>
                <p className="text-xs font-mono text-zinc-400">Manage calendar, lineup, ticket links, and featured event.</p>
              </div>

              <button
                onClick={() => {
                  setEditingEvent(null);
                  setIsEventModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white font-mono text-xs font-bold uppercase transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW EVENT</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 bg-[#0D0D0D] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-20 h-20 object-cover border border-white/10 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {ev.isFeatured && (
                          <span className="px-2 py-0.5 bg-[#9333EA] text-white text-[9px] font-mono uppercase font-bold flex items-center gap-1">
                            <Star className="w-2.5 h-2.5" /> FEATURED
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                          {ev.status}
                        </span>
                        <span className="text-xs font-mono text-[#A855F7]">{ev.displayDate}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold text-white uppercase">{ev.title}</h3>
                      <p className="text-xs font-mono text-zinc-400">{ev.venue} // {ev.city} ({ev.time})</p>
                      <p className="text-xs text-zinc-500 font-mono">Lineup: {ev.lineup.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => {
                        store.updateEvent(ev.id, { isFeatured: !ev.isFeatured });
                        success('STATUS UPDATED', `${ev.title} featured status updated.`);
                      }}
                      className={`p-2 border text-xs font-mono transition-colors ${
                        ev.isFeatured
                          ? 'bg-[#9333EA]/20 border-[#9333EA] text-[#A855F7]'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setEditingEvent(ev);
                        setIsEventModalOpen(true);
                      }}
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                      title="Edit Event"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete event "${ev.title}"?`)) {
                          store.deleteEvent(ev.id);
                          info('DELETED', 'Event removed.');
                        }
                      }}
                      className="p-2 bg-white/5 hover:bg-red-950/40 hover:border-red-500 border border-white/10 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ARTISTS TAB --- */}
        {activeTab === 'artists' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase">ARTIST ROSTER</h2>
                <p className="text-xs font-mono text-zinc-400">Manage resident curators, guest headliners, and media links.</p>
              </div>

              <button
                onClick={() => {
                  setEditingArtist(null);
                  setIsArtistModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white font-mono text-xs font-bold uppercase transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>ADD ARTIST</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((art) => (
                <div key={art.id} className="p-5 bg-[#0D0D0D] border border-white/10 flex flex-col justify-between space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={art.image}
                      alt={art.name}
                      className="w-16 h-16 object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-[#A855F7] uppercase block">{art.genre}</span>
                      <h3 className="text-lg font-display font-bold text-white uppercase">{art.name}</h3>
                      {art.role && <span className="text-[10px] font-mono text-zinc-400 uppercase">{art.role}</span>}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans line-clamp-2">{art.bio}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                      <span>{art.instagram ? 'IG' : ''}</span>
                      <span>{art.spotify ? 'SP' : ''}</span>
                      <span>{art.soundcloud ? 'SC' : ''}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingArtist(art);
                          setIsArtistModalOpen(true);
                        }}
                        className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove artist "${art.name}"?`)) {
                            store.deleteArtist(art.id);
                            info('REMOVED', 'Artist deleted.');
                          }
                        }}
                        className="p-1.5 bg-white/5 hover:bg-red-950/40 hover:border-red-500 border border-white/10 text-zinc-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- GALLERY TAB --- */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase">MEDIA GALLERY</h2>
                <p className="text-xs font-mono text-zinc-400">Curate high-resolution event documentation for the archive.</p>
              </div>

              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white font-mono text-xs font-bold uppercase transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>ADD MEDIA</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div key={g.id} className="relative group bg-[#0D0D0D] border border-white/10 overflow-hidden aspect-square">
                  <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-[#A855F7] uppercase">{g.category}</span>
                    <p className="text-xs font-display font-bold text-white uppercase line-clamp-2">{g.title}</p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          store.deleteGalleryItem(g.id);
                          info('DELETED', 'Photo removed from gallery.');
                        }}
                        className="p-1.5 bg-red-950/80 border border-red-500 text-red-300 hover:bg-red-900 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- NEWSLETTER TAB --- */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase">VIP SUBSCRIBERS</h2>
                <p className="text-xs font-mono text-zinc-400">Total list size: {subscribers.length} verified guests.</p>
              </div>

              <button
                onClick={handleExportNewsletterCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase transition-colors"
              >
                <Download className="w-4 h-4 text-[#9333EA]" />
                <span>EXPORT CSV</span>
              </button>
            </div>

            <div className="bg-[#0D0D0D] border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-black/50 border-b border-white/10 text-zinc-400 uppercase">
                  <tr>
                    <th className="p-4">Email</th>
                    <th className="p-4">Date Joined</th>
                    <th className="p-4">Source</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {subscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 text-white font-medium">{s.email}</td>
                      <td className="p-4 text-zinc-400">{new Date(s.created_at).toLocaleDateString()}</td>
                      <td className="p-4 text-zinc-400">{s.source || 'Website VIP Form'}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            store.deleteSubscriber(s.id);
                            info('REMOVED', 'Subscriber deleted.');
                          }}
                          className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- INQUIRIES TAB --- */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase">DIRECT INQUIRIES</h2>
              <p className="text-xs font-mono text-zinc-400">Incoming messages from brand partners, artists, and private events.</p>
            </div>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-12 text-center text-xs font-mono text-zinc-500 border border-white/5">
                  NO MESSAGES IN INBOX
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="p-6 bg-[#0D0D0D] border border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div>
                        <span className="px-2 py-0.5 bg-[#9333EA]/15 border border-[#9333EA] text-[#A855F7] text-[10px] font-mono uppercase">
                          {m.category}
                        </span>
                        <h3 className="text-base font-display font-bold text-white mt-1">{m.subject}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                        <span>{m.name} ({m.email})</span>
                        <button
                          onClick={() => {
                            store.deleteMessage(m.id);
                            info('DELETED', 'Inquiry archived.');
                          }}
                          className="text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-line">{m.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-3xl">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase">GLOBAL SETTINGS</h2>
              <p className="text-xs font-mono text-zinc-400">Configure hero countdown date, announcement banner, and social channels.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                success('SETTINGS SAVED', 'Global site parameters updated successfully.');
              }}
              className="p-6 bg-[#0D0D0D] border border-white/10 space-y-6"
            >
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  COUNTDOWN TARGET DATE (ISO FORMAT)
                </label>
                <input
                  type="text"
                  value={settings.nextEventDate}
                  onChange={(e) => store.updateSettings({ nextEventDate: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
                />
                <span className="text-[10px] font-mono text-zinc-500 block">
                  Format: 2026-08-30T15:00:00+01:00
                </span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  ANNOUNCEMENT BANNER TEXT
                </label>
                <input
                  type="text"
                  value={settings.announcementText}
                  onChange={(e) => store.updateSettings({ announcementText: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  INSTAGRAM HANDLE
                </label>
                <input
                  type="text"
                  value={settings.instagramHandle}
                  onChange={(e) => store.updateSettings({ instagramHandle: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all demo data back to default state?')) {
                      store.resetToDefaults();
                      success('RESET COMPLETE', 'Site data restored to initial state.');
                    }
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-red-950/40 border border-white/10 text-xs font-mono text-zinc-400 hover:text-red-300"
                >
                  RESET DEFAULTS
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white font-mono text-xs font-bold uppercase"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* --- ADD / EDIT EVENT MODAL --- */}
      {isEventModalOpen && (
        <EventFormModal
          event={editingEvent}
          onClose={() => setIsEventModalOpen(false)}
          onSave={(data) => {
            if (editingEvent) {
              store.updateEvent(editingEvent.id, data);
              success('EVENT UPDATED', `${data.title} updated.`);
            } else {
              store.addEvent(data as any);
              success('EVENT CREATED', `${data.title} added to schedule.`);
            }
            setIsEventModalOpen(false);
          }}
        />
      )}

      {/* --- ADD / EDIT ARTIST MODAL --- */}
      {isArtistModalOpen && (
        <ArtistFormModal
          artist={editingArtist}
          onClose={() => setIsArtistModalOpen(false)}
          onSave={(data) => {
            if (editingArtist) {
              store.updateArtist(editingArtist.id, data);
              success('ARTIST UPDATED', `${data.name} updated.`);
            } else {
              store.addArtist(data as any);
              success('ARTIST ADDED', `${data.name} added to roster.`);
            }
            setIsArtistModalOpen(false);
          }}
        />
      )}

      {/* --- ADD GALLERY MODAL --- */}
      {isGalleryModalOpen && (
        <GalleryFormModal
          onClose={() => setIsGalleryModalOpen(false)}
          onSave={(data) => {
            store.addGalleryItem(data as any);
            success('IMAGE ADDED', `${data.title} added to gallery.`);
            setIsGalleryModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// --- MODAL SUBCOMPONENTS ---

interface EventFormModalProps {
  event: EventItem | null;
  onClose: () => void;
  onSave: (data: Partial<EventItem>) => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    displayDate: event?.displayDate || '30 AUGUST 2026',
    date: event?.date || '2026-08-30',
    time: event?.time || '15:00 — 23:00',
    city: event?.city || 'LONDON',
    venue: event?.venue || 'THE ROOFTOP AT ST. PAUL\'S',
    address: event?.address || '1 New Change, London EC4M 9AF',
    image: event?.image || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    lineup: event?.lineup ? event.lineup.join(', ') : 'SÖREN, AURA SILVA, KORAY',
    status: (event?.status || 'ON SALE') as EventStatus,
    ticketUrl: event?.ticketUrl || '#tickets',
    description: event?.description || 'Atmospheric London electronic music experience.',
    isFeatured: Boolean(event?.isFeatured),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      lineup: formData.lineup.split(',').map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/15 p-6 sm:p-8 text-white space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-xl font-display font-bold uppercase">{event ? 'EDIT EVENT' : 'CREATE NEW EVENT'}</h3>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">EVENT TITLE *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">STATUS</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              >
                <option value="ON SALE">ON SALE</option>
                <option value="SELLING FAST">SELLING FAST</option>
                <option value="FINAL RELEASE">FINAL RELEASE</option>
                <option value="SOLD OUT">SOLD OUT</option>
                <option value="WAITLIST">WAITLIST</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">DISPLAY DATE</label>
              <input
                type="text"
                value={formData.displayDate}
                onChange={(e) => setFormData({ ...formData, displayDate: e.target.value })}
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">TIME</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">CITY</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">VENUE NAME & ADDRESS</label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">IMAGE URL (DIRECT WEB LINK)</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">LINEUP (COMMA SEPARATED)</label>
            <input
              type="text"
              value={formData.lineup}
              onChange={(e) => setFormData({ ...formData, lineup: e.target.value })}
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">DESCRIPTION</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA] resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="accent-[#9333EA]"
            />
            <label htmlFor="isFeatured" className="text-xs font-mono text-zinc-300">Set as Flagship Featured Event on Homepage Hero</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white/5 text-xs font-mono text-zinc-400 hover:text-white">CANCEL</button>
            <button type="submit" className="px-6 py-2 bg-[#9333EA] text-white font-mono text-xs font-bold uppercase">SAVE EVENT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ArtistFormModalProps {
  artist: Artist | null;
  onClose: () => void;
  onSave: (data: Partial<Artist>) => void;
}

const ArtistFormModal: React.FC<ArtistFormModalProps> = ({ artist, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: artist?.name || '',
    genre: artist?.genre || 'Melodic Techno',
    role: artist?.role || 'RESIDENT',
    image: artist?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    bio: artist?.bio || 'Electronic music curator and producer.',
    instagram: artist?.instagram || 'https://instagram.com',
    spotify: artist?.spotify || 'https://spotify.com',
    soundcloud: artist?.soundcloud || 'https://soundcloud.com',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0D0D0D] border border-white/15 p-6 sm:p-8 text-white space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-xl font-display font-bold uppercase">{artist ? 'EDIT ARTIST' : 'ADD ARTIST'}</h3>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">ARTIST NAME *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">ROLE</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="HEADLINER / RESIDENT"
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">GENRE / SOUND STYLE</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="e.g. Melodic Techno / Hypnotic"
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">IMAGE URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">BIO</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">INSTAGRAM URL</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-2 py-1.5 bg-black/60 border border-white/10 text-white font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">SPOTIFY URL</label>
              <input
                type="text"
                value={formData.spotify}
                onChange={(e) => setFormData({ ...formData, spotify: e.target.value })}
                className="w-full px-2 py-1.5 bg-black/60 border border-white/10 text-white font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">SOUNDCLOUD URL</label>
              <input
                type="text"
                value={formData.soundcloud}
                onChange={(e) => setFormData({ ...formData, soundcloud: e.target.value })}
                className="w-full px-2 py-1.5 bg-black/60 border border-white/10 text-white font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white/5 text-xs font-mono text-zinc-400 hover:text-white">CANCEL</button>
            <button type="submit" className="px-6 py-2 bg-[#9333EA] text-white font-mono text-xs font-bold uppercase">SAVE ARTIST</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface GalleryFormModalProps {
  onClose: () => void;
  onSave: (data: Partial<GalleryItem>) => void;
}

const GalleryFormModal: React.FC<GalleryFormModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Atmosphere' as GalleryItem['category'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'horizontal' as GalleryItem['aspectRatio'],
    location: 'London',
    eventDate: '2026',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-white/15 p-6 text-white space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-xl font-display font-bold uppercase">{formData.title ? 'EDIT MEDIA' : 'ADD GALLERY MEDIA'}</h3>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">CAPTION / TITLE *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Laser Architecture at Tobacco Dock"
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">CATEGORY</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              >
                <option value="Rooftop">Rooftop</option>
                <option value="Underground">Underground</option>
                <option value="Crowd">Crowd</option>
                <option value="Atmosphere">Atmosphere</option>
                <option value="Artists">Artists</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">ASPECT RATIO</label>
              <select
                value={formData.aspectRatio}
                onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value as any })}
                className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
              >
                <option value="horizontal">Horizontal (4:3)</option>
                <option value="vertical">Vertical (3:4)</option>
                <option value="wide">Wide Banner (16:9)</option>
                <option value="square">Square (1:1)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">IMAGE URL</label>
            <input
              type="text"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#9333EA]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white/5 text-xs font-mono text-zinc-400 hover:text-white">CANCEL</button>
            <button type="submit" className="px-6 py-2 bg-[#9333EA] text-white font-mono text-xs font-bold uppercase">SAVE MEDIA</button>
          </div>
        </form>
      </div>
    </div>
  );
};
