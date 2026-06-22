import styles from './about-page.module.scss';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

const INFO_PAGE = {
  GITHUB_PROFILE_LINK: 'https://github.com/dilmun1101',
  RS_SCHOOL_REACT_LINK: 'https://rs.school/courses/reactjs',
  TITLE: 'About',
  AUTHOR_LABEL: 'Author:',
  COURSE_LABEL: 'Course:',
  COURSE_NAME: 'RS School React Course',
  DESCRIPTION: 'This application was created as a study project.',
} as const;

async function AboutPage() {
  const t = await getTranslations('AboutPage');

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.text}>
        {t('authorLabel')}
        <a
          href={INFO_PAGE.GITHUB_PROFILE_LINK}
          target="_blank"
          className={styles.link}
        >
          dilmun1101
        </a>
      </p>
      <p className={styles.text}>{t('bio')}</p>
      <p className={styles.text}>
        {t('courseLabel')}{' '}
        <a
          href={INFO_PAGE.RS_SCHOOL_REACT_LINK}
          target="_blank"
          className={styles.link}
        >
          {t('courseName')}
        </a>
      </p>
      <p className={styles.text}>{t('description')}</p>
      <Link href="/" className={styles.link}>
        {t('returnLink')}
      </Link>
    </main>
  );
}

export default AboutPage;
