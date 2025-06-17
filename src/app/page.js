'use client';

import { useState, useEffect } from 'react';
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

const TelegramBookingButton = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="absolute bottom-32 left-32 right-32 z-30"
  >
    <a
      href="https://t.me/luna50bot"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-[#62c4cc] hover:bg-emerald-500 text-white py-6 px-3 rounded-lg font-medium text-base transition-all duration-300 active:scale-98 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-lg text-center"
    >
      ЗАБРОНИРОВАТЬ
    </a>
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
          <h4 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#b1f6fc] leading-tight tracking-wide">
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

  useEffect(() => {
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

            {/* Telegram Booking Button */}
            <TelegramBookingButton />

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
