import Image from 'next/image';
import type { MessageKey } from '@/content/translations';
import type { T } from '@/lib/i18n';
import { env } from '@/lib/env';
import { FF } from './FF';

// Real posts from instagram.com/nexthype_th. Swap in full-resolution originals when the client sends them.
const WORK: { img: string; alt: string; title: string; sector: MessageKey; pos?: string }[] = [
  { img: 'work-z4', alt: 'BMW Z4 Drive the season campaign', title: 'Drive the season', sector: 'Automotive' },
  { img: 'work-svj', alt: 'Lamborghini SVJ No limits campaign', title: 'No limits, only SVJ', sector: 'Automotive' },
  { img: 'work-dining', alt: 'Premium Japanese dining poster', title: 'Crafting the ultimate flavor', sector: 'Fine dining' },
  { img: 'work-island', alt: 'Luxury private island yacht trip poster', title: 'Private island escape', sector: 'Yacht tours' },
  { img: 'work-aesthetic', alt: 'Dream Face Aesthetic clinic campaign', title: 'Dream face, aesthetic', sector: 'Beauty clinic' },
  { img: 'work-matcha', alt: 'Matcha product packaging visual', title: 'Lift your brand', sector: 'Product' },
  { img: 'work-night', alt: 'Feel the Night nightlife poster', title: 'Feel the night', sector: 'Nightlife' },
  { img: 'work-elegance', alt: 'Pure Elegance fashion film still', title: 'Pure elegance', sector: 'Fashion film', pos: '50% 40%' },
];

export function Work({ t }: { t: T }) {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">{t('Selected work')}</p>
            <h2 style={{ marginTop: 28 }}><span className="ln">{t('Made in Phuket.')}</span><span className="ln em">{t('Seen everywhere.')}</span></h2>
          </div>
          <a className="tlink" href={`https://www.instagram.com/${env.chat.instagram || 'nexthype_th'}/`} target="_blank" rel="noopener">
            <span>{t('More on Instagram')}</span> <FF />
          </a>
        </div>
        <div className="grid">
          {WORK.map((w, i) => (
            <figure className="piece" key={w.img}>
              <div className="frame">
                <Image src={`/assets/${w.img}.webp`} alt={w.alt} fill sizes="(max-width: 900px) 50vw, 40vw" style={w.pos ? { objectPosition: w.pos } : undefined} />
              </div>
              <figcaption>
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                <span className="serif">{w.title}</span>
                <span className="label">{t(w.sector)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
