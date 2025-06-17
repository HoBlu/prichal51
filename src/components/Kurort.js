import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, Tent, UtensilsCrossed, Bath, Waves, Mountain, Snowflake } from 'lucide-react';

// Минималистичная карточка услуги
const ServiceCard = ({ service, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative w-full h-72 rounded-lg overflow-hidden"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Фоновое изображение с эффектом затемнения при наведении */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
        style={{ 
          backgroundImage: `url(${service.image})`,
          filter: isExpanded ? 'brightness(0.3)' : 'brightness(0.8)',
          transform: isExpanded ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      {/* Градиентный оверлей */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-70'}`} />
      
      {/* Содержимое карточки */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full transition-all duration-300 ${
            isExpanded ? 'bg-white text-blue-900' : 'bg-blue-900/20 text-white backdrop-blur-md'
          }`}>
            {service.icon}
          </div>
          <h3 className="text-lg font-light tracking-wide text-white">{service.title}</h3>
        </div>
        
        <AnimatePresence>
          {!isExpanded ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-white/80 mt-auto"
            >
              {service.description}
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 mt-auto"
            >
              <p className="text-sm text-white/90 font-light">{service.description}</p>
              <p className="text-xs text-white/80">{service.detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Основной компонент для показа услуг
const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Категории услуг
  const categories = [
    { id: 'all', name: 'Все услуги' },
    { id: 'accommodation', name: 'Проживание' },
    { id: 'activities', name: 'Активности' },
    { id: 'food', name: 'Питание' },
    { id: 'wellness', name: 'Отдых' },
  ];
  
  // Данные об услугах
  const services = [
    {
      id: 1,
      title: "Номера в основном доме",
      description: "В разработке",
      detail: "",
      category: "accommodation",
      icon: <Home size={18} />,
      image: "/housecarousel/osnovnoi.jpg",
    },
    {
      id: 2,
      title: "Уютные домики",
      description: "Отдельные домики с собственной террасой",
      detail: "Полностью оборудованные домики с двуспальной кроватью, двухъярусной кроватью, тёплыми полами и всеми удобствами. Вечерние прогулки по освещенным дорожкам подарят незабываемые впечатления.",
      category: "accommodation",
      icon: <Tent size={18} />,
      image: "/housecarousel/domiki.jpg",
    },
    {
      id: 3,
      title: "Бассейн для всей семьи",
      description: "Просторный бассейн с зонами для взрослых и детей",
      detail: "Комфортная зона отдыха с шезлонгами и лежаками. Бассейн - это не только возможность освежиться в жаркий день, но и отличное возможность для общения и создания ярких воспоминнаний.",
      category: "activities",
      icon: <Waves size={18} />,
      image: "/housecarousel/pool.jpg",
    },
    {
      id: 4,
      title: "Бани",
      description: "Стоимость: 2000 рублей в час, Минимальное время бронирования: 2 часа",
      detail: "Наслаждайтесь настоящим банным отдыхом в окружении живописной природы. Идеальное место для расслабления после активного дня.",
      category: "wellness",
      icon: <Bath size={18} />,
      image: "/housecarousel/banya.jpg",
    },
    {
      id: 5,
      title: "Террасы и столовая",
      description: "В разработке",
      detail: "",
      category: "food",
      icon: <UtensilsCrossed size={18} />,
      image: "/housecarousel/recepsh.jpg",
    },
    {
      id: 6,
      title: "Горная река",
      description: "Прогулки вдоль горной реки.",
      detail: "Наслаждайтесь шумом воды и свежестью горного воздуха.",
      category: "activities",
      icon: <Mountain size={18} />,
      image: "/housecarousel/reka.jpg",
    },
    {
      id: 7,
      title: "Комфортный климат",
      description: "Системы отопления и кондиционирования для любого времени года",
      detail: "Тёплые полы, современные системы вентиляции обеспечивают комфортное пребывание в любое время года. Ощутите настоящий домашний уют вдали от дома.",
      category: "wellness",
      icon: <Snowflake size={18} />,
      image: "/housecarousel/climat.jpg",
    },
  ];
  
  // Отслеживание размера окна
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Определение количества слайдов в зависимости от размера экрана
  const getSlidesPerView = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };
  
  const slidesPerView = getSlidesPerView();
  
  // Фильтрация услуг по категории
  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(service => service.category === activeCategory);
  
  const maxSlide = Math.max(0, filteredServices.length - slidesPerView);
  
  // Сброс текущего слайда при изменении категории
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);
  
  // Навигация по слайдам
  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));
  
  // Перетаскивание на мобильных устройствах
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  };
  
  const handleDragEnd = (e) => {
    if (!isDragging) return;
    
    const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) { // Минимальное расстояние для свайпа
      if (diffX > 0 && currentSlide < maxSlide) {
        nextSlide();
      } else if (diffX < 0 && currentSlide > 0) {
        prevSlide();
      }
    }
    
    setIsDragging(false);
  };
  
  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-blue-500 text-sm tracking-wider mb-2">ЛУНА 50</span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Уютный отдых в горах
          </h2>
          <div className="w-20 h-px bg-blue-400 mx-auto mb-6"></div>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Откройте для себя комфорт и красоту природы в нашей горной базе отдыха
          </p>
        </motion.div>
        
        {/* Фильтр категорий */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-900 text-white rounded-lg'
                  : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        {/* Слайдер карточек услуг */}
        <div className="relative">
          <div 
            ref={sliderRef}
            className="overflow-hidden px-1"
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={isDragging ? handleDragEnd : null}
          >
            <motion.div 
              className="flex"
              initial={false}
              animate={{
                x: `-${currentSlide * (100 / slidesPerView)}%`
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="px-2"
                  style={{ 
                    width: `${100 / slidesPerView}%`, 
                    flexShrink: 0 
                  }}
                >
                  <ServiceCard service={service} delay={index * 0.1} />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Индикаторы слайдов и навигация */}
          {filteredServices.length > slidesPerView && (
            <div className="flex flex-col items-center mt-8 gap-6">
              <div className="flex justify-center items-center gap-2">
                {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      currentSlide === i ? 'w-8 bg-blue-900' : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`Перейти к слайду ${i + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  whileHover={currentSlide > 0 ? { scale: 1.1 } : {}}
                  whileTap={currentSlide > 0 ? { scale: 0.9 } : {}}
                  className={`p-2 rounded-full border transition-all ${
                    currentSlide === 0 
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                      : 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'
                  }`}
                  aria-label="Предыдущий слайд"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                
                <motion.button
                  onClick={nextSlide}
                  disabled={currentSlide === maxSlide}
                  whileHover={currentSlide < maxSlide ? { scale: 1.1 } : {}}
                  whileTap={currentSlide < maxSlide ? { scale: 0.9 } : {}}
                  className={`p-2 rounded-full border transition-all ${
                    currentSlide === maxSlide 
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                      : 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'
                  }`}
                  aria-label="Следующий слайд"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
