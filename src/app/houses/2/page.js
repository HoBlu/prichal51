'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Microwave, ChevronRight, ThermometerSun, Home, Map, Refrigerator, Calendar, Users, BedDouble, FlameKindling, Wifi, ShowerHead, Snowflake } from 'lucide-react';
import Footer from '@/components/Footer';
import Image from 'next/image';

// Импорт фотографий из папки houses
const houseImages = [
  '/domiki/dom1.jpg',
  '/domiki/dom2.jpg',
  '/domiki/dom3.jpg',
  '/domiki/dom4.jpg',
  '/domiki/dom5.jpg'
];

const HousePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [activeTab, setActiveTab] = useState('описание');

  const carouselImages = [
    {
      url: houseImages[0],
    },
    {
      url: houseImages[1],
    },
    {
      url: houseImages[2],
    },
    {
      url: houseImages[3],
    },
    {
      url: houseImages[4],
    }
  ];

  const amenities = [
    { name: "Wi-Fi", icon: <Wifi size={20} /> },
    { name: "Душевая с санузлом", icon: <ShowerHead size={20} /> },
    { name: "Мини Холодильник", icon: <Refrigerator size={20} /> },
    { name: "Двуспальная кровать и диван", icon: <BedDouble size={20} /> },
    { name: "Постельное белье.", icon: <Users size={20} /> },
    { name: "Средства гигиены и пр.", icon: <FlameKindling size={20} /> },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoplay(false);
  };

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoplay, carouselImages.length]);

  const getTransform = (index) => {
    const diff = (index - activeIndex + carouselImages.length) % carouselImages.length;
    
    if (diff === 0) return "translate3d(0, 0, 150px) scale(1)";
    
    if (diff === 1 || diff === carouselImages.length - 1) {
      const sign = diff === 1 ? 1 : -1;
      return `translate3d(${sign * 150}px, 0, 0) scale(0.8) rotateY(${-sign * 45}deg)`;
    }
    
    return "translate3d(0, 0, -200px) scale(0.6)";
  };

  const getZIndex = (index) => {
    const diff = (index - activeIndex + carouselImages.length) % carouselImages.length;
    if (diff === 0) return 10;
    if (diff === 1 || diff === carouselImages.length - 1) return 5;
    return 1;
  };

  const getOpacity = (index) => {
    const diff = (index - activeIndex + carouselImages.length) % carouselImages.length;
    if (diff === 0) return 1;
    if (diff === 1 || diff === carouselImages.length - 1) return 0.7;
    return 0.3;
  };

  return (
    <div className="w-full bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800">НОМЕР В КОТТЕДЖЕ</h1>
            <div className="flex items-center mt-2">
              <Map size={18} className="text-blue-500 mr-2" />
              <span className="text-gray-700">Село Ая. Отдых у берега горной реки</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative overflow-hidden">
        <div className="relative h-96 md:h-112 perspective-1000 my-8">
          <div className="relative w-full h-full">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className="absolute top-0 left-0 right-0 h-full w-full max-w-4xl mx-auto rounded-md overflow-hidden shadow-lg transition-all duration-500"
                style={{
                  transform: getTransform(index),
                  zIndex: getZIndex(index),
                  opacity: getOpacity(index),
                  transformStyle: "preserve-3d",
                }}
                onClick={() => activeIndex !== index && setActiveIndex(index)}
              >
                <div className="relative w-full h-full">
                  <div 
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ 
                      backgroundImage: `url(${image.url})`,
                      filter: "brightness(0.9)"
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-blue-500 hover:bg-white transition shadow"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <button 
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-blue-500 hover:bg-white transition shadow"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center space-x-2 mb-8">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoplay(false);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index ? 'bg-gradient-to-r from-teal-400 to-blue-400 scale-125' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Показать изображение ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex justify-center">
          <div className="inline-flex rounded-md bg-white/90 backdrop-blur-sm shadow p-1">
            {['описание', 'удобства'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-3 px-6 rounded-md font-medium text-base transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-teal-400 to-blue-400 text-white shadow transform scale-105'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <span className="absolute inset-0 rounded-md opacity-30 animate-pulse bg-gradient-to-r from-teal-400 to-blue-400"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="w-full">
          {activeTab === 'описание' && (
            <div className="space-y-6 bg-white/80 backdrop-blur-sm rounded-md shadow p-8 transition-all duration-500 
            bg-gradient-to-bl from-blue-100 to-transparent">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Добро пожаловать в наш уютный номер, расположенный в просторном коттедже у бассейна. 
                  Этот современный, уютный номер площадью 25 кв.м идеально подходит для отдыха 
                  от городской суеты и погружения в природу.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                Уютный номер из кедра, спрятанный среди величественных гор, словно теплая пристань у бурлящей реки, где аромат дерева смешивается 
                с прохладой горного воздуха. Внутри — мягкий свет, теплые полы и все, что нужно для полного расслабления: удобная двуспальная кровать, двухъярусный уголок для гостей, 
                душ с горячей водой, мини-холодильник для свежих завтраков. А с террасы — вид, от которого замирает сердце: река, вечно бегущая к горизонту, и небо, меняющее краски с 
                восходом и закатом. Здесь время замедляет шаг, а душа отдыхает.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Особого внимания заслуживает просторная терраса, где вы сможете наслаждаться утренним 
                  кофе под пение птиц или провести вечер в уютной атмосфере.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-md border border-blue-400 mt-8 transition-all hover:shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-blue-800">Информация о домике</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-blue-500">
                      <Home size={24} />
                    </div>
                    <span className="text-gray-700 text-lg">Площадь: 25 м²</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-blue-500">
                      <Users size={24} />
                    </div>
                    <span className="text-gray-700 text-lg">Вместимость: до 4 гостей</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-blue-500">
                      <Calendar size={24} />
                    </div>
                    <span className="text-gray-700 text-lg">Минимальный срок: сутки</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-blue-500">
                      <Map size={24} />
                    </div>
                    <span className="text-gray-700 text-lg">Уединение, природа и инфраструктура в шаговой доступности</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'удобства' && (
            <div className="space-y-8 bg-white/80 backdrop-blur-sm rounded-md shadow p-8 
            bg-gradient-to-tr from-teal-100 to-transparent">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amenities.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm p-5 rounded-md shadow-sm 
                    transition-all duration-300 hover:shadow hover:transform hover:scale-105"
                  >
                    <div className="bg-blue-50 p-3 rounded-full text-teal-500 shadow-inner">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                ))}
                <div 
                  className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm p-5 rounded-md shadow-sm 
                  transition-all duration-300 hover:shadow hover:transform hover:scale-105"
                >
                  <div className="bg-blue-50 p-3 rounded-full text-teal-500 shadow-inner">
                    <ThermometerSun size={20} />
                  </div>
                  <span className="text-gray-700 font-medium">Тёплые полы</span>
                </div>
                <div 
                  className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm p-5 rounded-md shadow-sm 
                  transition-all duration-300 hover:shadow hover:transform hover:scale-105"
                >
                  <div className="bg-blue-50 p-3 rounded-full text-teal-500 shadow-inner">
                    <Microwave size={20} />
                  </div>
                  <span className="text-gray-700 font-medium">Микроволновка</span>
                </div>
                <div 
                  className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm p-5 rounded-md shadow-sm 
                  transition-all duration-300 hover:shadow hover:transform hover:scale-105"
                >
                  <div className="bg-blue-50 p-3 rounded-full text-teal-500 shadow-inner">
                    <Snowflake size={20} />
                  </div>
                  <span className="text-gray-700 font-medium">Терраса</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Расположение</h2>
        <div className="bg-white/90 backdrop-blur-sm rounded-md overflow-hidden h-96 shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d802.3251288953614!2d85.81321407891592!3d51.94508517990495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDU2JzQyLjEiTiA4NcKwNDgnNTEuNCJF!5e1!3m2!1sru!2sru!4v1744186224305!5m2!1sru!2sru"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Местоположение домика"
            className="w-full h-full"
          />
        </div>
        <p className="mt-4 text-gray-700">
          Домик расположен в селе Ая, улица Советская 50. Удобный подъезд на автомобиле, 
          парковка на территории.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default HousePage;