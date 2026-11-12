'use client';

import { useEffect } from 'react';

/**
 * The page's motion, attached to the server-rendered markup after it mounts:
 * header show/hide, the Capture · Elevate · Grow chapters, the scroll-reactive marquee,
 * eased in-page scrolling with an arrival line, and the nav indicator that follows the section you read.
 */
export function Behaviours() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanup: Array<() => void> = [];
    const listen = (target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
      target.addEventListener(type, fn, opts);
      cleanup.push(() => target.removeEventListener(type, fn, opts));
    };
    const $ = <E extends Element = HTMLElement>(s: string) => document.querySelector<E>(s);
    const $$ = <E extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<E>(s));

    /* Header: solid once scrolling, hides while reading down, returns on scroll up */
    const header = $('header');
    let lastY = 0;
    listen(window, 'scroll', () => {
      const y = scrollY;
      header?.classList.toggle('solid', y > 40);
      header?.classList.toggle('hide', y > lastY && y > 500);
      lastY = y;
    }, { passive: true });

    /* Chapters: big word, photo and counter follow the article in the middle of the screen */
    const words = $$('.ch-words span'), shots = $$('.ch-media img'), count = $('#chCount');
    const chapterIO = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const i = Number((e.target as HTMLElement).dataset.i);
      words.forEach((w, k) => { w.classList.toggle('on', k === i); w.classList.toggle('out', k < i); });
      shots.forEach((s, k) => s.classList.toggle('on', k === i));
      if (count) count.textContent = `0${i + 1} / 03`;
    }), { rootMargin: '-50% 0px -50% 0px' });
    $$('.ch').forEach((el) => chapterIO.observe(el));
    cleanup.push(() => chapterIO.disconnect());

    /* In-page links glide with an eased curve instead of jumping. Longer trips take longer (max 1.8 s);
       any wheel, touch or key press hands control back. */
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let glideId = 0;
    const stopGlide = () => { cancelAnimationFrame(glideId); glideId = 0; };
    ['wheel', 'touchstart', 'keydown'].forEach((type) => listen(window, type, stopGlide, { passive: true }));

    const arrive = (el: HTMLElement) => { // a thin orange line sweeps across where you landed; focus follows for keyboard users
      el.classList.remove('arrive'); void el.offsetWidth; el.classList.add('arrive');
      setTimeout(() => el.classList.remove('arrive'), 1900);
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    };
    const glide = (target: HTMLElement, hash: string) => {
      stopGlide();
      const top = hash === '#top' ? 0 : target.getBoundingClientRect().top + scrollY - 90;
      const y0 = scrollY, y1 = Math.max(0, Math.min(top, document.documentElement.scrollHeight - innerHeight));
      const done = () => { history.pushState(null, '', hash); if (hash !== '#top') arrive(target); };
      if (reduce || Math.abs(y1 - y0) < 2) { scrollTo(0, y1); return done(); }
      const dur = Math.min(1800, 650 + Math.abs(y1 - y0) * 0.2), t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        scrollTo(0, y0 + (y1 - y0) * ease(p));
        if (p < 1) glideId = requestAnimationFrame(step); else { glideId = 0; done(); }
      };
      glideId = requestAnimationFrame(step);
    };
    listen(document, 'click', (e) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.hasAttribute('data-chat') || a.hasAttribute('data-copy')) return;
      const hash = a.getAttribute('href') ?? '';
      const target = hash.length > 1 ? document.querySelector<HTMLElement>(hash) : null;
      if (!target) return;
      e.preventDefault();
      a.classList.add('go'); setTimeout(() => a.classList.remove('go'), 700); // the ▷▷ fast-forwards
      glide(target, hash);
    });

    /* Header nav follows the section you are reading; one line slides between the items */
    const navLinks = $$<HTMLAnchorElement>('nav.main a'), ind = $('nav.main .ind');
    const spyMap: Record<string, string> = { services: '#services', work: '#work', prices: '#prices', projects: '#prices', contact: '#contact' };
    const inView = new Set<string>();
    let current: string | null = null;
    const updateInd = () => {
      const a = navLinks.find((l) => l.getAttribute('href') === current);
      navLinks.forEach((l) => (l === a ? l.setAttribute('aria-current', 'location') : l.removeAttribute('aria-current')));
      if (!ind) return;
      ind.style.opacity = a ? '1' : '0';
      if (a) { ind.style.width = `${a.offsetWidth}px`; ind.style.transform = `translateX(${a.offsetLeft}px)`; }
    };
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? inView.add(e.target.id) : inView.delete(e.target.id)));
      const id = [...inView].pop();
      const next = id ? spyMap[id] : scrollY < innerHeight ? null : current;
      if (next !== current) { current = next; updateInd(); }
    }, { rootMargin: '-45% 0px -54% 0px' });
    Object.keys(spyMap).forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    cleanup.push(() => spy.disconnect());
    listen(window, 'resize', updateInd);

    /* One frame loop: the marquee drifts and speeds up (or reverses) with your scroll; the chapter bar fills;
       the hero's chess pieces lag the scroll slightly */
    const track = $('.mq-track'), bar = $('#chBar'), chapters = $('.chapters'), hero = $('.hero');
    let x = 0, v = 0, prev = scrollY, raf = 0;
    const frame = () => {
      const dy = scrollY - prev; prev = scrollY;
      v += (dy - v) * 0.08;
      if (track && !reduce) {
        x -= 0.5 + v * 0.4;
        const half = track.scrollWidth / 2;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        track.style.transform = `translate3d(${x}px,0,0)`;
      }
      if (hero && !reduce && scrollY < innerHeight * 1.5) hero.style.setProperty('--py', String(scrollY)); // chess parallax
      if (bar && chapters) {
        const r = chapters.getBoundingClientRect();
        bar.style.transform = `scaleX(${Math.min(1, Math.max(0, (innerHeight / 2 - r.top) / r.height))})`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    cleanup.push(() => { cancelAnimationFrame(raf); stopGlide(); });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  return null;
}
