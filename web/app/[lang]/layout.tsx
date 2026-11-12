import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Archivo, Bodoni_Moda, IBM_Plex_Sans, IBM_Plex_Sans_Thai, Noto_Sans_SC, Noto_Serif_SC, Prata, Taviraj,
} from 'next/font/google';
import { env } from '@/lib/env';
import { hasLocale, locales, type Locale } from '@/lib/i18n';
import '../globals.css';

// Latin glyphs come from Archivo / Bodoni; Cyrillic, Thai and Chinese fall through to their partner font
// (see --sans / --serif in globals.css). Only the Latin pair is preloaded; the rest load when their script appears.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo' });
const bodoni = Bodoni_Moda({ subsets: ['latin'], axes: ['opsz'], variable: '--font-bodoni' });
const plex = IBM_Plex_Sans({ subsets: ['cyrillic'], weight: ['400', '500', '600'], variable: '--font-plex', preload: false });
const plexThai = IBM_Plex_Sans_Thai({ subsets: ['thai'], weight: ['400', '500', '600'], variable: '--font-plex-thai', preload: false });
const prata = Prata({ subsets: ['cyrillic'], weight: '400', variable: '--font-prata', preload: false });
const taviraj = Taviraj({ subsets: ['thai'], weight: ['300', '400', '500'], variable: '--font-taviraj', preload: false });
const notoSans = Noto_Sans_SC({ weight: ['400', '500'], variable: '--font-noto-sans-sc', preload: false });
const notoSerif = Noto_Serif_SC({ weight: ['400', '500'], variable: '--font-noto-serif-sc', preload: false });
const fontVars = [archivo, bodoni, plex, plexThai, prata, taviraj, notoSans, notoSerif].map((f) => f.variable).join(' ');

// /en /th /zh /ru are prerendered at build time; any other value hits notFound() below
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

const META: Record<Locale, { title: string; description: string }> = {
  en: { title: 'Nexthype · Digital agency in Rawai, Phuket', description: "Brand identity, content, film and paid ads for Phuket's villas, showrooms, clinics, restaurants and hotels. Monthly plans from ฿20,000." },
  th: { title: 'Nexthype · ดิจิทัลเอเจนซี ราไวย์ ภูเก็ต', description: 'สร้างแบรนด์ คอนเทนต์ วิดีโอ และโฆษณาออนไลน์ ให้วิลล่า โชว์รูมรถ คลินิก ร้านอาหาร และโรงแรมในภูเก็ต แพ็กเกจรายเดือนเริ่มต้น ฿20,000' },
  zh: { title: 'Nexthype · 普吉岛拉威数字营销代理', description: '为普吉岛的别墅、汽车展厅、诊所、餐厅和酒店提供品牌设计、内容创作、视频拍摄与广告投放。月度套餐 ฿20,000 起。' },
  ru: { title: 'Nexthype · Digital-агентство на Пхукете', description: 'Брендинг, контент, видео и реклама для вилл, автосалонов, клиник, ресторанов и отелей Пхукета. Пакеты от ฿20,000 в месяц.' },
};

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    ...META[lang],
    metadataBase: new URL(env.siteUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: { en: '/en', th: '/th', 'zh-Hans': '/zh', ru: '/ru', 'x-default': '/en' },
    },
    openGraph: { ...META[lang], siteName: 'Nexthype', type: 'website', images: ['/assets/marble-orb.webp'] },
    robots: env.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
