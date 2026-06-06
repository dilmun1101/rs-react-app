import styles from './button.module.scss';
import cx from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...rest }: Props) {
  return (
    <button type="submit" className={cx(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}

export default Button;
