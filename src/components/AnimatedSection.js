"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Компонент-обертка для анимированных секций
const AnimatedSection = ({ 
  children, 
  delay = 0, 
  fontFamily = 'Inter',
  className = "",
  animationType = "fadeIn" // Тип анимации: fadeIn, slideUp, scale
}) => {
  // Состояние для отслеживания видимости на мобильных устройствах
  const [isMobile, setIsMobile] = useState(false);
  
  // Определяем различные варианты анимаций
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -50, opacity: 0 }
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 }
    }
  };

  // Настройка анимации скролла
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 0.8]);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={animations[animationType].initial}
        animate={animations[animationType].animate}
        exit={animations[animationType].exit}
        transition={{
          duration: 0.8,
          delay: isMobile ? 0 : delay,
          ease: "easeOut"
        }}
        style={{ 
          opacity,
          scale: isMobile ? 1 : scale,
          fontFamily
        }}
        className={`transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedSection;