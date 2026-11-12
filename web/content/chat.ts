import type { L4, Locale } from '@/lib/i18n';

export type Channel = 'whatsapp' | 'line' | 'telegram' | 'wechat' | 'messenger' | 'instagram';

// each language leads with the app its speakers already live in
export const CHAT_ORDER: Record<Locale, Channel[]> = {
  en: ['whatsapp', 'messenger', 'line', 'telegram', 'instagram', 'wechat'],
  th: ['line', 'messenger', 'instagram', 'whatsapp', 'telegram', 'wechat'],
  zh: ['wechat', 'whatsapp', 'line', 'telegram', 'messenger', 'instagram'],
  ru: ['telegram', 'whatsapp', 'instagram', 'messenger', 'line', 'wechat'],
};
export const CHANNEL_NAME: Record<Channel, string | L4> = {whatsapp: 'WhatsApp', line: 'LINE', telegram: 'Telegram', wechat: ['WeChat', 'WeChat', '微信', 'WeChat'], messenger: 'Messenger', instagram: 'Instagram'};
export const CHAT_UI = {
  cta: ['Message us on {x}', 'แชทกับเราทาง {x}', '通过{x}联系我们', 'Написать нам в {x}'],
  msg: ['Hi Nexthype, I am interested in: {x}', 'สวัสดี Nexthype สนใจเรื่อง: {x}', '您好 Nexthype，我想咨询：{x}', 'Здравствуйте! Меня интересует: {x}'],
  copy: ['copy', 'คัดลอก', '复制', 'копировать'],
  copied: ['copied', 'คัดลอกแล้ว', '已复制', 'скопировано'],
} satisfies Record<string, L4>;
