'use client';

import Link from 'next/link';
import styles from './styles.module.scss';

interface FooterProps {
  pathname?: string;
}

export const Footer = ({ pathname }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.accountQuestion}>
          {pathname === '/login' ?
            <>
              Еще нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
            </>
            :
            <>
              Уже есть аккаунт? <Link href="/login">Войти</Link>
            </>
          }
        </div>
      </div>
    </footer>
  );
};