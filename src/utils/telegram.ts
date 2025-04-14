
export const TELEGRAM_BOT_TOKEN = '7661358723:AAEp3Djrr0kfIOX_njhqeWIpynTAIznBfmI';
export const TELEGRAM_CHAT_ID = '6291786446';

export const sendToTelegram = async (message: string) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
};
