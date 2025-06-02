'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Leaf, 
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Home,
  DollarSign,
  Star,
  Calendar,
  Bone,
  Route,
  Wifi,
  Car,
  Gamepad2,
  Wine,
  Percent,
  XCircle
} from 'lucide-react';

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('faq');
  const [openFaq, setOpenFaq] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const contactInfo = {
    phone: '+7 (962) 807-50-50',
    email: 'prichal50.altai@yandex.ru',
    address: 'Горный Алтай, с. Ая, улица Советская 50',
    workingHours: 'Круглосуточно',
    whatsapp: '79628075050',
    telegram: 'prichal50_manager',
  };

  const faqData = [
    {
      id: 'location',
      icon: MapPin,
      question: 'Где находится база?',
      answer: 'Наша база отдыха Причал 50 находится по адресу: Республика Алтай, Село Ая, улица Советская 50. Мы расположены в живописном месте на берегу реки Катунь, в окружении горных пейзажей Алтая.'
    },
    {
      id: 'facilities',
      icon: Home,
      question: 'Что есть на базе?',
      answer: 'На нашей базе отдыха есть: уютные домики различной вместимости, русская баня, открытый бассейн, мангальные зоны для барбекю, детская площадка, прокат спортинвентаря, Wi-Fi, парковка и многое другое для комфортного отдыха.'
    },
    {
      id: 'pricing',
      icon: DollarSign,
      question: 'Стоимость?',
      answer: 'Стоимость проживания зависит от выбранного типа домика, сезона и срока пребывания. Наши цены начинаются от 10.000 рублей за сутки. Действуют скидки при бронировании на длительный срок. Для получения точной стоимости свяжитесь с нами.'
    },
    {
      id: 'why-us',
      icon: Star,
      question: 'Почему стоит выбрать нас?',
      answer: 'Нас выбирают за: живописную природу Горного Алтая, уютную домашнюю атмосферу, качественный сервис, близость к популярным достопримечательностям, индивидуальный подход к каждому гостю, идеальное расположение и возможность уединиться с природой. Мы стремимся сделать ваш отдых незабываемым!'
    },
    {
      id: 'minimum-stay',
      icon: Calendar,
      question: 'Какой минимальный срок проживания?',
      answer: 'Минимальный срок проживания на нашей базе составляет 2 суток. Это позволяет нашим гостям полноценно отдохнуть и насладиться красотами Алтая.'
    },
    {
      id: 'pets',
      icon: Bone,
      question: 'Можно ли с животными?',
      answer: 'На данный момент политика базы не предусматривает проживание с домашними животными. Это связано с обеспечением комфорта всех наших гостей и соблюдением санитарных норм.'
    },
    {
      id: 'how-to-get',
      icon: Route,
      question: 'Как добраться?',
      answer: 'До нас можно добраться на автомобиле по Чуйскому тракту до села Ая, затем повернуть на улицу Советская. Ближайший аэропорт находится в Горно-Алтайске (около 1 часа езды). Мы можем организовать трансфер по предварительной договоренности.'
    },
    {
      id: 'room-amenities',
      icon: Home,
      question: 'Какие удобства в домиках?',
      answer: 'В наших домиках есть: удобные кровати с качественным постельным бельем, мебель для отдыха, электричество, отопление, посуда и кухонная утварь. В некоторых домиках есть собственные санузлы и мини-кухни.'
    },
    {
      id: 'wifi',
      icon: Wifi,
      question: 'Есть ли Wi-Fi?',
      answer: 'Да, на территории базы предоставляется бесплатный Wi-Fi. Скорость интернета позволяет комфортно пользоваться мессенджерами и социальными сетями, хотя для "цифрового детокса" рекомендуем больше времени проводить на природе!'
    },
    {
      id: 'parking',
      icon: Car,
      question: 'Есть ли парковка?',
      answer: 'Да, у нас есть бесплатная охраняемая парковка для автомобилей наших гостей. Парковочные места находятся в непосредственной близости от домиков.'
    },
    {
      id: 'entertainment',
      icon: Gamepad2,
      question: 'Какие есть развлечения?',
      answer: 'На территории есть: бассейн, баня, мангальные зоны, настольные игры, прокат велосипедов и рыболовных снастей. Рядом с базой множество пешеходных маршрутов и достопримечательностей Алтая.'
    },
    {
      id: 'events',
      icon: Wine,
      question: 'Можно ли организовать мероприятия?',
      answer: 'Да, мы поможем организовать семейные праздники, корпоративы, дни рождения и другие мероприятия. У нас есть просторные беседки, мангальные зоны и все необходимое оборудование. Обсудите детали с администратором.'
    },
    {
      id: 'discounts',
      icon: Percent,
      question: 'Есть ли скидки и акции?',
      answer: 'Да, у нас действуют сезонные скидки, скидки при длительном проживании (от 7 дней), льготы для постоянных клиентов. Следите за нашими акциями в социальных сетях или уточняйте актуальные предложения при бронировании.'
    },
    {
      id: 'checkin-checkout',
      icon: Clock,
      question: 'Время заезда и выезда?',
      answer: 'Стандартное время заезда: с 14:00, выезда: до 12:00. При наличии свободных домиков возможен ранний заезд или поздний выезд по договоренности с администрацией.'
    },
    {
      id: 'cancellation',
      icon: XCircle,
      question: 'Условия отмены бронирования?',
      answer: 'Бронирование можно отменить бесплатно за 7 дней до заезда. При отмене менее чем за 7 дней взимается плата в размере 50% от стоимости первых суток. Подробные условия обсуждаются при бронировании.'
    }
  ];

  const tabs = [
    { id: 'faq', label: 'Частые вопросы', href: '#faq-section' },
    { id: 'booking', label: 'Бронирование', href: '#booking-section' },
    { id: 'contact', label: 'Связь с нами', href: '#contact-section' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['faq-section', 'booking-section', 'contact-section'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setCurrentId(sectionId);
            setActiveTab(sectionId.replace('-section', ''));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId, href) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setActiveTab(tabId);
  };

  const toggleFaq = (faqId) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section with Sticky Navigation */}
      <section className="relative bg-gradient-to-br from-blue-500 via-teal-500 to-blue-600 text-white">
        <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wider">
            ПОМОЩЬ ГОСТЯМ
          </h1>
          <h3 className="text-lg md:text-xl opacity-80 tracking-widest mb-8">
            Ответы на все ваши вопросы о базе отдыха Причал 50
          </h3>
        </div>
        
        {/* Sticky Navigation */}
        <div className="absolute bottom-0 w-full h-16 bg-white shadow-lg flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.href)}
              className={`flex-1 flex items-center justify-center text-sm font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white ${
                activeTab === tab.id ? 'text-blue-500' : 'text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div 
            className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${tabs.findIndex(tab => tab.id === activeTab) * (100 / tabs.length)}%`
            }}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="py-16 px-4 max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-4">
            Частые вопросы
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Найдите ответы на самые популярные вопросы о нашей базе отдыха
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <faq.icon className="text-blue-500 text-lg" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800">{faq.question}</h3>
                </div>
                {openFaq === faq.id ? (
                  <ChevronUp className="text-blue-500" />
                ) : (
                  <ChevronDown className="text-blue-500" />
                )}
              </button>
              
              {openFaq === faq.id && (
                <div className="px-6 pb-6">
                  <div className="pl-14">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking-section" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
            Как забронировать?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Выберите даты</h3>
              <p className="text-gray-600">Определитесь с датами заезда и выезда, количеством гостей</p>
            </div>
            
            <div className="text-center p-6 bg-teal-50 rounded-lg border border-teal-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Свяжитесь с нами</h3>
              <p className="text-gray-600">Позвоните или напишите нам любым удобным способом</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Подтвердите бронь</h3>
              <p className="text-gray-600">Оплатите предоплату и получите подтверждение</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6">
              Готовы забронировать? Свяжитесь с нами прямо сейчас!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={`tel:${contactInfo.phone.replace(/[\s()-]/g, '')}`}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Phone />
                Позвонить
              </a>
              <a 
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <MessageCircle />
                WhatsApp
              </a>
              <a 
                href={`https://t.me/${contactInfo.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <MessageCircle />
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
            Связаться с администратором
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-6">Контактная информация</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Телефон</p>
                    <a href={`tel:${contactInfo.phone.replace(/[\s()-]/g, '')}`} className="text-blue-500 hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-blue-500 hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Режим работы</p>
                    <p className="text-gray-600">{contactInfo.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-6">Мы в социальных сетях</h3>
              
              <div className="space-y-3">
                {[
                  { Icon: MessageCircle, href: `https://wa.me/${contactInfo.whatsapp}`, label: 'WhatsApp', color: 'text-green-500' },
                  { Icon: MessageCircle, href: `https://t.me/${contactInfo.telegram}`, label: 'Telegram', color: 'text-blue-500' },
                  { Icon: MessageCircle, href: 'https://vk.com/prichal50.altai', label: 'ВКонтакте', color: 'text-blue-600' },
                  { Icon: MessageCircle, href: 'https://instagram.com/prichal50.altai', label: 'Instagram', color: 'text-pink-500' },
                ].map(({ Icon, href, label, color }) => (
                  <a 
                    key={label}
                    href={href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Icon className={`text-2xl ${color}`} />
                    <span className="font-medium text-gray-800">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg p-6 border border-blue-200">
              <Leaf className="text-3xl text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Остались вопросы?
              </h3>
              <p className="text-gray-700 mb-4">
                Наш администратор с радостью ответит на все ваши вопросы и поможет организовать незабываемый отдых в Горном Алтае!
              </p>
              <p className="text-sm text-teal-600 font-medium">
                Мы работаем круглосуточно для вашего комфорта
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a 
          href={`https://wa.me/${contactInfo.whatsapp}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle className="text-white text-2xl" />
        </a>
        <a 
          href={`https://t.me/${contactInfo.telegram}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Написать в Telegram"
        >
          <MessageCircle className="text-white text-2xl" />
        </a>
      </div>
    </div>
  );
}