'use client';

import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Calendar, Users, Clock, ArrowRight, Camera } from 'lucide-react';
import Footer from '@/components/Footer';

const houses = [
  {
    id: 1,
    name: "СЕМЕЙНЫЙ ЛЮКС",
    description: "Уютный домик, идеальное для семейного отдыха.",
    price: "10,000 ₽",
    priceValue: 10000,
    area: "20 м²",
    capacity: "4 гостя",
    nights: "от 2 ночей",
    images: ["/house/chalet1.jpg", "/house/chalet2.jpg", "/house/chalet3.jpg", "/house/chalet3.jpg"]
  },
  {
    id: 3,
    name: "НОМЕР В КОТТЕДЖЕ",
    description: "Впечатляющий номер у бассейна и полным комфортом внутри",
    price: "10,000 ₽",
    priceValue: 10000,
    area: "25 м²",
    capacity: "4 гостя",
    nights: "от 2 ночей",
    images: ["/house/main.jpg", "/house/main2.jpg", "/house/main3.jpg"]
  }
];

const calculateStayDetails = (house, checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return { nights: 0, totalPrice: 0 };
  
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);
  
  // Проверка валидности дат
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return { nights: 0, totalPrice: 0 };
  }
  
  const nights = Math.max(1, Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)));
  return { nights, totalPrice: nights * house.priceValue };
};

const HouseCard = ({ house, onSelect, onFullScreen, isActive, checkInDate, checkOutDate, guestsCount }) => {
  const { nights, totalPrice } = calculateStayDetails(house, checkInDate, checkOutDate);

  return (
    <motion.div 
      className="w-full h-full flex flex-col"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-full flex flex-col bg-white shadow rounded-lg overflow-hidden">
        {/* Контейнер для фото, который будет адаптироваться под размер изображения */}
        <div className="relative w-full" style={{ height: 'min(50vh, 400px)' }}>
          <Image 
            src={house.images[0]} 
            alt={house.name} 
            fill 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
            className="object-cover" 
            priority 
          />
          <motion.button
            onClick={() => onFullScreen(house)}
            className="absolute bottom-4 left-4 bg-white/90 py-2 px-4 rounded-full text-blue-500 flex items-center gap-2 shadow-sm text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-4 h-4" /> Все фото
          </motion.button>
        </div>

        <div className="flex-1 p-4 sm:p-6 flex flex-col">
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className="h-1 w-6 bg-teal-500 rounded-full" />
              <span className="text-xs text-teal-500 uppercase font-medium">Премиум</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-blue-800">{house.name}</h2>
            <p className="text-sm sm:text-base text-gray-700 mt-1 sm:mt-2">{house.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {[
              { icon: Clock, value: house.area, label: "Площадь" },
              { icon: Users, value: house.capacity, label: "Вместимость" },
              { icon: Clock, value: house.nights, label: "Минимум" }
            ].map((item, idx) => (
              <div key={idx} className="p-2 bg-blue-50 rounded-md text-center">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mx-auto" />
                <span className="text-xs sm:text-sm text-gray-700">{item.value}</span>
                <span className="text-xs text-gray-500 block">{item.label}</span>
              </div>
            ))}
          </div>

          {checkInDate && checkOutDate && nights > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="text-sm text-gray-700">
                  {new Date(checkInDate).toLocaleDateString('ru-RU')} — {new Date(checkOutDate).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base text-gray-700">
                <span>{nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          )}

          <div className="mt-auto flex justify-between items-center">
            <div>
              <span className="text-xl sm:text-2xl text-blue-800">{house.price}</span>
              <span className="text-xs sm:text-sm text-gray-500">/ночь</span>
            </div>
            <motion.button
              onClick={() => onSelect(house)}
              className="bg-gradient-to-r from-teal-400 to-blue-400 text-white py-2 px-4 sm:px-6 rounded-md shadow-sm text-sm sm:text-base flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Выбрать <ArrowRight className="w-4 h-4 inline ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Lightbox = ({ house, currentIndex, onClose, onNext, onPrev }) => {
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    if (currentIndex < house.images.length - 1) {
      setDirection(1);
      onNext();
    }
  }, [currentIndex, house.images.length, onNext]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      onPrev();
    }
  }, [currentIndex, onPrev]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, handleNext, handlePrev, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col touch-none"
    >
      <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-800">
        <div className="text-white">
          <h3 className="text-base sm:text-lg font-medium">{house.name}</h3>
          <p className="text-xs sm:text-sm text-gray-400">Фото {currentIndex + 1} из {house.images.length}</p>
        </div>
        <motion.button 
          onClick={onClose} 
          className="text-white p-2 rounded-full hover:bg-white/10"
          whileHover={{ scale: 1.1 }}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? '100%' : '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full flex items-center justify-center p-4"
          >
            <div className="relative w-full h-full">
              <Image 
                src={house.images[currentIndex]} 
                alt={`${house.name} - изображение ${currentIndex + 1}`} 
                fill 
                sizes="100vw"
                className="object-contain" 
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button 
          onClick={handlePrev} 
          className={`absolute left-2 sm:left-4 p-2 bg-white/60 rounded-full ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          disabled={currentIndex === 0}
          whileHover={currentIndex !== 0 ? { scale: 1.1 } : {}}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
        </motion.button>
        
        <motion.button 
          onClick={handleNext} 
          className={`absolute right-2 sm:right-4 p-2 bg-white/60 rounded-full ${currentIndex === house.images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          disabled={currentIndex === house.images.length - 1}
          whileHover={currentIndex !== house.images.length - 1 ? { scale: 1.1 } : {}}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
        </motion.button>
      </div>

      <div className="p-2 sm:p-4 flex justify-center gap-2 overflow-x-auto bg-black/50">
        {house.images.map((img, idx) => (
          <motion.div
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              onNext(idx);
            }}
            className={`relative w-16 h-10 sm:w-20 sm:h-12 rounded-md overflow-hidden cursor-pointer ${idx === currentIndex ? 'ring-2 ring-teal-400' : 'opacity-70'}`}
            whileHover={{ scale: 1.05, opacity: 1 }}
          >
            <Image 
              src={img} 
              alt={`Миниатюра ${idx + 1}`} 
              fill 
              sizes="80px"
              className="object-cover" 
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Компонент-обертка для использования хука useSearchParams
function SelectHouseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Получаем параметры из URL
  const checkInDate = searchParams.get('checkIn');
  const checkOutDate = searchParams.get('checkOut');
  const guestsCount = searchParams.get('guests') || '1';

  // Обработка выбора дома
  const handleSelectHouse = (house) => {
    const { nights, totalPrice } = calculateStayDetails(house, checkInDate, checkOutDate);
    
    // Проверка валидности дат перед перенаправлением
    if (nights > 0) {
      router.push(`/booking-confirmation?house=${house.id}&checkIn=${encodeURIComponent(checkInDate)}&checkOut=${encodeURIComponent(checkOutDate)}&guests=${guestsCount}&nights=${nights}&totalPrice=${totalPrice}`);
    } else {
      // В случае ошибки с датами можем показать модальное окно или перенаправить на главную
      alert('Пожалуйста, выберите корректные даты заезда и выезда');
      router.push('/');
    }
  };

  // Обработка открытия определенного изображения в лайтбоксе
  const handleOpenLightbox = (house, imageIndex = 0) => {
    setSelectedHouse(house);
    setCurrentImageIndex(imageIndex);
  };

  // Функция для перехода к следующему/предыдущему дому
  const navigateHouse = (direction) => {
    const newIndex = activeIndex + direction;
    if (newIndex >= 0 && newIndex < houses.length) {
      setActiveIndex(newIndex);
    }
  };

  // Обработчики свайпа на мобильных устройствах
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && activeIndex < houses.length - 1) {
      navigateHouse(1);
    } else if (isRightSwipe && activeIndex > 0) {
      navigateHouse(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Основной контент - карусель домов (увеличен отступ для корректного отображения под Navbar и шапкой) */}
      <main className="pt-36 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Улучшенная карусель с поддержкой мобильных устройств */}
          <div 
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {houses.map((house, index) => (
                <div 
                  key={house.id} 
                  className="w-full flex-shrink-0 p-2 md:p-4"
                >
                  <HouseCard
                    house={house}
                    onSelect={handleSelectHouse}
                    onFullScreen={(house) => handleOpenLightbox(house)}
                    isActive={index === activeIndex}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    guestsCount={guestsCount}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Улучшенная навигация по карусели */}
          <div className="py-6 flex justify-center items-center gap-4">
            <motion.button 
              onClick={() => navigateHouse(-1)} 
              disabled={activeIndex === 0} 
              className={`p-3 bg-white text-blue-500 rounded-full shadow ${activeIndex === 0 ? 'opacity-30' : 'hover:bg-blue-50'}`}
              whileHover={activeIndex !== 0 ? { scale: 1.1 } : {}}
              whileTap={activeIndex !== 0 ? { scale: 0.9 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              {houses.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === activeIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Перейти к дому ${idx + 1}`}
                />
              ))}
            </div>
            
            <motion.button 
              onClick={() => navigateHouse(1)} 
              disabled={activeIndex === houses.length - 1} 
              className={`p-3 bg-white text-blue-500 rounded-full shadow ${activeIndex === houses.length - 1 ? 'opacity-30' : 'hover:bg-blue-50'}`}
              whileHover={activeIndex !== houses.length - 1 ? { scale: 1.1 } : {}}
              whileTap={activeIndex !== houses.length - 1 ? { scale: 0.9 } : {}}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </main>

      {/* Лайтбокс для просмотра фотографий */}
      <AnimatePresence>
        {selectedHouse && (
          <Lightbox
            house={selectedHouse}
            currentIndex={currentImageIndex}
            onClose={() => setSelectedHouse(null)}
            onNext={(idx) => setCurrentImageIndex(typeof idx === 'number' ? idx : (prev) => Math.min(prev + 1, selectedHouse.images.length - 1))}
            onPrev={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

// Основной компонент с Suspense для обертки useSearchParams()
export default function SelectHouse() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Загрузка...</div>}>
      <SelectHouseContent />
    </Suspense>
  );
}