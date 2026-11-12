import { CHAT_UI } from '@/content/chat';
import { channelName, channelsFor, chatLink } from '@/lib/chat';
import { env } from '@/lib/env';
import { pick, type Locale, type T } from '@/lib/i18n';
import { ChannelRows } from './ChannelRows';
import { FF } from './FF';

export function Contact({ lang, t }: { lang: Locale; t: T }) {
  // the main button uses this language's first available chat app; with no chat IDs set it falls back to email
  const first = channelsFor(lang)[0];
  const label = first && pick(CHAT_UI.cta, lang).replace('{x}', channelName(first, lang));
  return (
    <section className="contact" id="contact">
      <div className="badge" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs><path id="circ" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" /></defs>
          <text><textPath href="#circ">CAPTURE · ELEVATE · GROW · CAPTURE · ELEVATE · GROW · </textPath></text>
        </svg>
        <span className="mk" />
      </div>
      <div className="wrap contact-grid">
        <div>
          <p className="label">{t('Message us')}</p>
          <h2><span className="ln">{t('Start your')}</span><span className="ln em">{t('strategy.')}</span></h2>
          <div className="contact-ctas">
            {!first ? (
              <a className="btn" href={`mailto:${env.contactEmail}`}>{env.contactEmail} <FF /></a>
            ) : first === 'wechat' ? (
              <a className="btn" href="#" data-copy={env.chat.wechat}>{label} <FF /></a>
            ) : (
              <a className="btn" href={chatLink(first)!} target="_blank" rel="noopener">{label} <FF /></a>
            )}
            {first && <a className="tlink" href={`mailto:${env.contactEmail}`}><span>{t('or email')}</span>&nbsp;{env.contactEmail}</a>}
          </div>
        </div>
        <div>
          <div className="people">
            <div id="channels"><ChannelRows lang={lang} /></div>
            <a href="tel:+66812459690"><span className="serif">{t('Khun Palm')}</span><span className="label">081 245 9690</span></a>
            <a href="tel:+66661129058"><span className="serif">{t('Khun Oak')}</span><span className="label">066 112 9058</span></a>
          </div>
          <p className="addr">{t('75/23 Village No. 4, Soi King Masjid 5')}<br />{t('Wises Road, Rawai, Phuket')}</p>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }: { t: T }) {
  return (
    <footer>
      <div className="wrap">
        <span className="wm" aria-hidden="true" />
        <div className="foot">
          <span>© 2026 Nexthype Digital Agency · Rawai, Phuket</span>
          <nav>
            <a href="#services">{t('Services')}</a><a href="#work">{t('Work')}</a><a href="#prices">{t('Prices')}</a><a href="#top">{t('Back to top')}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
