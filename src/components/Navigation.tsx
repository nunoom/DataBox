'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe, Boxes, Home, Code2, Database, Cloud, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { t, type Locale } from '@/lib/i18n';

export default function Navigation({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { name: t(locale, 'navigation.home'), href: `/${locale}`, icon: Home },
    { name: t(locale, 'navigation.algorithms'), href: `/${locale}/algorithms`, icon: Code2 },
    { name: t(locale, 'navigation.dataStructures'), href: `/${locale}/data-structures`, icon: Database },
    { name: t(locale, 'navigation.dataEngineering'), href: `/${locale}/data-engineering`, icon: Cloud },
    { name: t(locale, 'navigation.about'), href: `/${locale}/about`, icon: Info },
  ];

  const toggleLanguage = () => {
    const next = locale === 'en' ? 'pt' : 'en';
    window.location.href = pathname.replace(`/${locale}`, `/${next}`);
  };

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-dark-700/60 bg-dark-900/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-purple-600 shadow-lg shadow-primary-900/40">
            <Boxes className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Data<span className="text-gradient">Box</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-primary-500/10 text-primary-300' : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={toggleLanguage}
            className="ml-2 flex items-center gap-1.5 rounded-lg border border-dark-600 px-3 py-2 text-sm font-medium text-dark-200 transition-colors hover:border-primary-500 hover:text-white"
          >
            <Globe className="h-4 w-4" />
            <span>{locale.toUpperCase()}</span>
          </button>
        </div>

        <button onClick={() => setIsOpen((v) => !v)} className="p-2 text-dark-200 md:hidden">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-dark-700/60 bg-dark-800 md:hidden"
          >
            <div className="space-y-1 px-3 py-3">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium ${
                      active ? 'bg-primary-500/10 text-primary-300' : 'text-dark-300 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-base font-medium text-dark-300 hover:bg-dark-700 hover:text-white"
              >
                <Globe className="h-5 w-5" />
                <span>{locale === 'en' ? 'Português' : 'English'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
