import { PRICE_LIST } from '@/content/priceList';
import { pick, type Locale, type T } from '@/lib/i18n';
import { FF } from './FF';
import { PlanTabs } from './PlanTabs';

export function Prices({ lang, t }: { lang: Locale; t: T }) {
  return (
    <section className="prices" id="prices">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">{t('Prices · Monthly plans')}</p>
            <h2 style={{ marginTop: 28 }}><span className="ln">{t('Five industries.')}</span><span className="ln em">{t('Priced in the open.')}</span></h2>
          </div>
          <p className="lead" style={{ maxWidth: 400 }}>{t('Pick your industry. Every plan includes a media planner and captions. Prices are per month and exclude 7% VAT.')}</p>
        </div>
        <PlanTabs lang={lang} qnote={t('Quantities are per month. ✓ means included.')} />
        <div className="ads">
          <span className="big">15%</span>
          <div>
            <h3>{t('Ads management')}</h3>
            <p>{t('We set up and run your Facebook, Instagram and TikTok campaigns for 15% of the ad spend. Not included in the monthly plans above.')}</p>
          </div>
          <a className="btn ghost" href="#contact" data-chat="Ads management · 15%"><span>{t('Ask about ads')}</span> <FF /></a>
        </div>
      </div>
    </section>
  );
}

// One-off jobs, set like a menu. Each group has an id so the service buttons can glide straight to it.
export function PriceList({ lang, t }: { lang: Locale; t: T }) {
  return (
    <section className="menu" id="projects">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="label">{t('Prices · Single projects')}</p>
            <h2 style={{ marginTop: 28 }}><span className="ln">{t('One job at a time.')}</span><span className="ln em">{t('Know the price first.')}</span></h2>
          </div>
          <p className="lead" style={{ maxWidth: 400 }}>{t('Starting prices for work without a monthly plan. Prices exclude 7% VAT and printing.')}</p>
        </div>
        <div className="menu-grid">
          {PRICE_LIST.map((g, gi) => (
            <div id={g.id} key={g.id}>
              <h3><span className="label">0{gi + 1}</span>{pick(g.name, lang)}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it.n[0]}>
                    <div className="nm">{pick(it.n, lang)}{it.d && <small>{pick(it.d, lang)}</small>}</div>
                    <span className="dots" />
                    <span className="pr">{it.p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Terms({ t }: { t: T }) {
  const rows = [
    ['50%', t('To begin'), t('Half the fee starts the work. The balance is due on delivery.')],
    ['3×', t('Free revisions'), t('Up to three rounds of changes are free. After that, ฿500 per round.')],
    ['100%', t('Yours to keep'), t('Everything we make becomes your property once the final payment clears.')],
    ['48h', t("When it can't wait"), t('Rush jobs delivered within two days carry a 50% surcharge.')],
    ['7%', t('VAT on top'), t('Quoted prices exclude VAT and any printing costs.')],
  ];
  return (
    <section className="terms">
      <div className="wrap terms-grid">
        <div>
          <p className="label">{t('How we work')}</p>
          <h2 style={{ marginTop: 28 }}><span className="ln">{t('The fine print,')}</span><span className="ln em">{t('in plain words.')}</span></h2>
        </div>
        <ol>
          {rows.map(([n, h, p]) => <li key={n}><b>{n}</b><div><h3>{h}</h3><p className="body">{p}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
