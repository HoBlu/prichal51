import React, { useState, useEffect } from 'react';

export default function FeaturesSection() {
  const [touchDevice, setTouchDevice] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(isTouchDevice);
  }, []);

  const handleTouch = (id) => {
    if (touchDevice) {
      setActiveFeature(prev => prev === id ? null : id);
    }
  };

  const features = [
    {
      id: 1,
      title: 'Уединение и спокойствие',
      description:
        'Наши домики расположены в живописных местах, вдали от городского шума и суеты, обеспечивая полный релакс.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M7 18H17V19C17 20.1046 16.1046 21 15 21H9C7.89543 21 7 20.1046 7 19V18Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 15H19C20.1046 15 21 14.1046 21 13V12C21 10.8954 20.1046 10 19 10H5C3.89543 10 3 10.8954 3 12V13C3 14.1046 3.89543 15 5 15Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10V6C8 4.34315 9.34315 3 11 3H13C14.6569 3 16 4.34315 16 6V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      imageUrl: '/images/house1.jpg',
    },
    {
      id: 2,
      title: 'Современные удобства',
      description:
        'Каждый домик оборудован всем необходимым для комфортного отдыха, включая Wi-Fi, кондиционер и современную технику.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M9 21H15M9 21V18M15 21V18M9 18H15M9 18C7.89543 18 7 17.1046 7 16V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V16C17 17.1046 16.1046 18 15 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7H12.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      imageUrl: '/images/house2.jpg',
    },
    {
      id: 3,
      title: 'Идеальное расположение',
      description:
        'Удобное расположение, в пешей доступности к продуктовым магазинам.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.6 9H20.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.6 15H20.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 3C14.5 5.5 15.2 7.7 15 12C14.8 16.3 14 18.5 12 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 3C9.5 5.5 8.8 7.7 9 12C9.2 16.3 10 18.5 12 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      imageUrl: '/images/house3.jpg',
    },
    {
      id: 4,
      title: 'Живописная природа и чистейший воздух',
      description:
        'Уединение и тишина — то, чего так не хватает в городе.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M12 3L14.5 8.5L21 9.5L16.5 14L17.5 20.5L12 17.5L6.5 20.5L7.5 14L3 9.5L9.5 8.5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 15C2.9 16.9 2 19.1 2 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 21C22 19.1 21.1 16.9 20 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 15.5C5.6 16.6 4.5 18.7 4 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 21C19.5 18.7 18.4 16.6 17 15.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      imageUrl: '/images/house4.jpg',
    },
    {
      id: 5,
      title: 'Аниматоры для ваших детей',
      description:
        'Творческие мастер-классы и игры на свежем воздухе для детей любого возраста. Профессиональный присмотр за детьми, чтобы вы могли отдохнуть без забот',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle 
            cx="10" 
            cy="8" 
            r="4" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <circle 
            cx="16" 
            cy="10" 
            r="3" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M5 20C5 17.2386 7.23858 15 10 15C12.7614 15 15 17.2386 15 20" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M19 18C19 16.3431 17.6569 15 16 15C14.3431 15 13 16.3431 13 18" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      ),
      imageUrl: '/images/house5.jpg',
    },
    {
      id: 6,
      title: 'Чистота, порядок и забота в деталях',
      description:
        'Мы следим за каждой мелочью — от свежего белья до уютных мелочей. Также мы следим о благоустройсте территории базы отдыха, преимущество аккамуляторная газонокосился, которая не потревожит ваш отдых.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path 
            d="M14 4L18 8L14 12" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M18 8H9C7.34315 8 6 9.34315 6 11V11" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M10 20L6 16L10 12" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M6 16H15C16.6569 16 18 14.6569 18 13V13" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      ),
      imageUrl: '/images/house6.jpg',
    },
    
  ];

  return (
    <section className="py-12 sm:py-20 relative bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-2xl sm:text-3xl uppercase tracking-wider text-blue-500 mb-2 font-medium">
            Особенности
          </span>
          <h2 className="text-xs font-light mb-4 text-gray-700">Продуманные до мелочей</h2>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Мы позаботились о каждой детали, чтобы ваше пребывание было максимально комфортным и запоминающимся.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`relative overflow-hidden group rounded-md transition-all duration-300 h-64 sm:h-80 ${
                touchDevice ? 'cursor-pointer' : 'cursor-default'
              }`}
              onTouchStart={() => handleTouch(feature.id)}
              onClick={touchDevice ? () => handleTouch(feature.id) : undefined}
            >
              {/* Изображение */}
              <div 
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 ease-in-out ${
                  touchDevice 
                    ? (activeFeature === feature.id ? 'opacity-100' : 'opacity-0')
                    : 'opacity-0 group-hover:opacity-100'
                }`}
                style={{ backgroundImage: `url(${feature.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-blue-800/40"></div>
              </div>

              {/* Основной контент */}
              <div 
                className={`relative h-full bg-white shadow transition-opacity duration-300 p-6 border border-gray-200 ${
                  touchDevice 
                    ? (activeFeature === feature.id ? 'opacity-0' : 'opacity-100')
                    : 'opacity-100 group-hover:opacity-0'
                }`}
              >
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 mb-4 text-blue-500 transition-transform duration-300 group-hover:scale-110"
                  aria-label={feature.title}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-blue-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>

              {/* Наложение текста на изображение */}
              <div 
                className={`absolute inset-0 flex flex-col justify-end px-6 py-6 text-white transition-opacity duration-300 ${
                  touchDevice 
                    ? (activeFeature === feature.id ? 'opacity-100' : 'opacity-0')
                    : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
