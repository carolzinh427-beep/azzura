import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/common/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { NextEventSection } from '../components/sections/NextEventSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { UpcomingEventsSection } from '../components/sections/UpcomingEventsSection';
import { LineupSection } from '../components/sections/LineupSection';
import { GallerySection } from '../components/sections/GallerySection';
import { InstagramSection } from '../components/sections/InstagramSection';
import { LocationsSection } from '../components/sections/LocationsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { NewsletterSection } from '../components/sections/NewsletterSection';
import { Footer } from '../components/sections/Footer';
import { TicketModal } from '../components/common/TicketModal';
import { store } from '../lib/store';
import { EventItem } from '../types';

export const HomePage: React.FC = () => {
  const [, setTick] = useState(0);
  const [selectedEventForTickets, setSelectedEventForTickets] = useState<EventItem | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Subscribe to store updates (e.g. if edited in Admin)
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const events = store.getEvents();
  const featuredEvent = store.getFeaturedEvent();
  const artists = store.getArtists();
  const gallery = store.getGallery();
  const locations = store.getLocations();
  const settings = store.getSettings();

  const handleOpenFeaturedTickets = () => {
    setSelectedEventForTickets(featuredEvent);
    setIsTicketModalOpen(true);
  };

  const handleSelectEventTickets = (event: EventItem) => {
    setSelectedEventForTickets(event);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white">
      {/* Dynamic Navigation Header */}
      <Navbar onOpenTickets={handleOpenFeaturedTickets} />

      {/* Main Sections Hierarchy */}
      <main id="main-content">
        <HeroSection
          featuredEvent={featuredEvent}
          onOpenTickets={handleOpenFeaturedTickets}
        />

        <NextEventSection
          event={featuredEvent}
          countdownTarget={settings.nextEventDate || featuredEvent.date}
          onOpenTickets={handleOpenFeaturedTickets}
        />

        <ExperienceSection />

        <UpcomingEventsSection
          events={events}
          onSelectEvent={handleSelectEventTickets}
        />

        <LineupSection artists={artists} />

        <GallerySection items={gallery} />

        <InstagramSection />

        <LocationsSection locations={locations} />

        <ContactSection />

        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Ticket Purchasing / Reservation Modal */}
      <TicketModal
        event={selectedEventForTickets}
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />
    </div>
  );
};
