import { Check, X } from 'lucide-react';
import styles from './password-strength.module.scss';

interface Props {
  password: string;
}

const checks = [
  { label: '1 uppercase letter', regex: /[A-Z]/ },
  { label: '1 lowercase letter', regex: /[a-z]/ },
  { label: '1 number', regex: /[0-9]/ },
  { label: '1 special character', regex: /[^A-Za-z0-9]/ },
];

function PasswordStrength({ password }: Props) {
  if (!password) return null;

  return (
    <ul className={styles.list}>
      {checks.map((check) => {
        const passed = check.regex.test(password);
        return (
          <li
            key={check.label}
            className={passed ? styles.passed : styles.failed}
          >
            {passed ? <Check size={14} /> : <X size={14} />}
            {check.label}
          </li>
        );
      })}
    </ul>
  );
}

export default PasswordStrength;
