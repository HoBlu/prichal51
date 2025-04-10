import React, { useState } from 'react';
import { Sun, Sunset, Moon } from 'lucide-react';

const ResortPhotoSection = () => {
  const [activeTime, setActiveTime] = useState('day');
  const [activeTab, setActiveTab] = useState('territory');
  const resortPhoto = '/Dopodvala/Dopodvala.jpg'; // Укажите путь к вашему основному фото

  const timeOptions = [
    { id: 'day', icon: <Sun className="h-5 w-5" />, label: 'День' },
    { id: 'sunset', icon: <Sunset className="h-5 w-5" />, label: 'Закат' },
    { id: 'night', icon: <Moon className="h-5 w-5" />, label: 'Ночь' },
  ];

  const tabs = [
    { id: 'territory', title: 'Территория', desc: 'Просторная зона с живописными видами и удобствами.' },
    { id: 'accommodation', title: 'Проживание', desc: 'Уютные домики с террасами для комфортного отдыха.' },
    { id: 'activities', title: 'Развлечения', desc: 'Бассейн, пляж и тропы для активного отдыха.' },
  ];

  const advantages = [
    { title: 'Живописные виды', desc: 'Красота природы в любое время.' },
    { title: 'Комфорт', desc: 'Уют и современные удобства.' },
    { title: 'Активный отдых', desc: 'Развлечения для всей семьи.' },
  ];

  const getBackgroundClasses = () => {
    switch (activeTime) {
      case 'day': return 'bg-gray-50'; // Светлый фон как в Accommodation
      case 'sunset': return 'bg-gradient-to-br from-amber-100 to-teal-100'; // Градиент с теплыми тонами
      case 'night': return 'bg-gray-800'; // Темный фон для ночи
      default: return 'bg-gray-50';
    }
  };

  const getTextColorClasses = () => (activeTime === 'night' ? 'text-white' : 'text-gray-900');

  const getOverlayOpacity = () => {
    switch (activeTime) {
      case 'day': return 'bg-gray-900 opacity-0';
      case 'sunset': return 'bg-amber-500 opacity-20';
      case 'night': return 'bg-teal-900 opacity-40';
      default: return 'bg-gray-900 opacity-0';
    }
  };

  return (
    <section className={`min-h-screen py-20 ${getBackgroundClasses()} transition-all duration-1000 ease-in-out relative overflow-hidden`}>
      {/* Декоративные элементы как в Accommodation */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-teal-600/20 to-transparent rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h2 className={`inline-block text-4xl font-thin mb-4 border-b border-amber-600 pb-2 ${getTextColorClasses()} tracking-tight transition-colors duration-1000`}>
            Наша база отдыха
          </h2>
          <p className={`mt-4 text-lg ${activeTime === 'night' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-1000`}>
            Скоро открытие! Узнайте, что вас ждет.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className={`inline-flex p-1 rounded-full shadow-lg ${activeTime === 'night' ? 'bg-gray-700/50' : 'bg-white/80'} backdrop-blur-md transition-colors duration-1000`}>
            {timeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveTime(option.id)}
                className={`px-6 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                  activeTime === option.id
                    ? activeTime === 'night'
                      ? 'bg-teal-700 text-white shadow-md'
                      : 'bg-white text-gray-900 shadow-md'
                    : activeTime === 'night'
                    ? 'text-gray-300 hover:bg-teal-800/30'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <img src={resortPhoto} alt="Resort Overview" className="w-full h-[32rem] object-cover" />
            <div className={`absolute inset-0 ${getOverlayOpacity()} transition-opacity duration-1000`}></div>
          </div>

          <div className="space-y-6">
            <div className={`flex space-x-4 p-2 rounded-lg ${activeTime === 'night' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-500 overflow-hidden ${
                    activeTab === tab.id
                      ? activeTime === 'night'
                        ? 'text-white'
                        : 'text-gray-900'
                      : activeTime === 'night'
                      ? 'text-gray-300 hover:text-gray-100'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span className="relative z-10">{tab.title}</span>
                  <span
                    className={`absolute inset-0 bg-gradient-to-r from-teal-700 to-amber-600 transform transition-all duration-500 ${
                      activeTab === tab.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-600 transition-all duration-500 ${
                      activeTab === tab.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className={`p-6 rounded-lg ${activeTime === 'night' ? 'bg-gray-700' : 'bg-white'} shadow-lg animate-fade-in`}>
              {tabs.find((tab) => tab.id === activeTab) && (
                <>
                  <h3 className={`text-xl font-light ${getTextColorClasses()}`}>
                    {tabs.find((tab) => tab.id === activeTab).title}
                  </h3>
                  <p className={`mt-2 text-sm ${activeTime === 'night' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tabs.find((tab) => tab.id === activeTab).desc}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg ${activeTime === 'night' ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-100'} shadow-md transition-all duration-300 hover:shadow-lg hover:border-amber-500/30`}
            >
              <h3 className={`text-lg font-light ${getTextColorClasses()}`}>{item.title}</h3>
              <p className={`mt-2 text-sm ${activeTime === 'night' ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ResortPhotoSection;