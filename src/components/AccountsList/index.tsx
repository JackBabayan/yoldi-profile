import useSWR from 'swr';
import { getUsersList } from '@/lib/api';
import { Loader } from '@/components/Loader';
import { Avatar } from '@/components/Avatar';
import { User } from '@/lib/types';
import Link from 'next/link';

import styles from './styles.module.scss';

export const AccountsList = () => {
  const { data: users, error, isLoading } = useSWR<User[]>(
    'users',
    () => getUsersList()
  );

  if (isLoading) return <Loader />
  if (error) return <div className={'error'}>Ошибка загрузки данных</div>;


  return (
    <ul className={styles.list}>
      {users && users.map((user) => (
        <li key={user.slug ?? user.email} className={styles.item}>
          <Link href={`/profile/${user.slug ?? user.email}`} className={styles.link}>
            <Avatar
              src={user.image?.url}
              alt={user.name}
              initial={user.name.charAt(0)}
            />
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user.name}</h3>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};