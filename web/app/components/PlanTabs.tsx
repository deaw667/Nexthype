'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PLANS, PLAN_UI, type Cell } from '@/content/plans';
import { pick, type Locale } from '@/lib/i18n';
import { FF } from './FF';

// Industry tabs + three plan cards. "Choose …" opens the chat panel with the plan pre-filled (data-chat → ChatPanel.tsx).
export function PlanTabs({ lang, qnote }: { lang: Locale; qnote: string }) {
  const [active, setActive] = useState(0);
  const [switched, setSwitched] = useState(false); // animate only after the first tab change, not on page load
  const plan = PLANS[active];
  const cell = (v: Cell) => (v === 'y' ? '✓' : v === 'n' ? '—' : v === 'u' ? pick(PLAN_UI.unlimited, lang) : v);

  return (
    <>
      <div className="ptabs" role="tablist">
        {PLANS.map((p, i) => (
          <button key={p.name[0]} role="tab" aria-selected={i === active} onClick={() => { if (i !== active) { setActive(i); setSwitched(true); } }}>
            <span>0{i + 1}</span>{pick(p.name, lang)}
          </button>
        ))}
      </div>
      <div className="panel" role="tabpanel">
        <div className="p-side">
          <figure>
            <Image key={plan.img} src={plan.img} alt={plan.name[0]} fill sizes="(max-width: 1100px) 160px, 25vw"
              className={switched ? 'fade-in' : undefined} style={{ objectPosition: plan.pos }} />
          </figure>
          <div><h3>{pick(plan.name, lang)}</h3><p>{pick(plan.blurb, lang)}</p></div>
        </div>
        <div>
          <div key={active} className={`tiers${switched ? ' in' : ''}`}>
            {plan.tiers.map((tier, i) => (
              <article key={tier.n} className={`tier${i === 1 ? ' best' : ''}`}>
                <p className="label">{tier.n}{i === 1 && <span className="tag">{pick(PLAN_UI.best, lang)}</span>}</p>
                <p className="price"><span className="cur">฿</span>{tier.p.toLocaleString('en-US')}</p>
                <p className="per">{pick(PLAN_UI.per, lang)}</p>
                <p className="desc">{pick(tier.d, lang)}</p>
                <ul>
                  {plan.rows.map((row, k) => (
                    <li key={row[0]}>
                      <span>{pick(row, lang)}</span>
                      <b className={tier.v[k] === 'y' ? 'y' : tier.v[k] === 'n' ? 'n' : undefined}>{cell(tier.v[k])}</b>
                    </li>
                  ))}
                </ul>
                <a className={`btn${i === 1 ? '' : ' ghost'}`} href="#contact" data-chat={`${tier.n} plan · ${pick(plan.name, lang)}`}>
                  {pick(PLAN_UI.choose, lang)} {tier.n} <FF />
                </a>
              </article>
            ))}
          </div>
          <p className="qnote">{qnote}</p>
        </div>
      </div>
    </>
  );
}
