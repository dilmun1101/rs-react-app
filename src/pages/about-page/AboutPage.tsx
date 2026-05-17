import styles from './about-page.module.scss';

function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.text}>
        Author:{' '}
        <a
          href="https://github.com/dilmun1101"
          target="_blank"
          className={styles.link}
        >
          dilmun1101
        </a>
      </p>
      <p className={styles.text}>
        Course:{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          className={styles.link}
        >
          RS School React Course
        </a>
      </p>
      <p className={styles.text}>
        This application was created as a study project.
      </p>
    </main>
  );
}

export default AboutPage;
