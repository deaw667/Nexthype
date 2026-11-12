'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { locales, type Locale } from '@/lib/i18n';

const LABEL: Record<Locale, string> = { en: 'EN', th: 'ไทย', zh: '中文', ru: 'RU' };

// Each language is its own page (/en /th /zh /ru). The cookie lets proxy.ts send "/" to the last choice.
export function LangSwitch({ lang }: { lang: Locale }) {
  return (
    <div className="lang" role="group" aria-label="Language">
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span>/</span>}
          <Link
            href={`/${l}`}
            lang={l}
            hrefLang={l}
            scroll={false}
            aria-current={l === lang ? 'true' : undefined}
            onClick={() => { document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`; }}
          >
            {LABEL[l]}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
