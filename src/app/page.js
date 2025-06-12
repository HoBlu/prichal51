'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import localFont from 'next/font/local';
import Image from 'next/image';
import Kurort from '../components/Kurort';
import HouseCarousel from '../components/HouseCarousel';
import EnvironmentSection from '../components/EnvironmentSection';
import ServicesSection from '../components/ServicesSection';
import Dopodvala from '../components/Dopodvala';
import Footer from '../components/Footer';

// Font setup
const loftFont = localFont({
  src: './fonts/loft.ttf',
  variable: '--font-loft',
  display: 'swap',
});

// Utility for class merging
const cn = (...inputs) => twMerge(clsx(inputs));

// UI Components
const Card = ({ className, children }) => (
  <div className={cn('rounded-2xl overflow-hidden shadow-sm transition-all duration-300', className)}>
    {children}
  </div>
);

const CardContent = ({ className, children }) => (
  <div className={cn('p-4 sm:p-6', className)}>
    {children}
  </div>
);

const Separator = () => (
  <motion.div
    initial={{ width: '0%' }}
    whileInView={{ width: '70%' }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, ease: 'easeOut' }}
    className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-8 md:my-12 lg:my-16"
  />
);

const LocationInfo = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1 }}
    className="absolute top-16 sm:top-24 md:top-20 lg:top-32 left-0 right-0 mx-auto z-20 max-w-md px-4"
  >
    <div className="text-center">
      <div className="inline-flex items-center gap-1 text-white backdrop-blur-md bg-black/15 px-4 py-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 flex-shrink-0"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-light text-sm tracking-wider">Село Ая · Совесткая 50</span>
      </div>
    </div>
  </motion.div>
);

// Desktop Booking Form - Full Width
const DesktopBookingForm = ({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, guests, handleGuestChange, handleBookingSubmit }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="absolute bottom-0 left-0 right-0 z-30 hidden md:block"
  >
    <div className="bg-black/30 backdrop-blur-xl border-t border-white/15">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <form onSubmit={handleBookingSubmit} className="flex items-center justify-center gap-6">
          {/* Check-in */}
          <div className="flex-1 max-w-xs">
            <label 
              htmlFor="desktop-checkInDate" 
              className="block text-sm font-medium text-white/80 tracking-wide uppercase mb-2"
            >
              Заезд
            </label>
            <input
              type="date"
              id="desktop-checkInDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full py-3 px-4 text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Check-out */}
          <div className="flex-1 max-w-xs">
            <label 
              htmlFor="desktop-checkOutDate" 
              className="block text-sm font-medium text-white/80 tracking-wide uppercase mb-2"
            >
              Выезд
            </label>
            <input
              type="date"
              id="desktop-checkOutDate"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full py-3 px-4 text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              min={checkInDate || new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Guests */}
          <div className="flex-1 max-w-xs">
            <label className="block text-sm font-medium text-white/80 tracking-wide uppercase mb-2">
              Гости
            </label>
            <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-lg px-4 py-3 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => handleGuestChange(-1)}
                disabled={guests <= 1}
                aria-label="Уменьшить количество гостей"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out font-medium text-lg focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 active:scale-95 cursor-pointer bg-white/10 text-white border border-white/20"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-base text-white font-medium">
                  {guests} {guests === 1 ? 'гость' : guests < 5 ? 'гостя' : 'гостей'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleGuestChange(1)}
                disabled={guests >= 12}
                aria-label="Увеличить количество гостей"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out font-medium text-lg focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 active:scale-95 cursor-pointer bg-white/10 text-white border border-white/20"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-transparent mb-2">
              .
            </label>
            <button
              type="submit"
              className="bg-emerald-500/90 hover:bg-emerald-500 text-white py-3 px-8 rounded-lg font-medium text-base transition-all duration-300 active:scale-98 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-lg min-w-[160px]"
            >
              Забронировать
            </button>
          </div>
        </form>
      </div>
    </div>
  </motion.div>
);

// Mobile Booking Form - Compact
const MobileBookingForm = ({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, guests, handleGuestChange, handleBookingSubmit }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="absolute bottom-4 left-4 right-4 z-30 md:hidden"
  >
    <div className="rounded-xl overflow-hidden shadow-2xl bg-black/25 backdrop-blur-xl border border-white/15">
      <div className="p-3 sm:p-4">
        <form onSubmit={handleBookingSubmit} className="space-y-3">
          {/* Dates section */}
          <div className="grid grid-cols-2 gap-2">
            {/* Check-in */}
            <div className="space-y-1">
              <label 
                htmlFor="mobile-checkInDate" 
                className="block text-xs font-medium text-white/80 tracking-wide uppercase"
              >
                Заезд
              </label>
              <input
                type="date"
                id="mobile-checkInDate"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Check-out */}
            <div className="space-y-1">
              <label 
                htmlFor="mobile-checkOutDate" 
                className="block text-xs font-medium text-white/80 tracking-wide uppercase"
              >
                Выезд
              </label>
              <input
                type="date"
                id="mobile-checkOutDate"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                min={checkInDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {/* Guests section */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/80 tracking-wide uppercase">
              Гости
            </label>
            <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => handleGuestChange(-1)}
                disabled={guests <= 1}
                aria-label="Уменьшить количество гостей"
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out font-medium text-base focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 active:scale-95 cursor-pointer bg-white/10 text-white border border-white/20"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-sm text-white font-medium">
                  {guests} {guests === 1 ? 'гость' : guests < 5 ? 'гостя' : 'гостей'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleGuestChange(1)}
                disabled={guests >= 12}
                aria-label="Увеличить количество гостей"
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out font-medium text-base focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 active:scale-95 cursor-pointer bg-white/10 text-white border border-white/20"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-emerald-500/90 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 active:scale-98 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-lg"
          >
            Забронировать
          </button>
        </form>
      </div>
    </div>
  </motion.div>
);

const ScrollDownIndicator = () => (
  
  
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <svg 
        className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={1}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.div>
  
);

const HeroContent = ({ isSmallScreen }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative z-10 h-screen flex items-center px-8 md:px-16"
  >
    <div className="w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide"
          >
            ПРИКОСНИСЬ
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide"
          >
            К ПРИРОДЕ
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide"
          >
            ВМЕСТЕ
          </motion.h3>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="space-y-2"
        >
          <h4 className="text-4xl md:text-6xl lg:text-7xl font-bold text-emerald-400 leading-tight tracking-wide">
            С ЛУНОЙ 50
          </h4>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-white/90 text-base md:text-lg max-w-lg leading-relaxed"
        >
          Если бы луна была домом<br />
          она бы выглядела именно так
        </motion.p>
      </motion.div>
    </div>
  </motion.div>
);

export default function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setCheckInDate(today.toISOString().split('T')[0]);
    setCheckOutDate(tomorrow.toISOString().split('T')[0]);
    
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    checkScreenSize();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGuestChange = useCallback((increment) => {
    setGuests((prev) => Math.max(1, Math.min(12, prev + increment)));
  }, []);

  const handleBookingSubmit = useCallback((e) => {
    e.preventDefault();
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (!checkOutDate) {
      alert('Пожалуйста, выберите дату выезда');
      return;
    }
    
    if (checkOut <= checkIn) {
      alert('Дата выезда должна быть позже даты заезда');
      return;
    }
    
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) {
      const confirm = window.confirm('Вы выбрали период больше 30 дней. Продолжить?');
      if (!confirm) return;
    }
    
    const query = `checkIn=${encodeURIComponent(checkInDate)}&checkOut=${encodeURIComponent(checkOutDate)}&guests=${guests}`;
    router.push(`/select-house?${query}`);
  }, [checkInDate, checkOutDate, guests, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-sm font-light">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-blue-50 min-h-screen ${loftFont.variable}`}>
      <AnimatePresence>
        <motion.div
          key="page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <LocationInfo />
          
          {/* Hero section with video/image */}
          <div className="relative h-screen">
            {!isSmallScreen ? (
              <>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-screen object-cover z-0"
                  preload="auto"
                >
                  <source src="/video/nature.mp4" type="video/mp4" />
                  <source src="/video/nature.webm" type="video/webm" />
                  Ваш браузер не поддерживает HTML5 видео.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-1"></div>
              </>
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                className="absolute top-0 left-0 w-full h-screen object-cover z-0"
                preload="auto"
              >
                <source src="/video/nature.mp4" type="video/mp4" />
                <source src="/video/nature.webm" type="video/webm" />
                Ваш браузер не поддерживает HTML5 видео.
              </video>
            )}

            <HeroContent isSmallScreen={isSmallScreen} />
            
            {/* Desktop Booking Form */}
            <DesktopBookingForm
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              guests={guests}
              handleGuestChange={handleGuestChange}
              handleBookingSubmit={handleBookingSubmit}
            />

            {/* Mobile Booking Form */}
            <MobileBookingForm
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              guests={guests}
              handleGuestChange={handleGuestChange}
              handleBookingSubmit={handleBookingSubmit}
            />
            
            <ScrollDownIndicator />
          </div>

          {/* Content sections */}
          <div className="relative z-10 bg-blue-50">
            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <Kurort />
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative w-full px-4 sm:px-0"
            >
              <HouseCarousel />
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative z-10 py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-0"
            >
              <EnvironmentSection />
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="px-4 sm:px-0"
            >
              <ServicesSection />
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="px-4 sm:px-0"
            >
              <Dopodvala />
            </motion.div>

            <Footer />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
