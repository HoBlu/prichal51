import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Photo gallery data
const photos = [
  { id: 1, src: '/images/house2.jpg', alt: 'Уютный домик', caption: 'Вид снаружи' },
  { id: 2, src: '/images/house3.jpg', alt: 'Уютный домик', caption: 'Теплый вечер' },
  { id: 3, src: '/images/foto3.jpg', alt: 'Уютный домик', caption: 'Закат' },
  { id: 4, src: '/images/foto4.jpg', alt: 'Уютный домик', caption: 'Природа вокруг' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export default function PhotoGallerySection() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="py-12 sm:py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl sm:text-3xl uppercase tracking-wide text-blue-500 font-medium">
            Фотогалерея
          </span>
          <p className="mt-2 text-sm text-gray-600 max-w-lg mx-auto">
            Исследуйте красоту наших домов через фотографии
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="relative overflow-hidden rounded-lg bg-white shadow-md"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedId(selectedId === photo.id ? null : photo.id)}
            >
              <div className="relative h-56 w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-opacity duration-300 hover:opacity-90"
                  priority={photo.id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-400/20 to-blue-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-4 border-t border-blue-100">
                <p className="text-sm text-gray-700 text-center font-light">{photo.caption}</p>
              </div>

              {selectedId === photo.id && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500/95 p-4 sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full max-w-sm h-64">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="rounded-md shadow-lg object-contain"
                      sizes="(max-width: 640px) 100vw"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow"
                      onClick={() => setSelectedId(null)}
                    >
                      <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="text-center mt-3 text-white text-sm">{photo.caption}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}