import type { Locale, T } from '@/lib/i18n';
import { LangSwitch } from './LangSwitch';

export function Header({ lang, t }: { lang: Locale; t: T }) {
  return (
    <header id="top">
      <div className="wrap">
        <a className="mark" href="#top" aria-label="Nexthype"><span className="mk" /><span className="wm" /></a>
        <nav className="main" aria-label="Main">
          <span className="ind" aria-hidden="true" />
          <a href="#services">{t('Services')}</a>
          <a href="#work">{t('Work')}</a>
          <a href="#prices">{t('Prices')}</a>
          <a href="#contact">{t('Contact')}</a>
        </nav>
        <div className="right">
          <LangSwitch lang={lang} />
          <a className="tlink" href="#contact">{t('Start a project')}</a>
        </div>
      </div>
    </header>
  );
}
