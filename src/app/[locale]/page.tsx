import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { type Locale } from '@/lib/i18n';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale as Locale} />
      <Hero locale={locale as Locale} />
    </div>
  );
}