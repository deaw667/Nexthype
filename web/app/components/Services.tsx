import Image from 'next/image';
import type { MessageKey } from '@/content/translations';
import type { T } from '@/lib/i18n';
import { FF } from './FF';

type Chapter = {
  word: string; title: MessageKey; body: MessageKey;
  facts: [string, MessageKey][]; cta: [href: string, label: MessageKey];
  shot: { src: string; alt: string };
};

// Grow · Capture · Elevate: the sticky word and photo on the left follow whichever chapter is mid-screen (Behaviours.tsx).
// Photos are 16:9 crops cut from the posters so each subject sits whole in the frame.
const CHAPTERS: Chapter[] = [
  {
    word: 'Grow', title: 'A month of content, planned, made and published for you.',
    body: 'Retainers written for five industries, each in three levels. A media planner and captions come with every plan. Paid campaigns on Facebook, Instagram and TikTok are run alongside.',
    facts: [['฿20,000', 'Where monthly plans begin'], ['฿65,000', 'Our top plan, Prestige, for luxury real estate'], ['15%', 'Of ad spend to manage your paid campaigns']],
    cta: ['#prices', 'See monthly plans'],
    shot: { src: '/assets/ch-grow.webp', alt: 'Laptop showing sales up 245% from a Nexthype ad campaign' },
  },
  {
    word: 'Capture', title: 'Cars, villas, plates and faces, shot to sell.',
    body: 'We shoot on location or in the studio, light and retouch every frame, then cut short films sized for Reels, TikTok and YouTube Shorts. Subtitles and voice-over when you need them.',
    facts: [['฿1,200', 'Per car shoot, with 10–15 retouched photos'], ['฿1,500', 'Per 30–60 second showcase film with music'], ['฿900', 'Starting price to edit a clip of up to 30 seconds']],
    cta: ['#price-photo', 'See photo and video prices'],
    shot: { src: '/assets/ch-capture.webp', alt: 'BMW Z4 roadster shot by Nexthype' },
  },
  {
    word: 'Elevate', title: 'An identity that holds up on a billboard and a business card.',
    body: 'Logo, typography, colour and the rules for using them. Choose a focused logo project or a complete brand book with guidelines for every channel you post on.',
    facts: [['฿16,000', 'Brand Seed · 2 logo concepts · 7–15 business days'], ['฿42,000', 'Brand Standard · 3 concepts and a usage book · 12–20 days'], ['฿62,000', 'Brand Universe · full brand book and commercial rights · 18–30 days']],
    cta: ['#price-brand', 'See brand identity prices'],
    shot: { src: '/assets/ch-elevate.webp', alt: 'Matcha packaging designed by Nexthype' },
  },
];

export function Services({ t }: { t: T }) {
  return (
    <section className="chapters" id="services">
      {/* spinning seal under the services strip; textLength spreads the words evenly around the circle (2πr ≈ 490) */}
      <div className="badge" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs><path id="circ" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" /></defs>
          <text><textPath href="#circ" textLength={488} lengthAdjust="spacing">CAPTURE · ELEVATE · GROW · </textPath></text>
        </svg>
        <span className="mk" />
      </div>
      <div className="wrap ch-grid">
        <div className="ch-sticky">
          <h2 className="label">{t('What we do')}</h2>
          <div className="ch-words" aria-hidden="true">
            {CHAPTERS.map((c, i) => <span key={c.word} className={i === 0 ? 'on' : undefined}>{c.word}</span>)}
          </div>
          <div className="ch-meter"><span className="label" id="chCount">01 / 03</span><span className="ch-bar"><i id="chBar" /></span></div>
          <div className="ch-media">
            {CHAPTERS.map(({ shot: s }, i) => (
              <Image key={s.src} src={s.src} alt={s.alt} fill sizes="440px" className={i === 0 ? 'on' : undefined} />
            ))}
          </div>
        </div>
        <div>
          {CHAPTERS.map((c, i) => (
            <article className="ch" data-i={i} key={c.word}>
              <p className="label"><b>0{i + 1}</b>{c.word}</p>
              <h3>{t(c.title)}</h3>
              <p className="body">{t(c.body)}</p>
              <dl className="facts">
                {c.facts.map(([figure, note]) => <div key={figure}><dt>{figure}</dt><dd>{t(note)}</dd></div>)}
              </dl>
              <a className="btn ghost ch-cta" href={c.cta[0]}><span>{t(c.cta[1])}</span> <FF /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
