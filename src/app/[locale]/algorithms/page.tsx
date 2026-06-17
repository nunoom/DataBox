import SectionListing from '@/components/SectionListing';
import { type Locale } from '@/lib/i18n';

export default async function AlgorithmsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SectionListing section="algorithms" locale={locale as Locale} />;
}
