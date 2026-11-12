import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Archivo, IBM_Plex_Sans, IBM_Plex_Sans_Thai, Noto_Sans_SC } from 'next/font/google';
import { env } from '@/lib/env';
import { hasLocale, locales, type Locale } from '@/lib/i18n';
import '../globals.css';

// One sans family: Latin glyphs come from Archivo; Cyrillic, Thai and Chinese fall through to their partner font
// (see --sans in globals.css). Only Archivo is preloaded; the rest load when their script appears on the page.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo' });
const plex = IBM_Plex_Sans({ subsets: ['cyrillic'], weight: ['400', '500', '600'], variable: '--font-plex', preload: false });
const plexThai = IBM_Plex_Sans_Thai({ subsets: ['thai'], weight: ['400', '500', '600'], variable: '--font-plex-thai', preload: false });
const notoSans = Noto_Sans_SC({ weight: ['400', '500'], variable: '--font-noto-sans-sc', preload: false });
const fontVars = [archivo, plex, plexThai, notoSans].map((f) => f.variable).join(' ');

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
