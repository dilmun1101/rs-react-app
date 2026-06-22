'use client';

import Button from '../button/Button';
import styles from './language-toggle.module.scss';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLocale = (nextLocale: 'en' | 'ru') => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className={styles.toggleLanguage}>
      <Button
        onClick={() => {
          handleChangeLocale('en');
        }}
        className={locale === 'en' ? '' : styles.inactive}
      >
        EN
      </Button>
      <Button
        onClick={() => {
          handleChangeLocale('ru');
        }}
        className={locale === 'ru' ? '' : styles.inactive}
      >
        RU
      </Button>
    </div>
  );
}

export default LanguageToggle;
