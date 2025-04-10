"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, User, MessageSquare, Send, Calendar, Home, Clock, Users, ArrowLeft, Wind, Droplets, Shield } from 'lucide-react';
import Link from 'next/link';

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
      <Send className="w-12 h-12 text-blue-500" />
    </motion.div>
  </div>
);

// Custom toast replacement
const Toast = ({ message, type }) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${type === 'error' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-green-100 border-green-500 text-green-700'} border`}>
    {message}
  </div>
);

const houses = [
  {
    id: 1,
    name: "Рустик Шале",
    description: "Уютное шале в традиционном стиле, идеальное для семейного отдыха.",
    price: "15,000 ₽",
    priceValue: 15000,
    area: "120 м²",
    capacity: "6 гостей",
    nights: "от 2 ночей",
    images: ["/house/chalet1.jpg", "/house/living.jpg", "/house/kitchen.jpg", "/house/bedroom.jpg", "/house/exterior.jpg"]
  },
  {
    id: 3,
    name: "Премиум Гласс-хаус",
    description: "Впечатляющий дом со стеклянными стенами, откуда открывается панорамный вид на природу.",
    price: "25,000 ₽",
    priceValue: 25000,
    area: "150 м²",
    capacity: "8 гостей",
    nights: "от 4 ночей",
    images: ["/house/main.jpg", "/house/panorama.jpg", "/house/dining.jpg", "/house/master.jpg", "/house/pool.jpg"]
  }
];

const contactMethods = [
  { id: 'vk', label: 'Вконтакте', icon: <motion.div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-sm" whileHover={{ scale: 1.1 }}>В</motion.div> },
  { id: 'telegram', label: 'Телеграм', icon: <motion.div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-sm" whileHover={{ scale: 1.1 }}>T</motion.div> },
  { id: 'whatsapp', label: 'Ватсап', icon: <motion.div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-sm" whileHover={{ scale: 1.1 }}>W</motion.div> },
  { id: 'instagram', label: 'Инстаграм', icon: <motion.div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-sm" whileHover={{ scale: 1.1 }}>I</motion.div> },
];

const FormInput = ({ icon: Icon, label, ...props }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <input
        {...props}
        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90 shadow-sm"
      />
    </div>
  </div>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const natureAnimation = {
  wind: {
    hidden: { x: 0 },
    visible: { x: [0, 3, 0, -3, 0], transition: { repeat: Infinity, duration: 5, ease: "easeInOut" } }
  },
  water: {
    hidden: { y: 0 },
    visible: { y: [0, -2, 0, 2, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } }
  }
};

// Main component that uses search params - wrapped in Suspense
function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const houseId = searchParams?.get('house') || '';
  const checkIn = searchParams?.get('checkIn') || '';
  const checkOut = searchParams?.get('checkOut') || '';
  const guests = searchParams?.get('guests') || '';
  const nights = searchParams?.get('nights') || '';
  const totalPrice = searchParams?.get('totalPrice') || '';

  const selectedHouse = houses.find(h => h.id.toString() === houseId) || null;

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phoneNumber: '',
    email: '',
    sendConfirmation: false,
    receiveOffers: false,
    contactMethod: '',
    contactHandle: '',
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Custom toast functions
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return `+7 (${phoneNumber}`;
    if (phoneNumberLength < 7) return `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    if (phoneNumberLength < 9) return `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phoneNumber: formatted }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      showToast('Необходимо согласие на обработку персональных данных', 'error');
      return;
    }
    
    const phoneDigits = formData.phoneNumber.replace(/[^\d]/g, '');
    if (phoneDigits.length !== 11) {
      showToast('Пожалуйста, введите корректный номер телефона', 'error');
      return;
    }

    if (!formData.email.includes('@')) {
      showToast('Пожалуйста, введите корректный email', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: formData.phoneNumber,
          checkIn,
          checkOut,
          guests,
          nights,
          totalPrice,
          houseId,
          houseName: selectedHouse?.name || '',
          housePrice: selectedHouse?.price || '',
        }),
      });

      if (response.ok) {
        showToast('Заявка успешно отправлена!');
        setIsSubmitted(true);
      } else {
        throw new Error('Ошибка сервера');
      }
    } catch (error) {
      showToast('Ошибка при отправке данных', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указано';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-12 px-4 bg-white flex items-center justify-center relative overflow-hidden">
        <motion.div 
          variants={natureAnimation.wind}
          initial="hidden"
          animate="visible"
          className="absolute top-20 right-20 text-blue-100 opacity-20"
        >
          <Wind size={120} />
        </motion.div>
        <motion.div 
          variants={natureAnimation.water}
          initial="hidden"
          animate="visible"
          className="absolute bottom-20 left-20 text-teal-100 opacity-20"
        >
          <Droplets size={120} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-auto bg-white/90 rounded-md p-8 text-center border border-gray-200 shadow"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Send className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-light text-blue-800 mb-4">Спасибо за бронирование!</h2>
          <p className="text-gray-700 mb-8">
            Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-md font-light shadow"
            >
              Вернуться на главную
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-100 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-transparent" />
      
      {toast.visible && <Toast message={toast.message} type={toast.type} />}
      
      <motion.div 
        variants={natureAnimation.wind}
        initial="hidden"
        animate="visible"
        className="absolute top-40 right-10 text-blue-200 opacity-20 hidden lg:block"
      >
        <Wind size={180} />
      </motion.div>
      <motion.div 
        variants={natureAnimation.water}
        initial="hidden"
        animate="visible"
        className="absolute bottom-40 left-10 text-teal-200 opacity-20 hidden lg:block"
      >
        <Droplets size={180} />
      </motion.div>
      
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="bg-white/95 rounded-md overflow-hidden border border-gray-200 shadow">
          <div className="px-6 py-6 sm:px-8 sm:py-8 bg-blue-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-light text-blue-800">Бронирование</h1>
                <p className="text-gray-700 mt-2 font-light">Заполните данные для подтверждения</p>
              </div>
              <Link href={`/select-house?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}>
                <motion.button 
                  whileHover={{ x: -3 }}
                  className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  <span className="font-light">Назад</span>
                </motion.button>
              </Link>
            </div>
          </div>

          {selectedHouse && (
            <div className="px-6 py-6 sm:px-8 sm:py-6 bg-blue-50 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-light text-blue-800">{selectedHouse.name}</h2>
                  <p className="text-sm text-gray-700 mt-1 font-light">{selectedHouse.description}</p>
                </div>
                <div className="text-right">
                  <div className="font-light text-gray-700">{selectedHouse.price} за ночь</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-white/90 rounded-md border border-gray-200 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div className="text-sm">
                      <div className="text-gray-500 font-light">Заезд</div>
                      <div className="font-light text-gray-700">{formatDate(checkIn)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div className="text-sm">
                      <div className="text-gray-500 font-light">Выезд</div>
                      <div className="font-light text-gray-700">{formatDate(checkOut)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div className="text-sm">
                      <div className="text-gray-500 font-light">Гости</div>
                      <div className="font-light text-gray-700">{guests || 'Не указано'}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div className="text-sm">
                      <div className="text-gray-500 font-light">Ночей</div>
                      <div className="font-light text-gray-700">{nights || 'Не указано'}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-500 font-light">Общая стоимость:</div>
                  <div className="text-xl font-light text-blue-800">
                    {totalPrice ? `${parseInt(totalPrice).toLocaleString('ru-RU')} ₽` : 'Не указано'}
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput icon={User} label="Фамилия" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              <FormInput icon={User} label="Имя" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>

            <FormInput icon={User} label="Отчество" type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 shadow-sm"
                  required
                  placeholder="+7 (___) ___-__-__"
                  maxLength={18}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Формат: +7 (999) 123-45-67</p>
            </div>

            <FormInput icon={Mail} label="Электронная почта" type="email" name="email" value={formData.email} onChange={handleInputChange} required />

            <div className="space-y-4 pt-2">
              <motion.div className="flex items-center space-x-3" whileHover={{ x: 2 }}>
                <input type="checkbox" name="sendConfirmation" id="sendConfirmation" checked={formData.sendConfirmation} onChange={handleInputChange} className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="sendConfirmation" className="text-sm text-gray-700 font-light">Пришлите мне подтверждение на телефон</label>
              </motion.div>
              <motion.div className="flex items-center space-x-3" whileHover={{ x: 2 }}>
                <input type="checkbox" name="receiveOffers" id="receiveOffers" checked={formData.receiveOffers} onChange={handleInputChange} className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="receiveOffers" className="text-sm text-gray-700 font-light">Я хочу узнавать о специальных предложениях</label>
              </motion.div>
            </div>

            <div className="space-y-4 pt-2">
              <label className="block text-sm font-medium text-gray-700">Как с вами связаться?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {contactMethods.map((method) => (
                  <motion.div key={method.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="relative">
                    <input
                      type="radio"
                      name="contactMethod"
                      id={method.id}
                      value={method.id}
                      checked={formData.contactMethod === method.id}
                      onChange={handleInputChange}
                      className="peer absolute opacity-0"
                    />
                    <label
                      htmlFor={method.id}
                      className="flex items-center space-x-3 p-3 rounded-md border border-gray-200 cursor-pointer transition-all peer-checked:border-blue-400 peer-checked:bg-blue-50 hover:bg-blue-50 shadow-sm"
                    >
                      {method.icon}
                      <span className="text-sm font-light text-gray-700">{method.label}</span>
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>

            {formData.contactMethod && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                <FormInput
                  icon={MessageSquare}
                  label={`Ваш ${contactMethods.find(m => m.id === formData.contactMethod)?.label}`}
                  type="text"
                  name="contactHandle"
                  value={formData.contactHandle}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-400 shadow-sm">
              <motion.div className="flex items-center space-x-3" whileHover={{ x: 2 }}>
                <input 
                  type="checkbox" 
                  name="agreeToTerms" 
                  id="agreeToTerms" 
                  checked={formData.agreeToTerms} 
                  onChange={handleInputChange} 
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                    Даю согласие на обработку персональных данных
                  </label>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
                type="submit"
                disabled={isSubmitting || !formData.agreeToTerms}
                className="flex-1 py-3 px-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-md font-light disabled:opacity-70 shadow"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Отправка...' : 'Подтвердить'}</span>
              </motion.button>
              <Link href="/" className="flex-1">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 1 }}
                  type="button"
                  className="w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-md font-light hover:bg-gray-300 shadow-sm"
                >
                  Отмена
                </motion.button>
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// Main component that wraps the content in Suspense
export default function BookingConfirmation() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BookingConfirmationContent />
    </Suspense>
  );
}