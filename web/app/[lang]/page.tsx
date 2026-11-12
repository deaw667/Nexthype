import { notFound } from 'next/navigation';
import { Behaviours } from '@/app/components/Behaviours';
import { ChatPanel } from '@/app/components/ChatPanel';
import { Contact, Footer } from '@/app/components/Contact';
import { Header } from '@/app/components/Header';
import { Hero, Marquee } from '@/app/components/Hero';
import { PriceList, Prices, Terms } from '@/app/components/Prices';
import { Services } from '@/app/components/Services';
import { Work } from '@/app/components/Work';
import { getT, hasLocale } from '@/lib/i18n';

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getT(lang);

  return (
    <>
      <Header lang={lang} t={t} />
      <main>
        <Hero t={t} />
        <Marquee t={t} />
        <Services t={t} />
        <Work t={t} />
        <Prices lang={lang} t={t} />
        <PriceList lang={lang} t={t} />
        <Terms t={t} />
        <Contact lang={lang} t={t} />
      </main>
      <Footer t={t} />
      <ChatPanel
        lang={lang}
        labels={{ fab: t('Chat with us'), title: t('Message Nexthype'), sub: t('Pick the app you already use.'), about: t('About'), orEmail: t('or send an email') }}
      />
      <Behaviours />
    </>
  );
}
