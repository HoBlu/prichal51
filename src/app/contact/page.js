'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaLeaf, 
  FaWhatsapp, 
  FaTelegram, 
  FaVk, 
  FaInstagram 
} from 'react-icons/fa';

export default function Contact() {
  const contactInfo = {
    phone: '+7 (962) 807-50-50',
    email: 'luna50.altai@yandex.ru',
    address: 'Горный Алтай, с. Ая, улица Советская 50',
    workingHours: 'Круглосуточно',
    whatsapp: '79628075050',
    telegram: 'luna50_altai',
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col pt-16 md:pt-20 lg:pt-24">
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-8 md:mb-10 text-blue-500 mt-4 sm:mt-6">
          Как нас найти?
        </h1>

        <section className="w-full bg-white rounded-md p-5 md:p-6 shadow border border-gray-200 mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-800 mb-6">
            Контактная информация
          </h2>
          
          <div className="space-y-4 md:space-y-5">
            <div className="flex items-center gap-3">
              <div className="min-w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-400">
                <FaPhoneAlt className="text-blue-500 text-lg" />
              </div>
              <a href={`tel:${contactInfo.phone.replace(/[\s()-]/g, '')}`} className="text-gray-700 hover:text-blue-500 transition-colors break-words" aria-label={`Позвонить по номеру ${contactInfo.phone}`}>
                <strong className="font-semibold">Телефон:</strong> {contactInfo.phone}
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="min-w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-400">
                <FaEnvelope className="text-blue-500 text-lg" />
              </div>
              <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-blue-500 transition-colors break-words" aria-label={`Написать на почту ${contactInfo.email}`}>
                <strong className="font-semibold">E-mail:</strong> {contactInfo.email}
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="min-w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-400">
                <FaMapMarkerAlt className="text-blue-500 text-lg" />
              </div>
              <a href="https://www.google.com/maps?ll=51.945012,85.814514&z=19&t=h&hl=ru&gl=RU&mapclient=embed&q=%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F+%D1%83%D0%BB.,+50+%D0%90%D1%8F+%D0%90%D0%BB%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B9+%D0%BA%D1%80%D0%B0%D0%B9+659635" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 transition-colors break-words" aria-label="Открыть карту с нашим расположением">
                <strong className="font-semibold">Адрес:</strong> {contactInfo.address}
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="min-w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-400">
                <FaClock className="text-blue-500 text-lg" />
              </div>
              <p className="text-gray-700"><strong className="font-semibold">Время работы:</strong> {contactInfo.workingHours}</p>
            </div>
          </div>
          
          <div className="my-6 md:my-8 border-t border-gray-200"></div>
          
          <h2 className="text-xl md:text-2xl font-medium mb-5 text-blue-800">
            Мы в социальных сетях
          </h2>
          
          <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
            {[
              { Icon: FaWhatsapp, href: `https://wa.me/${contactInfo.whatsapp}`, label: 'WhatsApp', color: 'bg-blue-500' },
              { Icon: FaTelegram, href: `https://t.me/${contactInfo.telegram}`, label: 'Telegram', color: 'bg-teal-500' },
              { Icon: FaVk, href: 'https://vk.com/luna50.altai.altai', label: 'ВКонтакте', color: 'bg-blue-500' },
              { Icon: FaInstagram, href: 'https://instagram.com/luna50.altai', label: 'Instagram', color: 'bg-teal-500' },
            ].map(({ Icon, href, label, color }) => (
              <a 
                key={label}
                href={href}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-50 text-gray-700 border border-gray-200 px-3 py-2 md:px-4 md:py-3 rounded-md hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-400 hover:text-white hover:border-transparent transition-all"
                aria-label={`Связаться через ${label}`}
              >
                <Icon className="text-lg md:text-xl" />
                <span className="text-sm md:text-base">{label}</span>
              </a>
            ))}
          </div>
        </section>
        
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-medium mb-4 text-blue-800">
            Мы на карте
          </h2>
          
          <div className="w-full h-80 sm:h-96 rounded-md overflow-hidden shadow border border-gray-200 bg-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d517.0191649914045!2d85.81381700450724!3d51.94541699878894!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42c4580856c7e42f%3A0x782b9cc05ab957f1!2z0KHQvtCy0LXRgtGB0LrQsNGPINGD0LsuLCA1MCwg0JDRjywg0JDQu9GC0LDQudGB0LrQuNC5INC60YDQsNC5LCA2NTk2MzU!5e0!3m2!1sru!2sru!4v1740469242604!5m2!1sru!2sru" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта расположения базы отдыха"
              aria-label="Интерактивная карта с нашим расположением"
            />
          </div>
        </section>
      </main>
      
      <Footer />
      
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col gap-2 md:gap-3 z-50">
        {[
          { Icon: FaWhatsapp, href: `https://wa.me/${contactInfo.whatsapp}`, label: 'Написать в WhatsApp' },
          { Icon: FaTelegram, href: `https://t.me/${contactInfo.telegram}`, label: 'Написать в Telegram' },
        ].map(({ Icon, href, label }, index) => (
          <a 
            key={label}
            href={href}
            target="_blank" 
            rel="noopener noreferrer"
            className={`bg-gradient-to-r ${index % 2 === 0 ? 'from-teal-400 to-blue-400' : 'from-blue-400 to-teal-400'} p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border-2 border-white`}
            aria-label={label}
          >
            <Icon className="text-white text-xl sm:text-2xl" />
            <span className="sr-only md:not-sr-only md:ml-2 md:inline text-white font-medium text-sm">{label}</span>
          </a>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}