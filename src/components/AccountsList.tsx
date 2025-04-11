import useSWR from 'swr';
import { getUsers } from '@/lib/api';
import { Avatar } from './Avatar';
import { User } from '@/lib/types';
import styles from '@/styles/AccountsList.module.scss';

export const AccountsList = () => {
  const { data: users, error, isLoading } = useSWR<User[]>('users', getUsers);

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка загрузки данных</div>;

  return (
    <div className={styles.accountsListContainer}>
      <h2 className={styles.title}>Список аккаунтов</h2>
      
      <ul className={styles.list}>
        {users && users.map((user) => (
          <li key={user.slug ?? user.email} className={styles.item}>
            <div className={styles.link}>
              <Avatar 
                src={user.image?.url} 
                alt={user.name} 
                initial={user.name.charAt(0)}
              />
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>{user.name}</h3>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};