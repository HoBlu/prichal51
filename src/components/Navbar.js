'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import { Clock, MapPin, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const cn = (...inputs) => twMerge(clsx(inputs))

// Константы
const TIMEZONE_OFFSET = 7
const DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const MAP_LINK = 'https://yandex.ru/maps/11235/altai-krai/house/sovetskaya_ulitsa_50/bEwYfgZkSEYAQFtrfXV1dHxkYg==/?ll=85.815381%2C51.944491&z=16.6'

// Вспомогательная функция debounce
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Компонент отображения времени
function TimeDisplay({ time, date }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="relative p-6 rounded-xl border border-gray-100 bg-white text-gray-800 shadow-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 to-transparent opacity-40 rounded-xl">
        <div className="absolute inset-0 bg-white/60 rounded-xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium tracking-tight">Местное время</h3>
        </div>
        <div className="text-3xl font-light mb-2 font-mono">{time}</div>
        <div className="text-lg text-gray-500">{date}</div>
      </div>
    </motion.div>
  )
}

// Компонент отображения местоположения
function LocationDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative p-6 rounded-xl border border-gray-100 bg-white text-gray-800 shadow-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-50 to-transparent opacity-40 rounded-xl">
        <div className="absolute inset-0 bg-white/60 rounded-xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="w-5 h-5 text-teal-500" />
          <h3 className="text-lg font-medium tracking-tight">Расположение</h3>
        </div>
        <p className="text-lg mb-4 text-gray-600">Село Ая, ул. Советская 50</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(MAP_LINK, '_blank')}
          className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white transition-all duration-300 font-medium rounded-lg text-center"
        >
          Показать на карте
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Мемоизация пунктов меню
  const menuItems = useMemo(() => [
    { href: '/gallery', text: 'Фотогалерея' },
    { href: '/services', text: 'Услуги и сервис' },
    { href: '/contact', text: 'Контакты' }
  ], [])

  // Проверка размера экрана
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Обработка скролла с debounce
  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrolled(window.scrollY > 20)
    }, 100)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Обновление времени
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Горный Алтай UTC+7, добавляем разницу с UTC
      const altaiOffset = 7 * 60 * 60 * 1000;
      const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
      const altaiTime = new Date(utc + altaiOffset);
      
      setTime(altaiTime.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit'
      }));
      
      setDate(`${DAYS[altaiTime.getDay()]}, ${altaiTime.getDate()} ${MONTHS[altaiTime.getMonth()]}`);
    };
  
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Запрет прокрутки при открытом меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    } 
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-white/5 backdrop-blur-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.55 }}
                className="h-24 w-24 relative"
              >
                <Image
                  src="/navbar/logo.png"
                  alt="Логотип базы отдыха"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </Link>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(true)}
              className={`px-5 py-2 rounded-full ${
                scrolled ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'
              } hover:bg-blue-600 transition-all duration-300`}
              aria-label="Открыть меню"
            >
              <span className="text-sm font-medium">Меню</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/5 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 h-full w-full bg-white/95"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full overflow-auto py-6">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="h-10 w-10 relative"
                    >
                      <Image
                        src="/navbar/logo.png"
                        alt="Логотип базы отдыха"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  </Link>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-900"
                    aria-label="Закрыть меню"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">Навигация</h2>
                    <div className="space-y-6">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="group block"
                          >
                            <motion.div 
                              whileHover={{ x: 10 }}
                              className="flex items-center"
                            >
                              <span className="text-3xl sm:text-4xl font-light text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{item.text}</span>
                              <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-3 text-blue-600 opacity-0 group-hover:opacity-100"
                              >
                                →
                              </motion.span>
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3 space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Информация</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TimeDisplay time={time} date={date} />
                        <LocationDisplay />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="pt-6"
                    >
                      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Свяжитесь с нами</h2>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <p className="text-xl font-medium text-gray-800 mb-2">+7 (962) 807-50-50</p>
                        <p className="text-gray-600">prichal50.altai@yandex.ru</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}