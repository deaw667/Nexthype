'use client';

import { useEffect, useRef, useState } from 'react';
import { CHAT_UI } from '@/content/chat';
import { chatMessage } from '@/lib/chat';
import { env } from '@/lib/env';
import { pick, type Locale } from '@/lib/i18n';
import { ChannelRows } from './ChannelRows';

type Labels = { fab: string; title: string; sub: string; about: string; orEmail: string };

/** Floating "Chat with us" button + panel. Any element with data-chat="topic" opens it with that topic pre-filled. */
export function ChatPanel({ lang, labels }: { lang: Locale; labels: Labels }) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [tucked, setTucked] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const fab = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element;
      const opener = el.closest<HTMLElement>('[data-chat]');
      if (opener) { e.preventDefault(); setTopic(opener.dataset.chat ?? ''); setOpen(true); return; }
      const copy = el.closest<HTMLElement>('[data-copy]');
      if (copy) {
        e.preventDefault();
        navigator.clipboard?.writeText(copy.dataset.copy ?? '').catch(() => {});
        const em = copy.querySelector('em');
        if (em) { em.textContent = pick(CHAT_UI.copied, lang); setTimeout(() => { em.textContent = pick(CHAT_UI.copy, lang); }, 1600); }
      }
      if (!panel.current?.contains(el) && !fab.current?.contains(el)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); fab.current?.focus({ preventScroll: true }); } };
    // the contact section already lists every channel, so the button steps aside there
    const contact = document.getElementById('contact');
    const io = new IntersectionObserver(([entry]) => setTucked(entry.isIntersecting), { threshold: 0.2 });
    if (contact) io.observe(contact);
    document.addEventListener('click', onClick);
    addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); removeEventListener('keydown', onKey); io.disconnect(); };
  }, [lang]);

  useEffect(() => { if (open) panel.current?.querySelector<HTMLElement>('.people a')?.focus({ preventScroll: true }); }, [open, topic]);

  return (
    <>
      <button ref={fab} className={`chat-fab${tucked ? ' tucked' : ''}`} aria-expanded={open} aria-controls="chatPanel"
        onClick={() => { setTopic(''); setOpen((o) => !o); }}>
        <span className="mk" aria-hidden="true" /><span className="t">{labels.fab}</span>
      </button>
      <div ref={panel} id="chatPanel" className={`chat-panel${open ? ' open' : ''}`} role="dialog" aria-label="Chat with Nexthype">
        <div className="cp-head">
          <p className="serif cp-title">{labels.title}</p>
          <button className="cp-x" aria-label="Close" onClick={() => { setOpen(false); fab.current?.focus({ preventScroll: true }); }}>×</button>
        </div>
        <p className="cp-sub">{labels.sub}</p>
        {topic && <p className="topic">{labels.about} <b>{topic}</b></p>}
        <div className="people"><ChannelRows lang={lang} message={chatMessage(topic, lang)} /></div>
        <a className="cp-mail tlink" href={`mailto:${env.contactEmail}`}>{labels.orEmail}</a>
      </div>
    </>
  );
}
