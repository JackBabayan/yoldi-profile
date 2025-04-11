'use client';

import { AccountsList } from '@/components/AccountsList';
import styles from '@/styles/Account.module.scss';

export default function AccountsListPage() {
  return (
    <div className={styles.accountContainer}>
      <h1 className={styles.pageTitle}>Список аккаунтов</h1>
      <AccountsList />
    </div>
  );
}