'use client';

import styles from './styles.module.scss';

interface ErrorProps {
  error?: string;
}

export const ErrorsAlert = ({ error }: ErrorProps) => {
  return ( <div className={styles.errorAlert}>{error}</div>);
};