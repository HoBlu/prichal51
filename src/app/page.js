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

const GuestCountButton = ({ type, onClick, disabled = false }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={type === 'minus' ? 'Уменьшить количество гостей' : 'Увеличить количество гостей'}
    className={cn(
      'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
      'transition-all duration-200 ease-in-out',
      'font-medium text-lg',
      'focus:outline-none',
      disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black/10 active:scale-95 cursor-pointer',
      'bg-transparent text-black'
    )}
  >
    {type === 'minus' ? '−' : '+'}
  </button>
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
        <span className="font-light text-sm tracking-wider">Горная свежесть · Берег реки</span>
      </div>
    </div>
  </motion.div>
);

const BookingForm = ({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, guests, handleGuestChange, handleBookingSubmit }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="w-full max-w-3xl px-3 sm:px-4 absolute bottom-12 sm:bottom-20 md:bottom-24 lg:bottom-32 left-0 right-0 mx-auto z-20"
  >
    <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {/* Check-in */}
          <div className="md:col-span-2 relative group">
            <label 
              htmlFor="checkInDate" 
              className="block text-xs font-normal text-gray-500 mb-1 transition-all duration-300"
            >
              Заезд
            </label>
            <input
              type="date"
              id="checkInDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full py-2 sm:py-3 px-3 rounded-xl bg-gray-50 border-0 focus:ring-0 text-gray-700 text-sm font-light transition-all duration-300"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Check-out */}
          <div className="md:col-span-2 relative group">
            <label 
              htmlFor="checkOutDate" 
              className="block text-xs font-normal text-gray-500 mb-1 transition-all duration-300"
            >
              Выезд
            </label>
            <input
              type="date"
              id="checkOutDate"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full py-2 sm:py-3 px-3 rounded-xl bg-gray-50 border-0 focus:ring-0 text-gray-700 text-sm font-light transition-all duration-300"
              min={checkInDate || new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Guests */}
          <div className="md:col-span-2 flex flex-col">
            <label className="block text-xs font-normal text-gray-500 mb-1">Гости</label>
            <div className="flex items-center justify-between h-full bg-gray-50 rounded-xl px-2">
              <GuestCountButton 
                type="minus" 
                onClick={() => handleGuestChange(-1)} 
                disabled={guests <= 1}
              />
              <div className="flex-1 text-center">
                <span className="text-base text-gray-800 font-light">
                  {guests}
                </span>
              </div>
              <GuestCountButton 
                type="plus" 
                onClick={() => handleGuestChange(1)} 
                disabled={guests >= 12}
              />
            </div>
          </div>

          <div className="md:col-span-6 mt-2 sm:mt-0">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-full font-light text-sm transition-all duration-300 hover:bg-black/85 active:scale-98 focus:outline-none"
            >
              Забронировать
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  </motion.div>
);

const ScrollDownIndicator = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 0.8 }}
    className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
  >
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
  console.log(isSmallScreen)
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
                  // Добавляем несколько форматов для лучшей совместимости
                >
                  <source src="/video/nature.mp4" type="video/mp4" />
                  <source src="/video/nature.webm" type="video/webm" />
                  Ваш браузер не поддерживает HTML5 видео.
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-1"></div>
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
                // Добавляем несколько форматов для лучшей совместимости
              >
                <source src="/video/nature.mp4" type="video/mp4" />
                <source src="/video/nature.webm" type="video/webm" />
                Ваш браузер не поддерживает HTML5 видео.
              </video>
            )}



            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 h-screen flex flex-col items-center justify-center text-white px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full lg:w-3/4 text-center"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 mb-6 sm:mb-8"
                >
                  <div className="flex items-center justify-center flex-wrap">
                    <h2 className="text-4xl sm:text-5xl md:text-9xl font-extrabold tracking-widest text-white mr-2">
                      ПРИЧАЛ
                    </h2>
                    <Image
                      src="/images/logo-50.png"
                      alt="50"
                      width={192}
                      height={128}
                      className="object-contain w-16 sm:w-20 md:w-48 lg:w-48"
                      priority
                    />
                  </div>
                  {!isSmallScreen ? (
                  <p className="text-lg sm:text-xl md:text-2xl font-montserrat italic text-yellow-100">
                    ОТДЫХ - О КОТОРОМ МЕЧТАЮТ
                  </p>
                  ) : ("")}
                </motion.div>
              </motion.div>
              
              <BookingForm
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                guests={guests}
                handleGuestChange={handleGuestChange}
                handleBookingSubmit={handleBookingSubmit}
              />
              
              <ScrollDownIndicator />
            </motion.div>
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