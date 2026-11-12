// Every environment value the site reads, in one place. See .env.example for what each one does.
// NEXT_PUBLIC_* values are written into the page at build time: change them, then rebuild/redeploy.

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4070',
  // hidden from search engines unless explicitly switched off, so a demo never gets indexed by accident
  noindex: process.env.NEXT_PUBLIC_NOINDEX !== 'false',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'nexthypehkt@gmail.com',
  chat: {
    whatsapp: process.env.NEXT_PUBLIC_CHAT_WHATSAPP || '',
    line: process.env.NEXT_PUBLIC_CHAT_LINE || '',
    telegram: process.env.NEXT_PUBLIC_CHAT_TELEGRAM || '',
    wechat: process.env.NEXT_PUBLIC_CHAT_WECHAT || '',
    messenger: process.env.NEXT_PUBLIC_CHAT_MESSENGER || '',
    instagram: process.env.NEXT_PUBLIC_CHAT_INSTAGRAM || '',
  },
} as const;
