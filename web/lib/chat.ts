import { CHAT_ORDER, CHANNEL_NAME, CHAT_UI, type Channel } from '@/content/chat';
import { env } from '@/lib/env';
import { pick, type Locale } from '@/lib/i18n';

/** Channels that have an ID set, in the order this language prefers. */
export const channelsFor = (lang: Locale) => CHAT_ORDER[lang].filter((c) => env.chat[c]);

export const channelName = (c: Channel, lang: Locale) => pick(CHANNEL_NAME[c], lang);

export function channelHandle(c: Channel) {
  const id = env.chat[c];
  return { whatsapp: `+${id}`, line: id, telegram: `@${id}`, wechat: id, messenger: 'Nexthype Digital Agency', instagram: `@${id}` }[c];
}

/** Link that opens the chat; WhatsApp and LINE also pre-fill `message`. WeChat has no web link (visitors copy the ID). */
export function chatLink(c: Channel, message = '') {
  const id = env.chat[c], q = encodeURIComponent(message);
  switch (c) {
    case 'whatsapp': return `https://wa.me/${id}${message ? `?text=${q}` : ''}`;
    case 'line': return message ? `https://line.me/R/oaMessage/${encodeURIComponent(id)}/?${q}` : `https://line.me/R/ti/p/${encodeURIComponent(id)}`;
    case 'telegram': return `https://t.me/${id}`;
    case 'messenger': return `https://m.me/${id}`;
    case 'instagram': return `https://ig.me/m/${id}`;
    case 'wechat': return null;
  }
}

export const chatMessage = (topic: string, lang: Locale) => (topic ? pick(CHAT_UI.msg, lang).replace('{x}', topic) : '');
