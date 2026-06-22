import StoreProvider from './StoreProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import ThemeProvider from '@/shared/context/ThemeContext';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await getMessages()) as AbstractIntlMessages;

  return (
    <StoreProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
