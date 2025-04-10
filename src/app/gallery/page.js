// src/app/gallery/page.js
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Footer from '@/components/Footer' // Import Footer from the correct path

const photos = [
  {
    src: '/gallery/house1.jpg',
    alt: 'Домик 1'
  },
  {
    src: '/gallery/house2.jpg',
    alt: 'Домик 2'
  },
  {
    src: '/gallery/house3.jpg',
    alt: 'Домик 3'
  },
  {
    src: '/gallery/house4.jpg',
    alt: 'Домик 4'
  },
  {
    src: '/gallery/house5.jpg',
    alt: 'Домик 5'
  },
  {
    src: '/gallery/house6.jpg',
    alt: 'Домик 6'
  },
  {
    src: '/gallery/house7.jpg',
    alt: 'Домик 7'
  },
  {
    src: '/gallery/house8.jpg',
    alt: 'Домик 8'
  },
  {
    src: '/gallery/house9.jpg',
    alt: 'Домик 9'
  },
  {
    src: '/gallery/house10.jpg',
    alt: 'Домик 10'
  },
  {
    src: '/gallery/house11.jpg',
    alt: 'Домик 11'
  },
  {
    src: '/gallery/house12.jpg',
    alt: 'Домик 12'
  },
  {
    src: '/gallery/house13.jpg',
    alt: 'Домик 13'
  },
  {
    src: '/gallery/house14.jpg',
    alt: 'Домик 14'
  },
  {
    src: '/gallery/house15.jpg',
    alt: 'Домик 15'
  },
  {
    src: '/gallery/house16.jpg',
    alt: 'Домик 16'
  },
  {
    src: '/gallery/house17.jpg',
    alt: 'Домик 17'
  },
  {
    src: '/gallery/house18.jpg',
    alt: 'Домик 18'
  },
  {
    src: '/gallery/house19.jpg',
    alt: 'Домик 19'
  },
  {
    src: '/gallery/house20.jpg',
    alt: 'Домик 20'
  },
  {
    src: '/gallery/house21.jpg',
    alt: 'Домик 21'
  }
  // Добавьте больше фотографий по необходимости
]

export default function GalleryPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20 px-4 max-w-7xl mx-auto mb-12"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Галерея</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square"
            >
              <div className="w-full h-full relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={index < 6} // Load first 6 images with priority
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <Footer />
    </>
  )
}