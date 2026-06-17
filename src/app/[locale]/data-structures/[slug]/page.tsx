import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import { getTopic, getTopicsBySection } from '@/lib/content';
import { locales, tr, type Locale } from '@/lib/i18n';

const SECTION = 'data-structures' as const;

export function generateStaticParams() {
  return getTopicsBySection(SECTION).flatMap((t) =>
    locales.map((locale) => ({ locale, slug: t.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const topic = getTopic(SECTION, slug);
  if (!topic) return {};
  const l = locale as Locale;
  return {
    title: tr(l, topic.title.en, topic.title.pt),
    description: tr(l, topic.tagline.en, topic.tagline.pt),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const topic = getTopic(SECTION, slug);
  if (!topic) notFound();
  return <TopicPage topic={topic} locale={locale as Locale} />;
}
