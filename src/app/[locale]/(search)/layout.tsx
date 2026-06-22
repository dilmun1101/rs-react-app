import styles from './layout.module.scss';

export default function SearchLayout({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.mainColumn}>{children}</div>
      <div className={styles.detailsColumn}>{details}</div>
    </div>
  );
}
