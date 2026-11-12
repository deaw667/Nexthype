import { CHAT_UI } from '@/content/chat';
import { channelHandle, channelName, channelsFor, chatLink } from '@/lib/chat';
import { env } from '@/lib/env';
import { pick, type Locale } from '@/lib/i18n';

/** One row per chat app that has an ID in .env, in this language's preferred order. Used by the contact section and the chat panel. */
export function ChannelRows({ lang, message = '' }: { lang: Locale; message?: string }) {
  return channelsFor(lang).map((c) =>
    c === 'wechat' ? (
      // WeChat has no web link: the row copies the ID (handled in ChatPanel.tsx)
      <a key={c} href="#" data-copy={env.chat.wechat}>
        <span className="serif">{channelName(c, lang)}</span>
        <span className="label">{env.chat.wechat} · <em>{pick(CHAT_UI.copy, lang)}</em></span>
      </a>
    ) : (
      <a key={c} href={chatLink(c, message)!} target="_blank" rel="noopener">
        <span className="serif">{channelName(c, lang)}</span>
        <span className="label">{channelHandle(c)}</span>
      </a>
    ),
  );
}
