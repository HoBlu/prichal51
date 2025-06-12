export async function POST(request) {
  try {
    const data = await request.json();

    const botToken = '8066110580:AAExaJoLj91xMCwyywT-lhA9_0s5OfHLGx4';
    const channelHandle = '@your_channel_username'; // Например: '@booking_notifications'

    const getContactMethodName = (methodId) => ({
      'vk': 'Вконтакте',
      'telegram': 'Телеграм',
      'whatsapp': 'Ватсап',
      'instagram': 'Инстаграм'
    }[methodId] || methodId);

    const getHouseName = (houseId) => {
      const houses = [
        { id: 1, name: "Рустик Шале" },
        { id: 3, name: "Премиум Гласс-хаус" }
      ];
      return houses.find(house => house.id === parseInt(houseId))?.name || houseId;
    };

    const message = `
🛎 БРОНИРОВАНИЕ НОМЕРА:
  🏁 Заезд: ${data.checkIn || 'Не указано'}
  🏁 Выезд: ${data.checkOut || 'Не указано'}
  👤 Гости: ${data.guests || 'Не указано'}
  🌙 Ночей: ${data.nights || 'Не указано'}
  🏠 Домик: ${data.houseName || getHouseName(data.houseId)}
  💰 Итого: ${data.totalPrice || 'Не указано'} ₽
📩 КОНТАКТЫ:
  📌 Фамилия: ${data.lastName || 'Не указано'}
  📌 Имя: ${data.firstName || 'Не указано'}
  📌 Отчество: ${data.middleName || 'Не указано'}
  📞 Телефон: ${data.phone || 'Не указано'}
  📧 Email: ${data.email || 'Не указано'}
  ✅ Подтверждение на телефон: ${data.sendConfirmation ? 'Да' : 'Нет'}
  📢 Получать предложения: ${data.receiveOffers ? 'Да' : 'Нет'}
  📱 Способ связи: ${getContactMethodName(data.contactMethod)}
  ℹ️ Контактные данные: ${data.contactHandle || 'Не указано'}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,   
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: channelHandle,
          text: message,
          parse_mode: 'HTML' // Опционально, но удобно для форматирования
        }),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Ошибка отправки:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
