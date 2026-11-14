import Image from 'next/image';
import type { T } from '@/lib/i18n';
import { FF } from './FF';

export function Hero({ t }: { t: T }) {
  return (
    <section className="hero">
      {/* the real Facebook-cover marble, multiplied over the logo gradient (see .orb in globals.css) */}
      <div className="orb" aria-hidden="true">
        <Image src="/assets/marble-orb.webp" alt="" width={900} height={900} sizes="(max-width: 900px) 110vw, 54vw" loading="eager" fetchPriority="high" />
        <span className="shade" />
      </div>
      {/* the chess scene from the "We create strategy" poster, faint, behind the headline (see .chess in globals.css) */}
      <div className="chess" aria-hidden="true" />
      <div className="wrap hero-in">
        <p className="label">{t('Digital agency · Rawai, Phuket')}</p>
        <h1>
          <span className="ln"><span>{t('We create the hype.')}</span></span>
          <span className="ln"><span className="em">{t('You get the results.')}</span></span>
        </h1>
        <div className="hero-row">
          <p className="lead">{t("Brand identity, content, film and paid ads for Phuket's villas, showrooms, clinics, restaurants and hotels. Briefs taken in Thai, English, Chinese and Russian.")}</p>
          <div className="ctas">
            <a className="btn" href="#contact"><span>{t('Start a project')}</span> <FF /></a>
            <a className="from-chip" href="#prices"><span>{t('Monthly plans from')}</span> <b>฿20,000</b></a>
          </div>
        </div>
      </div>
      <div className="wrap hero-bar"><span className="label">Capture · Elevate · Grow</span><span className="label">{t('Scroll')}</span></div>
    </section>
  );
}

export function Marquee({ t }: { t: T }) {
  const items = [t('Branding'), t('Social media'), t('Paid ads'), t('Video production'), t('Web design')];
  return (
    <div className="marquee" aria-hidden="true">
      {/* two copies so the loop in Behaviours.tsx can wrap seamlessly */}
      <div className="mq-track">{[...items, ...items].map((s, i) => <span key={i}>{s}</span>)}</div>
    </div>
  );
}
