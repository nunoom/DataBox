import SectionListing from '@/components/SectionListing';
import { type Locale } from '@/lib/i18n';

export default async function DataEngineeringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SectionListing section="data-engineering" locale={locale as Locale} />;
}
