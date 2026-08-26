export type EventStatus = 'ON SALE' | 'SELLING FAST' | 'FINAL RELEASE' | 'SOLD OUT' | 'WAITLIST';

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  status: 'AVAILABLE' | 'FEW_LEFT' | 'SOLD_OUT';
  entryTime?: string;
  perks: string[];
}

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string; // e.g. "2026-08-30" or display string
  displayDate: string; // "30 AUGUST 2026"
  time: string; // "15:00 — 23:00"
  city: string; // "LONDON"
  venue: string; // "THE ROOFTOP AT ST. PAUL'S"
  address: string; // "1 New Change, London EC4M 9AF"
  image: string; // Direct image URL/path
  posterImage?: string;
  lineup: string[]; // DJ/artist names
  status: EventStatus;
  ticketUrl: string;
  description: string;
  isFeatured?: boolean;
  ticketTiers?: TicketTier[];
  ageRestriction?: string;
  dressCode?: string;
  created_at?: string;
}

export interface Artist {
  id: string;
  name: string;
  role?: string; // "HEADLINER" | "RESIDENT" | "SPECIAL GUEST"
  genre: string; // "Melodic Techno", "Deep Tech", "Afro House", etc.
  image: string;
  bio: string;
  instagram: string;
  spotify: string;
  soundcloud: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Rooftop' | 'Underground' | 'Crowd' | 'Atmosphere' | 'Artists';
  image: string;
  aspectRatio: 'vertical' | 'horizontal' | 'square' | 'wide';
  location?: string;
  eventDate?: string;
  featured?: boolean;
}

export interface LocationItem {
  id: string;
  name: string;
  area: string; // "St. Paul's", "Shoreditch", "Wapping", "Hackney"
  address: string;
  type: 'Rooftop' | 'Subterranean Warehouse' | 'Heritage Space' | 'Open Air';
  capacity: string;
  soundSystem: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  category: 'GENERAL ENQUIRIES' | 'EVENT PARTNERSHIPS' | 'ARTISTS' | 'PRIVATE EVENTS';
  subject: string;
  message: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
  source?: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  announcementText: string;
  announcementActive: boolean;
  nextEventDate: string; // ISO format: "2026-08-30T15:00:00+01:00"
  nextEventTitle: string;
  nextEventLocation: string;
  primaryTicketUrl: string;
  instagramHandle: string;
  spotifyPlaylistUrl: string;
  soundcloudUrl: string;
  residentAdvisorUrl: string;
}
