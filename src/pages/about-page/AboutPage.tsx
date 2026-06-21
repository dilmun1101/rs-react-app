import styles from './about-page.module.scss';
import { Link } from '@/i18n/navigation';

const INFO_PAGE = {
  GITHUB_PROFILE_LINK: 'https://github.com/dilmun1101',
  RS_SCHOOL_REACT_LINK: 'https://rs.school/courses/reactjs',
  TITLE: 'About',
  AUTHOR_LABEL: 'Author:',
  COURSE_LABEL: 'Course:',
  COURSE_NAME: 'RS School React Course',
  DESCRIPTION: 'This application was created as a study project.',
} as const;

function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{INFO_PAGE.TITLE}</h1>
      <p className={styles.text}>
        {INFO_PAGE.AUTHOR_LABEL}{' '}
        <a
          href={INFO_PAGE.GITHUB_PROFILE_LINK}
          target="_blank"
          className={styles.link}
        >
          dilmun1101
        </a>
      </p>
      <p className={styles.text}>
        My name is Anna, and I am a junior frontend developer. I enjoy building
        user interfaces with React and TypeScript, focusing on clean, readable
        code and good user experience. I am currently improving my skills
        through the RS School React course and working on practical projects to
        grow as a professional.
      </p>
      <p className={styles.text}>
        {INFO_PAGE.COURSE_LABEL}{' '}
        <a
          href={INFO_PAGE.RS_SCHOOL_REACT_LINK}
          target="_blank"
          className={styles.link}
        >
          {INFO_PAGE.COURSE_NAME}
        </a>
      </p>
      <p className={styles.text}>{INFO_PAGE.DESCRIPTION}</p>
      <Link href="/" className={styles.link}>
        Return to main page
      </Link>
    </main>
  );
}

export default AboutPage;
