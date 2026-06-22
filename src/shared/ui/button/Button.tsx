import styles from './button.module.scss';
import cx from 'classnames';

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, ...rest }: IButtonProps) {
  return <button className={cx(styles.button, className)} {...rest} />;
}

export default Button;
