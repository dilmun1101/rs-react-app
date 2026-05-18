import styles from './button.module.scss';
import cx from 'classnames';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

function Button({ className, ...rest }: IButtonProps) {
  return <button className={cx(styles.button, className)} {...rest} />;
}

export default Button;
