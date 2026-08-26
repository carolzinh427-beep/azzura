import { EventItem, Artist, GalleryItem, LocationItem, NewsletterSubscriber, ContactMessage, SiteSettings } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: 'AZZURA EVENTS',
  tagline: 'THE ATMOSPHERE IS EVERYTHING.',
  announcementText: 'AZZR 1 YEAR ANNIVERSARY — 30 AUGUST 2026 — TICKETS SELLING FAST',
  announcementActive: true,
  nextEventDate: '2026-08-30T15:00:00+01:00',
  nextEventTitle: 'AZZR 1 YEAR ANNIVERSARY',
  nextEventLocation: 'LONDON — THE ROOFTOP AT ST. PAUL\'S',
  primaryTicketUrl: '#tickets',
  instagramHandle: '@azzr.ldn',
  spotifyPlaylistUrl: 'https://spotify.com',
  soundcloudUrl: 'https://soundcloud.com',
  residentAdvisorUrl: 'https://ra.co',
};

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'azzr-1-year-anniversary',
    title: 'AZZR 1 YEAR ANNIVERSARY',
    subtitle: 'THE ROOFTOP OPEN AIR & SUBTERRANEAN SESSIONS',
    date: '2026-08-30',
    displayDate: '30 AUGUST 2026',
    time: '15:00 — 23:00',
    city: 'LONDON',
    venue: 'THE ROOFTOP AT ST. PAUL\'S',
    address: '1 New Change, London EC4M 9AF',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    posterImage: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=1200&auto=format&fit=crop',
    lineup: ['SÖREN (BERLIN)', 'AURA SILVA', 'KORAY', 'KAI VALENTINE', 'AZZURA SOUNDSYSTEM'],
    status: 'SELLING FAST',
    ticketUrl: '#tickets',
    description: 'Celebrating 365 days of defining the sonic landscape of London nightlife. 8 hours of uncompromising melodic techno and deep progressive rhythms across sunset and midnight.',
    isFeatured: true,
    ageRestriction: '21+',
    dressCode: 'Monochrome / Minimalist High Fashion / All Black Preferred',
    ticketTiers: [
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
        perks: ['Full Day Access', 'Void Acoustics Sound Experience', '360° London Skyline View'],
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
    ]
  },
  {
    id: 'azzr-nocturne-tobacco-dock',
    title: 'AZZURA NOCTURNE // SKYLINE & SHADOWS',
    subtitle: 'MELODIC TECHNO & MINIMAL WAREHOUSE',
    date: '2026-09-19',
    displayDate: '19 SEPTEMBER 2026',
    time: '22:00 — 06:00',
    city: 'LONDON',
    venue: 'TOBACCO DOCK SUBTERRANEAN',
    address: 'Tobacco Quay, Wapping Lane, London E1W 2SF',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1600&auto=format&fit=crop',
    lineup: ['MAXIME COHEN', 'ELYSIA', 'NORDIC DRIFT', 'AZZURA RESIDENTS'],
    status: 'ON SALE',
    ticketUrl: '#tickets',
    description: 'An 8-hour deep dive into driving low-end basslines and hypnotic synthesizer arpeggios within the vaulted brick arches of Tobacco Dock.',
    isFeatured: false,
    ageRestriction: '18+',
    dressCode: 'Underground Aesthetic / Dark Tones',
  },
  {
    id: 'azzr-equinox-shoreditch',
    title: 'EQUINOX SUNSET RITUAL',
    subtitle: 'ROOFTOP OPEN AIR TO MIDNIGHT MEZZANINE',
    date: '2026-10-10',
    displayDate: '10 OCTOBER 2026',
    time: '16:00 — 02:00',
    city: 'LONDON',
    venue: 'VILLAGE UNDERGROUND & SECRET ROOFTOP',
    address: '54 Holywell Lane, London EC2A 3PQ',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop',
    lineup: ['VALENTIN STERLING', 'ZARA VEGA', 'CYPHER', 'KORAY'],
    status: 'ON SALE',
    ticketUrl: '#tickets',
    description: 'Transitioning from the autumn golden hour on Shoreditch rooftops to the raw industrial resonance of Village Underground.',
    isFeatured: false,
    ageRestriction: '21+',
    dressCode: 'Editorial Minimalist',
  },
  {
    id: 'azzr-winter-solstice',
    title: 'AZZURA SOLSTICE // ALL BLACK GALA',
    subtitle: 'THE END OF YEAR IMMERSIVE SHOWCASE',
    date: '2026-12-12',
    displayDate: '12 DECEMBER 2026',
    time: '21:00 — 05:00',
    city: 'LONDON',
    venue: 'THE LIGHTHOUSE HACKNEY WICK',
    address: 'Queen\'s Yard, London E9 5EN',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
    lineup: ['SECRET INTERNATIONAL HEADLINER', 'AURA SILVA', 'SÖREN', 'AZZURA SOUNDSYSTEM'],
    status: 'FINAL RELEASE',
    ticketUrl: '#tickets',
    description: 'The crowning showcase of our 2026 calendar. Custom laser architecture, multi-sensory olfactory design, and a curated crowd of 600.',
    isFeatured: false,
    ageRestriction: '21+',
    dressCode: 'Strictly All Black Elegance',
  }
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'soren-berlin',
    name: 'SÖREN',
    role: 'HEADLINER',
    genre: 'Melodic Techno / Hypnotic',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    bio: 'Berlin-based producer known for atmospheric synthesizer hooks, driving low-end architecture, and performances at Afterlife and Printworks.',
    instagram: 'https://instagram.com',
    spotify: 'https://spotify.com',
    soundcloud: 'https://soundcloud.com',
    featured: true,
  },
  {
    id: 'aura-silva',
    name: 'AURA SILVA',
    role: 'RESIDENT',
    genre: 'Deep Afro Tech & Melodic House',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    bio: 'Resident curator bridging London and Lisbon. Her sets build tension with organic percussion, ethereal vocals, and relentless groove.',
    instagram: 'https://instagram.com',
    spotify: 'https://spotify.com',
    soundcloud: 'https://soundcloud.com',
    featured: true,
  },
  {
    id: 'koray',
    name: 'KORAY',
    role: 'RESIDENT',
    genre: 'Minimal Deep Tech',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    bio: 'Master of stripped-back percussion and modular synthesizer textures, delivering surgical sonic precision for warehouse purists.',
    instagram: 'https://instagram.com',
    spotify: 'https://spotify.com',
    soundcloud: 'https://soundcloud.com',
    featured: true,
  },
  {
    id: 'kai-valentine',
    name: 'KAI VALENTINE',
    role: 'SPECIAL GUEST',
    genre: 'Progressive & Cinematic House',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
    bio: 'London native crafting emotive electronic melodies designed for sunset rooftops and transcendent transition hours.',
    instagram: 'https://instagram.com',
    spotify: 'https://spotify.com',
    soundcloud: 'https://soundcloud.com',
    featured: true,
  },
  {
    id: 'elysia',
    name: 'ELYSIA',
    role: 'GUEST ARTIST',
    genre: 'Industrial Melodic Techno',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
    bio: 'Dark, energetic and rhythmically uncompromising selector performing across the European underground club circuit.',
    instagram: 'https://instagram.com',
    spotify: 'https://spotify.com',
    soundcloud: 'https://soundcloud.com',
    featured: false,
  },
  {
    id: 'azzura-soundsystem',
    name: 'AZZURA SOUNDSYSTEM',
    role: 'COLLECTIVE',
    genre: 'Atmospheric Club Curation',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
    bio: 'The sonic architects behind the brand, curating seamless back-to-back marathon sets that embody the Azzura philosophy.',
    instagram: 'https://instagram.com',
    spotify: 'https://spotify.com',
    soundcloud: 'https://soundcloud.com',
    featured: true,
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Golden Hour on St. Paul\'s Skyline',
    category: 'Rooftop',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
    location: 'St. Paul\'s Rooftop',
    eventDate: 'Summer 2026',
    featured: true,
  },
  {
    id: 'gal-2',
    title: 'Electric Blue Laser Architecture',
    category: 'Atmosphere',
    image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'vertical',
    location: 'Tobacco Dock Vaults',
    eventDate: 'Spring 2026',
    featured: true,
  },
  {
    id: 'gal-3',
    title: 'SÖREN Live at Midnight Mezzanine',
    category: 'Artists',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1400&auto=format&fit=crop',
    aspectRatio: 'horizontal',
    location: 'Village Underground',
    eventDate: 'July 2026',
    featured: true,
  },
  {
    id: 'gal-4',
    title: 'Crowd Energy & Smoke Diffusion',
    category: 'Crowd',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop',
    aspectRatio: 'vertical',
    location: 'Hackney Wick Warehouse',
    eventDate: 'August 2026',
    featured: true,
  },
  {
    id: 'gal-5',
    title: 'London Night Lights over Skyline Terrace',
    category: 'Rooftop',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1400&auto=format&fit=crop',
    aspectRatio: 'horizontal',
    location: 'Central London Rooftop',
    eventDate: 'June 2026',
    featured: false,
  },
  {
    id: 'gal-6',
    title: 'Subterranean Brick Vaults Sound Session',
    category: 'Underground',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1400&auto=format&fit=crop',
    aspectRatio: 'wide',
    location: 'Wapping Docks',
    eventDate: 'May 2026',
    featured: true,
  },
  {
    id: 'gal-7',
    title: 'Aura Silva Sunset Transition',
    category: 'Artists',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1400&auto=format&fit=crop',
    aspectRatio: 'vertical',
    location: 'Shoreditch Rooftop',
    eventDate: 'June 2026',
    featured: false,
  },
  {
    id: 'gal-8',
    title: 'Underground Pulse & Monolithic Lights',
    category: 'Atmosphere',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1400&auto=format&fit=crop',
    aspectRatio: 'horizontal',
    location: 'Steelworks London',
    eventDate: 'April 2026',
    featured: false,
  }
];

export const INITIAL_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-st-pauls',
    name: 'THE ROOFTOP AT ST. PAUL\'S',
    area: 'City of London',
    address: '1 New Change, London EC4M 9AF',
    type: 'Rooftop',
    capacity: '650 Guests',
    soundSystem: 'Custom Void Acoustics Tri-Motion System',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1400&auto=format&fit=crop',
    description: 'An elevated open-air sanctuary overlooking the iconic dome of St. Paul\'s Cathedral. Designed for golden hour transitions into deep nocturnal electronics.',
    highlights: ['Unrivalled 360° Skyline Views', 'Heated & Weather-Proof Retractable Glass Roof', 'Bespoke Cocktail Bars', 'VIP Mezzanine Lounge'],
  },
  {
    id: 'loc-tobacco-dock',
    name: 'TOBACCO DOCK SUBTERRANEAN VAULTS',
    area: 'Wapping, London',
    address: 'Tobacco Quay, Wapping Lane, London E1W 2SF',
    type: 'Subterranean Warehouse',
    capacity: '1,200 Guests',
    soundSystem: 'd&b audiotechnik KSL Line Array with Sub-Infra Array',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1400&auto=format&fit=crop',
    description: 'Centuries-old brick vaults engineered for cavernous acoustic isolation, laser mapping, and marathon techno sessions until dawn.',
    highlights: ['Exposed Victorian Brick Arches', 'Custom Kinetic Lighting Grid', 'Sound-Tuned Concrete Acoustics', 'Multiple Cavern Rooms'],
  },
  {
    id: 'loc-village-underground',
    name: 'VILLAGE UNDERGROUND',
    area: 'Shoreditch, East London',
    address: '54 Holywell Lane, London EC2A 3PQ',
    type: 'Heritage Space',
    capacity: '700 Guests',
    soundSystem: 'Full L-Acoustics K2 Sound Architecture',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1400&auto=format&fit=crop',
    description: 'A converted Victorian railway viaduct in the cultural core of East London, revered worldwide for intimate audio fidelity and raw underground atmosphere.',
    highlights: ['Iconic Railway Arch Architecture', 'Pristine Low-End Sound Dynamics', 'Centrally Connected Shoreditch Location'],
  }
];

class StoreManager {
  private events: EventItem[] = [];
  private artists: Artist[] = [];
  private gallery: GalleryItem[] = [];
  private locations: LocationItem[] = [];
  private subscribers: NewsletterSubscriber[] = [];
  private messages: ContactMessage[] = [];
  private settings: SiteSettings = INITIAL_SETTINGS;
  private listeners: Set<() => void> = new Set();
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;
    try {
      const savedEvents = localStorage.getItem('azzura_events');
      this.events = savedEvents ? JSON.parse(savedEvents) : INITIAL_EVENTS;

      const savedArtists = localStorage.getItem('azzura_artists');
      this.artists = savedArtists ? JSON.parse(savedArtists) : INITIAL_ARTISTS;

      const savedGallery = localStorage.getItem('azzura_gallery');
      this.gallery = savedGallery ? JSON.parse(savedGallery) : INITIAL_GALLERY;

      const savedLocations = localStorage.getItem('azzura_locations');
      this.locations = savedLocations ? JSON.parse(savedLocations) : INITIAL_LOCATIONS;

      const savedSubs = localStorage.getItem('azzura_subscribers');
      this.subscribers = savedSubs ? JSON.parse(savedSubs) : [
        { id: '1', email: 'guest.vip@azzura.events', created_at: new Date().toISOString(), source: 'VIP List' },
        { id: '2', email: 'collector@nightlife.london', created_at: new Date().toISOString(), source: 'Anniversary Pre-Sale' },
      ];

      const savedMessages = localStorage.getItem('azzura_messages');
      this.messages = savedMessages ? JSON.parse(savedMessages) : [
        {
          id: '1',
          name: 'Marcus Vance',
          email: 'm.vance@agency.co.uk',
          category: 'EVENT PARTNERSHIPS',
          subject: 'Brand Collaboration for 1 Year Anniversary',
          message: 'Interested in partnering for bespoke lighting installation and VIP bar experience.',
          created_at: new Date().toISOString(),
        }
      ];

      const savedSettings = localStorage.getItem('azzura_settings');
      this.settings = savedSettings ? JSON.parse(savedSettings) : INITIAL_SETTINGS;

      this.isInitialized = true;
    } catch {
      this.events = INITIAL_EVENTS;
      this.artists = INITIAL_ARTISTS;
      this.gallery = INITIAL_GALLERY;
      this.locations = INITIAL_LOCATIONS;
      this.settings = INITIAL_SETTINGS;
    }
  }

  private persist() {
    try {
      localStorage.setItem('azzura_events', JSON.stringify(this.events));
      localStorage.setItem('azzura_artists', JSON.stringify(this.artists));
      localStorage.setItem('azzura_gallery', JSON.stringify(this.gallery));
      localStorage.setItem('azzura_locations', JSON.stringify(this.locations));
      localStorage.setItem('azzura_subscribers', JSON.stringify(this.subscribers));
      localStorage.setItem('azzura_messages', JSON.stringify(this.messages));
      localStorage.setItem('azzura_settings', JSON.stringify(this.settings));
    } catch {
      // ignore storage errors
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // --- GETTERS ---
  public getEvents(): EventItem[] {
    return this.events;
  }

  public getFeaturedEvent(): EventItem {
    const featured = this.events.find(e => e.isFeatured);
    return featured || this.events[0] || INITIAL_EVENTS[0];
  }

  public getArtists(): Artist[] {
    return this.artists;
  }

  public getGallery(): GalleryItem[] {
    return this.gallery;
  }

  public getLocations(): LocationItem[] {
    return this.locations;
  }

  public getSubscribers(): NewsletterSubscriber[] {
    return this.subscribers;
  }

  public getMessages(): ContactMessage[] {
    return this.messages;
  }

  public getSettings(): SiteSettings {
    return this.settings;
  }

  // --- EVENTS CRUD ---
  public addEvent(event: Omit<EventItem, 'id'>): EventItem {
    const newEvent: EventItem = {
      ...event,
      id: 'event-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    if (newEvent.isFeatured) {
      this.events = this.events.map(e => ({ ...e, isFeatured: false }));
    }
    this.events.unshift(newEvent);
    this.persist();
    return newEvent;
  }

  public updateEvent(id: string, updates: Partial<EventItem>) {
    if (updates.isFeatured) {
      this.events = this.events.map(e => ({ ...e, isFeatured: false }));
    }
    this.events = this.events.map(e => e.id === id ? { ...e, ...updates } : e);
    this.persist();
  }

  public deleteEvent(id: string) {
    this.events = this.events.filter(e => e.id !== id);
    this.persist();
  }

  // --- ARTISTS CRUD ---
  public addArtist(artist: Omit<Artist, 'id'>): Artist {
    const newArtist: Artist = {
      ...artist,
      id: 'artist-' + Date.now(),
    };
    this.artists.push(newArtist);
    this.persist();
    return newArtist;
  }

  public updateArtist(id: string, updates: Partial<Artist>) {
    this.artists = this.artists.map(a => a.id === id ? { ...a, ...updates } : a);
    this.persist();
  }

  public deleteArtist(id: string) {
    this.artists = this.artists.filter(a => a.id !== id);
    this.persist();
  }

  // --- GALLERY CRUD ---
  public addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now(),
    };
    this.gallery.unshift(newItem);
    this.persist();
    return newItem;
  }

  public updateGalleryItem(id: string, updates: Partial<GalleryItem>) {
    this.gallery = this.gallery.map(g => g.id === id ? { ...g, ...updates } : g);
    this.persist();
  }

  public deleteGalleryItem(id: string) {
    this.gallery = this.gallery.filter(g => g.id !== id);
    this.persist();
  }

  // --- NEWSLETTER ---
  public async addSubscriber(email: string, source: string = 'Website Form'): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const exists = this.subscribers.some(s => s.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: true, message: 'You are already registered on the VIP atmosphere list.' };
    }

    const newSub: NewsletterSubscriber = {
      id: 'sub-' + Date.now(),
      email: cleanEmail,
      created_at: new Date().toISOString(),
      source,
    };

    this.subscribers.unshift(newSub);
    this.persist();

    // Supabase attempt if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('newsletter_subscribers').insert([{ email: cleanEmail, source }]);
      } catch (err) {
        console.warn('Supabase newsletter insert failed, stored in local state:', err);
      }
    }

    return { success: true, message: 'Welcome to the Azzura Atmosphere. You are on the private access list.' };
  }

  public deleteSubscriber(id: string) {
    this.subscribers = this.subscribers.filter(s => s.id !== id);
    this.persist();
  }

  // --- CONTACT INQUIRIES ---
  public async addContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>): Promise<{ success: boolean; message: string }> {
    const newMessage: ContactMessage = {
      ...message,
      id: 'msg-' + Date.now(),
      created_at: new Date().toISOString(),
    };

    this.messages.unshift(newMessage);
    this.persist();

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_inquiries').insert([newMessage]);
      } catch (err) {
        console.warn('Supabase contact insert failed, stored in local state:', err);
      }
    }

    return { success: true, message: 'Your message has been received. Our team will contact you shortly.' };
  }

  public deleteMessage(id: string) {
    this.messages = this.messages.filter(m => m.id !== id);
    this.persist();
  }

  // --- SETTINGS ---
  public updateSettings(updates: Partial<SiteSettings>) {
    this.settings = { ...this.settings, ...updates };
    this.persist();
  }

  // --- RESET TO DEFAULTS ---
  public resetToDefaults() {
    this.events = INITIAL_EVENTS;
    this.artists = INITIAL_ARTISTS;
    this.gallery = INITIAL_GALLERY;
    this.locations = INITIAL_LOCATIONS;
    this.settings = INITIAL_SETTINGS;
    this.persist();
  }
}

export const store = new StoreManager();
