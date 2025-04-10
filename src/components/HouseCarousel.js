import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, HomeIcon, Users, Square, Leaf, Wind, ChevronRight } from 'lucide-react';

const houses = [
  {
    id: 1,
    image: "/housecarousel1/domiki.jpg",
    name: "СЕМЕЙНЫЙ ЛЮКС",
    description: "Наши домики выполнены из натурального кедра – дерева с уникальным ароматом и целебными свойствами, а также долговечного металлогранита, обеспечивающего надежность и теплоизоляцию.",
    area: "20 м²",
    rooms: "Домик с  терассой",
    capacity: "До 4 человек",
    amenities: ["Все удобства в номере", "Теплые полы", "Мини-холодильник", "Терраса", "Душевая и санузел", "Wi-Fi"]
  },
  {
    id: 2,
    image: "/housecarousel1/osnovnoi.jpg",
    name: "СЕМЕЙНЫЙ ЛЮКС У БАССЕЙНА",
    description: "Для тех, кто предпочитает просторный отдых, наш большой дом станет идеальным вариантом! Здесь созданы комфортные номера с современными удобствами, а просторные помещения и теплая атмосфера подойдут как для семей, так и для дружных компаний.",
    area: "25 м²",
    rooms: "Номер в домике",
    capacity: "До 4 человек",
    amenities: ["Все удобства в номере", "Панорамные окна", "Мини холодильник", "Терраса", "Wi-Fi", "Теплые полы"]
  }
];

export default function MinimalistHouseCarousel() {
  const [currentHouse, setCurrentHouse] = useState(0);
  const router = useRouter();

  const house = houses[currentHouse];

  // Animations
  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
  };

  const nextHouse = () => {
    setCurrentHouse((prev) => (prev + 1) % houses.length);
  };

  const prevHouse = () => {
    setCurrentHouse((prev) => (prev - 1 + houses.length) % houses.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevHouse();
      else if (e.key === 'ArrowRight') nextHouse();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="py-8 px-4 bg-blue-50">
      <div className="max-w-full mx-auto w-full">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-8 flex flex-col sm:flex-row sm:items-center"
        >
          <Leaf className="w-5 h-5 mb-2 sm:mb-0 sm:mr-3 text-blue-500" strokeWidth={1.5} />
          <div>
            <h1
              className="text-xl md:text-2xl font-light text-blue-800 mb-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Выберите место для проживания
            </h1>
            <div className="w-12 h-px mb-2 bg-teal-500"></div>
            <p className="text-sm text-gray-500">
              Уникальные домики для отдыха в гармонии с природой
            </p>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
          {/* Image */}
          <motion.div
            key={`house-image-${house.id}`}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            className="lg:col-span-3 relative aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden shadow"
          >
            <Image
              src={house.image}
              alt={house.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              priority
            />
            <div
              className="absolute bottom-0 left-0 p-4 w-full z-10 bg-gradient-to-t from-blue-800/70 to-transparent"
            >
              <h2
                className="text-lg md:text-xl font-medium mb-2 text-white"
              >
                {house.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-white">
                  <Square className="w-3 h-3" strokeWidth={1.5} />
                  <span className="text-sm">{house.area}</span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <HomeIcon className="w-3 h-3" strokeWidth={1.5} />
                  <span className="text-sm">{house.rooms}</span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <Users className="w-3 h-3" strokeWidth={1.5} />
                  <span className="text-sm">{house.capacity}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            key={`house-desc-${house.id}`}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="lg:col-span-2 p-4 md:p-6 flex flex-col rounded-lg shadow bg-white border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wind className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
              <div
                className="text-base md:text-lg font-medium text-blue-800"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Описание
              </div>
            </div>
            <div className="w-12 h-px mb-4 bg-teal-500"></div>

            <p
              className="text-sm md:text-base leading-relaxed mb-6 text-gray-700"
            >
              {house.description}
            </p>

            <div className="mb-6">
              <div
                className="text-sm md:text-base mb-3 font-medium text-blue-800"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Удобства
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                {house.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: idx % 2 === 0 ? '#0ea5e9' : '#14b8a6' }}
                    ></div>
                    <span className="text-xs md:text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/houses/${house.id}`)}
                className="w-full py-2.5 text-sm flex items-center justify-between px-4 rounded-md transition-all duration-300 shadow-sm bg-gradient-to-r from-teal-400 to-blue-400 text-white"
              >
                <span>Подробнее</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <div className="flex justify-between mt-4 items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevHouse}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors bg-gray-200 hover:bg-blue-100 text-gray-700"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                </motion.button>

                <div className="flex items-center gap-2">
                  {houses.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentHouse(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${currentHouse === idx ? 'bg-blue-500 w-5' : 'bg-gray-300 w-1.5'}`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextHouse}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors bg-gray-200 hover:bg-blue-100 text-gray-700"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </motion.button>
              </div>

              <div
                className="relative h-0.5 w-full mt-4 overflow-hidden rounded-full bg-gray-200"
              >
                <motion.div
                  className="absolute h-full bg-blue-500"
                  initial={{ width: `${(currentHouse / (houses.length - 1)) * 100}%` }}
                  animate={{ width: `${(currentHouse / (houses.length - 1)) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}