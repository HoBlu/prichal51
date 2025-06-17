import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Наш сервис | База отдыха</title>
        <meta name="description" content="Наш сервис нашей базы отдыха. Комфортные номера, домики, бассейн и многое другое." />
      </Head>

      {/* Hero секция */}
      <div className="relative h-64 md:h-96 bg-blue-800">
        <div
          className="absolute inset-0 opacity-60 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}
        ></div>
        <div className="relative flex flex-col items-center justify-center h-full text-white px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4 md:mb-6">УСЛУГИ И СЕРВИС</h1>
          <div className="w-16 h-1 bg-teal-500 mb-4 md:mb-6"></div>
          <p className="text-lg md:text-xl max-w-3xl">Комфорт и уют на уникальной Базе отдыха ЛУНА №50</p>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-800">РАЗМЕЩЕНИЕ</h2>
            <div className="w-12 md:w-16 h-1 bg-teal-500 mb-6 md:mb-8"></div>
            <p className="text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Мы предлагаем комфортное размещение с комфортными условиями.
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start p-3 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-500 text-white flex items-center justify-center rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="ml-3 md:ml-5">
                  <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-1 md:mb-2">НОМЕРА В БОЛЬШОМ ДОМЕ</h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    3 просторных номера на первом этаже. Каждый номер рассчитан на комфортное размещение до 4 человек.
                    Перед каждым номером — индивидуальная терраса со столиком.
                  </p>
                </div>
              </div>

              <div className="flex items-start p-3 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-teal-500 text-white flex items-center justify-center rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-3 md:ml-5">
                  <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-1 md:mb-2">ОТДЕЛЬНЫЕ ДОМИКИ</h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Уютные Гостевые дома с террасой и всеми удобствами номеров основного здания.
                    Идеальный выбор для тех, кто ценит уединение и приватность.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 md:p-8 shadow-md rounded-lg">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="bg-white shadow-sm p-3 md:p-6 text-center rounded-lg">
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-blue-800">Каждый номер включает в себя</h3>
              </div>
              <div className="bg-white shadow-sm p-3 md:p-6 text-center rounded-lg">
                <p className="text-gray-500 text-sm md:text-base">Двуспальная кровать, Теплый пол в ванной, Микроволновка</p>
              </div>
              <div className="bg-white shadow-sm p-3 md:p-6 text-center rounded-lg">
                <p className="text-gray-500 text-sm md:text-base">Мини-холодильник, Диван или Двухъярусную кровать</p>
              </div>
              <div className="bg-white shadow-sm p-3 md:p-6 text-center rounded-lg">
                <p className="text-gray-500 text-sm md:text-base">Водонагреватель, Душевая и санузел, Wi-Fi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Бассейн */}
        <div className="mb-12 md:mb-20">
          <div className="bg-gradient-to-r from-blue-400 to-teal-400 text-white p-6 md:p-12 relative overflow-hidden shadow-md rounded-lg">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">БАССЕЙН</h2>
              <div className="w-12 md:w-16 h-1 bg-white mb-6 md:mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <div>
                  <p className="text-white mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    Просторный бассейн чаша бассейна имеет две зоны — для взрослых и детей, что делает его идеальным местом для
                    семейного отдыха.
                  </p>
                  <ul className="space-y-2 text-white text-sm md:text-base">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 md:h-5 md:w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Площадь 16×8 метров
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 md:h-5 md:w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Отдельные зоны для взрослых и детей
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 md:h-5 md:w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Зона для шезлонгов и лежаков
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 md:h-5 md:w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Постоянная фильтрация и подогрев
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-40 h-40 md:w-64 md:h-64 border-4 md:border-8 border-white relative rounded-lg">
                    <div className="absolute inset-0 bg-blue-500 opacity-60 rounded-lg"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-teal-500 opacity-40 rounded-b-lg"></div>
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-xl md:text-3xl font-bold">16×8</div>
                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white text-sm md:text-base font-bold">БАССЕЙН</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительные услуги */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-800">ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ</h2>
          <div className="w-12 md:w-16 h-1 bg-teal-500 mb-6 md:mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-white p-4 md:p-8 shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 text-white flex items-center justify-center mb-4 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-blue-800">БАНЯ</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                На территории базы расположена баня, где вы можете расслабиться и восстановить силы после активного дня.
              </p>
            </div>

            <div className="bg-white p-4 md:p-8 shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-500 text-white flex items-center justify-center mb-4 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-blue-800">МАНГАЛЬНЫЕ ЗОНЫ</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                Специально оборудованные места для барбекю позволят вам насладиться приготовлением еды на открытом огне в кругу близких.
              </p>
            </div>

            <div className="bg-white p-4 md:p-8 shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 text-white flex items-center justify-center mb-4 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-blue-800">БЛИЗОСТЬ К МАГАЗИНАМ</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                База отдыха расположена недалеко от магазинов, где вы сможете приобрести все необходимое для комфортного отдыха.
              </p>
            </div>
          </div>
        </div>

        {/* Особенности территории */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-800">ОСОБЕННОСТИ ТЕРРИТОРИИ</h2>
          <div className="w-12 md:w-16 h-1 bg-teal-500 mb-6 md:mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src="/images/river.jpg"
                  alt="Горная река"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-800">ВБЛИЗИ ГОРНОЙ РЕКИ</h3>
                <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  База расположена вблизи живописного берега горной реки, что создает особую атмосферу единения с природой. Шум воды и свежий горный воздух станут приятным дополнением к вашему отдыху.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src="/images/path.jpg"
                  alt="Освещенная дорожка"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-800">ОСВЕЩЕННЫЕ ДОРОЖКИ</h3>
                <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  Вдоль всех домиков проходит удобная дорожка с декоративной подсветкой, что делает вечерние прогулки по территории не только приятными, но и безопасными.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
