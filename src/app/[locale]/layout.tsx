import StoreProvider from './StoreProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import ThemeProvider from '@/shared/context/ThemeContext';
import styles from './layout.module.scss';

export default async function RootLayout({
  children,
  params,
  details,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  details: React.ReactNode;
}) {
  const { locale } = await params;
  const messages = (await getMessages()) as AbstractIntlMessages;

  return (
    <StoreProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>
          <div className={styles.pageLayout}>
            <div className={styles.mainColumn}>{children}</div>
            <div className={styles.detailsColumn}>{details}</div>
          </div>
        </ThemeProvider>
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
