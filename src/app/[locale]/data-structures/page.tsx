import SectionListing from '@/components/SectionListing';
import { type Locale } from '@/lib/i18n';

export default async function DataStructuresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SectionListing section="data-structures" locale={locale as Locale} />;
}
