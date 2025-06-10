"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaTiktok, FaYoutube, FaTelegram, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const socialIconVariants = {
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
  };

  const navLinks = [
    { text: "Главная", href: "/" },
    { text: "О нас", href: "/" },
    { text: "Услуги", href: "/services" },
    { text: "Галерея", href: "/gallery" },
    { text: "Контакты", href: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaInstagram />, url: "https://instagram.com/luna50.altai", label: "Instagram" },
    { icon: <FaTiktok />, url: "https://tiktok.com/luna50.altai", label: "TikTok" },
    { icon: <FaTelegram />, url: "https://t.me/luna50_altai", label: "Telegram" },
    { icon: <FaYoutube />, url: "https://youtube.com/luna50.altai", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-white text-gray-700 py-8 shadow-sm">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-400 to-teal-400" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-blue-800">База отдыха «ЛУНА 50»</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Незабываемый отдых в сердце Алтая. Природа, комфорт и уединение для вашего идеального отпуска.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">Навигация</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-500 transition-colors text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacts */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">Свяжитесь с нами</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                <span>Республика Алтай, с. Ая, ул. Советская, 50</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-500 mr-2 flex-shrink-0" />
                <a href="tel:+79001234567" className="hover:text-blue-500 transition-colors">
                  +7 (962) 807-50-50
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@altayvalley.ru" className="hover:text-blue-500 transition-colors">
                luna50.altai@yandex.ru
                </a>
              </li>
            </ul>

            <div className="space-y-2">
              <h4 className="text-xs uppercase text-gray-500 tracking-wide">Следите за нами</h4>
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    variants={socialIconVariants}
                    whileHover="hover"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500"
        >
          <p>© {currentYear} Луна 50. Все права защищены.</p>
        </motion.div>
      </div>
    </footer>
  );
}